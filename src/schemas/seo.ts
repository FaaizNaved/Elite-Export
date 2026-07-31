import { z } from "zod";
import { imageSchema } from "./primitives";

/**
 * Per-document SEO overrides. Every field is optional: `src/lib/seo.ts` merges
 * these over the site-wide defaults in `src/config/site.ts`.
 */
export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  /** Site-relative canonical path. Defaults to the document's own route. */
  canonical: z.string().optional(),
  /** Social share image. Falls back to the document hero, then the site default. */
  image: imageSchema.optional(),
  noIndex: z.boolean().default(false),
});

export const openGraphTypeSchema = z.enum(["website", "article", "profile"]).default("website");

export type Seo = z.infer<typeof seoSchema>;
export type OpenGraphType = z.infer<typeof openGraphTypeSchema>;
