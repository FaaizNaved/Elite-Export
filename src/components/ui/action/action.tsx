import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Mark } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants";

/**
 * Action and link — Visual Design System §35, UX Blueprint §39.
 *
 * There is **one primary action for the entire site** (R39.1): send us the
 * specification, the drawing or the sample. It leads to Enquiry and to nothing
 * else. R13.2 is the rule this file exists to make unbreakable — "a component
 * that renders the action must not accept a per-surface label; making that
 * configurable is how five variants appear by launch" — so `Action` takes no
 * label, no href, no variant and no size.
 *
 * §35.2 also removes the rest of a normal button API: there is no secondary
 * button, and no outlined, ghost, tinted or text button. "Each is a button
 * pretending to be less than a button, which is a hierarchy problem solved by
 * decoration rather than by deciding." Where a lesser action is genuinely
 * needed it is a `TextLink`, and where a next step is needed it is a
 * `Continuation`.
 */

/**
 * The act, named. R39.1 states it; Brand Bible §11.1 and §12 own the wording,
 * so it lives here as one value rather than at seven call sites (MIB R6.4 —
 * copy is not the build's to write, but the build must not scatter it either).
 */
export const SITE_ACTION_LABEL = "Send us the specification";

export type ActionProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

/**
 * §35.2's form, in one place. A solid Ink rectangle, exported so the Enquiry
 * surface's own submit control is the same object as the site's action rather
 * than a second one that looks like it. Nothing else may use it: a second
 * element wearing this is a second door (§35.2, Brand Bible §3.4).
 */
export const actionClassName = cn(
  "inline-flex w-fit items-center justify-center",
  "bg-ink px-6 py-[0.875rem] text-paper",
  "font-sans text-r font-medium leading-5",
  /* §42.5: one property changes on hover, and nothing moves. */
  "motion-mark hover:bg-ink-secondary",
  /* §38.5: no dimmed control. `disabled` only stops a second send (R47.2). */
  "disabled:pointer-events-none",
);

/**
 * Where it appears is R39.3 and is the surface's decision — once, at the close,
 * after the argument. Where it must never appear is R39.4: beside evidence,
 * during a held moment, mid-chapter, more than once, in navigation, or on
 * Technology, Gallery, Journal and every system surface. The Action gate in
 * `check:publication` enforces that; this component cannot.
 *
 * §35.2, fixed: a solid Ink rectangle with Paper text and corner radius zero.
 * No border, no shadow, no gradient — §16.3 and §16.4 leave none of the three
 * expressible. Sans at rank R, medium, sentence case, because it is interface
 * and interface is the record voice (§8.4). Height 48px from 14px vertical
 * padding on a 20px line box, which clears the 44px touch target (§47.5), and
 * 24px horizontal padding is S3 binding the label into a group. Width fits the
 * label: a stretched button is a band, and a band is decoration.
 */
export function Action({ className, ...props }: ActionProps) {
  return (
    <Link
      href={ROUTES.enquiry}
      className={cn(actionClassName, className)}
      {...props}
    >
      {SITE_ACTION_LABEL}
    </Link>
  );
}

/**
 * The link — §35.3. The mechanism of Evidence: a claim a stranger can check.
 *
 * In prose it is Ink text with a 1px underline at 1px offset, thickening to
 * 2px on hover and changing nothing else. An underline in this system means a
 * link and nothing else (§11.2). There is no visited state: the brand does not
 * record where a buyer has been on its own site, visually or otherwise.
 */
export interface TextLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  /**
   * Leaving the site is a fact about where the reader is going, so it is
   * marked with the one permitted glyph (§43.3).
   */
  external?: boolean;
  children: ReactNode;
}

export function TextLink({ external = false, className, children, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "text-ink underline decoration-1 underline-offset-1",
        "motion-mark hover:decoration-2",
        external && "inline-flex items-baseline gap-1",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
      {external && <Mark name="external" />}
    </Link>
  );
}

/**
 * The continuation — R39.2, MIB §13.1. "There is one secondary action, and it
 * is a link rather than a demand: continue to the next chapter." It is not a
 * conversion, is never styled or counted as one, and exists because every
 * surface ends knowing what comes next.
 *
 * It disappears on Journal, which ends in space (R24.3).
 */
export interface ContinuationProps {
  href: string;
  /** What comes next, named. The surface supplies it; this component does not. */
  children: ReactNode;
  className?: string;
}

export function Continuation({ href, children, className }: ContinuationProps) {
  return (
    <TextLink
      href={href}
      className={cn(
        "font-sans text-r",
        /*
         * A continuation is a standing target rather than a word inside a
         * sentence, so two rules apply that do not apply to a link in prose.
         *
         * §35.3: it is a link, and a link is the size of its label. As a flex
         * child it would otherwise stretch to the field and carry an underline
         * the full width of the surface, which is a band.
         *
         * §47.5: the minimum interactive target is 44 × 44px, because below
         * roughly that, error rates rise sharply for anyone whose hands are not
         * steady. The label's own line box is 22px, so the target is set to 44
         * and the text sits in the middle of it.
         */
        "inline-flex w-fit min-h-11 items-center self-start",
        className,
      )}
    >
      {children}
    </TextLink>
  );
}
