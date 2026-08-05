import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import type { PublishStatus } from "../../types";

/**
 * The only module that touches the filesystem.
 *
 * Swapping local MDX for a CMS or database means reimplementing this file's
 * handful of read functions — every loader above it works with parsed,
 * validated objects and knows nothing about `fs`.
 */

export const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

/**
 * Top-level content directories. Products are not listed: they live inside the
 * category tree, which is the single expression of the business hierarchy.
 */
export const CONTENT_DIR = {
  categories: "categories",
  company: "company",
  machines: "machines",
  gallery: "gallery",
  blog: "blog",
  legal: "legal",
} as const;

/** Drafts are visible while developing, never in a production build. */
export const INCLUDE_DRAFTS = process.env.NODE_ENV !== "production";

/** The one visibility rule, applied to every kind of document. */
export const isPublished = (doc: { status: PublishStatus }): boolean =>
  INCLUDE_DRAFTS || doc.status === "published";

export class ContentError extends Error {
  override readonly name = "ContentError";
}

export interface ParsedDocument<T> {
  data: T;
  /** MDX body with the frontmatter block removed. */
  body: string;
  /** Path relative to the content root, POSIX-style. */
  sourcePath: string;
}

const toPosix = (value: string) => value.split(path.sep).join("/");
const absolute = (...segments: string[]) => path.join(CONTENT_ROOT, ...segments);

function validate<S extends z.ZodType>(schema: S, value: unknown, sourcePath: string): z.infer<S> {
  const result = schema.safeParse(value);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join(".") || "<root>"}: ${issue.message}`)
      .join("\n");
    throw new ContentError(`Invalid content in "${sourcePath}":\n${issues}`);
  }

  return result.data;
}

async function readDirEntries(relativeDir: string) {
  try {
    return await fs.readdir(absolute(relativeDir), { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Child directory names, sorted. Missing directories read as empty. */
export async function listDirectories(relativeDir: string): Promise<string[]> {
  const entries = await readDirEntries(relativeDir);
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/** `.mdx` filenames in a directory, sorted. Files prefixed with `_` are ignored. */
export async function listMdxFiles(relativeDir: string): Promise<string[]> {
  const entries = await readDirEntries(relativeDir);
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

/** Reads and validates a JSON metadata file (`category.json`, `subcategory.json`). */
export async function readJsonFile<S extends z.ZodType>(
  relativePath: string,
  schema: S,
): Promise<z.infer<S>> {
  const sourcePath = toPosix(relativePath);
  let raw: string;

  try {
    raw = await fs.readFile(absolute(relativePath), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new ContentError(`Missing content file: "${sourcePath}"`);
    }
    throw error;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new ContentError(`Malformed JSON in "${sourcePath}": ${(error as Error).message}`);
  }

  return validate(schema, parsed, sourcePath);
}

/** Reads an MDX file, validating its frontmatter and returning the body separately. */
export async function readMdxFile<S extends z.ZodType>(
  relativePath: string,
  schema: S,
): Promise<ParsedDocument<z.infer<S>>> {
  const sourcePath = toPosix(relativePath);
  let raw: string;

  try {
    raw = await fs.readFile(absolute(relativePath), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new ContentError(`Missing content file: "${sourcePath}"`);
    }
    throw error;
  }

  const { data, content } = matter(raw);

  return {
    data: validate(schema, data, sourcePath),
    body: content.trim(),
    sourcePath,
  };
}
