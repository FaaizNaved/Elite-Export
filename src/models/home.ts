import { z } from "zod";
import { sectionIntroSchema } from "./blocks";
import { imageSchema } from "./primitives";

/**
 * Home page content.
 *
 * One file per section under `src/content/home/`, composed by
 * `getHomeContent()`. Only the connective copy lives here — categories,
 * certifications, export markets and the process stages all come from the
 * content engine and `config/company.ts`.
 *
 * Facts register (blueprint §0): figures are deliberately **not** authored in
 * these files. Anything countable is derived from `config/company.ts` or the
 * catalogue at render time, so an unverified number cannot be introduced by a
 * content edit.
 */

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

/** `home/hero.json` */
export const homeHeroSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  description: z.string().min(1),
  image: imageSchema,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
});

/** `home/company.json` — §2, the house. */
export const homeCompanySchema = sectionIntroSchema.extend({
  body: z.string().min(1),
  image: imageSchema,
});

/** `home/pause.json` — §5. Silent by default; a label is a specification, not a caption. */
export const homePauseSchema = z.object({
  image: imageSchema,
  label: z.string().optional(),
});

/** `home/cta.json` — §9. */
export const homeCtaSchema = sectionIntroSchema.extend({
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
  image: imageSchema.optional(),
  /** Operationally checkable commitments. Three at most; each one is a promise. */
  reassurances: z.array(z.string()).default([]),
});

/** Section files that carry only a heading group. */
export const homeSectionSchema = sectionIntroSchema;

/** The assembled document. */
export const homeContentSchema = z.object({
  hero: homeHeroSchema,
  intro: homeCompanySchema,
  pause: homePauseSchema,
  sections: z.record(z.string(), homeSectionSchema),
  cta: homeCtaSchema,
});

export type HomeHero = z.infer<typeof homeHeroSchema>;
export type HomeCompany = z.infer<typeof homeCompanySchema>;
export type HomePause = z.infer<typeof homePauseSchema>;
export type HomeCta = z.infer<typeof homeCtaSchema>;
export type HomeSection = z.infer<typeof homeSectionSchema>;
export type HomeContent = z.infer<typeof homeContentSchema>;
