import { z } from "zod";
import { orderSchema, publishStatusSchema, slugSchema } from "./primitives";
import { productGallerySchema, productSpecificationSchema } from "./product";
import { seoSchema } from "./seo";

/** Where a machine sits in the production line. Drives grouping on /technology. */
export const productionStageSchema = z.enum([
  "cutting",
  "preparation",
  "stitching",
  "finishing",
  "quality",
  "packing",
]);

/**
 * Machine MDX frontmatter — `src/content/machines/<slug>.mdx`.
 *
 * Specifications and gallery reuse the product schemas rather than redefining
 * near-identical shapes.
 */
export const machineFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  slug: slugSchema.optional(),
  shortDescription: z.string().min(1),
  manufacturer: z.string().optional(),
  origin: z.string().optional(),
  stage: productionStageSchema,
  /** e.g. "1,200 pieces per shift". */
  capacity: z.string().optional(),
  specifications: z.array(productSpecificationSchema).default([]),
  /** What this machine is used to produce. */
  applications: z.array(z.string()).default([]),
  gallery: productGallerySchema,
  featured: z.boolean().default(false),
  order: orderSchema,
  status: publishStatusSchema,
  updatedAt: z.coerce.date().optional(),
  seo: seoSchema.optional(),
});

export type ProductionStage = z.infer<typeof productionStageSchema>;
export type MachineFrontmatter = z.infer<typeof machineFrontmatterSchema>;
