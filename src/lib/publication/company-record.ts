import { factById, isPublishable, type GovernedFact } from "./facts-register";

/**
 * The company record, item by item.
 *
 * Dependency 2 at Master Implementation Blueprint §20.2 is *confirmation of the
 * company name*, it is **Blocking**, and while it is outstanding the rule is
 * one line: **nothing is published carrying a name that may be wrong.**
 *
 * The register says that; nothing in the build did. `src/config/company.ts`
 * declares a legal name, an address, a founding year, a headcount, two
 * certifications and eight export markets, and every one of them reaches a
 * surface. Four separate register items are involved — 2 (the name), 3 (the
 * Facts Register at Brand Bible §19.4), 7 (certificates) and 8 (countries) —
 * and they leak into publication through one file.
 *
 * This module is that file classified: for each field of the record, which
 * governed fact it carries, which dependency answers it, and **the question
 * that would discharge it in writing** (R20.6). Nothing here supplies an
 * answer. The classifications live in the Facts Register and change in one
 * place, exactly as R20.6 requires.
 *
 * Traces to: MIB §20.2 items 2, 3, 7, 8; R20.4 (a gating dependency never
 * becomes an invention); R20.6 (written confirmation); R16.5 (stated to the
 * person who can fix it); Brand Bible §19.2, §19.3, §25 item 1.
 */

export interface RecordItem {
  /** The path into `company`, as a builder would write it. */
  readonly field: string;
  /** The governed fact in the Facts Register that this field states. */
  readonly factId: string;
  /** The row at MIB §20.2 that answers it. */
  readonly dependency: number;
  /** What the client is being asked, in words they can answer (R16.5). */
  readonly question: string;
  /** What is currently in the record — quoted back so the answer can correct it. */
  readonly standing: string;
}

/**
 * Every field of `CompanyProfile` that states a fact about the company.
 *
 * `social` and `businessHours` are absent deliberately: a link to a profile and
 * an opening time are not claims of the kind Brand Bible §19 governs. Every
 * other field is here, and `check:content` refuses a record field that is not.
 */
export const companyRecord: readonly RecordItem[] = [
  {
    field: "legalName",
    factId: "company-legal-name",
    dependency: 2,
    question: "What is the registered legal name of the company, exactly as it appears on the certificate of incorporation?",
    standing: "New Elite Exports Pvt. Ltd.",
  },
  {
    field: "tradingName",
    factId: "company-trading-name",
    dependency: 2,
    question: "What name does the company trade under, and is it the name that should appear on the site?",
    standing: "New Elite Exports",
  },
  {
    field: "tagline",
    factId: "company-tagline",
    dependency: 12,
    question: "This is a sentence of brand copy rather than a fact. It is authored under Brand Bible §11–§12 by the copywriter, not confirmed by the client.",
    standing: "Hand-crafted leather goods, engineered for export.",
  },
  {
    field: "foundedYear",
    factId: "company-founded",
    dependency: 2,
    question: "In what year was the company founded? A year that appears on the site is a claim a buyer may check against the register.",
    standing: "1998",
  },
  {
    field: "employees",
    factId: "headcount",
    dependency: 3,
    question: "How many people does the company employ? Brand Bible §19.4 lists headcount as unconfirmed.",
    standing: "250+",
  },
  {
    field: "contact.address",
    factId: "company-address",
    dependency: 2,
    question: "What is the full postal address of the factory? MIB §15.1: a real address, or the Factory record is not published.",
    standing: "Industrial Estate, Phase II, Kanpur, Uttar Pradesh 208012, India",
  },
  {
    field: "contact.email",
    factId: "company-contact",
    dependency: 20,
    question: "Which inbox receives enquiries, and who is the named person who answers it? A form that submits into nothing fails the brand's central promise.",
    standing: "info@eliteexport.com / sales@eliteexport.com",
  },
  {
    field: "contact.phone",
    factId: "company-contact",
    dependency: 20,
    question: "What telephone number should the site publish, and is it answered during the hours stated?",
    standing: "+91 581 000 0000",
  },
  {
    field: "certifications",
    factId: "certification",
    dependency: 7,
    question: "For each certificate: issuer, reference number, date of issue, what it covers, and what it does not cover. Missing any of the five, it is not published.",
    standing: "ISO 9001:2015 (Bureau Veritas, 2021); Leather Working Group — Gold (LWG, 2023)",
  },
  {
    field: "exportMarkets",
    factId: "export-markets",
    dependency: 8,
    question: "Which countries has the company actually shipped to? A market is a record of fact, never an ambition.",
    standing: "US, GB, DE, FR, AU, AE, CA, IT",
  },
  /*
   * Not a field of `CompanyProfile`, and here for exactly that reason.
   *
   * The Enquiry surface's confirmation states a reply time — a published
   * promise, which Brand Bible §19.5 makes an operational commitment and UX
   * R41.8 forbids the site from making on operations' behalf. It is authored in
   * a component rather than in content, so the prose scan never sees it: the
   * Register gate reads content, and `src/components/forms/enquiry-form.tsx` is
   * not content.
   *
   * That is the shape of the failure Brand Bible §19.1 records — a claim that
   * survives review because nothing is looking where it lives. Classifying it
   * here is how the gate is made to look. The sentence is not rewritten: copy
   * is not the build's to author (MIB R6.4), and the answer is dependency 10.
   */
  {
    field: "enquiry.confirmation.replyTime",
    factId: "reply-time",
    dependency: 10,
    question: "Is a reply time operationally guaranteed, and if so what is it? Until it is confirmed the surface states who reads the enquiry and what happens, without a time (R25.4).",
    standing: "\"reply … within three working days\", authored in the enquiry form's success panel",
  },
  {
    field: "registrationIdentifiers",
    factId: "company-registration",
    dependency: 2,
    question: "What are the company's registration identifiers (CIN, GSTIN, IEC)? The legal surface has no field for them and states nothing rather than a blank.",
    standing: "absent from the record",
  },
] as const;

/** The fact behind a record item, or `undefined` if the register has lost it. */
export const factFor = (item: RecordItem): GovernedFact | undefined => factById(item.factId);

/** Items still waiting on a written confirmation (R20.6). */
export function unconfirmedRecordItems(): RecordItem[] {
  return companyRecord.filter((item) => {
    const fact = factFor(item);
    return !fact || !isPublishable(fact);
  });
}
