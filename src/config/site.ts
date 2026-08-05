import type { Image } from "../types";
import { company } from "./company";

/**
 * Site-level identity and SEO defaults.
 *
 * Deliberately does not restate company facts — names and the tagline are
 * derived from `./company`, which stays the single source of truth for them.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliteexport.com").replace(
  /\/+$/,
  "",
);

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
  /** Appended to page titles: "One Ear Headstall | Elite Export". */
  titleSeparator: "|",
  description:
    "Elite Export manufactures premium equestrian tack, leather bags and accessories for international buyers, with full OEM and ODM capability.",
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
