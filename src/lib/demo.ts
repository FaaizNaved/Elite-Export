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
export function reserve(image: Image, rank: EvidenceRank = "E3"): Image {
  return {
    ...image,
    src: `${RESERVED}${image.src}`,
    caption: undefined,
    evidenceRank: image.evidenceRank ?? rank,
  };
}

/** Reserve a frame only if it is one of the generated blocks. */
export const framed = (image: Image, rank: EvidenceRank = "E3"): Image =>
  DEMO_MODE && isGeneratedPlaceholder(image.src) ? reserve(image, rank) : image;

/** Reserve a list of frames, dropping any the archive cannot draw at all. */
export const framedAll = (images: readonly Image[], rank: EvidenceRank = "E3"): Image[] =>
  images.filter((image) => image.width && image.height).map((image) => framed(image, rank));

/**
 * What each chapter reserves, when the archive holds nothing for it.
 *
 * Nothing here is invented about the company. The **ranks** are Photography
 * Direction §5.1 and Documentary Storyboard §10.1 read straight through:
 * Recognition is bought only with an E1, a chapter of located views alone is a
 * mood piece, and a document is an E4 record. The **ratios** are the ones the
 * archive already holds. There are no subjects, no captions and no words.
 *
 * This is a shot list expressed as space — what has to be photographed, at what
 * grade, in what order, and how much of the page each frame will take.
 */
const CHAPTER_PLAN: Record<Chapter, ReadonlyArray<[EvidenceRank, number, number]>> = {
  /* The place, then a detail inside it, then one object off the bench. */
  C1: [
    ["E5", 2400, 1200],
    ["E2", 1600, 900],
    ["E6", 1200, 1200],
  ],
  C2: [
    ["E2", 2400, 1200],
    ["E6", 1200, 1200],
  ],
  /* §16's evidence table, exactly: one decision (E1) and one mechanism (E2). */
  C3: [
    ["E1", 2400, 1350],
    ["E2", 1600, 900],
  ],
  C4: [
    ["E2", 2400, 1200],
    ["E6", 1200, 1200],
    ["E2", 1600, 900],
  ],
  C5: [
    ["E2", 2400, 1200],
    ["E6", 1200, 1200],
  ],
  C6: [
    ["E2", 2400, 1200],
    ["E6", 1200, 1200],
  ],
  C7: [
    ["E1", 2400, 1350],
    ["E4", 1200, 1600],
  ],
  /* A record is never an opening (§10, grade G4), so C8 leads on the portrait
     document and follows it with the wider one. Both bounded — §31.3. */
  C8: [
    ["E4", 1200, 1600],
    ["E4", 1600, 1200],
  ],
  C9: [
    ["E2", 2400, 1200],
    ["E6", 1200, 1200],
  ],
  C10: [["E5", 2400, 1200]],
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

  return CHAPTER_PLAN[chapter].map(([rank, width, height], index) => ({
    src: `${RESERVED}${chapter}/${index + 1}`,
    width,
    height,
    alt: "",
    evidenceRank: rank,
    chapter,
    /* No provenance, because there is none. It is not stubbed out. */
  }));
}
