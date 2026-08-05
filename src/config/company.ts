import { companyProfileSchema } from "../models";
import type { CompanyProfile } from "../types";

/**
 * The company itself — the authoritative record of who the business is.
 *
 * This is the one place legal name, contact details, social links,
 * certifications and export markets are defined. Nothing else in the codebase
 * may restate them; derive from here instead.
 *
 * Parsed at module load, so a typo fails the build rather than a page.
 */
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
