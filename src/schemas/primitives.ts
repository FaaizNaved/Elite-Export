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

/** Site-relative asset path, e.g. `/images/products/western-tack/...` */
export const assetPathSchema = z
  .string()
  .startsWith("/", "Asset paths are site-relative and must start with `/`");

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
