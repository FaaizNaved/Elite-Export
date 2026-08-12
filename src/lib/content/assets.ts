import { joinPath } from "../../utils/slug";
import type { Image } from "../../types";
import { withImageRecord } from "./images";

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
  journal: (slug: string) => joinPath(ASSET_ROOT, "journal", slug),
} as const;

/** Resolves one asset reference against its scope. */
export function resolveAsset(base: string, src: string): string {
  if (src.startsWith("/") || src.startsWith("http") || src.startsWith("data:")) return src;
  return joinPath(base, src);
}

/**
 * Resolves an image reference into the frame it names.
 *
 * This is the one door. A content document says *which* photograph; the path
 * is resolved against the document's own asset folder, and the frame's record
 * — measured size, alternative text, caption, provenance, evidence rank,
 * chapter — is merged on from the library (MIB R15.2: one image, one record,
 * referenced everywhere).
 */
export function resolveImage(base: string, image: Image): Image {
  return withImageRecord({ ...image, src: resolveAsset(base, image.src) });
}

export function resolveImages(base: string, images: readonly Image[]): Image[] {
  return images.map((image) => resolveImage(base, image));
}

/**
 * Resolves every image anywhere inside a document, however deeply nested.
 *
 * A page's hero, the image on each step of a process, a gallery's cover and
 * its frames are all the same kind of thing, and a loader that resolves them
 * field by field will miss the next one somebody adds. Walking the document
 * means a new image-carrying field needs no loader change — which is the same
 * argument R15.2 makes about where a frame's record lives.
 */
export function resolveDocumentImages<T>(base: string, document: T): T {
  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(walk);
    if (typeof node !== "object" || node === null) return node;
    if (node instanceof Date) return node;

    const record = node as Record<string, unknown>;
    const mapped = Object.fromEntries(
      Object.entries(record).map(([key, value]) => [key, walk(value)]),
    );

    return typeof record.src === "string" ? resolveImage(base, mapped as Image) : mapped;
  };

  return walk(document) as T;
}
