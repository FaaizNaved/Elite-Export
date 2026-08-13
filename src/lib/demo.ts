import placeholderManifest from "../../public/images/.placeholders.json";
import { chapterFrames as archiveFrames } from "@/lib/content";
import type { Chapter, EvidenceRank, Image } from "@/types";

/**
 * Demo mode — the reserved frame.
 *
 * **This layer changes nothing about what may be published.** The publication
 * gates, the Facts Register, the Placeholder gate and `isEvidence` are exactly
 * as they were: `npm run check:publication` still refuses nine of thirteen
 * gates and still names all 98 placeholder files. Nothing here is read by a
 * gate, by `check:content`, or by `images:record` — this module sits above the
 * content layer and is excluded from the scripts build for that reason.
 *
 * What it changes is what a **surface** does with the absence.
 *
 * UX Blueprint X8 says the absence is designed around, never filled with a
 * stand-in, and that rule produced a correct site that renders almost nothing:
 * `chapterFrames` asks the library for evidence, the library holds 98 frames
 * with no provenance, and every chapter refuses itself. The layout that will
 * exist when photography arrives cannot be seen, reviewed or approved — which
 * is a reviewing problem, not a publishing one.
 *
 * A **reserved frame** is the answer, and it is not a stand-in for a
 * photograph. It is the space the photograph will occupy, drawn at the
 * photograph's own ratio in the brand's own two paper tones. It states that a
 * photograph is coming. It never states that one exists.
 *
 * Three properties make it honest:
 *
 * 1. **It is not an image.** No file is served and no `<img>` is emitted, so
 *    the Placeholder gate — which reads files — sees nothing new.
 * 2. **It is the exact proportion of the frame it reserves.** When the
 *    photograph arrives the layout does not move by one pixel.
 * 3. **It carries no caption and no fact.** VDS §12.2 makes the caption a
 *    specification of the photograph; there is no photograph, so there is no
 *    specification. A company fact, figure, date or claim is not expressible
 *    here at all.
 *
 * Set `NEXT_PUBLIC_DEMO_MODE=off` to see every surface exactly as it ships with
 * no photography: every reserved frame disappears and every chapter that
 * cannot be told refuses itself again.
 */

/** Off is explicit. Any other value, including unset, is demo mode. */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "off";

/** The scheme that marks a frame as space rather than evidence. */
const RESERVED = "reserved:";

export const isReservedFrame = (src: string): boolean => src.startsWith(RESERVED);

/**
 * Every file the generator produced, as the site-absolute paths a document
 * references. `public/images/.placeholders.json` is the generator's own record
 * of its output, so this is a fact about the tree rather than a guess — and it
 * is the same file the Placeholder gate reads.
 */
const generated = new Set(
  (placeholderManifest as string[]).map((file) => file.replace(/^public/, "")),
);

/**
 * Whether a frame is one of the generated tone blocks.
 *
 * Those files exist so every path in the tree resolves. They are brown
 * gradients, they sit outside the closed eight-value palette (VDS §15.3), and
 * showing one to a client is worse than showing nothing. In demo mode they are
 * drawn as reserved frames instead: same ratio, same position, brand tones.
 */
export const isGeneratedPlaceholder = (src: string): boolean => generated.has(src);

/**
 * Reserve the space a frame will occupy.
 *
 * The measured width and height are kept, so the ratio is the real one. The
 * caption is dropped: a caption is a specification of a photograph (VDS §12.2)
 * and there is no photograph yet.
 */
export function reserve(
  image: Image,
  rank: EvidenceRank = "E3",
  shape?: [number, number],
  /**
   * What is reserved — the plate's own stamp, and it is a **shot direction**
   * rather than a caption. §12.2 makes a caption a specification of a
   * photograph; there is no photograph, so what is stated instead is the one
   * thing that is true of the rectangle: what will occupy it. It states nothing
   * about the company, carries no fact, figure or date, and is drawn inside the
   * trim at rank C so it can never be read as a caption beneath an image.
   */
  subject?: string,
): Image {
  return {
    ...image,
    src: `${RESERVED}${image.src}`,
    caption: subject,
    evidenceRank: image.evidenceRank ?? rank,
    ...(shape ? { width: shape[0], height: shape[1] } : {}),
  };
}

/**
 * The ratio a record row reserves for its frame.
 *
 * The generated files are square, and a square frame on the 5-unit column of a
 * §36.2 record row is 890px tall on a wide field — a category index two rows
 * long would be 1,800px of one tone. That square is not a fact about anything:
 * it is an artifact of the placeholder script's own ratio table, and every one
 * of those files is deleted the day photography lands.
 *
 * So the row reserves the shape the **layout** needs, which is the direction a
 * shot list is supposed to give: 3:2 landscape, the ratio §27.1's 1280
 * breakpoint was derived against. The client shoots to the reserved frame; the
 * frame does not bend to a stand-in.
 */
export const RECORD_ROW_SHAPE: [number, number] = [2400, 1600];

/** Reserve a frame only if it is one of the generated blocks. */
export const framed = (
  image: Image,
  rank: EvidenceRank = "E3",
  shape?: [number, number],
  subject?: string,
): Image =>
  DEMO_MODE && isGeneratedPlaceholder(image.src) ? reserve(image, rank, shape, subject) : image;

/**
 * What each chapter reserves, when the archive holds nothing for it.
 *
 * Nothing here is invented about the company. The **ranks** are Photography
 * Direction §5.1 and Documentary Storyboard §10.1 read straight through:
 * Recognition is bought only with an E1, a chapter of located views alone is a
 * mood piece, and a document is an E4 record. The **ratios** are the ones the
 * archive already holds. The **subjects** are shot directions and nothing else:
 * what has to be in the frame, phrased as an instruction to the photographer.
 * None of them states a fact, a figure, a date or a claim about the company,
 * and none of them is rendered as a caption — see `reserve`.
 *
 * This is a shot list expressed as space — what has to be photographed, at what
 * grade, in what order, and how much of the page each frame will take.
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

/**
 * The frames a surface has for a chapter.
 *
 * **The archive always wins.** A real photograph, recorded and provenanced,
 * displaces the reserved frame the moment it lands — MIB R8.7: the library
 * governs what can be told. Reservation is what happens when the library
 * answers with nothing, and only in demo mode.
 */
export function chapterFrames(chapter: Chapter): Image[] {
  const archive = archiveFrames(chapter);
  if (archive.length || !DEMO_MODE) return archive;

  return CHAPTER_PLAN[chapter].map(([rank, width, height, subject], index) => ({
    src: `${RESERVED}${chapter}/${index + 1}`,
    width,
    height,
    alt: "",
    /* The shot direction, stamped inside the trim — see `reserve`. It is not a
       caption and it states nothing about the company. */
    caption: subject,
    evidenceRank: rank,
    chapter,
    /* No provenance, because there is none. It is not stubbed out. */
  }));
}
