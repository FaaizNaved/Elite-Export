import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { intrinsicSize } from "../src/lib/images/intrinsic-size";
import { imageLibrarySchema } from "../src/models/primitives";
import type { ImageLibrary, ImageRecord } from "../src/types";
import {
  getArticles,
  getCatalog,
  getCompanyPages,
  getHomeContent,
  getMachines,
} from "../src/lib/content";

/**
 * The archive, recorded.
 *
 * Master Implementation Blueprint R19.5: *nothing is published from a shoot
 * until the archive exists — originals retained, capture dates, locations,
 * photographer, permissions. The archive is a precondition of publication, not
 * a tidy-up afterwards.* This is the command that turns a folder of files into
 * that archive.
 *
 * It does two things and refuses to do a third.
 *
 * It **measures**: every frame's intrinsic size is read out of the file, so the
 * number VDS §30.2 and §32.3 gate on is a fact rather than a claim, and cannot
 * drift from the file it describes (R7.1).
 *
 * It **reports**: for every frame, what is still missing before it may be
 * published — in the words MIB R16.5 asks for. "This image has no capture date"
 * is actionable; "asset validation failed" is not.
 *
 * It **never invents**. Place, capture date, photographer, permission, caption,
 * evidence rank and chapter are facts about a photograph that only the person
 * who was in the room can supply (Photography Direction §22.5, §24.4). The
 * command writes the frame in with those fields absent, and every one of them
 * is then a line in this report until somebody who knows fills it in.
 *
 *   npm run images:record            measure, merge, report
 *   npm run images:record -- --check report only; exits non-zero if the
 *                                    library is out of date with the files
 *   npm run images:record -- --adopt take alt text still authored in content
 *                                    for frames that have no record yet
 */

const ROOT = process.cwd();
const IMAGE_ROOT = path.join(ROOT, "public", "images");
const LIBRARY_FILE = path.join(ROOT, "src", "content", "images.json");
const READABLE = /\.(webp|png|jpe?g)$/i;

/* ------------------------------------------------------------------ files */

function walk(dir: string, found: string[] = []): string[] {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, found);
    else found.push(full);
  }
  return found;
}

/** Site-absolute path — the identity a content document references. */
const toSrc = (file: string): string =>
  `/${path.relative(path.join(ROOT, "public"), file).replace(/\\/g, "/")}`;

function readLibrary(): ImageLibrary {
  if (!existsSync(LIBRARY_FILE)) return {};
  const parsed = imageLibrarySchema.safeParse(JSON.parse(readFileSync(LIBRARY_FILE, "utf8")));
  if (!parsed.success) {
    console.error(`${LIBRARY_FILE} is not a valid image library:\n${parsed.error.message}`);
    process.exit(1);
  }
  return parsed.data;
}

/* --------------------------------------------------------------- content */

/** Every frame the content layer references, with any alt text still on it. */
async function referencedFrames(): Promise<Map<string, string>> {
  const [{ categories, products }, machines, journal, pages, home] = await Promise.all([
    getCatalog(),
    getMachines(),
    getArticles(),
    getCompanyPages(),
    getHomeContent(),
  ]);

  const found = new Map<string, string>();

  const walkDocument = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walkDocument);
      return;
    }
    if (typeof node !== "object" || node === null) return;

    const record = node as Record<string, unknown>;
    if (typeof record.src === "string") {
      const alt = typeof record.alt === "string" ? record.alt : "";
      // First reference wins, and a non-empty alt beats an empty one.
      if (!found.get(record.src)) found.set(record.src, alt);
    }
    Object.values(record).forEach(walkDocument);
  };

  walkDocument([categories, products, machines, journal, pages, home]);
  return found;
}

/* ---------------------------------------------------------------- report */

/** What a frame still lacks before it may be published (MIB R16.5). */
function missing(record: ImageRecord): string[] {
  const gaps: string[] = [];

  if (!record.width || !record.height) gaps.push("no measurable intrinsic size");
  if (!record.alt.trim()) gaps.push("no alternative text");
  if (!record.caption?.trim()) gaps.push("no caption");
  if (!record.chapter) gaps.push("no chapter");
  if (!record.evidenceRank) gaps.push("no evidence rank");

  const provenance = record.provenance;
  if (!provenance?.place) gaps.push("no place");
  if (!provenance?.capturedOn) gaps.push("no capture date");
  if (!provenance?.photographer) gaps.push("no photographer");
  if (!provenance?.permission) gaps.push("no permission on file");

  return gaps;
}

/* ------------------------------------------------------------------ main */

async function main(): Promise<void> {
  const checkOnly = process.argv.includes("--check");
  const adopt = process.argv.includes("--adopt");

  const existing = readLibrary();
  const referenced = await referencedFrames();
  const files = walk(IMAGE_ROOT).filter((file) => READABLE.test(file));

  const library: ImageLibrary = {};
  const unmeasurable: string[] = [];
  let measured = 0;
  let changed = 0;

  for (const file of files.sort()) {
    const src = toSrc(file);
    const previous = existing[src];
    const size = intrinsicSize(readFileSync(file));

    if (!size) unmeasurable.push(src);
    else measured += 1;

    const record: ImageRecord = {
      ...size,
      // Authored fields survive. Only the measurement is the tool's to write.
      alt: previous?.alt ?? (adopt ? (referenced.get(src) ?? "") : ""),
      ...(previous?.caption ? { caption: previous.caption } : {}),
      ...(previous?.provenance ? { provenance: previous.provenance } : {}),
      ...(previous?.evidenceRank ? { evidenceRank: previous.evidenceRank } : {}),
      ...(previous?.chapter ? { chapter: previous.chapter } : {}),
    };

    if (JSON.stringify(previous) !== JSON.stringify(record)) changed += 1;
    library[src] = record;
  }

  const removed = Object.keys(existing).filter((src) => !(src in library));
  const orphans = [...referenced.keys()].filter((src) => !(src in library));

  /* ------------------------------------------------------------- output */

  console.log("\nTHE ARCHIVE — Master Implementation Blueprint R19.5, §18.4\n");
  console.log(`  ${files.length} file(s) under public/images · ${measured} measured`);
  console.log(`  ${referenced.size} frame(s) referenced by the content layer`);
  if (removed.length) console.log(`  ${removed.length} record(s) whose file is gone: ${removed.join(", ")}`);
  if (unmeasurable.length) {
    console.log(`  ${unmeasurable.length} file(s) whose size could not be read: ${unmeasurable.join(", ")}`);
  }
  if (orphans.length) {
    console.log(`\n  REFERENCED BUT NOT IN THE ARCHIVE — a document names a frame that is not there:`);
    for (const src of orphans) console.log(`    · ${src}`);
  }

  const publishable = Object.entries(library).filter(([, record]) => missing(record).length === 0);

  /*
   * Every frame in the archive, not only the frames a document names.
   *
   * This asked only about referenced frames, and that was right while a
   * document was the thing that put a photograph on a surface. It is not any
   * more: a chapter and Gallery both read `chapterFrames`, which asks the
   * **library** what it holds for a chapter (R8.7, R15.4). After the shoot the
   * ordinary case is a frame no document names — and the report would have said
   * nothing about the whole archive at exactly the moment it was filled.
   */
  const gaps = Object.entries(library)
    .map(([src, record]) => [src, missing(record)] as const)
    .filter(([, list]) => list.length > 0);

  console.log(
    `\n  ${publishable.length} of ${Object.keys(library).length} frame(s) carry a complete record.\n`,
  );

  if (gaps.length) {
    console.log("  WHAT EACH FRAME STILL NEEDS (R16.5)\n");
    for (const [src, list] of gaps.slice(0, 12)) {
      console.log(`    ${src}`);
      console.log(`      ${list.join(", ")}`);
    }
    if (gaps.length > 12) {
      console.log(`    … and ${gaps.length - 12} more frames in the same condition`);
    }
    console.log(
      "\n  These are facts about a photograph, and only the person who was in the room\n" +
        "  can supply them (Photography Direction §22.5, §24.4). They are typed into\n" +
        `  src/content/${path.basename(LIBRARY_FILE)}, once per frame, and never invented here.\n`,
    );
  }

  if (checkOnly) {
    const stale = changed > 0 || removed.length > 0;
    console.log(
      stale
        ? `✗ the library is out of date with the files — run npm run images:record\n`
        : "✓ the library matches the files\n",
    );
    process.exit(stale ? 1 : 0);
  }

  writeFileSync(LIBRARY_FILE, `${JSON.stringify(library, null, 2)}\n`, "utf8");
  console.log(`✓ recorded ${Object.keys(library).length} frame(s) — ${changed} changed\n`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
});
