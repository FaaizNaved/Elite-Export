import { z } from "zod";
import { sectionIntroSchema, statBlockSchema } from "./blocks";
import { imageSchema } from "./primitives";

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

/**
 * Home page copy.
 *
 * The home page is a composition of other content — categories, products,
 * testimonials all come from the catalog. Only the connective copy lives here,
 * which is why it is a validated data module rather than an MDX document.
 */
export const homeContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string().optional(),
    heading: z.string().min(1),
    description: z.string().min(1),
    image: imageSchema,
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema.optional(),
  }),
  intro: sectionIntroSchema.extend({
    body: z.string().min(1),
    image: imageSchema,
    stats: z.array(statBlockSchema).default([]),
  }),
  /** Section headings, keyed by the section they introduce. */
  sections: z.record(z.string(), sectionIntroSchema),
  cta: sectionIntroSchema.extend({
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema.optional(),
    image: imageSchema.optional(),
  }),
});

export type HomeContent = z.infer<typeof homeContentSchema>;
