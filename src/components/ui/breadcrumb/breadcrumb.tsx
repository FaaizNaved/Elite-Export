import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Breadcrumb as BreadcrumbItem } from "@/types";

export interface BreadcrumbProps {
  /** Built by `buildBreadcrumbs()` and friends in `src/lib/breadcrumbs.ts`. */
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * The breadcrumb — Master Implementation Blueprint §11.1, UX Blueprint R38.4.
 *
 * **Products only** — category, sub-category, product record. It is the one
 * component the Visual Design System removed generally (§41: five destinations
 * do not need a trail) and the UX Blueprint reinstated for one hierarchy, and
 * MIB §11 dependencies say it "must not be generalised".
 *
 * R38.5: it states position; it is not a second navigation. It shows the route
 * up and nothing else.
 *
 * The separator is a solidus rather than a glyph. §43.3 closes the icon list at
 * four and the arrow is scoped to pagination direction; §43.2 forbids an icon
 * as a substitute for a mark that a character already carries.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-c">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-x-2">
            {index > 0 && (
              <span aria-hidden className="text-ink-secondary">
                /
              </span>
            )}
            {item.current ? (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-ink-secondary underline decoration-1 underline-offset-1",
                  "motion-mark hover:decoration-2",
                  /*
                   * §47.5: the minimum interactive target is 44 × 44px, and
                   * below roughly that, error rates rise sharply for anyone
                   * whose hands are not steady. The trail is four adjacent
                   * targets at a caption-rank line box of 19px, which is the
                   * exact case the rule is written for — so each link is given
                   * the height, and the text sits in the middle of it.
                   */
                  "inline-flex min-h-11 items-center",
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
