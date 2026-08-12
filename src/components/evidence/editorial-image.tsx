import { ContentImage } from "@/components/ui/image";
import { Caption } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { imageSizes } from "@/utils/image";

/**
 * The editorial image and its record — Master Implementation Blueprint §12.1,
 * the first two rows of the evidence set.
 *
 * R12.2 is the reason they are one component rather than two: "the image
 * record is not optional metadata. It is what converts a photograph from a
 * picture into evidence, and it is mandatory in the content model precisely so
 * that the build cannot ship an image without one."
 *
 * So there is no way to render an evidential photograph here without its
 * caption. The caption is a specification label — place, material, state, date
 * (Documentary Storyboard §13.6) — set at rank C, secondary, below the image,
 * flush with its left edge, S2 from it, never wider than the image, and never
 * overlaid on it (VDS §12.2, §10.1).
 *
 * Presence is §30: an image below the evidence threshold does not appear at
 * all. `ContentImage` already refuses an image with no intrinsic size, and the
 * Threshold gate at `check:publication` names every frame in that state.
 */

export interface EditorialImageProps {
  image: ImageToken;
  /** How wide it will render. Use `imageSizes`, not a hand-written string. */
  sizes?: string;
  priority?: boolean;
  /**
   * §31.3: bleed is the default for E1, E2 and E5 — an image that continues
   * past the edge of the field implies a world that continues past the edge of
   * the frame. Bounded placement is the exception and a deliberate change of
   * register: an E4 record or an E6 object, where the frame is part of what is
   * being shown.
   */
  bleed?: boolean;
  className?: string;
}

export function EditorialImage({
  image,
  sizes = imageSizes.evidence,
  priority,
  bleed = false,
  className,
}: EditorialImageProps) {
  if (!image.width || !image.height) return null;

  /*
   * §31.4 is Bounded and its ceiling is absolute: a full-bleed photograph
   * occupies between 60% and 100% of the viewport height, and **never above
   * 100%** — *an image taller than the field can never be seen whole, and an
   * image that cannot be seen whole cannot be examined.*
   *
   * A portrait frame at screen width breaks it by arithmetic rather than by
   * choice: 800 × 1066 at a 1280px field is 1707px tall, which measured at
   * **213%** of the viewport before this line existed. Nothing in the system
   * caught it, because no surface has rendered a bleed frame yet — the archive
   * is empty — and it would have arrived with the first portrait photograph.
   *
   * The fix cannot be a crop. §32.1: *the container gives the width, the
   * photograph gives the height*, and Photography §22.4 makes a second crop a
   * second statement — `ContentImage` does not expose `object-fit` for that
   * reason. So the ceiling is applied to the **width**, derived from the frame's
   * own measured ratio: the widest this photograph may be drawn is the width at
   * which it is exactly one viewport tall. It bleeds wherever the ratio allows
   * and stops short of the edge where it does not, uncropped either way, and
   * flush left because §10.4 centres nothing.
   *
   * The 60% floor is deliberately not enforced here. Reaching it means either
   * enlarging past the frame's own size or cropping to a wider ratio, and both
   * are refused above; R18.5 puts that end of the range where it belongs —
   * *where a surface needs a shape the library lacks, the answer is a different
   * photograph.*
   */
  const ceiling = bleed ? { maxWidth: `calc(100svh * ${image.width} / ${image.height})` } : undefined;

  return (
    <figure
      style={ceiling}
      className={cn("flex flex-col", bleed && "w-screen max-w-none", className)}
    >
      <ContentImage image={image} sizes={sizes} priority={priority} />
      {image.caption && (
        <figcaption className="mt-s2">
          <Caption>{image.caption}</Caption>
        </figcaption>
      )}
    </figure>
  );
}

/**
 * The evidence set — §12.1, and the one place equal treatment of photographs is
 * correct rather than an abdication.
 *
 * VDS §31.1: two photographs of equal weight halve each other, and comparison
 * is a shopping behaviour. The exception is an E3 set — three to five frames of
 * the same operation, treated identically — "because there the comparison *is*
 * the argument: the same act, the same way, repeatedly. That is Repeatability
 * made visible."
 *
 * It disappears with fewer than three members, or where the frames are of
 * different subjects. The first is checkable here; the second is a picture
 * editor's judgement and is recorded in the archive, not in code.
 */
export interface EvidenceSetProps {
  frames: readonly ImageToken[];
  className?: string;
}

const MIN_SET = 3;
const MAX_SET = 5;

export function EvidenceSet({ frames, className }: EvidenceSetProps) {
  if (frames.length < MIN_SET) return null;

  const shown = frames.slice(0, MAX_SET);

  return (
    <div className={cn("grid gap-s3 paired:grid-cols-3", className)}>
      {shown.map((frame) => (
        <EditorialImage key={frame.src} image={frame} sizes={imageSizes.annotation} />
      ))}
    </div>
  );
}
