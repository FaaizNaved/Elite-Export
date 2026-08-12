import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import {
  classOrder,
  companyRecord,
  dependencies,
  emptySnapshot,
  factById,
  gates as allGates,
  holdingGate,
  isPublishable,
  outstanding,
  runGates,
  unconfirmedFactLabels,
  unconfirmedRecordItems,
  type AssetFile,
  type CategoryRecord,
  type CertificationRecord,
  type ImageRecord,
  type RegisterField,
  type Snapshot,
  type SourceHit,
  type SurfaceActions,
  type TestimonyRecord,
  type TextRecord,
} from "../src/lib/publication";
import { company } from "../src/config/company";
import {
  getArticles,
  getCatalog,
  getCompanyPages,
  getHomeContent,
  getMachines,
  getTestimonials,
} from "../src/lib/content";

/**
 * Publication readiness.
 *
 * `npm run check:publication` runs every gate in Master Implementation
 * Blueprint §16 over everything the site would publish, and refuses — it does
 * not warn (MIB R16.1).
 *
 * This is deliberately **not** `check:content`. That command asserts the
 * content engine's own invariants and must stay green during development.
 * This one answers a different question, the one MIB §26 asks on launch day:
 *
 *   Is any of this publishable yet?
 *
 * While the client's photography and the Facts Register confirmations are
 * outstanding, this command is expected to be red. That is the register of
 * outstanding work, honestly stated, rather than a fault.
 *
 *   npm run check:publication              the readiness report
 *   npm run check:publication -- --selftest   proves the gates refuse (MIB R9.2)
 */

const ROOT = process.cwd();
const IMAGE_ROOT = path.join(ROOT, "public", "images");

/* ------------------------------------------------------------ collectors */

type Unknown = Record<string, unknown>;

const isObject = (value: unknown): value is Unknown =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isImage = (value: unknown): value is Unknown =>
  isObject(value) && typeof value.src === "string";

/** Every image referenced anywhere inside a document, however deeply nested. */
function collectImages(owner: string, node: unknown, found: ImageRecord[] = []): ImageRecord[] {
  if (Array.isArray(node)) {
    for (const item of node) collectImages(owner, item, found);
    return found;
  }
  if (!isObject(node)) return found;

  if (isImage(node)) {
    found.push({
      owner,
      src: String(node.src),
      alt: typeof node.alt === "string" ? node.alt : undefined,
      caption: typeof node.caption === "string" ? node.caption : undefined,
      width: typeof node.width === "number" ? node.width : undefined,
      height: typeof node.height === "number" ? node.height : undefined,
      // Provenance has no home in the content models yet; the gate says so.
      provenance: isObject(node.provenance) ? (node.provenance as ImageRecord["provenance"]) : undefined,
    });
  }

  for (const value of Object.values(node)) collectImages(owner, value, found);
  return found;
}

/** Every published string in a document, joined, for the Facts Register scan. */
function collectText(node: unknown, parts: string[] = []): string[] {
  if (typeof node === "string") {
    // Routes and asset paths are not published prose.
    if (!node.startsWith("/") && !node.startsWith("http")) parts.push(node);
    return parts;
  }
  if (Array.isArray(node)) {
    for (const item of node) collectText(item, parts);
    return parts;
  }
  if (isObject(node)) {
    for (const value of Object.values(node)) collectText(value, parts);
  }
  return parts;
}

function walkFiles(dir: string, match: (file: string) => boolean, found: string[] = []): string[] {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walkFiles(full, match, found);
    else if (match(full)) found.push(full);
  }
  return found;
}

/* --------------------------------------------------------------- sources */

/**
 * Placeholder detection.
 *
 * The generator writes a manifest of everything it produced; anything on that
 * list is a placeholder by definition. If the manifest is gone, the README it
 * also writes is the fallback signal.
 */
function readAssets(): AssetFile[] {
  const files = walkFiles(IMAGE_ROOT, (file) => /\.(webp|png|jpe?g|avif|svg)$/i.test(file)).map((file) =>
    path.relative(ROOT, file).replace(/\\/g, "/"),
  );

  const manifestPath = path.join(IMAGE_ROOT, ".placeholders.json");
  if (existsSync(manifestPath)) {
    const listed = new Set<string>(JSON.parse(readFileSync(manifestPath, "utf8")) as string[]);
    return files.map((file) => ({ path: file, placeholder: listed.has(file) }));
  }

  const readmePath = path.join(IMAGE_ROOT, "README.md");
  const generated =
    existsSync(readmePath) && readFileSync(readmePath, "utf8").includes("generated placeholder");

  return files.map((file) => ({ path: file, placeholder: generated }));
}

/**
 * Comments are not design values.
 *
 * MIB R3.4 requires the derivation to be recorded where the work is, so a
 * component implementing "height 48px, from 14px vertical padding on a 20px
 * line box" cites those numbers in prose beside the code that expresses them.
 * Counting the citation as a stray value refuses the traceability the same
 * document demands — and a gate that refuses correct work teaches people to
 * ignore it, which is the failure R9.2 exists to prevent.
 *
 * Code is still scanned in full: only line and block comments are removed, and
 * string literals are untouched, so a colour typed into a `className` is caught
 * exactly as before.
 */
export function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/**
 * Design values living outside the single source (VDS §48.3).
 * `globals.css` is that source; everything else must reference it.
 */
function readStrayDesignValues(): SourceHit[] {
  const TOKEN_SOURCE = path.join(ROOT, "src", "app", "globals.css");
  const patterns = [/#[0-9a-fA-F]{3,8}\b/g, /\b\d+px\b/g, /\b\d+ms\b/g, /cubic-bezier/g];

  const files = walkFiles(
    path.join(ROOT, "src"),
    (file) => /\.(tsx?|css)$/.test(file) && path.resolve(file) !== TOKEN_SOURCE,
  );

  const hits: SourceHit[] = [];
  for (const file of files) {
    const source = stripComments(readFileSync(file, "utf8"));
    const matches = patterns.flatMap((pattern) => [...source.matchAll(pattern)].map((m) => m[0]));
    if (matches.length) {
      hits.push({
        file: path.relative(ROOT, file).replace(/\\/g, "/"),
        count: matches.length,
        sample: matches.slice(0, 3).join(", "),
      });
    }
  }
  return hits.sort((a, b) => b.count - a.count);
}

/* -------------------------------------------------------------- snapshot */

async function buildSnapshot(): Promise<Snapshot> {
  const [{ categories, products }, machines, journal, pages, home, testimonials] =
    await Promise.all([
      getCatalog(),
      getMachines(),
      getArticles(),
      getCompanyPages(),
      getHomeContent(),
      getTestimonials(),
    ]);

  const documents: Array<[string, unknown]> = [
    ["home", home],
    ...products.map((p) => [`product:${p.slug}`, p] as [string, unknown]),
    ...categories.map((c) => [`category:${c.slug}`, c] as [string, unknown]),
    ...machines.map((m) => [`machine:${m.slug}`, m] as [string, unknown]),
    ...journal.map((b) => [`article:${b.slug}`, b] as [string, unknown]),
    ...pages.map((p) => [`page:${p.slug}`, p] as [string, unknown]),
    ["company-profile", company],
  ];

  const images: ImageRecord[] = documents.flatMap(([owner, doc]) => collectImages(owner, doc));

  const texts: TextRecord[] = documents.map(([owner, doc]) => ({
    owner,
    text: collectText(doc).join("\n"),
  }));

  const categoryRecords: CategoryRecord[] = categories.map((category) => ({
    slug: category.slug,
    productCount: category.productCount,
  }));

  const testimonies: TestimonyRecord[] = testimonials.map((item) => ({
    id: item.id,
    quote: item.quote,
    author: item.author,
    role: item.role,
    company: item.company,
    country: item.country,
    // No model field exists for either, which is the finding.
    permissionOnFile: false,
    date: undefined,
  }));

  /*
   * Read from the record, not hardcoded to `undefined`.
   *
   * Three of these five were typed as absent because `certificationSchema`
   * had no field for them. It does now, so the gate reports what the record
   * actually holds — and goes quiet for a certificate the moment all five
   * arrive, without a code change (dependency 7).
   */
  const certifications: CertificationRecord[] = company.certifications.map((cert) => ({
    id: cert.name,
    issuer: cert.issuer,
    reference: cert.reference,
    issuedOn: cert.year ? String(cert.year) : undefined,
    covers: cert.covers,
    excludes: cert.excludes,
  }));

  /*
   * Surfaces carry no authored actions any more: MIB R13.2 removed the label
   * from the component and the content model followed. The action is `Action`,
   * once, where R39.3 permits it — which is a fact about the rendered surface
   * rather than about content, so this gate now has nothing in the content
   * layer to read. Counting rendered actions per route is the surface audit's
   * job and is recorded as debt against the Stage 1 packages.
   */
  const surfaces: SurfaceActions[] = [];

  /*
   * The company record's own fields (MIB §20.2 item 2). These need no prose
   * scan: each is known to state a governed fact, so the Register gate reads
   * the classification directly and quotes the question that discharges it.
   */
  const registerFields: RegisterField[] = companyRecord.map((item) => ({
    owner: "company",
    field: item.field,
    factId: item.factId,
    question: item.question,
  }));

  /*
   * The machine records' own fields — dependency 9, and the same technique.
   *
   * MIB §12.1's machine record: *its specification attributes disappear until
   * the Register confirms them — the record still exists without them.* Brand
   * Bible §19.4 governs all of them, and four consecutive debt tables recorded
   * that they were still being published.
   *
   * The prose scan caught some of it — *"25 tonnes"*, *"900 pieces per shift"*
   * — and could never catch the rest: `machine-origin` carries no markers
   * because a manufacturer's name and a country are unbounded strings, and a
   * pattern for "Atom" or "Italy" would match half the site. That is the same
   * blind spot the About package found on a founding year, and it has the same
   * fix: **a field known to state a governed fact is read as a field**, not
   * hunted for in prose. `registerFields` is the mechanism that already does
   * it for the company record; this is the second object to use it, and it
   * needs no new one.
   *
   * Grouped one row per machine per fact, so an answer covers what a single
   * confirmation actually covers (R16.5 — findings that reach the person who
   * can fix them, not a list they scroll past).
   */
  const machineFields: RegisterField[] = machines.flatMap((machine) => {
    const origin = ["manufacturer", "origin"].filter((key) => machine[key as "origin"]);
    const performance = [
      ...(machine.capacity ? ["capacity"] : []),
      ...machine.specifications.map((entry) => entry.label),
    ];

    return [
      ...(origin.length
        ? [
            {
              owner: `machine:${machine.slug}`,
              field: origin.join(", "),
              factId: "machine-origin",
              question:
                "Who manufactured this machine and where was it made? Both are Brand Bible §19.4 facts and a buyer may check either.",
            },
          ]
        : []),
      ...(performance.length
        ? [
            {
              owner: `machine:${machine.slug}`,
              field: performance.join(", "),
              factId: "machine-specification",
              question:
                "Which of these attributes are confirmed, and against what? Until each is, the record states the operation and what it makes repeatable, and nothing more (MIB §12.1).",
            },
          ]
        : []),
    ];
  });

  return {
    ...emptySnapshot,
    images,
    registerFields: [...registerFields, ...machineFields],
    assets: readAssets(),
    categories: categoryRecords,
    testimonies,
    certifications,
    surfaces,
    texts,
    strayDesignValues: readStrayDesignValues(),
  };
}

/* ---------------------------------------------------------------- report */

function report(snapshot: Snapshot): number {
  const results = runGates(snapshot);
  const failed = results.filter((result) => !result.passed);

  console.log("\nPUBLICATION READINESS — Master Implementation Blueprint §16\n");

  for (const { gate, findings, passed } of results) {
    const mark = passed ? "PASS" : "REFUSE";
    console.log(`${mark.padEnd(7)} ${gate.title.padEnd(15)} ${gate.traces}`);
    if (passed) continue;

    const held = holdingGate(gate.id);
    console.log(`        refuses: ${gate.refuses}`);
    console.log(
      `        held by: ${
        held.length
          ? held.map((item) => `dependency ${item.id} (${item.owner})`).join(", ")
          : "nothing outstanding — this one is the build's own to fix"
      }`,
    );
    for (const item of findings.slice(0, 5)) {
      console.log(`        · ${item.subject}: ${item.detail}`);
    }
    if (findings.length > 5) console.log(`        · … and ${findings.length - 5} more`);
    console.log("");
  }

  const total = results.reduce((sum, result) => sum + result.findings.length, 0);
  const ours = results
    .filter((result) => holdingGate(result.gate.id).length === 0)
    .reduce((sum, result) => sum + result.findings.length, 0);

  registerReport();
  confirmationSheet();

  console.log(
    failed.length === 0
      ? "\n✓ every gate passes — this is publishable\n"
      : `\n✗ ${failed.length} of ${results.length} gates refuse, ${total} finding(s). Not publishable.\n` +
          `  ${total - ours} wait on an outstanding dependency; ${ours} are the build's own (MIB R20.1).\n` +
          "  While photography and the Facts Register are outstanding this is the expected state.\n" +
          "  See docs/brand/master-implementation-blueprint.md §20 (dependencies) and §26 (launch gates).\n",
  );

  return failed.length === 0 ? 0 : 1;
}

/* ---------------------------------------------------------- the register */

/**
 * MIB R20.5: dependencies are reviewed at every stage gate and the register is
 * kept current. This is that review, printed beside the gates it explains, so
 * the two cannot drift apart — and stated as what is missing and who owns it,
 * because R16.5 requires a finding to reach the person who can fix it.
 */
function registerReport(): void {
  const open = outstanding();

  console.log("\nOUTSTANDING DEPENDENCIES — Master Implementation Blueprint §20.2\n");

  for (const dependencyClass of classOrder) {
    const rows = open.filter((item) => item.dependencyClass === dependencyClass);
    if (!rows.length) continue;

    console.log(
      `${dependencyClass.toUpperCase()} — ${
        dependencyClass === "blocking"
          ? "do not begin the affected work"
          : dependencyClass === "gating"
            ? "build it, design around the absence, do not ship"
            : "build, ship, improve later"
      }\n`,
    );

    for (const item of rows) {
      console.log(`  ${String(item.id).padStart(2)}  ${item.title} — ${item.owner}`);
      console.log(`      blocks: ${item.blocks}`);
      console.log(`      meanwhile: ${item.whileOutstanding}`);
      if (item.id === 3) {
        const labels = unconfirmedFactLabels();
        console.log(`      unconfirmed facts (${labels.length}): ${labels.join("; ")}`);
      }
      console.log("");
    }
  }

  const discharged = dependencies.filter((item) => item.discharge);
  console.log(`DISCHARGED — ${discharged.length} of ${dependencies.length}, each in writing (R20.6)\n`);
  for (const item of discharged) {
    console.log(`  ${String(item.id).padStart(2)}  ${item.title}`);
    console.log(`      ${item.discharge!.document}`);
  }

  console.log(
    `\n  ${open.filter((item) => item.dependencyClass === "blocking").length} blocking, ` +
      `${open.filter((item) => item.dependencyClass === "gating").length} gating, ` +
      `${open.filter((item) => item.dependencyClass === "soft").length} soft. ` +
      "R20.3: dependency 1 is the root and is pursued before anything else, including design work.",
  );
}

/* ---------------------------------------------------- the confirmation sheet */

/**
 * What the client is being asked, and what stands in the record meanwhile.
 *
 * MIB R20.6: no dependency is discharged verbally. R16.5: a finding is stated
 * to the person who can fix it, as what is missing rather than as an error.
 * This is the sheet that goes to them — one question per field, the value the
 * build is holding, and the dependency each answer discharges.
 *
 *   npm run check:publication -- --confirmations
 */
function confirmationSheet(): void {
  const outstanding = unconfirmedRecordItems();

  console.log("\nTHE COMPANY RECORD — what needs confirming, in writing\n");
  console.log(
    "  Brand Bible §19.3 requires written confirmation and MIB R20.6 states the\n" +
      "  consequence: a call is not a classification. Each answer is recorded against\n" +
      "  its fact in src/lib/publication/facts-register.ts, with the document it came\n" +
      "  from, and that single edit unblocks every surface which needs it.\n",
  );

  for (const item of outstanding) {
    const dependency = dependencies.find((entry) => entry.id === item.dependency);
    console.log(`  company.${item.field}`);
    console.log(`      asks: ${item.question}`);
    console.log(`      the record currently holds: ${item.standing}`);
    console.log(
      `      discharges: dependency ${item.dependency}` +
        (dependency ? ` — ${dependency.title} (${dependency.dependencyClass})` : ""),
    );
    console.log("");
  }

  const confirmed = companyRecord.length - outstanding.length;
  console.log(
    `  ${outstanding.length} of ${companyRecord.length} fields outstanding, ${confirmed} confirmed.\n` +
      "  Nothing here is answered by the build. R20.4: a gating dependency never becomes\n" +
      "  an invention — the mechanism is stated, the fact is withheld.\n",
  );
}

/* -------------------------------------------------------------- selftest */

/**
 * MIB R9.2: a gate nobody has attempted to break is a gate nobody knows works.
 * Each case is something that must never publish; every one must be refused.
 */
function selftest(): number {
  const cases: Array<[string, Snapshot]> = [
    [
      "register",
      { ...emptySnapshot, texts: [{ owner: "t", text: "Our AQL band is 2.5 and MOQ is 500 pieces." }] },
    ],
    [
      "provenance",
      { ...emptySnapshot, images: [{ owner: "t", src: "a.webp", alt: "a", caption: "a", width: 2000, height: 1000 }] },
    ],
    [
      "record",
      {
        ...emptySnapshot,
        images: [
          {
            owner: "t",
            src: "a.webp",
            width: 2000,
            height: 1000,
            provenance: { place: "p", capturedOn: "d", photographer: "w", permission: "y" },
          },
        ],
      },
    ],
    [
      "threshold",
      {
        ...emptySnapshot,
        images: [
          {
            owner: "t",
            src: "a.webp",
            alt: "a",
            caption: "a",
            width: 400,
            height: 300,
            provenance: { place: "p", capturedOn: "d", photographer: "w", permission: "y" },
          },
        ],
      },
    ],
    [
      "crop",
      {
        ...emptySnapshot,
        images: [
          { owner: "a", src: "same.webp", width: 3000, height: 2000 },
          { owner: "b", src: "same.webp", width: 2000, height: 2000 },
        ],
      },
    ],
    ["consent", { ...emptySnapshot, people: [{ name: "A cutter" }] }],
    ["certification", { ...emptySnapshot, certifications: [{ id: "ISO 9001", issuer: "A body" }] }],
    ["testimony", { ...emptySnapshot, testimonies: [{ id: "t1", quote: "Great work", author: "A buyer" }] }],
    ["category", { ...emptySnapshot, categories: [{ slug: "thin", productCount: 2 }] }],
    ["chapter", { ...emptySnapshot, chapters: [{ id: "C3", surface: "manufacturing", told: "partial" }] }],
    ["placeholder", { ...emptySnapshot, assets: [{ path: "public/images/a.webp", placeholder: true }] }],
    [
      "action",
      {
        ...emptySnapshot,
        surfaces: [{ surface: "gallery", actions: ["Send the drawing"], actionForbidden: true }],
      },
    ],
    ["value", { ...emptySnapshot, strayDesignValues: [{ file: "src/x.tsx", count: 3, sample: "#b68d40" }] }],
  ];

  let failures = 0;
  console.log("\nGATE SELF-TEST — each case must be refused (MIB R9.2)\n");

  for (const [gateId, snapshot] of cases) {
    const result = runGates(snapshot).find((r) => r.gate.id === gateId);
    const refused = result !== undefined && !result.passed;
    console.log(`${refused ? "ok  " : "FAIL"}  ${gateId} refuses what it must`);
    if (!refused) failures += 1;
  }

  // The Value gate's scanner: a number cited in a comment is not a stray value,
  // and a colour typed into code still is.
  const stripped = stripComments('/* 48px, from §35.2 */\nconst a = "#b68d40"; // 12px');
  const scannerCorrect =
    !stripped.includes("48px") && !stripped.includes("12px") && stripped.includes("#b68d40");
  console.log(`${scannerCorrect ? "ok  " : "FAIL"}  value scanner reads code, not comments`);
  if (!scannerCorrect) failures += 1;

  // An empty snapshot must pass everything: a gate that fires on nothing is noise.
  const quiet = runGates(emptySnapshot).filter((result) => !result.passed);
  console.log(`${quiet.length === 0 ? "ok  " : "FAIL"}  no gate fires on an empty snapshot`);
  if (quiet.length) failures += 1;

  /*
   * The dependency register, defended the same way (R9.2). Each of these is
   * something that must never be accepted, and the last two are the ones a
   * hurried day produces.
   */
  const checks: Array<[string, boolean]> = [
    [
      "the register is MIB §20.2's twenty-one rows, once each",
      dependencies.length === 21 &&
        new Set(dependencies.map((item) => item.id)).size === 21 &&
        dependencies.every((item, index) => item.id === index + 1),
    ],
    [
      "no dependency names a gate that does not exist",
      dependencies.every((item) =>
        item.gates.every((id) => allGates.some((gate) => gate.id === id)),
      ),
    ],
    [
      "a discharge names its written record — a call is not one (R20.6)",
      dependencies.every(
        (item) =>
          item.discharge === undefined ||
          (item.discharge.document.trim().length > 0 && item.discharge.evidence.trim().length > 0),
      ),
    ],
    [
      "a fact confirmed with no written record publishes nothing (R20.6)",
      !isPublishable({
        id: "defeat",
        label: "A fact somebody confirmed on a call",
        classification: "confirmed",
        markers: [],
      }),
    ],
    [
      "every field of the company record names a fact the register holds",
      companyRecord.every((item) => factById(item.factId) !== undefined),
    ],
    [
      "an unconfirmed field of a known record is refused (MIB §20.2 item 2)",
      (() => {
        const result = runGates({
          ...emptySnapshot,
          registerFields: [
            {
              owner: "company",
              field: "legalName",
              factId: "company-legal-name",
              question: "What is the registered legal name?",
            },
          ],
        }).find((r) => r.gate.id === "register");
        return result !== undefined && !result.passed;
      })(),
    ],
    [
      "a field naming a fact the register has lost is refused, not ignored",
      (() => {
        const result = runGates({
          ...emptySnapshot,
          registerFields: [
            { owner: "company", field: "x", factId: "no-such-fact", question: "?" },
          ],
        }).find((r) => r.gate.id === "register");
        return result !== undefined && !result.passed;
      })(),
    ],
    [
      "a fact confirmed in writing does publish",
      isPublishable({
        id: "defeat",
        label: "A fact with a written record",
        classification: "confirmed",
        confirmation: { document: "Client email", receivedOn: "2026-01-01" },
        markers: [],
      }),
    ],
    /*
     * The integration paths, proved rather than assumed (R9.2). Each is a
     * question a client answer must be able to close; a path that cannot be
     * shown to close is a path that will be discovered not to, during the
     * handover.
     */
    [
      "a certificate carrying all five fields clears the gate (dependency 7)",
      (() => {
        const result = runGates({
          ...emptySnapshot,
          certifications: [
            {
              id: "ISO 9001:2015",
              issuer: "Bureau Veritas",
              reference: "IND.21.0001",
              issuedOn: "2021-06-01",
              covers: "Manufacture of leather goods",
              excludes: "Tanning; chemical testing",
            },
          ],
        }).find((r) => r.gate.id === "certification");
        return result !== undefined && result.passed;
      })(),
    ],
    [
      "a machine attribute naming a governed fact is refused (dependency 9)",
      (() => {
        const result = runGates({
          ...emptySnapshot,
          registerFields: [
            {
              owner: "machine:probe",
              field: "manufacturer, origin",
              factId: "machine-origin",
              question: "Who made it and where?",
            },
          ],
        }).find((r) => r.gate.id === "register");
        return result !== undefined && !result.passed;
      })(),
    ],
  ];

  for (const [description, passed] of checks) {
    console.log(`${passed ? "ok  " : "FAIL"}  ${description}`);
    if (!passed) failures += 1;
  }

  console.log(failures === 0 ? "\n✓ the gates refuse what they must\n" : `\n✗ ${failures} gate(s) failed\n`);
  return failures === 0 ? 0 : 1;
}

/* ------------------------------------------------------------------ main */

async function main() {
  if (process.argv.includes("--selftest")) {
    process.exit(selftest());
  }
  if (process.argv.includes("--confirmations")) {
    confirmationSheet();
    process.exit(0);
  }
  process.exit(report(await buildSnapshot()));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
});
