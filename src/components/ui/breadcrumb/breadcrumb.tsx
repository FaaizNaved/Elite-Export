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
            {/* Every colour here inherits the surface. The trail is rendered
                inside `PageHero`, which sits on a darkened photograph on most
                interior pages — with `text-foreground` (#202020) pinned on the
                current crumb, the name of the page the visitor was actually on
                was near-black text on a near-black scrim. */}
            {index > 0 && <Icon icon={ChevronRight} size="xs" className="text-current/45" />}
            {item.current ? (
              <span aria-current="page" className="text-current">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn("text-current/65 transition-fast hover:text-accent")}
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
