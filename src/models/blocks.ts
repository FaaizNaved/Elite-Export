import { z } from "zod";
import { imageSchema } from "./primitives";

/**
 * Structured blocks that editorial pages can declare in their frontmatter.
 *
 * Long-form prose lives in the MDX body; a process sequence is data. Every
 * block is optional, so a page renders exactly the sections it declares and no
 * page needs bespoke code.
 *
 * The stat, feature and milestone blocks were removed with the components that
 * rendered them (Master Implementation Blueprint §14.1: statistic panel, card
 * grid, and a timeline that is not in the closed inventory). A content shape
 * whose only renderer cannot exist is an invitation to rebuild the renderer.
 */

export const stepBlockSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: imageSchema.optional(),
});

/** Heading group that introduces a section. Used by every composed page. */
export const sectionIntroSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  description: z.string().optional(),
});

/** Mixed into every editorial page schema. */
export const pageBlocksSchema = z.object({
  /** Numbered sequence — manufacturing stages, quality gates. */
  steps: z.array(stepBlockSchema).default([]),
});

export type SectionIntro = z.infer<typeof sectionIntroSchema>;
export type StepBlock = z.infer<typeof stepBlockSchema>;
export type PageBlocks = z.infer<typeof pageBlocksSchema>;
