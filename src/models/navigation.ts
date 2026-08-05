import { z } from "zod";
import { imageSchema } from "./primitives";

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  description: z.string().optional(),
  /** Renders with target=_blank + rel=noopener. */
  external: z.boolean().default(false),
});

/**
 * A top-level navbar entry.
 *
 * `megaMenu` marks the entry as a slot the navigation builder fills from the
 * product catalog at runtime — so adding a category never requires editing
 * navigation data. `children` covers simple hand-authored dropdowns.
 */
export const navItemSchema = navLinkSchema.extend({
  megaMenu: z.enum(["products"]).optional(),
  children: z.array(navLinkSchema).default([]),
});

/** A resolved mega-menu column: one product category and its subcategories. */
export const megaMenuColumnSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  links: z.array(navLinkSchema),
});

export const megaMenuSchema = z.object({
  columns: z.array(megaMenuColumnSchema),
  /** Optional promoted item rendered alongside the columns. */
  feature: z
    .object({
      label: z.string().min(1),
      href: z.string().min(1),
      description: z.string().optional(),
      image: imageSchema,
    })
    .optional(),
});

export const breadcrumbSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  /** True for the last crumb — rendered as text, not a link. */
  current: z.boolean().default(false),
});

export type NavLink = z.infer<typeof navLinkSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type MegaMenuColumn = z.infer<typeof megaMenuColumnSchema>;
export type MegaMenu = z.infer<typeof megaMenuSchema>;
export type Breadcrumb = z.infer<typeof breadcrumbSchema>;
