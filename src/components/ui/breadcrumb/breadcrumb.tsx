import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Breadcrumb as BreadcrumbItem } from "@/types";
import { Icon } from "../icon/icon";

export interface BreadcrumbProps {
  /** Built by `buildBreadcrumbs()` and friends in `src/lib/breadcrumbs.ts`. */
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Renders the trail produced by the content engine. The final crumb is marked
 * `current` upstream and is rendered as text with `aria-current="page"`.
 *
 * Phase 4 layers on the page-header styling; this is the accessible skeleton.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-caption">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-x-2">
            {index > 0 && <Icon icon={ChevronRight} size="xs" tone="muted" />}
            {item.current ? (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn("text-foreground-muted transition-fast hover:text-accent")}
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
