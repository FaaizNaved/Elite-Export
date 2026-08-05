import { joinPath } from "../../utils/slug";
import type { Image } from "../../types";

/**
 * Asset resolution.
 *
 * Content files name their images relatively — `one-ear-headstall-front.webp` —
 * and this module turns that into a path. Where the file physically lives is an
 * application concern, not something an author should have to spell out, and it
 * is what makes moving assets to a CDN or a CMS media library a change here
 * rather than a change across every content file.
 *
 * Paths that already start with `/` are passed through untouched, so content
 * can be migrated file by file and shared assets (og images, logos) can point
 * anywhere.
 */

/** Root of the public asset tree. */
const ASSET_ROOT = "images";

/** Where each content type keeps its images, mirroring the content hierarchy. */
export const assetScope = {
  product: (category: string, subcategory: string, product: string) =>
    joinPath(ASSET_ROOT, "products", category, subcategory, product),
  category: (category: string) => joinPath(ASSET_ROOT, "categories", category),
  subcategory: (category: string, subcategory: string) =>
    joinPath(ASSET_ROOT, "categories", category, subcategory),
  machine: (slug: string) => joinPath(ASSET_ROOT, "machinery", slug),
  album: (slug: string) => joinPath(ASSET_ROOT, "gallery", slug),
  blog: (slug: string) => joinPath(ASSET_ROOT, "blog", slug),
} as const;

/** Resolves one asset reference against its scope. */
export function resolveAsset(base: string, src: string): string {
  if (src.startsWith("/") || src.startsWith("http") || src.startsWith("data:")) return src;
  return joinPath(base, src);
}

/** Resolves an image's `src` in place, leaving the rest of the token untouched. */
export function resolveImage(base: string, image: Image): Image {
  return { ...image, src: resolveAsset(base, image.src) };
}

export function resolveImages(base: string, images: readonly Image[]): Image[] {
  return images.map((image) => resolveImage(base, image));
}
