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

export const imageSchema = z.object({
  src: assetPathSchema,
  /** Empty is allowed at authoring time; loaders backfill it from the parent entity's title. */
  alt: z.string().default(""),
  width: z.int().positive().optional(),
  height: z.int().positive().optional(),
  caption: z.string().optional(),
});

/** Ordering hint for hand-curated sequences. Lower sorts first. */
export const orderSchema = z.number().default(0);

export const publishStatusSchema = z.enum(["draft", "published"]).default("published");

export type Image = z.infer<typeof imageSchema>;
export type PublishStatus = z.infer<typeof publishStatusSchema>;
