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
 * How wide an image renders, per container.
 *
 * Visual Design System §27.2 fixes five containers, and a `sizes` string is
 * simply that container expressed for the browser. They live here rather than
 * at each call site because a wrong `sizes` silently breaks §32.3 — the
 * browser fetches a source below 2× the rendered size, and the grain a buyer
 * is meant to examine is gone before the page is even laid out.
 *
 * The breakpoints quoted are the ones in §27.1: 720, 1024 and 1280.
 */
export const imageSizes = {
  /** Edge to edge of the viewport — VDS §31.3, the default for E1, E2 and E5. */
  bleed: "100vw",
  /** The 5-unit column of the paired field; full width below 1280 (§45.3). */
  evidence: "(min-width: 1280px) 62vw, 100vw",
  /** The 3-unit column beside evidence. */
  annotation: "(min-width: 1280px) 36vw, (min-width: 1024px) 50vw, 100vw",
  /** Inside the reading column — 640px, capped (§10.1). */
  reading: "(min-width: 720px) 640px, 100vw",
  /** A record: specification imagery inside the 480px column. */
  record: "(min-width: 720px) 480px, 100vw",
  /**
   * Home's own three, held here rather than at the call site.
   *
   * VDS §48.3 puts every design value in one source, and a `sizes` string is a
   * container expressed for the browser — so a media query typed into a page is
   * the same stray value as a hex code typed into a component. These three are
   * the compositions Home is built from and nothing else uses them.
   */
  /** The board hung on the trailing edge of the first screen. */
  overture: "(min-width: 1280px) 40vw, 100vw",
  /** A board that leaves the field by one edge — the place, a range spread. */
  spread: "(min-width: 1024px) 60vw, 100vw",
  /** A board held inside the field with the words beside it. */
  inset: "(min-width: 1024px) 36vw, 100vw",
} as const;
