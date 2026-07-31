"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { duration, easing } from "@/animations";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { MegaMenu as MegaMenuData } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";

export interface MegaMenuProps {
  /** Built by `getProductsMegaMenu()` — this component never reads content itself. */
  menu: MegaMenuData;
  /** Matches the trigger's `aria-controls`. */
  id: string;
  /** Called after any link activation so the parent can close the panel. */
  onNavigate?: () => void;
  className?: string;
}

/**
 * Full-width product menu: one column per category, its subcategories beneath,
 * and an optional promoted item on the right.
 *
 * Purely presentational — columns come from props, so adding a category
 * updates the menu with no change here.
 */
export function MegaMenuPanel({ menu, id, onNavigate, className }: MegaMenuProps) {
  const hasFeature = Boolean(menu.feature);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: duration.normal, ease: [...easing.entrance] }}
      className={cn(
        "absolute inset-x-0 top-full border-b border-border bg-surface shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-wide gap-10 px-6 py-10 md:px-8",
          hasFeature ? "lg:grid-cols-[1fr_auto_20rem]" : "lg:grid-cols-1",
        )}
      >
        <div
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          role="list"
          aria-label="Product categories"
        >
          {menu.columns.map((column) => (
            <div key={column.href} role="listitem" className="flex flex-col gap-3">
              <Link
                href={column.href}
                onClick={onNavigate}
                className="font-display text-h4 font-medium transition-fast hover:text-accent"
              >
                {column.label}
              </Link>

              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block font-sans text-small text-foreground-secondary transition-fast hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {hasFeature && menu.feature && (
          <>
            <div aria-hidden className="hidden w-px bg-border lg:block" />

            <Link
              href={menu.feature.href}
              onClick={onNavigate}
              className="group/feature flex flex-col gap-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-surface-sunken">
                <Image
                  src={menu.feature.image.src}
                  alt={menu.feature.image.alt}
                  fill
                  sizes="320px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-premium group-hover/feature:scale-[1.03] motion-reduce:group-hover/feature:scale-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Typography variant="overline">Featured</Typography>
                <Typography variant="h4" as="p" className="transition-fast group-hover/feature:text-accent">
                  {menu.feature.label}
                </Typography>
                {menu.feature.description && (
                  <Typography variant="caption">{menu.feature.description}</Typography>
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
