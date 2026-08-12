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
  journal: "/journal",
  /**
   * One door. UX Blueprint R25.2: a "contact" surface and an "enquiry" surface
   * are two doors, and Brand Bible §3.4 permits one. `/contact` and
   * `/buyer-enquiry` both continue to resolve here — R29.2: addresses are
   * permanent, and a broken link sent to a colleague is a failure of
   * Repeatability in the only place the buyer can see it.
   */
  enquiry: "/enquiry",
  legal: "/legal",
} as const;

/** Builders for content-driven routes. Segments are already slugs. */
export const routeTo = {
  category: (category: string) => joinPath(ROUTES.products, category),
  subcategory: (category: string, subcategory: string) =>
    joinPath(ROUTES.products, category, subcategory),
  product: (category: string, subcategory: string, product: string) =>
    joinPath(ROUTES.products, category, subcategory, product),
  machine: (slug: string) => joinPath(ROUTES.technology, slug),
  article: (slug: string) => joinPath(ROUTES.journal, slug),
  legalPage: (slug: string) => joinPath(ROUTES.legal, slug),
  /** Company pages are top-level: `about.mdx` → `/about`. */
  companyPage: (slug: string) => joinPath(slug),
} as const;
