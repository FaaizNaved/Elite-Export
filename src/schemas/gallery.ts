import { z } from "zod";
import { imageSchema, orderSchema, publishStatusSchema } from "./primitives";

/**
 * Shape of `src/content/gallery/<album>/album.json`.
 *
 * Albums group the photo wall — factory, machinery, products, packaging,
 * events. The slug comes from the folder name.
 */
export const galleryAlbumSchema = z.strictObject({
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  cover: imageSchema,
  images: z.array(imageSchema).min(1),
  featured: z.boolean().default(false),
  order: orderSchema,
  status: publishStatusSchema,
});

export type GalleryAlbumMeta = z.infer<typeof galleryAlbumSchema>;
