import { Eyebrow, Passage, Statement } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

/**
 * The section header — Master Implementation Blueprint §11.1.
 *
 * "To name a chapter or a passage within one. Where a chapter or a passage
 * begins." And, critically, when it disappears: **"where a photograph or an
 * inversion has already marked the change — a heading and a structural opening
 * are not both needed"** (VDS §9.2, §22.2).
 *
 * Three things the previous implementation offered are gone, each by name:
 *
 * - **Centred alignment.** §10.4: nothing is centred except under §28.4, and
 *   "it is a heading" is not an argument.
 * - **A `scale` prop.** §9.2 assigns ranks to roles; a section heading is T2.
 *   Choosing a visual size independently of the level is how a surface ends up
 *   with six things at one size.
 * - **An `action` slot.** §35.2: once per surface, after the argument. A header
 *   is before the argument by definition, and R39.4 forbids it mid-surface.
 *
 * §22.2's heading rule is the spacing, and it is a ratio rather than a value:
 * the space above a heading is at least twice the space below it, and at T1 and
 * D at least three times. At T2 that is S5 above and S3 below.
 */
export interface SectionHeaderProps {
  heading: string;
  /**
   * §12.3 — a location in the structure: a chapter name, a section name, a
   * date. Never a category label, a teaser, a claim or a benefit. **At most one
   * eyebrow per surface**, which is the surface's discipline, not this
   * component's.
   */
  eyebrow?: string;
  description?: string;
  /** Sections inside a surface are `h2`; passages within one are `h3`. */
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeader({
  heading,
  eyebrow,
  description,
  as = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* The eyebrow belongs to the heading beneath it — S1 (§12.3). */}
      {eyebrow && <Eyebrow className="mb-s1">{eyebrow}</Eyebrow>}

      <Statement rank={as === "h2" ? "t2" : "t3"} as={as}>
        {heading}
      </Statement>

      {/* Below the heading: S3, against the S5 above the group (§22.2, 3:1). */}
      {description && <Passage className="mt-s3 text-ink-secondary">{description}</Passage>}
    </div>
  );
}
