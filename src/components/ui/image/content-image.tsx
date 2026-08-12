import NextImage from "next/image";
import { cn } from "@/lib/cn";
import { isReservedFrame } from "@/lib/demo";
import type { Image as ImageToken } from "@/types";
import { resolveImageUrl } from "@/utils/image";

/**
 * The one way a photograph reaches a page.
 *
 * Visual Design System §32.1 is the rule this component exists to make
 * impossible to break:
 *
 *   > Containers are defined by width. Height follows from the image's own
 *   > ratio. No image in this system is cropped by its container.
 *
 * Photography Direction §22.4 supplies the reason: an image has one canonical
 * crop, decided when it enters the library, and **two crops of one frame in
 * circulation are two different statements**. `object-fit: cover` is a second
 * crop, performed by a machine, on every viewport independently — which is why
 * neither `fill` nor any object-fit is available here. They are not
 * discouraged; they are not in the API.
 *
 * The layout adapts to the photograph. Where a surface needs a shape the
 * library does not hold, the answer is a different photograph (§32.1), not a
 * different crop of this one.
 */

export interface ContentImageProps {
  /** An image from the content layer — carries its own src, alt and record. */
  image: ImageToken;
  /**
   * How wide the image will render, so the browser can choose a source.
   * Use {@link imageSizes} rather than writing one by hand — the strings there
   * are derived from the containers in Visual Design System §27.2.
   */
  sizes: string;
  /** Above the fold on this surface. */
  priority?: boolean;
  /** Layout classes for the image itself. Width only — height follows. */
  className?: string;
  /**
   * Demo mode only: draw the reserved plate with a stitched trim rather than a
   * plain one. It has no effect on a photograph — a frame that holds evidence
   * is never decorated (§25, R8.7).
   */
  stitched?: boolean;
}

/**
 * Delivery quality.
 *
 * VDS §32.3: delivered at not less than 2× the largest rendered size, and
 * judged on grain and shadow detail rather than on file size alone. Creative
 * Direction Book §14.3: a shadow that loses its detail is a place where
 * information has been discarded, and this brand's position is that nothing is
 * discarded.
 */
const DELIVERY_QUALITY = 90;

export function ContentImage({
  image,
  sizes,
  priority,
  className,
  stitched = false,
}: ContentImageProps) {
  /**
   * An image whose intrinsic size is unknown cannot be shown to reach the
   * evidence threshold (VDS §30.2), so it is not published.
   *
   * UX Blueprint X8: where the evidence does not exist, the section does not
   * exist — the absence is designed around, never filled with a stand-in. The
   * Threshold gate at `npm run check:publication` names every image in this
   * state, so it is reported rather than silently missing.
   */
  if (!image.width || !image.height) return null;

  /**
   * The reserved frame — demo mode only (`src/lib/demo.ts`).
   *
   * Not a photograph and not a stand-in for one: the space a photograph will
   * occupy, at that photograph's own measured ratio, so the layout a reviewer
   * approves is the layout that ships. No file is requested and no `<img>` is
   * emitted, so nothing here can be mistaken for evidence by a person or by a
   * gate.
   *
   * Two paper tones and one registration mark — the mark a plate is aligned to
   * before it is printed, which is exactly what this frame is waiting for. It
   * sits at 6% ink: visible when looked for, invisible when read past.
   */
  if (isReservedFrame(image.src)) {
    return (
      <div
        aria-hidden
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        data-reveal="frame"
        className={cn(
          "reserved-frame relative w-full",
          /*
           * The stitched trim, on a frame that leads a passage. A dashed
           * hairline inside the crop marks: the saddle stitch reduced to the
           * interval it leaves.
           */
          stitched && "reserved-frame--stitched",
          className,
        )}
      >
        <span className="reserved-mark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/*
          The plate's own stamp — bottom left, inside the trim.

          It is not a caption. §12.2 makes a caption a specification of a
          photograph and there is no photograph, so this states the one thing
          that is true of this rectangle: what is reserved, and for what. A
          reviewer reads *the photography goes here* rather than *the image
          failed to load*, which is the whole difference between a layout under
          review and a page under construction.
        */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-baseline justify-between gap-x-s3 gap-y-1 p-[clamp(1.5rem,4.4%,3rem)] text-c tracking-mark text-[rgba(242,239,233,0.72)] uppercase">
          <span>{image.caption ?? "Plate reserved"}</span>
          <span>Photography to come</span>
        </span>
      </div>
    );
  }

  return (
    <NextImage
      src={resolveImageUrl(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      quality={DELIVERY_QUALITY}
      priority={priority}
      /* The dissolve. Not applied to a priority frame: the first screen is
         already arriving as one field and a second fade on top of it is two
         movements where M10 permits one. */
      data-reveal={priority ? undefined : "frame"}
      /*
       * The container gives the width; the height is the photograph's own.
       * This pair is the whole of §32.1, and it is why no aspect-ratio token
       * exists in this system: a list of approved ratios would become a set of
       * boxes, and boxes crop.
       */
      style={{ width: "100%", height: "auto" }}
      className={className}
    />
  );
}
