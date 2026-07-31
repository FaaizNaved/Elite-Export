"use client";

import { useState } from "react";
import { GalleryCard } from "@/components/cards/gallery-card";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { Lightbox } from "./lightbox";

export interface GalleryProps {
  images: readonly ImageToken[];
  /** `grid` keeps a uniform ratio; `masonry` preserves each image's own height. */
  layout?: "grid" | "masonry";
  columns?: 2 | 3 | 4;
  /** Clicking a tile opens the fullscreen viewer. */
  lightbox?: boolean;
  /** Ratio for the `grid` layout. Ignored by `masonry`. */
  ratio?: "square" | "landscape" | "portrait" | "product";
  /** Number of leading images to preload. The rest load lazily. */
  priorityCount?: number;
  className?: string;
}

const gridColumns = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
} as const;

const masonryColumns = {
  2: "columns-1 sm:columns-2",
  3: "columns-1 sm:columns-2 lg:columns-3",
  4: "columns-2 sm:columns-3 lg:columns-4",
} as const;

/**
 * Responsive image gallery with an optional fullscreen viewer.
 *
 * `masonry` uses CSS multi-column, so there is no measuring pass and no layout
 * shift — the trade-off is reading order flows down each column rather than
 * across rows, which is the right behaviour for a photo wall.
 */
export function Gallery({
  images,
  layout = "grid",
  columns = 3,
  lightbox = true,
  ratio = "landscape",
  priorityCount = 3,
  className,
}: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn(
          layout === "masonry"
            ? cn(masonryColumns[columns], "gap-4 [column-fill:balance]")
            : cn("grid gap-4", gridColumns[columns]),
          className,
        )}
      >
        {images.map((image, index) => (
          <GalleryCard
            key={image.src}
            image={image}
            ratio={layout === "masonry" ? "square" : ratio}
            priority={index < priorityCount}
            onOpen={lightbox ? () => setOpenIndex(index) : undefined}
            className={layout === "masonry" ? "mb-4 break-inside-avoid" : undefined}
          />
        ))}
      </div>

      {lightbox && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
