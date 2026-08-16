import { readFileSync } from "node:fs";
import path from "node:path";
import { imageLibrarySchema } from "../../models/primitives";
import type { Image, ImageLibrary, ImageRecord } from "../../types";
import { CONTENT_ROOT, ContentError } from "./source";

/**
 * The image library.
 *
 * Master Implementation Blueprint R15.2 makes the Image a first-class object
 * and states why in one line: *one image, one record, referenced everywhere.*
 * A content document names a frame; everything that describes it — its
 * measured size, its caption, where and when it was taken, what it may be
 * asked to prove, which chapter it belongs to — lives here, once.
 *
 * Two rules make that necessary rather than tidy. R7.1: a fact expressible in
 * two places will eventually disagree with itself. Photography Direction
 * §22.4: a frame has one canonical crop, and two crops of one photograph are
 * two different statements — which the system can only enforce if it holds one
 * width and one height per frame.
 *
 * The dimensions here are **measured from the files** by `npm run
 * images:record` and are never typed by hand.
 *
 * Traces to: MIB R15.2, R15.4, R18.4, R7.1; Photography Direction §22.4,
 * §24.4; VDS §30.2, §32.3; Documentary Storyboard §13.6.
 */

export const IMAGE_LIBRARY_FILE = "images.json";

/**
 * The delivery ratio, for the frames whose shape a surface reserves.
 *
 * Photography Direction §14.5 is explicit that shape does not belong to the
 * photography book — *"no aspect ratio is prescribed here and none is
 * prescribed anywhere: shape is a placement decision"* — and §30.1 lists
 * aspect ratios among what that book deliberately withheld. So a surface may
 * decide one. What it may not do is decide one **privately**.
 *
 * The Home opening did. It drew its board at 4:5 by passing a shape into
 * `framed()`, while this library recorded the file at 16:9 — two ratios for
 * one frame, which Photography Direction §22.4 calls two statements. The Crop
 * gate exists to refuse precisely that and could not see it: the gate compares
 * the ratios a frame is *referenced* at across the content layer, and the
 * override was applied at render time, downstream of everything the gate
 * reads. Worse, `framed()` applies a shape **only to a generated file**, so
 * the two ratios would have reconciled themselves by the layout moving, on the
 * day the photograph arrived. That is the one event the plate exists to make
 * uneventful.
 *
 * So the shape is stated here, beside the width and height it has to agree
 * with. `scripts/generate-placeholders.mjs` draws the placeholder at it,
 * `npm run images:record` measures the file, the layout reads the measurement,
 * and `check:content` refuses a record that disagrees with this table. One
 * value, four consumers, and the photograph's delivery ratio is a build-time
 * requirement rather than a sentence in a comment.
 *
 * **A path belongs here only when a surface reserves its shape.** Everything
 * else is whatever the library measured. Nothing here crops: a frame delivered
 * at the wrong ratio fails the check — it is not cut to fit (VDS §32.1).
 */
export const DELIVERY_SHAPES: Readonly<Record<string, readonly [number, number]>> = {
  "/images/hero/home-hero.webp": [2000, 2500],
};

let cached: ImageLibrary | undefined;

/**
 * Read synchronously, and once.
 *
 * `resolveImage` is called from inside every loader's synchronous resolve step,
 * and making the whole content engine asynchronous to fetch one file that never
 * changes during a run would be a large change for no gain (MIB R4.4).
 */
export function imageLibrary(): ImageLibrary {
  if (cached) return cached;

  const file = path.join(CONTENT_ROOT, IMAGE_LIBRARY_FILE);
  let raw: unknown;

  try {
    raw = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    throw new ContentError(
      `Could not read the image library at ${IMAGE_LIBRARY_FILE}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  const parsed = imageLibrarySchema.safeParse(raw);
  if (!parsed.success) {
    throw new ContentError(`${IMAGE_LIBRARY_FILE} is not a valid image library:\n${parsed.error.message}`);
  }

  cached = parsed.data;
  return cached;
}

/** The record for one frame, by its site-absolute path. */
export function imageRecord(src: string): ImageRecord | undefined {
  return imageLibrary()[src];
}

/**
 * Merges a frame's record onto a reference.
 *
 * The record wins over anything the reference carries: the library is the
 * source of truth, and a document that has kept a stale copy of a caption or a
 * dimension must not be able to override it (R7.1).
 *
 * A frame with no record passes through unchanged. That is not silence — the
 * Provenance, Record and Threshold gates each name it, and `check:content`
 * refuses a reference the library does not know.
 */
export function withImageRecord(image: Image): Image {
  const record = imageRecord(image.src);
  return record ? { ...image, ...record } : image;
}
