import { cn } from "@/lib/cn";

/**
 * The four marks — Visual Design System §43.3, "Fixed, and the list is closed."
 *
 * An icon exists only where no word is available that is both short enough and
 * unambiguous, and where the mark has been in continuous use long enough to be
 * read without instruction. Four qualify:
 *
 *   index / close   the small-field navigation control, and its dismissal
 *   plus / minus    the accordion state marker
 *   external        beside a link leaving the site
 *   arrow           pagination direction only, always beside a word or numeral
 *
 * A fifth requires an amendment to that document (§34.3).
 *
 * They are drawn here rather than imported, and the reason is §43.1's second
 * argument, which is about Ownership rather than style: **icon sets are
 * bought.** Every icon library available to us is available to every
 * competitor, so anything drawn from one fails the Factory Test on sight. That
 * is also why `lucide-react` is no longer a dependency of this project.
 *
 * §43.4 fixes how they are drawn: line only, open ends, **no fill and no
 * rounding of joins or caps** — our materials meet at cut edges (§16.5).
 * Stroke 1.25–1.5px, matched to the stem weight of the sans at the same size,
 * because the icon is punctuation in a sentence of type. Size is the cap
 * height of the text it accompanies and never larger: an enlarged icon claims
 * a level it does not have. Colour matches its text exactly.
 */

export type MarkName = "index" | "close" | "plus" | "minus" | "external" | "arrow";

export interface MarkProps {
  name: MarkName;
  /**
   * Accessible name. Leave undefined where a word already labels the control —
   * §43.2 forbids an icon as the *only* label, so a mark with no name here
   * must sit beside one.
   */
  label?: string;
  /** Rotates the arrow. Direction is the one meaning a glyph carries precisely. */
  direction?: "left" | "right";
  className?: string;
}

/**
 * A 16-unit box on the 4px grid (§43.4). Sized in `em` so the mark is the cap
 * height of whatever text it accompanies and cannot be set independently.
 */
const paths: Record<MarkName, string> = {
  /** Three rules. The index of a surface, drawn as its lines. */
  index: "M2 5h12M2 8h12M2 11h12",
  /** Two rules crossed at the same weight. Open ends, cut corners. */
  close: "M3.5 3.5l9 9M12.5 3.5l-9 9",
  plus: "M8 3v10M3 8h10",
  minus: "M3 8h10",
  /** An arrow leaving a box whose near corner is open, because it is a route out. */
  external: "M6.5 3H3v10h10V9.5M9 3h4v4M13 3l-5.5 5.5",
  arrow: "M3 8h10M9 4l4 4-4 4",
};

export function Mark({ name, label, direction = "right", className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn(
        "inline-block shrink-0 self-center",
        // The cap height of the accompanying text, and never larger (§43.4).
        "h-[0.72em] w-[0.72em]",
        name === "arrow" && direction === "left" && "rotate-180",
        className,
      )}
    >
      <path
        d={paths[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        // §43.4: no rounding of joins or caps. Our materials meet at cut edges.
        strokeLinecap="butt"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
