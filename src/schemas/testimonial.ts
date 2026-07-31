import { z } from "zod";
import { imageSchema, orderSchema, slugSchema } from "./primitives";

export const testimonialSchema = z.object({
  id: slugSchema,
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  /** ISO 3166-1 alpha-2, for flag rendering. */
  countryCode: z.string().length(2).optional(),
  avatar: imageSchema.optional(),
  rating: z.int().min(1).max(5).optional(),
  featured: z.boolean().default(false),
  order: orderSchema,
});

export const testimonialCollectionSchema = z.array(testimonialSchema);

export type Testimonial = z.infer<typeof testimonialSchema>;
