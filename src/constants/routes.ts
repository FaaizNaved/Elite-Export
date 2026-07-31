import { joinPath } from "../utils/slug";

/**
 * Every static route in one place. Nothing else in the codebase should contain
 * a hardcoded path string — that is what makes a URL change a one-file edit.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  manufacturing: "/manufacturing",
  technology: "/technology",
  products: "/products",
  quality: "/quality",
  gallery: "/gallery",
  exportCapabilities: "/export",
  blog: "/blog",
  buyerEnquiry: "/buyer-enquiry",
  contact: "/contact",
  legal: "/legal",
} as const;

export type StaticRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Builders for content-driven routes. Segments are already slugs. */
export const routeTo = {
  category: (category: string) => joinPath(ROUTES.products, category),
  subcategory: (category: string, subcategory: string) =>
    joinPath(ROUTES.products, category, subcategory),
  product: (category: string, subcategory: string, product: string) =>
    joinPath(ROUTES.products, category, subcategory, product),
  machine: (slug: string) => joinPath(ROUTES.technology, slug),
  blogPost: (slug: string) => joinPath(ROUTES.blog, slug),
  legalPage: (slug: string) => joinPath(ROUTES.legal, slug),
  /** Company pages are top-level: `about.mdx` → `/about`. */
  companyPage: (slug: string) => joinPath(slug),
} as const;
