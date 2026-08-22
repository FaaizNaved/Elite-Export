"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";
import { Lightbox } from "./lightbox";

export interface ProductGalleryProps {
  images: readonly ImageToken[];
  /**
   * Higher-resolution variants used when a frame is opened, index-aligned with
   * `images`. Falls back to `images` when omitted.
   */
  zoomImages?: readonly ImageToken[];
  /** Product name — used for the region's accessible label. */
  title: string;
  className?: string;
}

/**
 * One photograph of the piece, and a row of frames if there is more than one.
 *
 * This was a shop viewer: pointer-tracked magnification, wheel-to-zoom,
 * double-tap zoom, swipe, and a floating cluster of two round control buttons
 * over the top-right corner of the object. All of that is the vocabulary of a
 * checkout page, and it put the interface in front of the leather — the first
 * thing the eye found was a zoom button.
 *
 * What remains: the frame is the control. Click or press Enter to open it
 * larger, arrow keys to move between frames. Nothing floats over the object.
 */
export function ProductGallery({ images, zoomImages, title, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const highRes = zoomImages ?? images;
  const active = images[activeIndex];

  const select = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length],
  );

  if (!active) return null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <button
        type="button"
        aria-label={`${title} — view larger`}
        onClick={() => setLightboxIndex(activeIndex)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") select(activeIndex + 1);
          if (event.key === "ArrowLeft") select(activeIndex - 1);
        }}
        className="group block w-full cursor-zoom-in overflow-hidden bg-surface-sunken"
      >
        {/* Height-bound on desktop rather than ratio-bound. A 4:5 plate across
            the full content measure came out 1200px tall, which pushed the
            material list and the enquiry link a full screen below the object —
            the buyer saw the top half of a bag and nothing else. Capping to the
            viewport keeps identity, object and action on one screen while the
            photograph still dominates it. */}
        <div className="relative aspect-[4/5] w-full sm:aspect-[3/2] md:aspect-auto md:h-[62vh] md:max-h-[46rem]">
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            fill
            preload
            sizes="(min-width: 1024px) 62vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-premium group-hover:scale-[1.01] motion-reduce:group-hover:scale-100"
          />
        </div>
      </button>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => select(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "relative size-16 overflow-hidden bg-surface-sunken transition-fast",
                  // A hairline, not a gold ring with an offset. The selected
                  // frame should be legible without becoming the brightest
                  // thing on the page.
                  index === activeIndex
                    ? "outline outline-foreground/50"
                    : "opacity-55 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        images={highRes}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
