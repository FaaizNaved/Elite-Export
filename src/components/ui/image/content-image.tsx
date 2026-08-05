import NextImage, { type ImageProps } from "next/image";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL, resolveImageUrl } from "@/utils/image";

export interface ContentImageProps
  extends Omit<ImageProps, "src" | "alt" | "placeholder" | "blurDataURL"> {
  /** An image from the content layer — carries its own `src` and `alt`. */
  image: ImageToken;
}

/**
 * Renders an image from the content layer.
 *
 * Every content image goes through here, which means the blur placeholder, the
 * cover fit and the URL resolution are defined once instead of being repeated
 * at each `next/image` call site. It is also the single seam a CDN migration
 * has to pass through.
 *
 * Defaults to `fill`, since content images are almost always laid into a sized
 * container; pass explicit `width`/`height` to opt out.
 */
export function ContentImage({ image, className, ...props }: ContentImageProps) {
  const sized = props.width !== undefined || props.height !== undefined || props.fill === false;

  return (
    <NextImage
      src={resolveImageUrl(image.src)}
      alt={image.alt}
      {...(sized ? {} : { fill: true })}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className={className ?? "object-cover"}
      {...props}
    />
  );
}
