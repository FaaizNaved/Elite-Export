import type { z } from "zod";
import type { PublishStatus } from "../../types";
import { once } from "../../utils/cache";
import { isPublished, listMdxFiles, readMdxFile } from "./source";
import { slugFromFilename } from "../../utils/slug";

/**
 * The content registry.
 *
 * Every flat MDX collection — company pages, machines, blog posts, legal
 * documents — follows the same pipeline:
 *
 *   registry (this file) → parser (`source.ts`) → resolver (`resolve`) → renderer (`src/mdx`)
 *
 * Declaring a collection replaces the twenty-odd lines of list/read/validate/
 * filter/sort each loader used to repeat. Adding a new content type is now one
 * `defineCollection` call.
 *
 * The product catalog is deliberately not built on this: its documents are
 * nested two levels deep and joined against category metadata, which is a
 * genuinely different shape rather than a variation of this one.
 */

/** Minimum shape a resolved document must have to be queryable. */
export interface CollectionDocument {
  slug: string;
  href: string;
  status: PublishStatus;
}

export interface ResolveInput<T> {
  /** Validated frontmatter. */
  data: T;
  /** MDX body with the frontmatter block removed. */
  body: string;
  /** Path relative to the content root, POSIX-style. */
  sourcePath: string;
  /** Filename slug; a `slug` field in frontmatter takes precedence. */
  slug: string;
}

export interface CollectionConfig<Schema extends z.ZodType, Doc extends CollectionDocument> {
  /** Directory under the content root, from `CONTENT_DIR`. */
  dir: string;
  schema: Schema;
  /** Turns validated frontmatter into the resolved document. */
  resolve: (input: ResolveInput<z.infer<Schema>>) => Doc;
  /**
   * Applied after unpublished documents are filtered out.
   *
   * `NoInfer` keeps this out of inference: a generic comparator like
   * `byNewestFirst` would otherwise widen `Doc` to its own constraint and
   * every resolved document would collapse to `CollectionDocument`.
   */
  sort?: (a: NoInfer<Doc>, b: NoInfer<Doc>) => number;
}

export interface Collection<Doc extends CollectionDocument> {
  /** Every published document, sorted. Read once per process. */
  all: () => Promise<Doc[]>;
  bySlug: (slug: string) => Promise<Doc | null>;
  /** `generateStaticParams` output. */
  routes: () => Promise<Array<{ slug: string }>>;
}

export function defineCollection<Schema extends z.ZodType, Doc extends CollectionDocument>(
  config: CollectionConfig<Schema, Doc>,
): Collection<Doc> {
  const all = once(async (): Promise<Doc[]> => {
    const files = await listMdxFiles(config.dir);

    const documents = await Promise.all(
      files.map(async (fileName) => {
        const { data, body, sourcePath } = await readMdxFile(
          `${config.dir}/${fileName}`,
          config.schema,
        );

        return config.resolve({
          data,
          body,
          sourcePath,
          slug: slugFromFilename(fileName),
        });
      }),
    );

    const published = documents.filter(isPublished);
    return config.sort ? published.sort(config.sort) : published;
  });

  return {
    all,
    bySlug: async (slug) => (await all()).find((doc) => doc.slug === slug) ?? null,
    routes: async () => (await all()).map((doc) => ({ slug: doc.slug })),
  };
}

/* -------------------------------------------------------------------------- */
/* Shared comparators                                                          */
/* -------------------------------------------------------------------------- */

export const byOrderThenTitle = <T extends { order: number; title: string }>(a: T, b: T) =>
  a.order - b.order || a.title.localeCompare(b.title);

export const byOrderThenName = <T extends { order: number; name: string }>(a: T, b: T) =>
  a.order - b.order || a.name.localeCompare(b.name);

export const byNewestFirst = <T extends { publishedAt: Date }>(a: T, b: T) =>
  b.publishedAt.getTime() - a.publishedAt.getTime();
