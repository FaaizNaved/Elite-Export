"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { panel } from "@/animations";
import { cn } from "@/lib/cn";
import type { MegaMenu as MegaMenuData } from "@/types";

export interface MegaMenuUtility {
  label: string;
  href: string;
}

export interface MegaMenuProps {
  /** Built by `getProductsMegaMenu()` — this component never reads content itself. */
  menu: MegaMenuData;
  /** Matches the trigger's `aria-controls`. */
  id: string;
  /** Called after any link activation so the parent can close the panel. */
  onNavigate?: () => void;
  /** Two at most. A navigation drawer is not a place to put offers. */
  utilities?: readonly MegaMenuUtility[];
  className?: string;
}

/**
 * A navigation drawer. Categories, their subcategories, two actions.
 *
 * The promoted product is gone. A photograph in the menu made it a second
 * catalogue page — the visitor had to read and evaluate an object before they
 * could find the link they came for, and with three products in the catalogue
 * the "selected" piece was arbitrary anyway. Menus are for getting somewhere.
 *
 * Opens on click and keyboard activation only; the trigger owns that behaviour.
 */
export function MegaMenuPanel({ menu, id, onNavigate, utilities = [], className }: MegaMenuProps) {
  return (
    <motion.div
      id={id}
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn("absolute inset-x-0 top-full border-b border-border bg-surface", className)}
    >
      <div className="mx-auto flex max-w-wide flex-col gap-8 px-6 py-8 md:px-8">
        <div className="flex flex-wrap gap-x-20 gap-y-8" role="list" aria-label="Product categories">
          {menu.columns.map((column) => (
            <div key={column.href} role="listitem" className="flex min-w-44 flex-col gap-3">
              <Link
                href={column.href}
                onClick={onNavigate}
                className="font-display text-body-lg font-medium transition-fast hover:text-accent-strong"
              >
                {column.label}
              </Link>

              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="font-sans text-small text-foreground-secondary transition-fast hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {utilities.length > 0 && (
          <ul className="flex flex-wrap gap-x-12 gap-y-3 border-t border-border pt-6">
            {utilities.map((utility) => (
              <li key={utility.href}>
                <Link
                  href={utility.href}
                  onClick={onNavigate}
                  className="font-sans text-small text-foreground-secondary underline-offset-4 transition-fast hover:text-foreground hover:underline"
                >
                  {utility.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
