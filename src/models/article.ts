import { z } from "zod";
import { chapterSchema, imageSchema, publishStatusSchema, slugSchema } from "./primitives";
import { seoSchema } from "./seo";

/**
 * The Article — UX Blueprint R45.1, and the model this file now matches.
 *
 * R45.1's mandatory column is five things: *title · **the chapter it tells** ·
 * the body · a named author who could answer a question about it · date
 * written.* Its optional column is four: *photographs with provenance · the
 * categories it relates to · sources or references · a stated limit of the
 * author's knowledge.*
 *
 * Two fields were wrong against it, and both are the difference between a
 * journal and a blog:
 *
 * - **`chapter` was absent.** R24.2: *an article is one chapter, told whole; an
 *   article covering four chapters lightly is a trailer.* A model with no
 *   chapter cannot express that rule, and every article written against it is a
 *   post about a topic. It is mandatory here, and `chapterSchema` is the same
 *   closed set of ten the archive records against a frame (R7.1) — there is no
 *   eleventh and the type will not accept one.
 * - **`cover` was mandatory.** R45.1 makes photographs optional, and X8 with
 *   Photography §24.5 make the alternative worse than absence: an article whose
 *   model demands a photograph acquires a placeholder the first time one is
 *   written without one.
 *
 * **`featured` is gone.** It appears nowhere in R45.1, and a flag that promotes
 * one article over the others is merchandising on the surface R24.1 keeps clear
 * of it — *not content marketing, opinion, or a news feed.*
 *
 * There is no publishing-schedule field, and R45.1's validation column says why:
 * **frequency is not a commitment** (R24.5). `publishedAt` is R45.1's *date
 * written*, which is a record about the article rather than a position in a
 * feed — the index is ordered by chapter, and the surface never shows a date in
 * the eyebrow.
 */
export const articleFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  slug: slugSchema.optional(),
  excerpt: z.string().min(1),
  /** R45.1: the chapter it tells. One of the ten, told whole (R24.2). */
  chapter: chapterSchema,
  /** R45.1: date written. Not a schedule (R24.5). */
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  /**
   * R45.1 and R24.6: **a named person who could answer a question about it** —
   * rank 7, the evidence that converts a company into somebody (R45.4). R45.3
   * governs the person and its validation is one line: **no consent, no
   * record** (dependency 5, blocking).
   */
  author: z.string().min(1),
  /** R45.1, optional: photographs with provenance. */
  cover: imageSchema.optional(),
  /** R45.1, optional: the categories it relates to. */
  tags: z.array(z.string()).default([]),
  status: publishStatusSchema,
  seo: seoSchema.optional(),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
