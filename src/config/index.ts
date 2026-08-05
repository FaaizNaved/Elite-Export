/**
 * Configuration — the singleton business facts the whole site derives from.
 *
 * One file per concern, each the sole authority for it:
 *   company    — who the business is
 *   site       — site identity, URL and SEO defaults
 *   navigation — the authored menu structure
 *
 * There is deliberately no `theme` module: design tokens live in
 * `src/app/globals.css`, and a TypeScript copy would be a second source of truth.
 */
export { company } from "./company";
export { mainNav, footerNav } from "./navigation";
export { IMAGE_BASE_URL, siteConfig, SITE_URL } from "./site";
export type { SiteConfig } from "./site";
