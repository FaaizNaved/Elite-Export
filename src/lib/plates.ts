import { chapterFrames as archiveFrames } from "@/lib/content";
import { isGeneratedPlaceholder } from "@/lib/placeholders";
import type { Chapter, EvidenceRank, Image } from "@/types";

/**
 * The plate.
 *
 * A plate is a **design element**, not a mode. It is the space a photograph
 * occupies, drawn at that photograph's own ratio as a lit archival board — a
 * warm ground, a raking light, a blind-embossed edge, four crop marks and a
 * label beneath it. It is part of this site's visual language in the same way
 * the hairline and the paper ground are.
 *
 * There is **one website**. No environment variable changes what renders, no
 * flag turns a section on, and nothing on any surface disappears because a
 * photograph has not arrived. The rule is one line, and it is the whole of this
 * module:
 *
 *   a real photograph renders as a photograph;
 *   anywhere the library still holds a generated file, the plate renders.
 *
 * That gives the composition the client sees today and the composition that
 * ships the day photography lands, from the same build. When a real frame
 * replaces a generated one in `public/images`, the plate becomes the
 * photograph at that position — same ratio, same place, nothing moves.
 *
 * It also makes it impossible to serve one of the generated files: they are
 * never emitted as an `<img>`, at any width, in any environment.
 */

/** The scheme that marks a frame as a plate rather than a photograph. */
const PLATE = "plate:";

export const isPlate = (src: string): boolean => src.startsWith(PLATE);

/**
 * Whether a frame may be drawn at all.
 *
 * A frame with no measured size cannot be laid out — the ratio is what
 * reserves the space (VDS §32.1) — so it is refused. Everything else draws:
 * a photograph as a photograph, a generated path as a plate.
 */
export const isDrawableFrame = (image: Image): boolean => Boolean(image.width && image.height);

/**
 * Turn a frame into a plate, keeping its ratio and its position.
 *
 * `shape` overrides the ratio where the layout needs a particular one — the
 * generator emitted squares, and a square is an artifact of its ratio table
 * rather than a fact about the picture that will replace it. `subject` is the
 * shot direction printed beneath the plate: what has to be in the frame.
 */
export function plate(
  image: Image,
  rank: EvidenceRank = "E3",
  shape?: [number, number],
  subject?: string,
): Image {
  return {
    ...image,
    src: `${PLATE}${image.src}`,
    caption: subject ?? image.caption,
    evidenceRank: image.evidenceRank ?? rank,
    ...(shape ? { width: shape[0], height: shape[1] } : {}),
  };
}

/**
 * A frame as the page should draw it: the photograph if there is one, the
 * plate if the library still holds a generated file at that path.
 */
export const framed = (
  image: Image,
  rank: EvidenceRank = "E3",
  shape?: [number, number],
  subject?: string,
): Image => (isGeneratedPlaceholder(image.src) ? plate(image, rank, shape, subject) : image);

/**
 * The ratio a record row reserves for its frame — 3:2 landscape, the ratio
 * §27.1's 1280 breakpoint was derived against.
 */
export const RECORD_ROW_SHAPE: [number, number] = [2400, 1600];

/** Re-exported for the render layer; the declaration lives with the library. */
export { DELIVERY_SHAPES } from "@/lib/content/images";

/**
 * What each chapter shows.
 *
 * The archive first: any chapter the library can prove is drawn from real
 * frames. Where it holds none, the chapter is drawn from the plan below —
 * which is a shot list expressed as space: what has to be photographed, at
 * what grade, in what order, and how much of the page each frame takes.
 *
 * The **subjects** are shot directions and nothing else. None states a fact, a
 * figure, a date or a claim about the company.
 */
const CHAPTER_PLAN: Record<Chapter, ReadonlyArray<[EvidenceRank, number, number, string]>> = {
  /*
   * Two frames, not three, and they are different shapes.
   *
   * A reserved frame is honest but it is not interesting, and at §31.4's
   * proportions a bleed frame is 60–100% of the viewport. Three of them in one
   * chapter is 2,000px of one flat tone, which does not read as *the layout,
   * pending photography* — it reads as a page that has failed to load. The
   * ratio of every frame is still exact, so nothing moves when the photographs
   * arrive; there are simply fewer frames holding the shape of the argument.
   *
   * The place at bleed, then one object off the bench, bounded (§31.3).
   */
  C1: [
    ["E5", 1800, 2250, "The workshop floor, Kanpur"],
    ["E6", 1300, 1000, "Harness leather on the bench"],
  ],
  C2: [
    ["E2", 2400, 1200, "A hide being graded at intake"],
    ["E6", 1200, 1200, "Rejected section, marked"],
  ],
  /*
   * One frame. Recognition is one decision being taken.
   *
   * §7.1 is unusually direct about what this chapter has to do: make a viewer
   * understand that *a decision was taken*, not that a machine was operated.
   * That is one photograph. §31.3 gives both E1 and E2 the bleed, so a second
   * frame here is a second full-viewport image 48px below the first — and two
   * bleeds meeting at S4 are read as one tall block with a seam in it, which is
   * the note `Chapter` already carries about frames meeting at zero.
   *
   * The mechanism §16's evidence table asks for is not lost: it is stated in
   * the annotation beside the frame, in the words the content layer already
   * holds, and it arrives as an E2 photograph the day the archive has one.
   */
  C3: [["E1", 2400, 1080, "The cut being decided, along the backbone"]],
  C4: [
    ["E2", 2400, 1200, "Skiving to thickness"],
    ["E6", 1200, 1200, "A shaped component, off the press"],
    ["E2", 1600, 900, "The edge, being burnished"],
  ],
  C5: [
    ["E2", 2400, 1200, "The saddle stitch, two needles"],
    ["E6", 1200, 1200, "A finished stress point"],
  ],
  C6: [
    ["E2", 2400, 1200, "Hand finishing, after the seam is closed"],
    ["E6", 1200, 1200, "Hardware, set and seated"],
  ],
  C7: [
    ["E1", 2400, 1350, "A piece being refused at the gate"],
    ["E4", 1200, 1600, "The inspection record for that piece"],
  ],
  /* A record is never an opening (§10, grade G4), so C8 leads on the portrait
     document and follows it with the wider one. Both bounded — §31.3. */
  C8: [
    ["E4", 1200, 1600, "The batch file, as it is kept"],
    ["E4", 1600, 1200, "Three years of records, on the shelf"],
  ],
  C9: [
    ["E2", 2400, 1200, "An order being packed for dispatch"],
    ["E6", 1200, 1200, "The carton, marked and sealed"],
  ],
  C10: [["E5", 2400, 1200, "The bench tomorrow morning"]],
};

export function chapterFrames(chapter: Chapter): Image[] {
  const archive = archiveFrames(chapter);
  if (archive.length) return archive;

  return CHAPTER_PLAN[chapter].map(([rank, width, height, subject], index) => ({
    src: `${PLATE}${chapter}/${index + 1}`,
    width,
    height,
    alt: "",
    /* The shot direction, printed beneath the plate. Not a caption: it states
       what will occupy the frame, never anything about the company. */
    caption: subject,
    evidenceRank: rank,
    chapter,
  }));
}
