import { z } from "zod";
import { imageSchema } from "./primitives";

/**
 * Structured blocks that editorial pages can declare in their frontmatter.
 *
 * Long-form prose lives in the MDX body; anything the design renders as a
 * component — a stats band, a process sequence, a timeline — is data. Every
 * block is optional, so a page renders exactly the sections it declares and no
 * page needs bespoke code.
 */

export const statBlockSchema = z.object({
  value: z.number(),
  label: z.string().min(1),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  decimals: z.int().min(0).max(2).default(0),
  /** Counts up on scroll. Turn off for years and other literal figures. */
  animate: z.boolean().default(true),
  /** Key from the icon registry in `src/components/icons`. */
  icon: z.string().optional(),
});

export const stepBlockSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: imageSchema.optional(),
});

export const featureBlockSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

export const milestoneBlockSchema = z.object({
  /** Year, stage number or date — whatever anchors the entry. */
  marker: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
});

/** Heading group that introduces a section. Used by every composed page. */
export const sectionIntroSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  description: z.string().optional(),
});

/** Mixed into every editorial page schema. */
export const pageBlocksSchema = z.object({
  stats: z.array(statBlockSchema).default([]),
  /** Numbered sequence — manufacturing stages, quality gates. */
  steps: z.array(stepBlockSchema).default([]),
  features: z.array(featureBlockSchema).default([]),
  milestones: z.array(milestoneBlockSchema).default([]),
});

export type SectionIntro = z.infer<typeof sectionIntroSchema>;
export type StatBlock = z.infer<typeof statBlockSchema>;
export type StepBlock = z.infer<typeof stepBlockSchema>;
export type FeatureBlock = z.infer<typeof featureBlockSchema>;
export type MilestoneBlock = z.infer<typeof milestoneBlockSchema>;
export type PageBlocks = z.infer<typeof pageBlocksSchema>;
