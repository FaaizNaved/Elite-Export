import { ContentImage } from "@/components/ui/image";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

export interface GalleryProps {
  images: readonly ImageToken[];
  columns?: 2 | 3 | 4;
  /** Number of leading images to preload. The rest load lazily. */
  priorityCount?: number;
  className?: string;
}

const masonryColumns = {
  2: "columns-1 sm:columns-2",
  3: "columns-1 sm:columns-2 lg:columns-3",
  4: "columns-2 sm:columns-3 lg:columns-4",
} as const;

/**
 * A set of photographs, each at the presence it was published at.
 *
 * Master Implementation Blueprint §12.1, the Gallery item: it "never opens into
 * a lightbox" (UX Blueprint R23.5, Visual Design System §40.3). There is no
 * viewer, no zoom and no tile chrome, so nothing here is a control — which is
 * why this component no longer hydrates.
 *
 * `masonry` uses CSS multi-column, so there is no measuring pass and no layout
 * shift. Every photograph keeps its own height: Visual Design System §32.1 — a
 * uniform grid is a fixed box, and a fixed box crops, which Photography
 * Direction §22.4 forbids.
 */
export function Gallery({ images, columns = 3, priorityCount = 3, className }: GalleryProps) {
  return (
    <div className={cn(masonryColumns[columns], "gap-4 [column-fill:balance]", className)}>
      {images.map((image, index) => (
        <ContentImage
          key={image.src}
          image={image}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={index < priorityCount}
          className="mb-4 break-inside-avoid"
        />
      ))}
    </div>
  );
}
