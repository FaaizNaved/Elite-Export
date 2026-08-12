import { factById, findGovernedFacts, isPublishable } from "./facts-register";

/**
 * The publication gates.
 *
 * Master Implementation Blueprint §16 schedules thirteen gates and states the
 * rule that governs all of them:
 *
 *   > A gate refuses publication. It does not warn.
 *
 * Each gate below is one row of that schedule, carrying the section it comes
 * from. The gates are pure functions over a snapshot of what is about to be
 * published, so they can be run in CI, run against a proposed change, and —
 * per MIB R9.2 — *tested by attempting to defeat them* rather than by
 * inspection.
 *
 * Nothing here decides what a surface looks like. A gate answers one question:
 * may this be published, or not.
 */

/* ------------------------------------------------------------------ values */

/**
 * The three measurements the gates need. Every one is fixed in the Visual
 * Design System; none is decided here. They are quoted rather than re-derived,
 * and if the VDS is amended these change with it and nowhere else.
 */
export const thresholds = {
  /** VDS §30.2 — an image is evidence at or above 480px on its shorter rendered side. */
  evidenceShorterSide: 480,
  /** VDS §30.3 — below 320px an image is decoration and may not appear at all. */
  decorationShorterSide: 320,
  /** VDS §32.3 — delivered at not less than 2× the largest rendered size. */
  deliveryMultiplier: 2,
} as const;

/** VDS §30.2 + §32.3: the smallest intrinsic shorter side a real asset may have. */
export const minimumIntrinsicShorterSide =
  thresholds.evidenceShorterSide * thresholds.deliveryMultiplier;

/* ------------------------------------------------------------------- shapes */

/**
 * What a photograph must carry to be evidence rather than a picture.
 * Photography Direction §24.4: an image with no retained original is not
 * publishable.
 */
export interface Provenance {
  readonly place?: string;
  /** ISO date of capture. */
  readonly capturedOn?: string;
  readonly photographer?: string;
  /** Reference to the permission held for this frame. */
  readonly permission?: string;
}

export interface ImageRecord {
  /** Where this image is referenced from, for the report. */
  readonly owner: string;
  readonly src: string;
  readonly alt?: string;
  /** Documentary Storyboard §13.6 — a place, a material, a state, a date. */
  readonly caption?: string;
  readonly width?: number;
  readonly height?: number;
  readonly provenance?: Provenance;
  /** Photography Direction §5 — E1…E6. */
  readonly evidenceRank?: string;
}

export interface AssetFile {
  readonly path: string;
  /** True when the placeholder generator produced this file. */
  readonly placeholder: boolean;
}

export interface CategoryRecord {
  readonly slug: string;
  readonly productCount: number;
}

export interface TestimonyRecord {
  readonly id: string;
  readonly quote?: string;
  readonly author?: string;
  readonly role?: string;
  readonly company?: string;
  readonly country?: string;
  readonly permissionOnFile?: boolean;
  readonly date?: string;
}

export interface CertificationRecord {
  readonly id: string;
  readonly issuer?: string;
  readonly reference?: string;
  readonly issuedOn?: string;
  readonly covers?: string;
  readonly excludes?: string;
}

export interface PersonRecord {
  readonly name: string;
  readonly consentOnFile?: boolean;
}

export interface ChapterRecord {
  readonly id: string;
  readonly surface: string;
  /** Documentary Storyboard §25.1 rule 3 — whole, or not at all. */
  readonly told: "whole" | "partial";
}

export interface SurfaceActions {
  readonly surface: string;
  readonly actions: readonly string[];
  /** UX Blueprint §39.3 — surfaces on which the action may never appear. */
  readonly actionForbidden: boolean;
}

export interface TextRecord {
  readonly owner: string;
  readonly text: string;
}

/**
 * A field of a known record that states a governed fact.
 *
 * MIB §16.2's Register gate refuses *any `REGISTER` field not classified
 * Confirmed*. Prose is scanned for the shape of a claim because a figure can
 * appear in any sentence; a record's field needs no scanning — it is known to
 * carry the fact, so it is passed in and read directly.
 */
export interface RegisterField {
  readonly owner: string;
  readonly field: string;
  readonly factId: string;
  /** What would discharge it, in words the owner can answer (R16.5). */
  readonly question: string;
}

export interface SourceHit {
  readonly file: string;
  readonly count: number;
  readonly sample: string;
}

/**
 * Everything about to be published, in the shape the gates need.
 *
 * Deliberately independent of the content engine's own types: the gates must
 * outlive the editing surface (MIB R17.5), so the caller adapts, not the gate.
 * A collection that has no model yet is passed empty — the gate still exists,
 * and it starts refusing the day the model arrives.
 */
export interface Snapshot {
  readonly images: readonly ImageRecord[];
  readonly assets: readonly AssetFile[];
  readonly categories: readonly CategoryRecord[];
  readonly testimonies: readonly TestimonyRecord[];
  readonly certifications: readonly CertificationRecord[];
  readonly people: readonly PersonRecord[];
  readonly chapters: readonly ChapterRecord[];
  readonly surfaces: readonly SurfaceActions[];
  /** Every piece of published prose, for the Register scan. */
  readonly texts: readonly TextRecord[];
  /** Fields of known records that state a governed fact. */
  readonly registerFields: readonly RegisterField[];
  /** Design values found outside the single source (VDS §48.3). */
  readonly strayDesignValues: readonly SourceHit[];
}

export interface Finding {
  readonly gate: string;
  readonly subject: string;
  readonly detail: string;
}

export interface Gate {
  readonly id: string;
  readonly title: string;
  /** The section of the governing document this gate implements. */
  readonly traces: string;
  /** One line: what it refuses. */
  readonly refuses: string;
  run(snapshot: Snapshot): Finding[];
}

const finding = (gate: string, subject: string, detail: string): Finding => ({ gate, subject, detail });

/* -------------------------------------------------------------------- gates */

const register: Gate = {
  id: "register",
  title: "Register",
  traces: "Brand Bible §19.3 · MIB §16.2",
  refuses: "Any fact not classified Confirmed in the Facts Register",
  run: ({ texts, registerFields }) => [
    ...registerFields.flatMap(({ owner, field, factId, question }) => {
      const fact = factById(factId);
      if (fact && isPublishable(fact)) return [];

      return [
        finding(
          "register",
          `${owner}.${field}`,
          fact
            ? `${fact.label} is classified ${fact.classification}, not confirmed — ${question}`
            : `no fact "${factId}" is in the Facts Register, so nothing classifies this field`,
        ),
      ];
    }),
    ...texts.flatMap(({ owner, text }) =>
      findGovernedFacts(text).map((match) =>
        finding(
          "register",
          owner,
          `states "${match.quote}" — ${match.fact.label} is classified ${match.fact.classification}, not confirmed`,
        ),
      ),
    ),
  ],
};

const provenance: Gate = {
  id: "provenance",
  title: "Provenance",
  traces: "Photography Direction §24.4 · MIB §16.2",
  refuses: "Any image without place, date, photographer and permission",
  run: ({ images }) =>
    images.flatMap((image) => {
      const missing = (
        [
          ["place", image.provenance?.place],
          ["capture date", image.provenance?.capturedOn],
          ["photographer", image.provenance?.photographer],
          ["permission", image.provenance?.permission],
        ] as const
      )
        .filter(([, value]) => !value)
        .map(([name]) => name);

      return missing.length
        ? [finding("provenance", `${image.owner} → ${image.src}`, `no ${missing.join(", no ")}`)]
        : [];
    }),
};

const record: Gate = {
  id: "record",
  title: "Record",
  traces: "Documentary Storyboard §13.6 · UX Blueprint R49.5 · MIB §16.2",
  refuses: "Any evidential image without its caption and its alternative text",
  run: ({ images }) =>
    images.flatMap((image) => {
      const problems: string[] = [];
      if (!image.caption?.trim()) problems.push("no caption");
      if (!image.alt?.trim()) problems.push("no alternative text");
      return problems.length
        ? [finding("record", `${image.owner} → ${image.src}`, problems.join(", "))]
        : [];
    }),
};

const threshold: Gate = {
  id: "threshold",
  title: "Threshold",
  traces: "Visual Design System §30.2, §32.3 · MIB §16.2",
  refuses: "Any image that cannot be delivered at the evidence threshold",
  run: ({ images }) =>
    images.flatMap((image) => {
      if (!image.width || !image.height) {
        return [
          finding(
            "threshold",
            `${image.owner} → ${image.src}`,
            "intrinsic size unknown — it cannot be shown to reach the evidence threshold",
          ),
        ];
      }

      const shorter = Math.min(image.width, image.height);
      if (shorter < minimumIntrinsicShorterSide) {
        return [
          finding(
            "threshold",
            `${image.owner} → ${image.src}`,
            `shorter side ${shorter}px, below the ${minimumIntrinsicShorterSide}px needed to render at the ${thresholds.evidenceShorterSide}px threshold at 2× delivery`,
          ),
        ];
      }

      return [];
    }),
};

const crop: Gate = {
  id: "crop",
  title: "Crop",
  traces: "Photography Direction §22.4 · Visual Design System §32.1 · MIB §16.2",
  refuses: "Any image circulating in more than one crop",
  run: ({ images }) => {
    const ratios = new Map<string, Map<string, string[]>>();

    for (const image of images) {
      if (!image.width || !image.height) continue;
      const ratio = (image.width / image.height).toFixed(3);
      const perSrc = ratios.get(image.src) ?? new Map<string, string[]>();
      perSrc.set(ratio, [...(perSrc.get(ratio) ?? []), image.owner]);
      ratios.set(image.src, perSrc);
    }

    return [...ratios].flatMap(([src, perRatio]) =>
      perRatio.size > 1
        ? [
            finding(
              "crop",
              src,
              `two crops in circulation (${[...perRatio.keys()].join(" and ")}) — two crops of one frame are two statements`,
            ),
          ]
        : [],
    );
  },
};

const consent: Gate = {
  id: "consent",
  title: "Consent",
  traces: "Photography Direction §8.5 · MIB §16.2",
  refuses: "Any named person without written consent on file",
  run: ({ people }) =>
    people
      .filter((person) => !person.consentOnFile)
      .map((person) =>
        finding("consent", person.name, "no written consent on file — consent obtained afterwards is not consent"),
      ),
};

const certification: Gate = {
  id: "certification",
  title: "Certification",
  traces: "UX Blueprint R44.1 · MIB §16.2",
  refuses: "Any certification missing issuer, reference or date",
  run: ({ certifications }) =>
    certifications.flatMap((cert) => {
      const missing = (
        [
          ["issuer", cert.issuer],
          ["reference", cert.reference],
          ["date of issue", cert.issuedOn],
          ["what it covers", cert.covers],
          ["what it does not cover", cert.excludes],
        ] as const
      )
        .filter(([, value]) => !value)
        .map(([name]) => name);

      return missing.length
        ? [finding("certification", cert.id, `missing ${missing.join(", ")}`)]
        : [];
    }),
};

const testimony: Gate = {
  id: "testimony",
  title: "Testimony",
  traces: "UX Blueprint R44.4, R44.5 · Brand Bible §19.5 · MIB §16.2",
  refuses: "Any testimony missing any of its seven mandatory fields",
  run: ({ testimonies }) =>
    testimonies.flatMap((item) => {
      const missing = (
        [
          ["exact words", item.quote],
          ["name", item.author],
          ["role", item.role],
          ["company", item.company],
          ["country", item.country],
          ["written permission on file", item.permissionOnFile ? "yes" : ""],
          ["date", item.date],
        ] as const
      )
        .filter(([, value]) => !value)
        .map(([name]) => name);

      return missing.length
        ? [
            finding(
              "testimony",
              item.id,
              `missing ${missing.join(", ")} — zero testimonies outperforms one that is short of them`,
            ),
          ]
        : [];
    }),
};

const category: Gate = {
  id: "category",
  title: "Category",
  traces: "UX Blueprint R19.7 · MIB §16.2",
  refuses: "Any category with fewer than three products",
  run: ({ categories }) =>
    categories
      .filter((item) => item.productCount < 3)
      .map((item) =>
        finding(
          "category",
          item.slug,
          `${item.productCount} product(s) — with fewer than three it is a product, one level up, not a category`,
        ),
      ),
};

const chapter: Gate = {
  id: "chapter",
  title: "Chapter",
  traces: "Documentary Storyboard §25.1 rule 3 · MIB §16.2",
  refuses: "Any partially told chapter",
  run: ({ chapters }) =>
    chapters
      .filter((item) => item.told === "partial")
      .map((item) =>
        finding(
          "chapter",
          `${item.surface} → ${item.id}`,
          "told in part — a chapter is told whole or it is absent; a sequence of highlights is a trailer",
        ),
      ),
};

const placeholder: Gate = {
  id: "placeholder",
  title: "Placeholder",
  traces: "Photography Direction §24.5 · Brand Bible §16.1 · MIB §16.2, R14.4",
  refuses: "Any borrowed, stock, generated or placeholder image, at any stage",
  run: ({ assets }) => {
    const generated = assets.filter((asset) => asset.placeholder);
    if (!generated.length) return [];

    return [
      finding(
        "placeholder",
        `${generated.length} file(s) under public/images`,
        `generated placeholder imagery is present — there is no such thing as a temporary image, and a single one undoes the credibility of everything else (first: ${generated[0].path})`,
      ),
    ];
  },
};

const action: Gate = {
  id: "action",
  title: "Action",
  traces: "UX Blueprint §39.3, §39.4 · Visual Design System §35.2 · MIB §16.2",
  refuses: "More than one action on a surface, or an action where it is forbidden",
  run: ({ surfaces }) =>
    surfaces.flatMap((surface) => {
      if (surface.actionForbidden && surface.actions.length) {
        return [
          finding(
            "action",
            surface.surface,
            `carries an action (${surface.actions.join(", ")}) — this surface may never carry one`,
          ),
        ];
      }
      if (surface.actions.length > 1) {
        return [
          finding(
            "action",
            surface.surface,
            `carries ${surface.actions.length} actions (${surface.actions.join(", ")}) — one action, once`,
          ),
        ];
      }
      return [];
    }),
};

const value: Gate = {
  id: "value",
  title: "Value",
  traces: "Visual Design System §48.3, §49 · MIB §16.2",
  refuses: "Any design value not drawn from the single source",
  run: ({ strayDesignValues }) =>
    strayDesignValues.map((hit) =>
      finding("value", hit.file, `${hit.count} literal design value(s) outside the token source, e.g. ${hit.sample}`),
    ),
};

/** MIB §16.2, in the order the schedule lists them. */
export const gates: readonly Gate[] = [
  register,
  provenance,
  record,
  threshold,
  crop,
  consent,
  certification,
  testimony,
  category,
  chapter,
  placeholder,
  action,
  value,
] as const;

export interface GateResult {
  readonly gate: Gate;
  readonly findings: readonly Finding[];
  readonly passed: boolean;
}

export function runGates(snapshot: Snapshot): GateResult[] {
  return gates.map((gate) => {
    const findings = gate.run(snapshot);
    return { gate, findings, passed: findings.length === 0 };
  });
}

/** An empty snapshot — the base for building one, and for the gate self-test. */
export const emptySnapshot: Snapshot = {
  images: [],
  assets: [],
  categories: [],
  testimonies: [],
  certifications: [],
  people: [],
  chapters: [],
  surfaces: [],
  texts: [],
  registerFields: [],
  strayDesignValues: [],
};
