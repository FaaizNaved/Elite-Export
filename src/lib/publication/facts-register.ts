/**
 * The Facts Register.
 *
 * Brand Bible §19 is the most important operational rule in the brand: no
 * number, certification, endorsement or capability claim may be published
 * unless it is traceable to the confirmed company record. Anything unconfirmed
 * is *removed* — not softened, not hedged, not qualified with "approximately".
 *
 * This module is that rule made mechanical. It holds the classification of
 * every governed fact and the vocabulary that betrays one, so that the
 * publication gates can refuse a claim rather than trust that somebody
 * remembered.
 *
 * Traces to: Brand Bible §19.2 (the rule), §19.3 (the classification),
 * §19.4 (what is currently unconfirmed), §19.5 (standing instructions);
 * Master Implementation Blueprint §16 (the Register gate).
 */

/**
 * Brand Bible §19.3. A fact is publishable only when it is `confirmed`.
 *
 * `authored` and `fabricated` are not "not yet confirmed" — they are
 * classifications that can never become publishable without a client
 * confirmation replacing them.
 */
export type Classification = "confirmed" | "config" | "authored" | "fabricated";

/**
 * The written record a confirmation rests on.
 *
 * Brand Bible §19.3 requires written confirmation and Master Implementation
 * Blueprint R20.6 states the consequence without qualification: *"the client
 * confirmed on a call" is not a Register classification.* So a confirmed fact
 * carries the document it came from, and a fact confirmed from memory is not
 * expressible — the same technique the design system uses for a forbidden
 * value (VDS §49).
 *
 * This is the rule §19.1 records the failure of: a fabricated audit body
 * survived a full review of this project because nothing made the source of a
 * claim a required field.
 */
export interface Confirmation {
  /** The written record, named well enough to be retrieved. */
  readonly document: string;
  /** ISO date the confirmation was received. */
  readonly receivedOn: string;
}

export interface GovernedFact {
  /** Stable id, used by content to declare which fact a field carries. */
  readonly id: string;
  /** What the fact is, in the words Brand Bible §19.4 uses. */
  readonly label: string;
  readonly classification: Classification;
  /** Required for `confirmed`, and meaningless on anything else (R20.6). */
  readonly confirmation?: Confirmation;
  /**
   * Words and numbers that indicate this fact is being stated. Matched
   * case-insensitively against published text.
   */
  readonly markers: readonly (string | RegExp)[];
}

/**
 * Brand Bible §19.4 — currently unconfirmed, must not be published.
 *
 * When the client confirms an item **in writing** (§19.3; a verbal
 * confirmation is not a classification — Master Implementation Blueprint
 * R20.6), change its `classification` here and nowhere else, and record the
 * document it came from. That is the single edit that unblocks every surface
 * which needs it, and the `confirmation` is what makes it reviewable.
 */
export const governedFacts: readonly GovernedFact[] = [
  {
    id: "headcount",
    label: "Employee headcount",
    classification: "authored",
    markers: [/\b\d[\d,]*\s+(?:employees|workers|staff|people)\b/i, /\bheadcount\b/i],
  },
  {
    id: "capacity",
    label: "Monthly piece capacity",
    classification: "authored",
    markers: [
      /\b\d[\d,]*\s*(?:\+)?\s*(?:pieces|units)\s*(?:per|\/)\s*(?:month|shift|day|year)\b/i,
      /\bmonthly capacity\b/i,
      /\bannual capacity\b/i,
    ],
  },
  {
    id: "floor-area",
    label: "Floor area",
    classification: "authored",
    markers: [/\b\d[\d,]*\s*(?:sq\.?\s?(?:ft|m)|square (?:feet|metres|meters))\b/i, /\bfloor area\b/i],
  },
  {
    id: "production-lines",
    label: "Number of production lines",
    classification: "authored",
    markers: [/\b\d+\s+production lines?\b/i],
  },
  {
    id: "inspection-gates",
    label: "Number of inspection gates",
    classification: "authored",
    markers: [/\b\d+\s+(?:inspection|quality)\s+(?:gates|checkpoints|checks)\b/i],
  },
  {
    id: "aql",
    label: "AQL band",
    classification: "authored",
    markers: [/\bAQL\b/i],
  },
  {
    id: "rejection-rate",
    label: "Rejection rate",
    classification: "authored",
    markers: [/\brejection rate\b/i, /\b\d+(?:\.\d+)?\s*%\s*(?:rejection|defect)/i],
  },
  {
    id: "moq",
    label: "Minimum order quantity",
    classification: "authored",
    markers: [/\bMOQ\b/i, /\bminimum order\b/i],
  },
  {
    id: "lead-time",
    label: "Sample and bulk lead times",
    classification: "authored",
    markers: [/\blead[- ]time\b/i, /\b\d+\s*(?:-|–|to)\s*\d+\s*(?:days|weeks)\b/i],
  },
  {
    id: "incoterms",
    label: "Incoterms",
    classification: "authored",
    markers: [/\b(?:FOB|CIF|EXW|DDP|DAP|FCA|CFR)\b/],
  },
  {
    id: "machine-specification",
    label: "Machine tonnage, speed and per-shift capacity",
    classification: "authored",
    markers: [
      /\b\d+(?:\.\d+)?\s*(?:tonnes?|tons?|kN)\b/i,
      /\b\d[\d,]*\s*(?:components|pieces)\s*per\s*shift\b/i,
      /\b\d+(?:\.\d+)?\s*kW\b/i,
    ],
  },
  {
    id: "machine-origin",
    label: "Machine manufacturers and countries of origin",
    classification: "authored",
    markers: [],
  },
  /*
   * The company record (MIB §20.2 item 2, Brand Bible §25 item 1).
   *
   * These carry no markers on purpose. The others above are detected by
   * scanning published prose, because a figure can appear in any sentence; an
   * identity fact is a field of a known record, and the Register gate reads
   * that record directly. A marker for "New Elite Exports" would report the same
   * unconfirmed name once per document and bury the eleven items that need an
   * answer under thirty that say the same thing (R16.5).
   */
  {
    id: "company-legal-name",
    label: "Registered legal name",
    classification: "authored",
    markers: [],
  },
  {
    id: "company-trading-name",
    label: "Trading name",
    classification: "authored",
    markers: [],
  },
  {
    id: "company-tagline",
    label: "The tagline — copy, authored under Brand Bible §11–§12",
    classification: "authored",
    markers: [],
  },
  {
    id: "company-founded",
    label: "Year of founding",
    classification: "authored",
    /* Stated in prose, not only as a field — see the note at `export-markets`. */
    markers: [
      /\b(?:since|founded in|established in)\s+(?:1[89]|20)\d{2}\b/i,
      /\b(?:two|three|four|five|six|seven|eight|nine|ten)\s+decades\b/i,
    ],
  },
  {
    id: "company-address",
    label: "The factory's postal address",
    classification: "authored",
    markers: [],
  },
  {
    id: "company-contact",
    label: "Published email and telephone, and who answers them",
    classification: "authored",
    markers: [],
  },
  {
    id: "company-registration",
    label: "Registration identifiers — CIN, GSTIN, IEC",
    classification: "authored",
    markers: [],
  },
  {
    id: "certification",
    label: "Certificates: issuer, reference, date, scope and exclusions",
    classification: "authored",
    markers: [],
  },
  /*
   * Two identity facts that **do** carry markers, against the rule stated
   * above, because prose states them in words rather than as a field.
   *
   * The rule above holds for a name or an address: those are unbounded strings
   * and a marker for them would report the same unconfirmed name once per
   * document (R16.5). A founding year and a market count are different — they
   * appear in sentences, as *"since 1998"* and *"for buyers in eight
   * countries"*, and there the gate was reading the record while the claim sat
   * in the copy beside it. That is Brand Bible §19.1's failure exactly: **a
   * claim survives review because nothing is looking where it lives.**
   *
   * Found while composing About, on Home — a completed surface — in the
   * Opening's eyebrow and description and in C1's annotation.
   */
  {
    id: "export-markets",
    label: "Countries actually shipped to",
    classification: "authored",
    markers: [/\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:countries|markets)\b/i],
  },
  /*
   * The fourth kind of statement §19 governs, and the one the Register did not
   * hold.
   *
   * This module's own opening sentence names it — *no number, certification,
   * endorsement or **capability claim*** — and there was no entry for a
   * capability. So "OEM and ODM" reached the home page's record rail as a
   * string literal, with no field behind it, no dependency answering it and
   * nothing for a gate to look at. It is the same shape as §19.1's failure: a
   * claim survives review because nothing is looking where it lives.
   *
   * `markers` is empty, like every other record field. The capability is
   * stated as a field, not counted out of a sentence, so a marker would report
   * the same unconfirmed claim once per document and bury the items that need
   * an answer (R16.5) — the rule stated above `export-markets`.
   */
  {
    id: "manufacturing-capability",
    label: "Manufacturing capability offered to buyers — OEM, ODM, or both",
    classification: "authored",
    markers: [],
  },
  {
    id: "testimonial",
    label: "All testimonials",
    classification: "authored",
    markers: [],
  },
  /**
   * §19.5: a published promise is an operational commitment. A reply time is
   * unconfirmed as a guarantee (Brand Bible §25 item 6, UX Blueprint §53.1).
   */
  {
    id: "reply-time",
    label: "Stated reply time",
    classification: "authored",
    markers: [/\breply (?:with)?in\b/i, /\bwithin \d+ (?:business )?days\b/i, /\bresponse time\b/i],
  },
] as const;

const byId = new Map(governedFacts.map((fact) => [fact.id, fact]));

export function factById(id: string): GovernedFact | undefined {
  return byId.get(id);
}

/**
 * Brand Bible §19.2 — only a confirmed fact may be published, and R20.6 —
 * only a confirmation with a written record behind it is a confirmation.
 *
 * The second half is what stops the classification from being flipped in a
 * hurry: `confirmed` with no document publishes nothing.
 */
export function isPublishable(fact: GovernedFact): boolean {
  return fact.classification === "confirmed" && fact.confirmation !== undefined;
}

export interface RegisterMatch {
  readonly fact: GovernedFact;
  /** The text that matched, so a report can quote it back to an author. */
  readonly quote: string;
}

/**
 * Finds governed facts being stated in a piece of published text.
 *
 * Deliberately conservative: it matches the *shape* of a claim, so a sentence
 * about the concept ("lead times are agreed per order") that carries no figure
 * still trips the marker and is read by a human. Brand Bible §19.1 records why
 * that trade is correct — plausible manufacturing detail once survived a full
 * review of this project.
 */
export function findGovernedFacts(text: string): RegisterMatch[] {
  const matches: RegisterMatch[] = [];

  for (const fact of governedFacts) {
    if (isPublishable(fact)) continue;

    for (const marker of fact.markers) {
      const found =
        typeof marker === "string"
          ? text.toLowerCase().includes(marker.toLowerCase())
            ? marker
            : null
          : text.match(marker)?.[0];

      if (found) {
        matches.push({ fact, quote: found.trim() });
        break;
      }
    }
  }

  return matches;
}
