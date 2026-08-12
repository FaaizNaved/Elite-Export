import { governedFacts, isPublishable } from "./facts-register";

/**
 * The dependency register.
 *
 * Master Implementation Blueprint §20.2 collects, in one place, everything the
 * build cannot start or cannot finish without. This module is that table held
 * as live state rather than as prose, for the reason R20.5 gives:
 *
 *   > A dependency silently resolved is a surface that could have been
 *   > finished weeks earlier; a dependency silently unresolved is a launch that
 *   > fails at the last gate.
 *
 * Two things follow from holding it here instead of in a document.
 *
 * The first is R7.1. Before this module the register was restated in every
 * milestone entry of the implementation log, and the restatements had already
 * disagreed with each other about item 18. A rule expressed twice is two rules,
 * and one of them gets amended alone.
 *
 * The second is R16.5: a gate failure is stated to the person who can fix it.
 * Each row names the gates that stay red while it is outstanding, so a report
 * can turn a list of findings into a list of client actions.
 *
 * Traces to: MIB §20 (R20.1 the three classes, R20.2 the register, R20.3 the
 * root, R20.5 currency, R20.6 written discharge); §16 (R16.5); Brand Bible §19.
 */

/** MIB R20.1 — the class decides whether work stops or continues. */
export type DependencyClass = "blocking" | "gating" | "soft";

/**
 * R20.6 — no dependency is discharged verbally.
 *
 * "The client confirmed on a call" is not a discharge (Brand Bible §19.3
 * requires written confirmation). The shape demands the document, so a verbal
 * discharge is not expressible here — which is the same technique the design
 * system uses for a forbidden value (VDS §49).
 */
export interface Discharge {
  /** The written record, named. */
  readonly document: string;
  /** What that record says, in enough words to be checked without opening it. */
  readonly evidence: string;
}

export interface Dependency {
  /** The row number at MIB §20.2, which is how every document refers to it. */
  readonly id: number;
  readonly title: string;
  readonly owner: string;
  readonly dependencyClass: DependencyClass;
  /** What cannot proceed, in §20.2's words. */
  readonly blocks: string;
  /** What the build does meanwhile, in §20.2's words. R20.4: never an invention. */
  readonly whileOutstanding: string;
  /**
   * The publication gates (MIB §16.2) that cannot pass until this is answered.
   * Empty where the dependency blocks work rather than publication.
   */
  readonly gates: readonly string[];
  /** Present only with written evidence. Absent means outstanding. */
  readonly discharge?: Discharge;
}

/**
 * MIB §20.2, in the schedule's order. The classes, the blocking statements and
 * the while-outstanding behaviours are quoted from that table rather than
 * re-derived; if §20 is amended these change with it and nowhere else.
 */
export const dependencies: readonly Dependency[] = [
  {
    id: 1,
    title: "Access to a working shift",
    owner: "Client",
    dependencyClass: "blocking",
    blocks:
      "The entire photography library; Home, Manufacturing, Quality, Gallery at publication",
    whileOutstanding:
      "Surfaces are designed around the absence of images. Never around placeholders",
    gates: ["provenance", "record", "threshold", "placeholder", "chapter"],
  },
  {
    id: 2,
    title: "Confirmation of the company name",
    owner: "Client",
    dependencyClass: "blocking",
    blocks: "Every surface; the legal record; the logotype",
    whileOutstanding: "Nothing is published carrying a name that may be wrong",
    gates: ["register"],
  },
  {
    id: 3,
    title: "The Facts Register items at Brand Bible §19.4",
    owner: "Client",
    dependencyClass: "gating",
    blocks:
      "Machine attributes, Quality figures, Export terms and markets, product quantities",
    whileOutstanding:
      "Every REGISTER field is withheld; surfaces stand on mechanism instead",
    gates: ["register", "testimony"],
  },
  {
    id: 4,
    title: "Whether a rejection can be observed",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "Quality's Recognition moment",
    whileOutstanding: "Quality carries C2 and C8 only, and says so honestly",
    gates: [],
  },
  {
    id: 5,
    title: "Written consent process for individuals",
    owner: "Client",
    dependencyClass: "blocking",
    blocks: "Every named person; the Person object",
    whileOutstanding: "No person appears, named or unnamed, in any image",
    gates: ["consent"],
  },
  {
    id: 6,
    title: "Written permission for buyers' products",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "Finished-work imagery on Products and Gallery",
    whileOutstanding: "Only work the company may show is shown",
    gates: [],
  },
  {
    id: 7,
    title: "Certificates: issuer, reference, date, scope",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "Every certification record",
    whileOutstanding: "Quality states mechanism; no marks appear",
    gates: ["certification", "register"],
  },
  {
    id: 8,
    title: "Country confirmation — markets actually shipped to",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "Export's market records",
    whileOutstanding: "Export states process; no markets are named",
    gates: ["register"],
  },
  {
    id: 9,
    title: "Machine verification — what each machine is and does",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "Machine records' attributes",
    whileOutstanding:
      "Records state the operation and what it makes repeatable, nothing more",
    gates: [],
  },
  {
    id: 10,
    title: "Whether a reply time is operationally guaranteed",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "The stated next step at Enquiry",
    whileOutstanding:
      "The surface states who reads it and what happens, without a time",
    gates: ["register"],
  },
  {
    id: 11,
    title: "Whether saddles are in scope",
    owner: "Client",
    dependencyClass: "gating",
    blocks: "The product hierarchy's shape",
    whileOutstanding: "Category structure is not finalised",
    gates: ["category"],
  },
  {
    id: 12,
    title: "Copy, authored under Brand Bible §11–§12",
    owner: "Client / copywriter",
    dependencyClass: "blocking",
    blocks: "Every surface it belongs to",
    whileOutstanding: "The surface is not built with stand-in text (R6.4)",
    gates: ["register"],
  },
  {
    id: 13,
    title: "Typeface licensing, in perpetuity, with tabular figures",
    owner: "Client",
    dependencyClass: "blocking",
    blocks: "Stage 0; every surface",
    whileOutstanding:
      "Stage 0 cannot be completed; the roles are fixed and the faces are not (VDS §51.3 item 6)",
    gates: [],
  },
  {
    id: 14,
    title: "The logotype decision",
    owner: "Creative Director",
    dependencyClass: "soft",
    blocks: "Navigation and the footer record",
    whileOutstanding:
      "The company name set in the serif is the mark (VDS §44.3); nothing else is needed",
    gates: [],
  },
  {
    id: 15,
    title: "The evidence threshold's second derivation",
    owner: "Creative Director, after the first shoot",
    dependencyClass: "gating",
    blocks: "The Threshold gate's final value",
    whileOutstanding:
      "The Calibrated value stands; it is re-derived before Stage 1 publishes",
    gates: ["threshold"],
  },
  {
    id: 16,
    title: "Functional-hue verification against a real photograph",
    owner: "Creative Director",
    dependencyClass: "soft",
    blocks: "Nothing structural",
    whileOutstanding: "The Calibrated values stand",
    gates: [],
  },
  {
    id: 17,
    title: "The five primary navigation destinations",
    owner: "Approver",
    dependencyClass: "blocking",
    blocks: "Stage 0 navigation",
    whileOutstanding: "Navigation is not built to a guess (UX Blueprint R53.2 item 14)",
    gates: [],
    discharge: {
      document: "UX Blueprint v1.1 R37.2, approved",
      evidence:
        "The five destinations are named in an approved document: Manufacturing, Products, Quality, Export, About. Asserted in check:content.",
    },
  },
  {
    id: 18,
    title: "Acceptance that nothing is gated, and that individuals are not tracked",
    owner: "Client",
    dependencyClass: "blocking",
    blocks: "Enquiry; measurement; the privacy surface",
    whileOutstanding:
      "Neither is built provisionally, because both are architecture rather than settings",
    gates: [],
    discharge: {
      document: "UX Blueprint v1.1 R53.2 items 9 and 11, approved",
      evidence:
        "Both are approval-checklist lines in a document that has been approved, which is the written confirmation R20.6 requires. Measurement remains unbuilt for an independent reason: it is not among the Stage 0 contents at R8.3.",
    },
  },
  {
    id: 19,
    title: "The archive, with retained originals",
    owner: "Client / picture editor",
    dependencyClass: "blocking",
    blocks: "Every image",
    whileOutstanding: "No image publishes without provenance",
    gates: ["provenance", "crop"],
  },
  {
    id: 20,
    title: "The reply process — a named person who answers",
    owner: "Client",
    dependencyClass: "blocking",
    blocks: "Enquiry",
    whileOutstanding: "A form that submits into nothing fails the brand's central promise",
    gates: ["register"],
  },
  {
    id: 21,
    title: "Distribution of all eight documents to every builder",
    owner: "Project owner",
    dependencyClass: "blocking",
    blocks: "The whole build",
    whileOutstanding: "A builder without the documents will interpret, and R2.1 forbids it",
    gates: [],
    discharge: {
      document: "docs/brand/ in this repository",
      evidence:
        "All eight approved documents are in the tree every builder clones. Asserted in check:content, so a deletion fails the build rather than being noticed later.",
    },
  },
] as const;

/** The eight documents item 21 is discharged against, in authority order. */
export const approvedDocuments: readonly string[] = [
  "brand-bible.md",
  "creative-direction-book.md",
  "documentary-storyboard.md",
  "photography-direction.md",
  "visual-language-atlas.md",
  "motion-direction.md",
  "visual-design-system.md",
  "ux-blueprint.md",
] as const;

export const isOutstanding = (dependency: Dependency): boolean =>
  dependency.discharge === undefined;

export function outstanding(): Dependency[] {
  return dependencies.filter(isOutstanding);
}

/**
 * The outstanding dependencies holding a gate red (R16.5). A gate no
 * dependency names is the build's own to fix, and the report says so.
 */
export function holdingGate(gateId: string): Dependency[] {
  return outstanding().filter((dependency) => dependency.gates.includes(gateId));
}

/**
 * Dependency 3's live state: it is discharged fact by fact rather than at once,
 * and the Facts Register already holds each classification (Brand Bible §19.4).
 * Reading it from there rather than restating a count is R7.1.
 */
export function unconfirmedFactLabels(): string[] {
  return governedFacts.filter((fact) => !isPublishable(fact)).map((fact) => fact.label);
}

/** R20.1 — the order a report should read them in. */
export const classOrder: readonly DependencyClass[] = ["blocking", "gating", "soft"] as const;
