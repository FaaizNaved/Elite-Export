/**
 * SEO, split by responsibility:
 *   url      — absolute URL resolution
 *   metadata — Next.js `Metadata` objects
 *   schema   — JSON-LD structured data
 *
 * There is no separate `canonical`, `open-graph`, `robots` or `sitemap` module:
 * canonical and Open Graph are a handful of fields inside one metadata object,
 * and robots/sitemap are Next file conventions that already live in `src/app`.
 */
export { absoluteUrl } from "./url";
export {
  blogPostMetadata,
  buildMetadata,
  buildRootMetadata,
  categoryMetadata,
  companyPageMetadata,
  legalPageMetadata,
  machineMetadata,
  productMetadata,
} from "./metadata";
export type { MetadataInput } from "./metadata";
export { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, productJsonLd } from "./schema";
export type { JsonLd } from "./schema";
