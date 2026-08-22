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
 *
 * ─────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER DATA — awaiting the client. Replace here and nowhere else.
 *
 *   contact.phone       dialling code is right, the number is not
 *   contact.whatsapp    invented digits
 *   contact.email       domain does not match the trading name
 *   contact.salesEmail  same
 *   contact.address     street and postcode unconfirmed
 *   social[].href       every link points at a bare platform root
 *
 * Everything else on this object is real: the legal name, the founding year,
 * both certifications with their issuers and years, and the export markets.
 * Those are quoted verbatim across the site, so do not edit them to make a
 * layout work.
 *
 * Nothing outside this file contains a contact string — verified by grep for
 * "+91", the mail domain and the postcode. Swapping in the real details is a
 * one-file change.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const company: CompanyProfile = companyProfileSchema.parse({
  legalName: "New Elite Exports Pvt. Ltd.",
  tradingName: "New Elite Exports",
  tagline: "Hand-crafted leather goods, engineered for export.",
  foundedYear: 1998,
  contact: {
    email: "info@eliteexport.com",
    salesEmail: "sales@eliteexport.com",
    // 512 is Kanpur. This read 581, which is Bareilly — a wrong-city dialling
    // code on a manufacturer whose whole proposition is where it makes things.
    // The subscriber digits stay obviously blank rather than invented.
    phone: "+91 512 000 0000",
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
