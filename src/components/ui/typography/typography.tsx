import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * The three text element types, and nothing else.
 *
 * Visual Design System §34.2 fixes the complete vocabulary at six element
 * types — photograph, statement, passage, record, action, mark. Three of them
 * are text, and they are the three components in this file. There is no
 * general-purpose "Typography" here on purpose: a component with a free
 * `variant` prop lets a caller set a statement in the sans, and §8.4 states
 * that the two faces have **no shared territory**.
 *
 *   Serif → statements, chapter openings, pull quotes, and nothing else.
 *   Sans  → everything else, without exception.
 *
 * So the voice is not a prop. It follows from which element type you are
 * writing, which is the only decision a caller should be making.
 *
 * Every size is a rank from §9.2 (D T1 T2 T3 B R C) drawn from the token
 * source in `globals.css`. No component sets a font size.
 */

/* -------------------------------------------------------------------------- */
/* Statement — the company speaking                                            */
/* -------------------------------------------------------------------------- */

const statementVariants = cva(
  [
    // §10.4 flush left, ragged right. §10.6 no hyphenation in a statement:
    // a broken word is a visible mechanism.
    "text-left text-balance hyphens-none",
    /*
     * §10.1's measure table gives the two display ranks their own limit:
     * "Statement (D, T1) — up to 3 lines, ≤75% of field." The cap is applied
     * from the reading breakpoint upwards, because below it the field is
     * narrower than the measure the rule is protecting against and three
     * quarters of it would break a headline into fragments — the second of the
     * two failures §10.1 names.
     */
    // §8.5: there is no bold serif. A bold statement is a raised voice.
    "font-regular",
  ],
  {
    variants: {
      rank: {
        /**
         * D is a register, not a level (§9.3). At most once per surface, never
         * on a surface whose purpose is a record. Nothing in code can check
         * "once per surface"; the Action gate in `check:publication` is the
         * model for when that becomes enforceable.
         */
        d: "font-serif text-d reading:max-w-[75%]",
        /** Surface title, chapter opening. */
        t1: "font-serif text-t1 reading:max-w-[75%]",
        /** Section heading. */
        t2: "font-serif text-t2",
        /**
         * Passage heading — and the one rank whose voice is chosen by content
         * (§9.5). §9.4: T3 does not exist below 720px, where its content
         * becomes T2. That is expressed here rather than left to a caller.
         */
        t3: "text-t2 reading:text-t3",
      },
      voice: {
        serif: "font-serif",
        sans: "font-sans font-medium",
      },
    },
    defaultVariants: { rank: "t2", voice: "serif" },
  },
);

type StatementRank = NonNullable<VariantProps<typeof statementVariants>["rank"]>;

const statementElement: Record<StatementRank, ElementType> = {
  d: "h1",
  t1: "h1",
  t2: "h2",
  t3: "h3",
};

export interface StatementProps
  extends Omit<ComponentPropsWithoutRef<"h2">, "color">,
    VariantProps<typeof statementVariants> {
  as?: ElementType;
}

export function Statement({ as, rank = "t2", voice, className, ...props }: StatementProps) {
  const Component = as ?? statementElement[rank ?? "t2"];

  return (
    <Component
      className={cn(
        statementVariants({ rank, voice: rank === "t3" ? (voice ?? "serif") : "serif" }),
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Passage — the argument                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Body text at rank B, held at the measure §10.1 fixes: 60–72 characters,
 * target 66, which at 18px is the 640px reading column. The measure is on the
 * paragraph rather than on the field, because a field may be wider than the
 * text it carries and a line longer than 75 characters loses the return sweep.
 *
 * §10.3: paragraphs are separated by space, never by indent — 24px at body
 * size. No first-line indent, no drop cap, no first-paragraph special case.
 */
export interface PassageProps extends ComponentPropsWithoutRef<"p"> {
  as?: ElementType;
  /** Let the field set the width, where the field *is* the reading column. */
  measure?: boolean;
}

export function Passage({
  as: Component = "p",
  measure = true,
  className,
  ...props
}: PassageProps) {
  return (
    <Component
      className={cn(
        "font-sans text-b text-left text-pretty",
        measure && "max-w-reading",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Record — a checkable fact                                                   */
/* -------------------------------------------------------------------------- */

const recordVariants = cva("font-sans text-left", {
  variants: {
    rank: {
      /** Specifications, tables, meta, interface. §10.1: measure 45–65 characters. */
      r: "text-r",
      /** Caption, eyebrow, legal — the floor. */
      c: "text-c",
    },
    tone: {
      primary: "text-ink",
      /** It annotates; it does not compete (§12.2). */
      secondary: "text-ink-secondary",
    },
    weight: {
      regular: "font-regular",
      /** Labels, table headers, the one word that must be found (§8.5). */
      medium: "font-medium",
      /** Reserved: a table's total row, an error's first word (§8.5). */
      bold: "font-bold",
    },
  },
  defaultVariants: { rank: "r", tone: "primary", weight: "regular" },
});

export interface RecordProps
  extends Omit<ComponentPropsWithoutRef<"p">, "color">,
    VariantProps<typeof recordVariants> {
  as?: ElementType;
}

export function Record({ as: Component = "p", rank, tone, weight, className, ...props }: RecordProps) {
  return (
    <Component className={cn(recordVariants({ rank, tone, weight }), className)} {...props} />
  );
}

/**
 * The eyebrow — §12.3, bounded to near-extinction.
 *
 * It exists for one purpose: to state *where you are*, on a surface a visitor
 * may have arrived at directly. Its content is a location in the structure — a
 * chapter name, a section name, a date. Never a category label, a teaser, a
 * claim, a benefit, or a word like "Featured" or "Why us".
 *
 * **At most one per surface.** More than one and they become a second
 * navigation system duplicating the real one.
 */
export function Eyebrow({ className, ...props }: Omit<RecordProps, "rank" | "tone" | "weight">) {
  return (
    <Record
      rank="c"
      tone="secondary"
      weight="medium"
      className={cn("tracking-eyebrow uppercase", className)}
      {...props}
    />
  );
}

/**
 * The caption — §12.2. A specification label: a place, a material, a state, a
 * date (Documentary Storyboard §13.6).
 *
 * Rank C, secondary, below the image and flush with its left edge, S2 from it,
 * and **never wider than the image it annotates** (§10.1 — the sharpest of the
 * measure rules). A caption never overlays an image: text on a photograph
 * obscures evidence, and the image was made to be examined.
 *
 * Not exported for general use — every evidential image gets one through
 * `ImageRecord`, which is where the mandatory pairing is enforced.
 */
export function Caption({ className, ...props }: Omit<RecordProps, "rank" | "tone" | "weight">) {
  return <Record rank="c" tone="secondary" className={cn("max-w-annotation", className)} {...props} />;
}
