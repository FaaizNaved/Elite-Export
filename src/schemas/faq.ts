import { z } from "zod";
import { orderSchema, slugSchema } from "./primitives";

export const faqTopicSchema = z.enum([
  "general",
  "products",
  "manufacturing",
  "ordering",
  "shipping",
  "quality",
]);

export const faqSchema = z.object({
  id: slugSchema,
  question: z.string().min(1),
  /** Plain text or lightweight inline markdown — not MDX. */
  answer: z.string().min(1),
  topic: faqTopicSchema.default("general"),
  order: orderSchema,
});

export const faqCollectionSchema = z.array(faqSchema);

export type FaqTopic = z.infer<typeof faqTopicSchema>;
export type Faq = z.infer<typeof faqSchema>;
