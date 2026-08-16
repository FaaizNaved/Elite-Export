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
  legalName: "New Elite Exports Pvt. Ltd.",
  tradingName: "New Elite Exports",
  tagline: "Hand-crafted leather goods, engineered for export.",
  foundedYear: 1998,
  employees: "250+",
  contact: {
    email: "info@eliteexport.com",
    salesEmail: "sales@eliteexport.com",
    /*
     * No telephone, no WhatsApp, and no social links.
     *
     * What stood here was `+91 581 000 0000` and `+91 90000 00000` — numbers
     * whose own digits say they are not numbers — beside three social URLs with
     * no account on the end of them (`linkedin.com/company/`,
     * `instagram.com/`, `facebook.com/`). They were rendered in the colophon,
     * on Enquiry beside the form, and emitted into the Organization JSON-LD as
     * `telephone` and `sameAs`, which is a machine-readable claim about a
     * company published to search engines.
     *
     * Brand Bible §19.2 does not distinguish between a wrong fact and a
     * placeholder standing in for one, and MIB R20.4 fixes what happens while
     * it is outstanding: the mechanism is stated and the fact is withheld. So
     * the fields are absent. They return when the client confirms them in
     * writing, and `check:publication` asks for them by name until then.
     */
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
  social: [],
  certifications: [
    { name: "ISO 9001:2015", issuer: "Bureau Veritas", year: 2021 },
    { name: "Leather Working Group — Gold", issuer: "LWG", year: 2023 },
  ],
  exportMarkets: ["US", "GB", "DE", "FR", "AU", "AE", "CA", "IT"],
  /*
   * Attested in three content documents already — `company/export.mdx`'s
   * summary, the `oem-odm` FAQ, and `config/site.ts`'s description. None of
   * them is the company record, so none of them could be derived from; the
   * home page had a fourth copy typed into it as a literal.
   *
   * Unconfirmed, like every other field here: it is registered as
   * `manufacturing-capability` against dependency 3, and `check:publication`
   * asks for it by name until the client answers in writing.
   */
  capabilities: ["OEM", "ODM"],
});
