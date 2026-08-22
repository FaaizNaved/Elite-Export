"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/loading";
import { Typography } from "@/components/ui/typography";
import { duration, easing } from "@/theme/motion";
import type { Product } from "@/types";

export interface ProductBrowserProps {
  products: readonly Product[];
  /** Category slug → display name, in catalogue order. Drives the filter rail. */
  categories: ReadonlyArray<{ slug: string; name: string }>;
}

/** `null` is "everything" — a filter rail with no way back is a trap. */
type Filter = string | null;

const ALL = "all";

/**
 * The whole catalogue on one page, filtered in the browser.
 *
 * Filtering is client state rather than a `?category=` search param on purpose:
 * reading `searchParams` in a page forces dynamic rendering and costs the
 * catalogue its static generation, which matters far more here than a
 * shareable filter URL. The full product set is already in the payload — for a
 * catalogue of this size that is a smaller cost than a round trip per filter.
 *
 * ponytail: state, not a URL. If buyers ever need to send each other a filtered
 * link, move this to `nuqs`-style search params and accept the dynamic render.
 */
export function ProductBrowser({ products, categories }: ProductBrowserProps) {
  const [filter, setFilter] = useState<Filter>(null);
  const prefersReducedMotion = useReducedMotion();

  /**
   * Grouped once per filter change. Empty categories are dropped rather than
   * rendered as an empty band — a heading with nothing under it reads as a
   * loading failure.
   */
  const groups = useMemo(() => {
    const visible = categories.filter((category) => !filter || category.slug === filter);

    return visible
      .map((category) => ({
        ...category,
        products: products.filter((product) => product.categorySlug === category.slug),
      }))
      .filter((group) => group.products.length > 0);
  }, [categories, filter, products]);

  const total = groups.reduce((sum, group) => sum + group.products.length, 0);

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {/* One rail, always including the way back to everything. */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          <Chip label="All" selected={filter === null} onClick={() => setFilter(null)} />
          {categories.map((category) => (
            <Chip
              key={category.slug}
              label={category.name}
              selected={filter === category.slug}
              onClick={() => setFilter(category.slug)}
            />
          ))}
        </div>

        {/* Announced politely so a screen-reader user hears the count change
            without the rail stealing focus on every press. */}
        <Typography variant="caption" aria-live="polite">
          {total === 1 ? "1 product" : `${total} products`}
        </Typography>
      </div>

      {groups.length === 0 ? (
        <EmptyState
          title="Nothing published here yet"
          description="This part of the catalogue is being photographed. Try another category."
        />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            // Keyed on the filter so the whole set re-enters as one movement
            // rather than each card animating its own arrival and departure.
            key={filter ?? ALL}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{
              duration: duration.normal,
              ease: [...easing.entrance] as [number, number, number, number],
            }}
            className="flex flex-col gap-20 md:gap-28"
          >
            {groups.map((group) => (
              <section key={group.slug} aria-labelledby={`group-${group.slug}`}>
                <div className="mb-10 flex flex-col gap-3 md:mb-12">
                  <Typography variant="h3" as="h2" id={`group-${group.slug}`}>
                    {group.name}
                  </Typography>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((product, index) => (
                    <ProductCard
                      key={product.href}
                      product={product}
                      priority={index < 3}
                      className="h-full"
                    />
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
