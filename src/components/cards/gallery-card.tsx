"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { AspectRatio, type AspectRatioName } from "@/components/ui/aspect-ratio";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";

export interface GalleryCardProps {
  image: ImageToken;
  /** Opens the lightbox. Omit for a purely decorative tile. */
  onOpen?: () => void;
  ratio?: AspectRatioName;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * A single gallery tile.
 *
 * When `onOpen` is supplied the tile is a real `<button>` — keyboard users get
 * the same lightbox as pointer users, which an overlay `div` would never give them.
 */
export function GalleryCard({
  image,
  onOpen,
  ratio = "landscape",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
}: GalleryCardProps) {
  const content = (
    <AspectRatio ratio={ratio} className="rounded-image bg-surface-sunken">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover transition-premium group-hover/tile:scale-[1.03] motion-reduce:group-hover/tile:scale-100"
      />

      {onOpen && (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-base group-hover/tile:bg-primary/25 group-hover/tile:opacity-100 group-focus-visible/tile:bg-primary/25 group-focus-visible/tile:opacity-100"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-badge bg-surface/95 text-primary shadow-sm">
            <Icon icon={Maximize2} size="sm" />
          </span>
        </span>
      )}
    </AspectRatio>
  );

  if (!onOpen) {
    return <div className={cn("group/tile relative", className)}>{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View image: ${image.alt}`}
      className={cn("group/tile relative block w-full cursor-pointer", className)}
    >
      {content}
    </button>
  );
}
