import { z } from "zod";
import { imageSchema, orderSchema, publishStatusSchema } from "./primitives";
import { seoSchema } from "./seo";

/**
 * Shape of `category.json` and `subcategory.json`.
 *
 * Both levels share one schema — a subcategory is a category that has a parent.
 * Slugs come from the folder name, so they are not repeated here.
 */
export const categoryMetaSchema = z.strictObject({
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().optional(),
  /** Wide banner for the category landing page. */
  hero: imageSchema.optional(),
  /** Square-ish image for category cards and the mega menu. */
  thumbnail: imageSchema,
  featured: z.boolean().default(false),
  order: orderSchema,
  status: publishStatusSchema,
  seo: seoSchema.optional(),
});

export type CategoryMeta = z.infer<typeof categoryMetaSchema>;
