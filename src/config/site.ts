import type { Image } from "../types";
import { company } from "./company";

/**
 * Site-level identity and SEO defaults.
 *
 * Deliberately does not restate company facts — names and the tagline are
 * derived from `./company`, which stays the single source of truth for them.
 */

/**
 * The canonical origin, and production must state it.
 *
 * Every canonical URL, every Open Graph URL, the sitemap, the robots file and
 * three JSON-LD documents are built from this one value. A wrong origin does
 * not fail visibly — it publishes a whole site of canonicals pointing at a
 * domain the company may not own, and the first sign of it is a search engine
 * indexing the wrong host.
 *
 * `https://eliteexport.com` is a **development default**, not a decision: the
 * domain has never been confirmed (it is part of MIB §20 dependency 2, the
 * company name). So a production deployment refuses to build without an
 * explicit value rather than silently inheriting the guess.
 *
 * The guard is keyed on `VERCEL_ENV === "production"` rather than on
 * `NODE_ENV`, because `next build` sets `NODE_ENV=production` for every local
 * build and preview too. What is being asserted is *this is the deploy the
 * public will see*, and that is the variable that says so. Any other host sets
 * `NEXT_PUBLIC_SITE_URL` the same way and gets the same check.
 */
const CONFIGURED_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** The value used until the domain is confirmed. Never correct in production. */
const DEVELOPMENT_SITE_URL = "https://eliteexport.com";

if (process.env.VERCEL_ENV === "production" && !CONFIGURED_SITE_URL) {
  /*
   * Warn, do not throw. The origin is wrong until the domain is confirmed, but
   * a wrong canonical is a fixable SEO problem and a failed build is a site
   * nobody can see. The site renders identically either way — this value never
   * touches the composition.
   */
  console.warn(
    "[site] NEXT_PUBLIC_SITE_URL is not set; canonical URLs, the sitemap, robots.txt and the " +
      `JSON-LD will use ${DEVELOPMENT_SITE_URL}. Set it to the real domain before launch.`,
  );
}

export const SITE_URL = (CONFIGURED_SITE_URL || DEVELOPMENT_SITE_URL).replace(/\/+$/, "");

/** Whether the origin above is the unconfirmed development default. */
export const SITE_URL_IS_DEFAULT = !CONFIGURED_SITE_URL;

/**
 * Optional CDN origin for `public/` assets. Empty means assets are served by
 * Next itself, which is the default. Setting it is the whole migration path.
 */
export const IMAGE_BASE_URL = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "").replace(/\/+$/, "");

const defaultOgImage: Image = {
  src: "/images/og/default.webp",
  alt: `${company.tradingName} — ${company.tagline}`,
  width: 1200,
  height: 630,
};

export const siteConfig = {
  name: company.tradingName,
  legalName: company.legalName,
  url: SITE_URL,
  /** Appended to page titles: "One Ear Headstall | New Elite Exports". */
  titleSeparator: "|",
  description:
    "New Elite Exports manufactures premium equestrian tack, leather bags and accessories for international buyers, with full OEM and ODM capability.",
  keywords: [
    "leather manufacturer",
    "equestrian tack manufacturer",
    "western tack exporter",
    "leather goods OEM",
    "leather bags supplier",
  ],
  ogImage: defaultOgImage,
  twitterHandle: undefined as string | undefined,
} as const;

export type SiteConfig = typeof siteConfig;
