import { companyProfileSchema } from "../schemas";
import type { CompanyProfile, Image } from "../types";

/**
 * The single file a non-developer edits when the business details change.
 * Everything on the site — footer, contact page, metadata, emails — reads from here.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliteexport.com").replace(
  /\/+$/,
  "",
);

/** Parsed at module load: a typo in the company profile fails fast, at build time. */
export const company: CompanyProfile = companyProfileSchema.parse({
  legalName: "Elite Export Pvt. Ltd.",
  tradingName: "Elite Export",
  tagline: "Hand-crafted leather goods, engineered for export.",
  foundedYear: 1998,
  employees: "250+",
  contact: {
    email: "info@eliteexport.com",
    salesEmail: "sales@eliteexport.com",
    phone: "+91 581 000 0000",
    whatsapp: "+91 90000 00000",
    address: {
      street: "Industrial Estate, Phase II",
      city: "Kanpur",
      state: "Uttar Pradesh",
      postalCode: "208012",
      country: "India",
      countryCode: "IN",
    },
    businessHours: "Mon – Sat, 9:00 – 18:00 IST",
  },
  social: [
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/" },
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  ],
  certifications: [
    { name: "ISO 9001:2015", issuer: "Bureau Veritas", year: 2021 },
    { name: "Leather Working Group — Gold", issuer: "LWG", year: 2023 },
  ],
  exportMarkets: ["US", "GB", "DE", "FR", "AU", "AE", "CA", "IT"],
});

export const defaultOgImage: Image = {
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
  company,
} as const;

export type SiteConfig = typeof siteConfig;
