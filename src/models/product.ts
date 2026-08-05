import { z } from "zod";
import { imageSchema, orderSchema, publishStatusSchema, slugSchema } from "./primitives";
import { seoSchema } from "./seo";

/** A single row in the product specification table. `group` renders as a section heading. */
export const productSpecificationSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  group: z.string().optional(),
});

/**
 * Features accept either a bare string (`- Hand-stitched edges`) or a full object.
 * Strings are widened to the object form so consumers only handle one shape.
 */
export const productFeatureSchema = z.union([
  z.string().min(1).transform((title) => ({ title, description: undefined, icon: undefined })),
  z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    /** lucide-react icon name, resolved by the UI layer. */
    icon: z.string().optional(),
  }),
]);

export const productGallerySchema = z.object({
  /** Used in cards, grids and mega-menu previews. */
  thumbnail: imageSchema,
  /** Detail-page gallery. The thumbnail is not implicitly included. */
  images: z.array(imageSchema).default([]),
});

/**
 * Product MDX frontmatter.
 *
 * Category and subcategory are deliberately absent: they are derived from the
 * file's location under `src/content/products/<category>/<subcategory>/`, so
 * they can never drift out of sync with the folder hierarchy that drives routing.
 */
export const productFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  /** Optional override; defaults to the filename. */
  slug: slugSchema.optional(),
  itemCode: z.string().min(1),
  shortDescription: z.string().min(1),
  material: z.string().optional(),
  colors: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  features: z.array(productFeatureSchema).default([]),
  specifications: z.array(productSpecificationSchema).default([]),
  gallery: productGallerySchema,
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: orderSchema,
  status: publishStatusSchema,
  updatedAt: z.coerce.date().optional(),
  seo: seoSchema.optional(),
});

export type ProductSpecification = z.infer<typeof productSpecificationSchema>;
export type ProductFeature = z.infer<typeof productFeatureSchema>;
export type ProductGallery = z.infer<typeof productGallerySchema>;
export type ProductFrontmatter = z.infer<typeof productFrontmatterSchema>;
