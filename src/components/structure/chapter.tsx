import type { ReactNode } from "react";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/typography";
import { EditorialImage } from "@/components/evidence";
import { cn } from "@/lib/cn";
import { chapterSchema } from "@/models";
import type { Chapter } from "@/types";
import { bleedsAtRank, sceneRefusal, type Scene } from "./scene";
import { imageSizes } from "@/utils/image";

/**
 * The chapter — Master Implementation Blueprint §11.1, and R11.2 calls it "the
 * most important component in the inventory and the one most likely to be
 * built wrongly, because every content system in the world encourages it to be
 * built as a generic 'section'."
 *
 * It is not generic. Four things distinguish it, and all four are expressed
 * below rather than left to a caller:
 *
 * 1. **It is one of ten named things.** `CHAPTERS` is the canonical set from
 *    Documentary Storyboard §7. There is no eleventh, and the type will not
 *    accept one.
 * 2. **It has a fixed position in an order.** The set is ordered; chapters are
 *    dropped, never re-ordered (§25.1 rule 3, N14).
 * 3. **It is told whole or not at all.** A chapter with no content renders
 *    nothing — it is absent, never partial (§11.1, §25.1 rule 3).
 * 4. **It must make sense alone.** §8.5: a chapter must stand whole to somebody
 *    who has seen no other chapter, which is why it carries its own `id` and is
 *    linkable.
 */

/**
 * Documentary Storyboard §7 — the canonical chapter set. The spine.
 *
 * The ten ids are `chapterSchema` in `models/primitives`, because the archive
 * records a chapter against every frame (R15.4) and one set expressed twice
 * would eventually disagree with itself (R7.1). `Record<Chapter, …>` makes the
 * compiler enforce that this table covers exactly those ten.
 */
export const CHAPTERS: Record<Chapter, { slug: string; title: string; question: string }> = {
  C1: { slug: "the-place", title: "The place", question: "Is anybody actually here?" },
  C2: {
    slug: "what-arrives",
    title: "What arrives",
    question: "Does the standard start before the work does?",
  },
  C3: {
    slug: "the-decision",
    title: "The decision",
    question: "Where is the skill that cannot be seen?",
  },
  C4: { slug: "the-shaping", title: "The shaping", question: "Does the process obey the material?" },
  C5: { slug: "the-joining", title: "The joining", question: "Do you know where things fail?" },
  C6: {
    slug: "the-finishing",
    title: "The finishing",
    question: "Is care taken after it stops being visible?",
  },
  C7: {
    slug: "the-gate",
    title: "The gate",
    question: "What happens to something that is not right?",
  },
  C8: {
    slug: "the-record",
    title: "The record",
    question: "Could you answer a question about this in three years?",
  },
  C9: { slug: "what-leaves", title: "What leaves", question: "Whose name goes on it?" },
  C10: { slug: "tomorrow", title: "Tomorrow", question: "Will this still be happening?" },
} as const;

export type ChapterId = Chapter;

/**
 * The order is the fact. §25.1 rule 1: chapters are dropped, never re-ordered.
 *
 * It is `chapterSchema.options` rather than a second list of the same ten ids.
 * R7.1: one source of truth — and an order re-typed beside the set it orders is
 * the exact shape R7.1 says will eventually disagree with itself.
 */
export const CHAPTER_ORDER: readonly ChapterId[] = chapterSchema.options;

/**
 * C3 is the designated Recognition chapter and C7 is its reserve (§7.2). In any
 * telling long enough to contain either, one of them must be present and must
 * be given more extent than any other chapter in that telling (N5).
 *
 * Only the reserve is named here: which chapter is Recognition on a given
 * surface is read from that surface's telling in `config/tellings.ts`, and a
 * second constant restating C3 beside it would be R7.1 broken.
 */
export const RESERVE_RECOGNITION_CHAPTER: ChapterId = "C7";

/**
 * The permitted chapter openings — Visual Design System §23.5, and the list is
 * closed. §6.4 requires consecutive chapters to open in different **manners**,
 * not merely with different content.
 *
 * Not permitted, and named as such: a horizontal rule, a background tint, a
 * label, a numbered badge, an icon, or a heading doing the work alone.
 * Creative Direction Book §22.1 calls the last of these "the announced
 * opening" and rejects it by name — which is why `opening` has no "heading"
 * member and why the chapter title is not rendered as a banner above the work.
 */
export type ChapterOpening =
  /** 1. A photograph at full bleed, with no text in the field. */
  | "photograph"
  /** 2. An inverted (Ink) field. */
  | "inverted"
  /** 3. A statement alone, with S6 above it. */
  | "statement"
  /** 4. A held moment immediately preceding. */
  | "held"
  /** 5. A change of column structure. */
  | "column";

export interface ChapterProps {
  id: ChapterId;
  opening: ChapterOpening;
  /**
   * The statement a `statement` or `inverted` opening carries. Copy is Brand
   * Bible §12 and not the build's (MIB R6.4), so the surface supplies it.
   */
  statement?: ReactNode;
  /**
   * The scenes the chapter is made of — Documentary Storyboard §9, §10, §11.
   *
   * **If none of them can be told the chapter does not render** — §11.1: it is
   * absent, never partial. `sceneRefusal` holds every reason, each in the words
   * of the rule that refuses it.
   */
  scenes: readonly Scene[];
  /** Whether this chapter is the telling's Recognition chapter (§7.2). */
  isRecognition?: boolean;
  /** Whether the telling opens on this chapter — N6 is a rule about that position. */
  opensTheTelling?: boolean;
  priority?: boolean;
  className?: string;
}

export function Chapter({
  id,
  opening,
  statement,
  scenes,
  isRecognition,
  opensTheTelling,
  priority,
  className,
}: ChapterProps) {
  /*
   * Told whole or not at all (§25.1 rule 3, UX Blueprint X8). Every reason a
   * chapter may not be told lives in one place, so a surface cannot tell one
   * the archive cannot carry — and a shorter telling is not a broken one.
   */
  if (sceneRefusal(scenes, { isRecognition, opensTheTelling })) return null;

  const chapter = CHAPTERS[id];

  /*
   * §23.5 opening 1: the opening is a photograph at full bleed with no text in
   * the field. It is the first frame of the first scene rather than a separate
   * one — a chapter that opened on a photograph it then showed again would
   * spend the same evidence twice (L10: one fact, stated once).
   */
  /*
   * §23.5's first opening is *a photograph at full bleed*, and Documentary
   * Storyboard §10's grade table is equally plain about the one grade that may
   * not take it: **G4 — the record — "Trust, late. Never an opening."**
   *
   * So a chapter opens on its first frame only where that frame is one the
   * opening can be made of. A record or an object (§31.3's bounded ranks) is
   * not, and forcing it to bleed would give a certificate the presence of the
   * decision that earned it — which is N6 read backwards.
   */
  const candidate = opening === "photograph" ? scenes[0]?.frames[0] : undefined;
  const openingFrame = candidate && bleedsAtRank(candidate.evidenceRank) ? candidate : undefined;

  return (
    <Section
      id={chapter.slug}
      /* §23.1: a chapter break is S6 — twice the section break. */
      break="chapter"
      tone={opening === "inverted" ? "ink" : "paper"}
      aria-label={chapter.title}
      className={cn(
        /*
         * §23.6: the inverted field is the strongest chapter marker available
         * and is rationed to at most once per surface, with a minimum extent of
         * one viewport height. A short inverted band is a decorative stripe.
         */
        opening === "inverted" && "min-h-svh",
        className,
      )}
    >
      {openingFrame && (
        <EditorialImage image={openingFrame} sizes={imageSizes.bleed} priority={priority} bleed />
      )}

      {(opening === "statement" || opening === "inverted") && statement && (
        <Field type="full" className="mt-s6">
          <Statement rank="t1" as="h2">
            {statement}
          </Statement>
        </Field>
      )}

      {scenes.map((scene, index) => {
        /* The opening consumed the chapter's first frame; it is not shown twice. */
        const frames = index === 0 && openingFrame ? scene.frames.slice(1) : scene.frames;
        const isLast = index === scenes.length - 1;

        return (
          <div
            key={index}
            /*
             * §23.1: the section break is S5 — "two passages of one argument",
             * which is exactly what two scenes of one chapter are. The chapter
             * break above is S6, twice it, so a reader distinguishes a new part
             * of this from a new thing without counting.
             */
            className={index > 0 ? "mt-s5" : undefined}
          >
            {frames.map((frame, position) => {
              /*
               * §31.3: presence follows the rank of the photograph, not the
               * preference of the surface. Bleed for E1, E2 and E5; bounded
               * for the E4 record and the E6 object, where the frame is part
               * of what is being shown.
               *
               * §23.2: elements within one passage are separated by S4. The
               * space is suppressed only where the frame really is the first
               * element of the chapter — when the opening consumed frame 0,
               * the next frame follows a photograph rather than beginning one,
               * and two bleed frames meeting at 0px read as a single image
               * with a caption stranded between them.
               */
              const bleed = bleedsAtRank(frame.evidenceRank);
              const image = (
                <EditorialImage
                  key={frame.src}
                  image={frame}
                  bleed={bleed}
                  sizes={bleed ? imageSizes.bleed : imageSizes.record}
                  className={index === 0 && position === 0 && !openingFrame ? undefined : "mt-s4"}
                />
              );

              /*
               * A bounded frame needs something bounding it. Rendered loose in
               * the section it fills the field exactly as a bleed frame does,
               * and §31.3's *deliberate change of register* becomes no change
               * at all — an E4 record arriving at the same presence as the E1
               * decision that earned it.
               *
               * The bound is the record column: `--container-record`, 480px,
               * which §10.1 sets and `imageSizes.record` already delivers to.
               * It sits inside the field rather than replacing it, flush left,
               * because §10.4 centres nothing.
               */
              return bleed ? (
                image
              ) : (
                <Field key={frame.src} type="full">
                  <div className="max-w-record">{image}</div>
                </Field>
              );
            })}

            {(scene.annotation || (isLast && scene.release)) && (
              <Field type="paired" className="mt-s4 flex flex-col gap-s3">
                {/* Brand Bible D1: the photograph argues, the words annotate. */}
                {scene.annotation}
                {/*
                 * §8.4, Creative Direction Book §22.2: the chapter ends by
                 * releasing — the last thing asked is smaller than the thing
                 * before it, and then there is space.
                 */}
                {isLast && scene.release}
              </Field>
            )}
          </div>
        );
      })}
    </Section>
  );
}
