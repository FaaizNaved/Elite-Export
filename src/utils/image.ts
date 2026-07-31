import type { Image } from "../types";
import { joinPath } from "./slug";

/** Shown when content is missing an image; keeps layouts from collapsing. */
export const PLACEHOLDER_IMAGE: Image = {
  src: "/images/placeholder.webp",
  alt: "",
};

/**
 * Guarantees a non-empty `alt`. Authors may omit alt text in frontmatter; the
 * loader backfills it from the parent entity's title rather than shipping an
 * empty string to screen readers.
 */
export function withAlt(image: Image, fallbackAlt: string): Image {
  return image.alt.trim() ? image : { ...image, alt: fallbackAlt };
}

export function withAltAll(images: readonly Image[], fallbackAlt: string): Image[] {
  return images.map((image, index) =>
    withAlt(image, images.length > 1 ? `${fallbackAlt} — view ${index + 1}` : fallbackAlt),
  );
}

/**
 * Canonical location of a product's images, mirroring the content hierarchy:
 * `/images/products/western-tack/headstall/one-ear-headstall/front.webp`
 */
export function productImagePath(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
  fileName?: string,
): string {
  return joinPath("images", "products", categorySlug, subcategorySlug, productSlug, fileName);
}

/**
 * Flat warm-ivory data URL for `next/image` `placeholder="blur"` on local assets.
 * Inlined rather than computed so it is safe to import from client components.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNFQUU2REYiLz48L3N2Zz4=";
