import { z } from "zod";
import { publishStatusSchema } from "./primitives";
import { seoSchema } from "./seo";

export const legalPageFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  summary: z.string().optional(),
  /** Surfaced as "Last updated" — required, because stale legal copy is a liability. */
  updatedAt: z.coerce.date(),
  status: publishStatusSchema,
  seo: seoSchema.optional(),
});

export type LegalPageFrontmatter = z.infer<typeof legalPageFrontmatterSchema>;
