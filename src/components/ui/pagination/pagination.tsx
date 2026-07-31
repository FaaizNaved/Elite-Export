import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "../icon/icon";

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

const itemClasses =
  "inline-flex size-10 items-center justify-center rounded-button font-sans text-small transition-fast";

export function Pagination({
  page,
  totalPages,
  createHref,
  siblings = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = getPageRange(page, totalPages, siblings);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
      <PaginationArrow
        href={createHref(page - 1)}
        label="Previous page"
        disabled={!hasPrevious}
        icon="previous"
      />

      {range.map((entry, index) =>
        entry === ELLIPSIS ? (
          <span
            key={`gap-${index}`}
            aria-hidden
            className={cn(itemClasses, "text-foreground-muted")}
          >
            {ELLIPSIS}
          </span>
        ) : (
          <Link
            key={entry}
            href={createHref(entry)}
            aria-label={`Page ${entry}`}
            aria-current={entry === page ? "page" : undefined}
            className={cn(
              itemClasses,
              entry === page
                ? "bg-primary text-primary-foreground"
                : "text-foreground-secondary hover:bg-surface-sunken hover:text-foreground",
            )}
          >
            {entry}
          </Link>
        ),
      )}

      <PaginationArrow
        href={createHref(page + 1)}
        label="Next page"
        disabled={!hasNext}
        icon="next"
      />
    </nav>
  );
}

function PaginationArrow({
  href,
  label,
  disabled,
  icon,
}: {
  href: string;
  label: string;
  disabled: boolean;
  icon: "previous" | "next";
}) {
  const content = <Icon icon={icon === "previous" ? ChevronLeft : ChevronRight} size="sm" />;

  // A disabled control must not be a link — screen readers and crawlers would
  // both follow it. Render inert markup instead.
  if (disabled) {
    return (
      <span aria-hidden className={cn(itemClasses, "text-foreground-muted opacity-40")}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(itemClasses, "text-foreground-secondary hover:bg-surface-sunken hover:text-foreground")}
    >
      {content}
    </Link>
  );
}
