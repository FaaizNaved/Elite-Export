import { z } from "zod";

/**
 * Navigation models.
 *
 * What is left here is one object, and the reason is Master Implementation
 * Blueprint R10.3 — **the inventory is closed** — read against §11's structural
 * set: the navigation is *five destinations* declared in `src/config/navigation.ts`,
 * and the footer's index carries the rest (UX Blueprint R37.2, R37.3).
 *
 * The mega menu went with that. `navLinkSchema`, `navItemSchema`,
 * `megaMenuColumnSchema` and `megaMenuSchema` modelled a dropdown built from
 * the catalogue at runtime; the component was removed in the navigation
 * package, `getProductsMegaMenu` was recorded as *having no consumer* in three
 * successive debt tables, and the schemas outlived both. A model with no object
 * in R15.1's map and no consumer in the build is not a model, it is a shape
 * somebody may fill in later — which R15.6 refuses: **structure is not created
 * in advance of content.**
 */

export const breadcrumbSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  /** True for the last crumb — rendered as text, not a link. */
  current: z.boolean().default(false),
});

export type Breadcrumb = z.infer<typeof breadcrumbSchema>;
