"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

export interface LightboxProps {
  images: readonly ImageToken[];
  /** Index of the visible image, or `null` when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  /** Thumbnail strip along the bottom. */
  thumbnails?: boolean;
  className?: string;
}

/** Horizontal distance, in px, that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 50;

/**
 * Fullscreen image viewer.
 *
 * Native `<dialog>` again: focus trap, Escape and top-layer stacking come free.
 * Arrow keys and Home/End move between images, and a horizontal drag or swipe
 * does the same on touch. The image container allows native pinch-zoom.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  thumbnails = true,
  className,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStart = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Home") onIndexChange(0);
      if (event.key === "End") onIndexChange(count - 1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go, onIndexChange, count]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const current = index !== null ? images[index] : undefined;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Image viewer"
      onClose={onClose}
      className={cn(
        "h-dvh max-h-none w-dvw max-w-none bg-primary/95 p-0 text-primary-foreground backdrop:bg-primary/90",
        className,
      )}
    >
      {current && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <span
              aria-live="polite"
              className="font-sans text-caption text-primary-foreground/60 tabular-nums"
            >
              {(index ?? 0) + 1} / {count}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="rounded-button p-2 transition-fast hover:bg-primary-foreground/10"
            >
              <Icon icon={X} size="md" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4"
            // Lets the browser handle pinch-zoom natively on touch devices.
            style={{ touchAction: "pinch-zoom" }}
            onPointerDown={(event) => {
              pointerStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              const start = pointerStart.current;
              pointerStart.current = null;
              if (start === null) return;
              const delta = event.clientX - start;
              if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
            }}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              priority
              className="object-contain select-none"
            />

            {count > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </div>

          {thumbnails && count > 1 && (
            <div className="shrink-0 overflow-x-auto px-4 pb-5">
              <ul className="mx-auto flex w-max gap-2">
                {images.map((image, thumbIndex) => (
                  <li key={image.src}>
                    <button
                      type="button"
                      onClick={() => onIndexChange(thumbIndex)}
                      aria-label={`Show image ${thumbIndex + 1}`}
                      aria-current={thumbIndex === index ? "true" : undefined}
                      className={cn(
                        "relative size-16 overflow-hidden rounded-button transition-fast",
                        thumbIndex === index
                          ? "ring-2 ring-accent"
                          : "opacity-50 hover:opacity-100",
                      )}
                    >
                      <Image src={image.src} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center",
        "rounded-badge bg-primary/60 text-primary-foreground transition-fast hover:bg-primary/80",
        side === "left" ? "left-4" : "right-4",
      )}
    >
      <Icon icon={side === "left" ? ChevronLeft : ChevronRight} size="md" />
    </button>
  );
}
