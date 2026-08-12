import type { Chapter, Image } from "../../types";
import { imageLibrary } from "./images";

/**
 * The library is the argument.
 *
 * Photography Direction §25 states it as a principle and Master Implementation
 * Blueprint R8.7 states it as an order of works: *the order governs surfaces;
 * the library governs what can be told, and the library wins.* A chapter is
 * therefore not a list a surface holds — it is the frames the archive contains
 * for that chapter, and a surface asks.
 *
 * That is what makes UX Blueprint X8 mechanical rather than remembered.
 * Surfaces are designed around the absence of images; when the absence ends,
 * the chapter fills without a code change, and until it ends the chapter is
 * absent rather than substituted.
 *
 * Traces to: Photography Direction §5 (the evidence hierarchy), §24.4
 * (provenance), §25; MIB R15.4 (every object carries its chapter), R11.1 (a
 * chapter is absent, never partial); Documentary Storyboard §13.6 (the caption
 * is a specification); UX Blueprint X8, R49.5.
 */

/**
 * Whether a frame is evidence, or only a file.
 *
 * Exported because a record surface asks the same question of a frame that a
 * chapter does. Re-implementing the five conditions at a call site would be
 * R7.1 broken for the sake of one import.
 *
 * The five conditions are the content-side half of the publication gates —
 * Provenance, Record and the chapter attribution — asked at composition time
 * rather than at launch. A frame short of any of them is not rendered, which
 * is the same answer the gates give and the reason a surface cannot quietly
 * publish a picture that has not earned the word.
 *
 * Intrinsic size is deliberately not checked here: it is measured into the
 * library by `npm run images:record`, the Threshold gate holds the number
 * (VDS §30.2, §32.3), and `ContentImage` renders nothing without it. Restating
 * the measurement in a third place would be R7.1 broken to no purpose.
 */
export function isEvidence(record: {
  alt: string;
  caption?: string;
  chapter?: Chapter;
  evidenceRank?: string;
  provenance?: { place?: string; capturedOn?: string; photographer?: string; permission?: string };
}): boolean {
  const { place, capturedOn, photographer, permission } = record.provenance ?? {};

  return Boolean(
    record.chapter &&
      record.evidenceRank &&
      record.alt.trim() &&
      record.caption?.trim() &&
      place &&
      capturedOn &&
      photographer &&
      permission,
  );
}

/**
 * Every frame the archive holds for one chapter, in a stable order.
 *
 * Which frames belong to a chapter is a fact about the photographs — recorded
 * by the person who was in the room (Photography Direction §22.5) — so the
 * picture editor decides what a chapter contains by what they record, and no
 * surface holds a list that could disagree with the archive (R7.1).
 */
export function chapterFrames(chapter: Chapter): Image[] {
  return Object.entries(imageLibrary())
    .filter(([, record]) => record.chapter === chapter && isEvidence(record))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([src, record]) => ({ src, ...record }));
}
