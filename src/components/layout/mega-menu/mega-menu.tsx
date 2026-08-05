"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { panel } from "@/animations";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { MegaMenu as MegaMenuData } from "@/types";

export interface MegaMenuUtility {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuProps {
  /** Built by `getProductsMegaMenu()` — this component never reads content itself. */
  menu: MegaMenuData;
  /** Matches the trigger's `aria-controls`. */
  id: string;
  /** Called after any link activation so the parent can close the panel. */
  onNavigate?: () => void;
  /**
   * Actions shown in the right-hand column instead of a promoted product
   * (blueprint §14). An action converts; a promoted SKU does not.
   */
  utilities?: readonly MegaMenuUtility[];
  className?: string;
}

/**
 * Full-width product menu: one column per category, its subcategories beneath,
 * and an optional promoted item on the right.
 *
 * Purely presentational — columns come from props, so adding a category
 * updates the menu with no change here.
 */
export function MegaMenuPanel({
  menu,
  id,
  onNavigate,
  utilities = [],
  className,
}: MegaMenuProps) {
  const hasUtilities = utilities.length > 0;

  /**
   * Track the real number of categories rather than always reserving three
   * columns — an empty track reads as a mistake, not as whitespace.
   */
  const columnTracks =
    menu.columns.length >= 3
      ? "sm:grid-cols-2 xl:grid-cols-3"
      : menu.columns.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-1";

  return (
    <motion.div
      id={id}
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "absolute inset-x-0 top-full border-t border-border/60 border-b bg-surface shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "group/panel mx-auto grid max-w-wide gap-12 px-6 py-12 md:px-8",
          hasUtilities ? "lg:grid-cols-[1fr_auto_20rem]" : "lg:grid-cols-1",
        )}
      >
        <div
          className={cn("grid gap-x-10 gap-y-9", columnTracks)}
          role="list"
          aria-label="Product categories"
        >
          {menu.columns.map((column) => (
            <div key={column.href} role="listitem" className="flex flex-col gap-3">
              <Link
                href={column.href}
                onClick={onNavigate}
                className="group/column flex items-baseline justify-between gap-3 border-b border-border pb-2 font-display text-h4 font-medium transition-fast hover:text-accent"
              >
                {column.label}
                <span
                  aria-hidden
                  className="font-sans text-caption text-foreground-muted opacity-0 transition-fast group-hover/column:opacity-100"
                >
                  View all
                </span>
              </Link>

              <ul className="flex flex-col gap-0.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="-mx-3 flex flex-col gap-0.5 rounded-button px-3 py-2 transition-fast hover:bg-surface-sunken"
                    >
                      <span className="font-sans text-small text-foreground-secondary transition-fast group-hover/panel:text-foreground">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="line-clamp-1 font-sans text-caption text-foreground-muted">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {hasUtilities && (
          <>
            <div aria-hidden className="hidden w-px bg-border lg:block" />

            <div className="flex flex-col gap-5">
              <Typography variant="overline" className="text-accent">
                Start here
              </Typography>

              <ul className="flex flex-col gap-2">
                {utilities.map((utility) => (
                  <li key={utility.href}>
                    <Link
                      href={utility.href}
                      onClick={onNavigate}
                      className="group/utility -mx-4 flex flex-col gap-1 rounded-card border border-transparent px-4 py-3 transition-fast hover:border-border hover:bg-surface-sunken"
                    >
                      <span className="flex items-center justify-between gap-3 font-display text-h4 font-medium transition-fast group-hover/utility:text-accent">
                        {utility.label}
                        <span aria-hidden className="transition-base group-hover/utility:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                      {utility.description && (
                        <Typography variant="caption">{utility.description}</Typography>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
