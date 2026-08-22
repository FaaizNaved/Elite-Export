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

/**
 * `home/company.json` — §2, the house.
 *
 * `body` is optional because the house section earns its place by *not*
 * explaining itself. The paragraph that used to live here restated the hero
 * almost word for word — Kanpur, 1998, cut/stitched/finished, our own facility
 * — so the one section on the page with a person in it was also the only one
 * carrying no new information. A photograph and a line is the whole section.
 */
export const homeCompanySchema = sectionIntroSchema.extend({
  body: z.string().min(1).optional(),
  image: imageSchema,
});

/** `home/pause.json` — §5. Silent by default; a label is a specification, not a caption. */
export const homePauseSchema = z.object({
  image: imageSchema,
  label: z.string().optional(),
});

/**
 * `statement.json` — the close, on every page.
 *
 * Replaced the closing sales banner. Pages now end on one sentence and the
 * place the work is done, which is the last thing a buyer should be left
 * holding. Deliberately has no CTA field: the moment a heading like this
 * carries a button it stops being a statement and goes back to being an
 * advertisement.
 *
 * Site-level content, but rendered by the home page alone. It was briefly in
 * the root layout so every route ended identically — which made the ending
 * furniture rather than a moment. Interior pages close on their own subject
 * instead: manufacturing on packed goods, technology on a press, about on a
 * person.
 */
export const homeStatementSchema = z.object({
  statement: z.string().min(1),
  /** The place, set as a signature — "Kanpur, India". */
  caption: z.string().min(1),
});

/** Section files that carry only a heading group. */
export const homeSectionSchema = sectionIntroSchema;

/** The assembled document. */
export const homeContentSchema = z.object({
  hero: homeHeroSchema,
  intro: homeCompanySchema,
  pause: homePauseSchema,
  sections: z.record(z.string(), homeSectionSchema),
});

export type HomeHero = z.infer<typeof homeHeroSchema>;
export type HomeCompany = z.infer<typeof homeCompanySchema>;
export type HomePause = z.infer<typeof homePauseSchema>;
export type HomeStatement = z.infer<typeof homeStatementSchema>;
export type HomeSection = z.infer<typeof homeSectionSchema>;
export type HomeContent = z.infer<typeof homeContentSchema>;
