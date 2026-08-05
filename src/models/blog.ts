import { z } from "zod";
import { imageSchema, publishStatusSchema, slugSchema } from "./primitives";
import { seoSchema } from "./seo";

export const blogPostFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  slug: slugSchema.optional(),
  excerpt: z.string().min(1),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().min(1),
  cover: imageSchema,
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  /** Rough reading time in minutes; computed by the loader when omitted. */
  readingTime: z.int().positive().optional(),
  status: publishStatusSchema,
  seo: seoSchema.optional(),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;
