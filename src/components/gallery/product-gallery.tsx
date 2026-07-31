"use client";

import { Maximize2, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";
import { Lightbox } from "./lightbox";

export interface ProductGalleryProps {
  images: readonly ImageToken[];
  /**
   * Higher-resolution variants used for zoom and fullscreen, index-aligned with
   * `images`. Falls back to `images` when omitted.
   */
  zoomImages?: readonly ImageToken[];
  /** Product name — used for the region's accessible label. */
  title: string;
  className?: string;
}

const MAX_SCALE = 3;
const MIN_SCALE = 1;
const SWIPE_THRESHOLD = 50;
const DOUBLE_TAP_MS = 300;

/**
 * Premium product viewer.
 *
 * Desktop: pointer-tracked magnification, wheel to zoom in and out, fullscreen.
 * Touch: swipe between images, double-tap to zoom, native pinch in fullscreen.
 *
 * Zoom is a CSS transform on the image, so magnifying costs no network request
 * beyond the high-resolution variant already being displayed.
 */
export function ProductGallery({ images, zoomImages, title, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(MIN_SCALE);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const lastTap = useRef(0);

  const highRes = zoomImages ?? images;
  const active = images[activeIndex];
  const activeZoom = highRes[activeIndex] ?? active;
  const zoomed = scale > MIN_SCALE;

  const select = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      setActiveIndex((index + images.length) % images.length);
      setScale(MIN_SCALE);
    },
    [images.length],
  );

  // React attaches `wheel` passively, so preventDefault needs a native listener.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !stage.matches(":hover")) return;
      event.preventDefault();
      setScale((current) =>
        Math.min(MAX_SCALE, Math.max(MIN_SCALE, current - event.deltaY * 0.002)),
      );
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  if (!active) return null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        role="group"
        aria-label={`${title} images`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") select(activeIndex + 1);
          if (event.key === "ArrowLeft") select(activeIndex - 1);
        }}
        className="relative"
      >
        <div
          ref={stageRef}
          onMouseMove={(event) => {
            if (!zoomed) return;
            const rect = event.currentTarget.getBoundingClientRect();
            setOrigin({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100,
            });
          }}
          onMouseLeave={() => setScale(MIN_SCALE)}
          onPointerDown={(event) => {
            pointerStart.current = event.clientX;

            const now = Date.now();
            if (now - lastTap.current < DOUBLE_TAP_MS) {
              setScale((current) => (current > MIN_SCALE ? MIN_SCALE : 2));
            }
            lastTap.current = now;
          }}
          onPointerUp={(event) => {
            const start = pointerStart.current;
            pointerStart.current = null;
            if (start === null || zoomed) return;
            const delta = event.clientX - start;
            if (Math.abs(delta) > SWIPE_THRESHOLD) select(activeIndex + (delta < 0 ? 1 : -1));
          }}
          className={cn(
            "overflow-hidden rounded-image bg-surface-sunken",
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
          )}
        >
          <AspectRatio ratio="product">
            <Image
              key={activeZoom.src}
              src={activeZoom.src}
              alt={activeZoom.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
              className="object-cover transition-[transform] duration-200 ease-standard select-none motion-reduce:transition-none"
            />
          </AspectRatio>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <StageButton
            label={zoomed ? "Reset zoom" : "Zoom in"}
            icon={ZoomIn}
            onClick={() => setScale(zoomed ? MIN_SCALE : 2)}
          />
          <StageButton
            label="Open fullscreen"
            icon={Maximize2}
            onClick={() => setLightboxIndex(activeIndex)}
          />
        </div>
      </div>

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
                  "relative size-20 overflow-hidden rounded-button bg-surface-sunken transition-fast",
                  index === activeIndex
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
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

function StageButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: typeof ZoomIn;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-badge bg-surface/85 text-foreground shadow-sm backdrop-blur-sm transition-fast hover:bg-surface"
    >
      <Icon icon={icon} size="sm" />
    </button>
  );
}
