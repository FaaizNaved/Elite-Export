import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Vertical rhythm, expressed as the three break sizes — Visual Design System
 * §23.1. There are three, and they mean different things:
 *
 *   section  96 / 64    two passages of one argument       → S5
 *   chapter  192 / 96   two chapters, a change of subject  → S6
 *   held     ≥ 1vh      nothing. It is the moment itself   → S7
 *
 * The chapter break is exactly twice the section break, which is the minimum
 * at which a reader distinguishes "new part of this" from "new thing" without
 * counting. The three ranks already carry those numbers in the token source,
 * so nothing here is typed.
 *
 * Two things this component used to offer are gone:
 *
 * - **Textures.** §14.5 sets the threshold at zero: no paper grain, no leather
 *   emboss, no noise layer. A simulated material is a false claim about matter
 *   from a company that makes the real one.
 * - **A `hero` spacing that cleared a fixed header.** The header has not been
 *   fixed since the navigation package; §37.1 says it leaves with the field.
 */
const sectionVariants = cva("relative w-full", {
  variants: {
    break: {
      /** Two passages of one argument. */
      section: "py-s5",
      /** Two chapters — a change of subject. */
      chapter: "py-s6",
      /** The section sets its own space, or inherits its parent's. */
      none: "",
    },
    /**
     * §16.1: the inverted field is the strongest chapter marker available and
     * is therefore rationed to **at most once per surface**, with a minimum
     * extent of one viewport height (§23.6). A short inverted band is a
     * decorative stripe.
     */
    tone: {
      paper: "",
      ink: "bg-ink text-paper",
      /** §36.3, the one permitted container: binds a specification into one object. */
      recessed: "bg-recessed",
    },
  },
  defaultVariants: { break: "section", tone: "paper" },
});

export interface SectionProps
  extends Omit<ComponentPropsWithoutRef<"section">, "color">,
    VariantProps<typeof sectionVariants> {
  as?: ElementType;
}

export function Section({
  as: Component = "section",
  break: breakSize,
  tone,
  className,
  ...props
}: SectionProps) {
  return (
    <Component className={cn(sectionVariants({ break: breakSize, tone }), className)} {...props} />
  );
}
