import { z } from "zod";

/**
 * Shared building blocks used by every content schema.
 * Keep this file free of domain concepts — only reusable value objects live here.
 */

export const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Must be lowercase, alphanumeric and hyphen-separated (e.g. one-ear-headstall)",
  );

/**
 * A reference to an asset, in either of two forms:
 *
 * - **Relative** (`one-ear-headstall-front.webp`) — resolved against the
 *   document's own asset folder by `src/lib/content/assets.ts`. This is the
 *   form content should use: it says *which* image, not *where it is hosted*.
 * - **Absolute** (`/images/hero/home-hero.webp`) — a shared asset that belongs
 *   to no single document, passed through untouched.
 */
export const assetPathSchema = z
  .string()
  .min(1)
  .refine((value) => !value.startsWith("./") && !value.includes("\\"), {
    message: "Use a bare filename or a site-absolute path — no `./` prefix, no backslashes",
  });

/**
 * What makes a photograph evidence rather than a picture.
 *
 * Photography Direction §24.4: an image with no retained original is not
 * publishable, and the archive records what it shows, where, when, by whom and
 * with what permission. The Provenance gate at `npm run check:publication`
 * refuses anything short of all four.
 *
 * Optional here because it is *authored* when a real photograph enters the
 * library — not because it is optional to publish.
 */
export const provenanceSchema = z.object({
  /** Where it was taken. A named place, not a region. */
  place: z.string().min(1),
  /** ISO date of capture. */
  capturedOn: z.iso.date(),
  photographer: z.string().min(1),
  /** Reference to the permission held for this frame. */
  permission: z.string().min(1),
});

/** Photography Direction §5 — what a frame may be asked to prove. */
export const evidenceRankSchema = z.enum(["E1", "E2", "E3", "E4", "E5", "E6"]);

/**
 * Documentary Storyboard §7 — the canonical chapter set. Master Implementation
 * Blueprint R15.4: every object carries the chapter it belongs to, which is
 * what keeps the content structure identical to the story structure.
 *
 * A chapter is a fact about the photograph — what was happening when it was
 * taken — so it is recorded with the frame, not assigned by a layout.
 */
export const chapterSchema = z.enum([
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
  "C10",
]);

/**
 * What a content document writes when it wants a photograph: which frame, and
 * nothing else.
 *
 * MIB R15.2: *one image, one record, referenced everywhere.* Everything that
 * describes the frame — its size, its caption, where and when it was taken —
 * belongs to the frame, in `src/content/images.json`, because holding it on
 * each referencing object produces the same photograph described differently in
 * three places (and is the only way Photography Direction §22.4's single
 * canonical crop can be enforced by the system rather than by discipline).
 */
export const imageRefSchema = z.object({
  src: assetPathSchema,
});

/**
 * One frame's record: everything that makes a photograph evidence rather than
 * a picture. This is the Image object of MIB §15.1, held once.
 */
export const imageRecordSchema = z.object({
  /**
   * Intrinsic dimensions, **measured from the file** by `npm run images:record`
   * and never typed. An image whose size is unknown cannot be shown to reach
   * the evidence threshold (VDS §30.2), and `ContentImage` renders nothing
   * without them.
   */
  width: z.int().positive().optional(),
  height: z.int().positive().optional(),
  /**
   * Documentary Storyboard §13.6 and UX Blueprint R49.5: alternative text is
   * the caption — a place, a material, a state, a date — because there are no
   * decorative images in this system.
   */
  alt: z.string().default(""),
  /** The specification shown beneath the frame (VDS §12.2, Documentary §13.6). */
  caption: z.string().optional(),
  provenance: provenanceSchema.optional(),
  evidenceRank: evidenceRankSchema.optional(),
  chapter: chapterSchema.optional(),
});

/** The library: every frame the site may reference, by its site-absolute path. */
export const imageLibrarySchema = z.record(z.string(), imageRecordSchema);

/**
 * A photograph as a surface receives it: the reference, resolved, with its
 * record merged on. Components never see the two halves separately.
 */
export const imageSchema = imageRefSchema.extend(imageRecordSchema.shape);

/** Ordering hint for hand-curated sequences. Lower sorts first. */
export const orderSchema = z.number().default(0);

export const publishStatusSchema = z.enum(["draft", "published"]).default("published");

export type Image = z.infer<typeof imageSchema>;
export type ImageRef = z.infer<typeof imageRefSchema>;
export type ImageRecord = z.infer<typeof imageRecordSchema>;
export type ImageLibrary = z.infer<typeof imageLibrarySchema>;
export type Provenance = z.infer<typeof provenanceSchema>;
export type EvidenceRank = z.infer<typeof evidenceRankSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type PublishStatus = z.infer<typeof publishStatusSchema>;
