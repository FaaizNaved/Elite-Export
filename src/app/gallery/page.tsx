import type { Metadata } from "next";
import { EditorialImage, EvidenceSet } from "@/components/evidence";
import { bleedsAtRank, CHAPTER_ORDER, CHAPTERS, isEvidenceSet, Opening } from "@/components/structure";
import { StateNotice } from "@/components/system";
import { TextLink } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { chapterFrames } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { imageSizes } from "@/utils/image";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Inside the Elite Export factory.",
  path: ROUTES.gallery,
});

/**
 * Gallery — the corroborating surface.
 *
 * UX Blueprint §23: *unmediated access to the evidence — **the file rather than
 * the presentation** — where the volume of evidence is itself the argument.*
 * Question: **"Is any of this real?"** Creative Direction Book §20: *documentary
 * — the one place where volume of evidence is itself the argument*, and it must
 * never *become an art project, retouch toward beauty, or sequence for drama.*
 *
 * Its required outcome is the reason it exists: *a sceptical visitor, having
 * seen the argued surfaces, can check them against **unargued material** and
 * find nothing that contradicts.*
 *
 * ### It is the library, chapter by chapter
 *
 * **R23.4 — sets are organised by chapter, never by aesthetic theme**: *"the
 * floor", "the gate", "dispatch" — not "details", "textures", "moments".* The
 * surface therefore reads the archive directly, in canonical chapter order
 * (§25.1 rule 1, which is also R23.1's *not sequenced for drama*), rather than
 * from a set of albums a person grouped by subject. Which frames belong to a
 * chapter is recorded against the photograph by the picture editor (R15.4,
 * Photography §22.5), so the organisation R23.4 requires is a property of the
 * library rather than a naming discipline this file has to keep.
 *
 * `chapterFrames` is the same accessor every told surface uses — R8.7: *the
 * order governs surfaces; the library governs what can be told, and the library
 * wins.* Gallery is that sentence with nothing in front of it.
 *
 * ### What it is not, and why the previous implementation was each of them
 *
 * - **Not albums.** *Factory · Machinery · Products · Packaging · Events* are
 *   aesthetic themes, which R23.4 forbids by name — and *Events* (a trade fair
 *   stand, a buyer on the floor) is not a chapter at all: §7.4, *we do not
 *   exhibit our clients.*
 * - **Not a masonry grid.** VDS §31.1 is **Fixed** — *no two photographs of
 *   similar weight appear in one viewport* — and R23.2 refuses this surface an
 *   exemption in the same breath as it grants the volume: *governed by the
 *   Visual Design System's rules on sets **rather than by an exception to
 *   them***. Volume here is **extent down the page**, not density across it.
 *   The one place equal treatment is correct is the E3 set (§31.1's exception,
 *   `EvidenceSet`), where the comparison *is* the argument.
 * - **Not a browser.** R23.5: no lightbox, no slideshow, no autoplay. *An image
 *   worth opening was worth placing at full presence*, so presence follows rank
 *   (§31.3) exactly as it does inside a chapter.
 * - **Not a telling.** No `Chapter` is composed here. §23 says the surface
 *   *never carries the argument alone*, and R23.6 is the mechanism: *twenty
 *   views of a place prove a building; the decision being taken proves the
 *   company.* A chapter of twenty located views refuses itself as a mood piece
 *   (§10.1 rule 2) — correctly, because a chapter argues. A Gallery set does
 *   not, so it is a set and not a chapter, and it links to where its chapter is
 *   argued instead of arguing there.
 *
 * ### No action, in any form
 *
 * R39.3: **Gallery, never — *evidence is not a sales surface.*** R39.4 says it
 * three more ways: never above or beside evidence being examined, never on
 * Gallery, and VDS §31.2 makes *photograph + action* the one pairing that is
 * **Never** permitted. There is no `Close` on this surface and no route into
 * Enquiry from it — including from the empty state, whose `route` is off for
 * that reason.
 */
export default async function GalleryPage() {
  /*
   * Only the chapters the archive can actually show. A chapter with no frame is
   * not an absent chapter here — nothing is being told — it is simply a part of
   * the library that does not exist yet.
   */
  const sets = CHAPTER_ORDER.map((id) => ({ id, chapter: CHAPTERS[id], frames: chapterFrames(id) })).filter(
    (set) => set.frames.length > 0,
  );

  return (
    <>
      {/*
        The words are the surface's name and nothing else. Two things stood here
        and both were presentation on the surface that exists to have none:

        - `eyebrow: "Inside Elite Export"` — §12.3 makes an eyebrow *a location
          in the structure*, and that is a framing.
        - `summary: "…photographed on ordinary production days."` — a provenance
          claim made once, in prose, for the whole library. R23.3 and Photography
          §24.4 put provenance **on each frame**, and a blanket version of it is
          the curatorial statement R23.1 refuses.
      */}
      <Opening title="Gallery" />

      {sets.length === 0 ? (
        <Section>
          <Field type="reading">
            {/*
              §23's dependency note is the strongest in the blueprint: *until the
              library exists, **this surface does not exist** — it cannot be
              built around the absence of images, because images at volume are
              its whole content.* Gallery is the one surface X8 does not cover,
              so it states its condition rather than composing around it (R47.1:
              a state is a fact about the system, and facts are stated plainly).

              `route={false}` — R39.3 and R39.4 keep every enquiry path off this
              surface, and the footer's index carries the route to a person on
              every page regardless.
            */}
            <StateNotice state="empty" route={false}>
              No photographs have been published here yet.
            </StateNotice>
          </Field>
        </Section>
      ) : (
        sets.map(({ id, chapter, frames }, position) => (
          <Section key={id} break="chapter" aria-label={chapter.title}>
            <Field type="full">
              {/*
                R23.4's name for the set, and §23's *it links back to the chapter
                each set belongs to* — one element doing both, because the name
                of the set and the name of the chapter are the same word and L10
                does not want it twice. Manufacturing is the complete telling
                (C1–C10) and every chapter is addressable there (§8.5), so that
                is where the link goes. §47.5's 44px target, as `RecordSet` does
                it.
              */}
              <Statement rank="t3" as="h2">
                <TextLink
                  href={`${ROUTES.manufacturing}#${chapter.slug}`}
                  className="inline-flex min-h-11 items-center"
                >
                  {chapter.title}
                </TextLink>
              </Statement>
            </Field>

            {isEvidenceSet(frames) ? (
              /*
                §31.1's single exception: three to five frames of one operation,
                treated identically, *because there the comparison is the
                argument: the same act, the same way, repeatedly.* The predicate
                is the archive's own — all E3, three to five — and where it does
                not hold the frames fall back to one at a time, which is the
                Fixed default rather than a lesser version of this.
              */
              <Field type="full" className="mt-s4">
                <EvidenceSet frames={frames} />
              </Field>
            ) : (
              frames.map((frame, index) => {
                /*
                 * §31.3, unchanged from every other surface: bleed for E1, E2
                 * and E5; bounded in the record column for the E4 record and
                 * the E6 object, where the frame is part of what is shown.
                 * MIB §12.1's Gallery item is *photograph + record* — which is
                 * `EditorialImage`, and it cannot render a frame whose record
                 * is missing (R12.2, R23.3).
                 */
                const bleed = bleedsAtRank(frame.evidenceRank);
                const image = (
                  <EditorialImage
                    image={frame}
                    bleed={bleed}
                    sizes={bleed ? imageSizes.bleed : imageSizes.record}
                    priority={position === 0 && index === 0}
                    className="mt-s4"
                  />
                );

                return bleed ? (
                  <div key={frame.src}>{image}</div>
                ) : (
                  <Field key={frame.src} type="full">
                    <div className="max-w-record">{image}</div>
                  </Field>
                );
              })
            )}
          </Section>
        ))
      )}

      {/* No action, and nothing after the evidence. R39.3: Gallery, never. */}
    </>
  );
}
