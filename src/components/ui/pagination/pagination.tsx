import Link from "next/link";
import { cn } from "@/lib/cn";
import { Mark } from "../icon";

export interface PaginationProps {
  page: number;
  totalPages: number;
  /** Builds the href for a page number — keeps this component route-agnostic. */
  createHref: (page: number) => string;
  /** Page numbers shown either side of the current page. */
  siblings?: number;
  className?: string;
}

const ELLIPSIS = "…" as const;

/**
 * Page numbers to render: always the first and last page, plus a window around
 * the current one, with gaps collapsed to an ellipsis.
 */
export function getPageRange(page: number, totalPages: number, siblings = 1): Array<number | "…"> {
  const pages = new Set<number>([1, totalPages]);

  for (let offset = -siblings; offset <= siblings; offset += 1) {
    const candidate = page + offset;
    if (candidate >= 1 && candidate <= totalPages) pages.add(candidate);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const range: Array<number | "…"> = [];

  sorted.forEach((value, index) => {
    const previous = sorted[index - 1];
    if (previous !== undefined && value - previous > 1) range.push(ELLIPSIS);
    range.push(value);
  });

  return range;
}

/**
 * Pagination — Master Implementation Blueprint §13.1, Visual Design System
 * §40.5: "to state where a reader is in a finite set. Where a record set
 * exceeds what one surface can carry at threshold." Never as infinite scroll.
 *
 * Two rules changed this component:
 *
 * - **§43.3** scopes the arrow to "pagination direction only, **always beside a
 *   word or a numeral**." An arrow alone in a 40px box is an icon carrying a
 *   control's entire meaning, which §43.2 forbids. Previous and next are now
 *   words with the mark beside them.
 * - **§38.5** removes the dimmed control: "a control the visitor cannot use is
 *   not shown dimmed. It is not shown." On the first page there is no previous.
 *
 * The current page is stated, not filled: §16.2 has no surface for a control
 * and §16.5 has no radius, so what marks it is the one instrument left —
 * weight, plus `aria-current`.
 */
const itemClasses = "inline-flex min-h-11 items-center justify-center px-2 font-sans text-r";

export function Pagination({
  page,
  totalPages,
  createHref,
  siblings = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = getPageRange(page, totalPages, siblings);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center gap-x-s2 gap-y-s1", className)}
    >
      {page > 1 && (
        <Link href={createHref(page - 1)} className={cn(itemClasses, "gap-1 text-ink-secondary")}>
          <Mark name="arrow" direction="left" />
          Previous
        </Link>
      )}

      {range.map((entry, index) =>
        entry === ELLIPSIS ? (
          <span key={`gap-${index}`} aria-hidden className={cn(itemClasses, "text-ink-secondary")}>
            {ELLIPSIS}
          </span>
        ) : entry === page ? (
          <span key={entry} aria-current="page" className={cn(itemClasses, "font-medium text-ink")}>
            {entry}
          </span>
        ) : (
          <Link
            key={entry}
            href={createHref(entry)}
            aria-label={`Page ${entry}`}
            className={cn(
              itemClasses,
              "text-ink-secondary underline decoration-1 underline-offset-1",
              "motion-mark hover:decoration-2",
            )}
          >
            {entry}
          </Link>
        ),
      )}

      {page < totalPages && (
        <Link href={createHref(page + 1)} className={cn(itemClasses, "gap-1 text-ink-secondary")}>
          Next
          <Mark name="arrow" />
        </Link>
      )}
    </nav>
  );
}
