import { IMAGE_BASE_URL } from "../config/site";
import type { Image } from "../types";

/**
 * Image helpers.
 *
 * Content stores site-relative paths (`/images/products/…`). Those paths are
 * stable identifiers, not hosting decisions: `resolveImageUrl` is the single
 * place they become a URL, so moving assets to a CDN is one environment
 * variable rather than a content migration.
 */

/**
 * Turns a content image path into the URL to request.
 * Absolute URLs and data URIs pass through untouched.
 */
export function resolveImageUrl(src: string): string {
  if (!IMAGE_BASE_URL || src.startsWith("http") || src.startsWith("data:")) return src;
  return `${IMAGE_BASE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

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
 * Flat warm-ivory data URL for `next/image` `placeholder="blur"` on local assets.
 * Inlined rather than computed so it is safe to import from client components.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNFQUU2REYiLz48L3N2Zz4=";
