import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, HeldMoment, Opening, sceneRefusal, type Scene } from "@/components/structure";
import { Continuation } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { aboutTelling } from "@/config";
import { getCompanyPage } from "@/lib/content";
import { chapterFrames } from "@/lib/plates";
import { companyPageMetadata } from "@/lib/seo";
import type { Chapter as ChapterId } from "@/types";

const SLUG = "about";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

/**
 * About — the surface that answers *who am I dealing with*.
 *
 * UX Blueprint §22: *the people and the place, **without becoming a founder
 * legend, a timeline or a values list***. Creative Direction Book §20: *meeting
 * the people and the place, not the founder's legend* — **plain-spoken, a page
 * that would embarrass nobody who works there.**
 *
 * It is **two chapters, the first and the last of the canonical set**, and
 * `aboutTelling` carries why. C1 is §22's *place, named and located* and MIB
 * R19.1 makes it blocking for this surface; C10 is §22's *people at their work*
 * and R22.5 — *About carries C10 and therefore ends by continuing.* §24.3 is why
 * they are here together: **C10 comes back to where C1 began** — the same rooms,
 * nothing announced, the difference entirely in the viewer — which the
 * Storyboard calls *the only structural symmetry this brand permits*.
 *
 * Five things the previous implementation offered are gone, each by name:
 *
 * - **The prose body**, and with it four of the nine stories §5 permanently
 *   closes to this brand. It opened on *"began in 1998 with four craftsmen, one
 *   clicking press and a single overseas buyer"* — **the founder's journey**,
 *   which *relocates the argument from the floor to a biography, and biographies
 *   cannot be audited*. It continued into **the growth story** (three lines,
 *   eight countries), and it carried a `## Vision` and a `## Mission` — **the
 *   mission**, which §5 closes because *the Manifesto is internal and never
 *   published* (Brand Bible §2.1) and *beliefs stated aloud are claims*. R22.1
 *   forbids all three by name, and R5.3 removes it anyway: a surface is
 *   chapters, and prose that belongs to no chapter has no level to live at.
 * - **`eyebrow: Our story`.** The announcement of a biography, on the surface
 *   §5.1 exists to keep from having one: **this story has no protagonist.**
 * - **`subtitle: Three decades of leather, one standard`.** A duration derived
 *   from an unconfirmed founding year (dependency 2), and §5's *heritage and
 *   tradition* besides.
 * - **"…since 1998"** — the summary, rendered in the Opening. R22.1 permits the
 *   founding date only as *a fact stated once, never a passage*, and dependency
 *   2 holds it: it is not stated at all yet.
 * - **The hero photograph, and "Come and see the floor".** A generated
 *   placeholder (Photography Direction §24.5), and a sentence authored in a page
 *   file (R6.4).
 *
 * What is **absent** carries as much of §22 as what is here:
 *
 * - **No person appears.** Dependency 5 is **blocking** — *no person appears,
 *   named or unnamed, in any image* — and R22.3 is the same rule stated
 *   forward: *a person is named only with written consent; consent obtained
 *   afterwards is not consent.* C10's whole subject is people, so the chapter
 *   waits rather than substitutes. R22.2 removes the shape it would otherwise
 *   take: **no portrait grid.**
 * - **No founding fact.** §22's rank-8 row, held by dependency 2 — the surface
 *   §22 itself calls *where the discrepancy would be most visible*.
 * - **No limit statement.** §22's rank-6 row and R22.4: *this is the surface
 *   where "we do not do X" is least defensive and most credible.* No document
 *   states the limits, and §12.1 puts them inside the chapter whose capability
 *   they qualify rather than on a collection of their own. Dependency 12.
 */
export default async function AboutPage() {
  const page = await getCompanyPage(SLUG);
  if (!page) notFound();

  /*
   * One scene per chapter: the frames the archive holds for it (R8.7 — the
   * library governs what can be told, and the library wins).
   *
   * **No annotation, on either chapter.** That is the difference between this
   * surface's C1 and Home's, which carries the company's own account of itself:
   * §7.1 says C1's argument is *accumulation, not information* — the viewer
   * should stop wondering whether the building exists *without having been told
   * that it does* — and §22's *named and located* is the footer's record, on
   * every surface already (L10: one fact, stated once). N3 is the same rule for
   * C10: **the viewer was there**, and a chapter that ends with somebody
   * explaining what it meant has been annotated rather than ended (§8.2).
   */
  const scenesFor = (id: ChapterId): Scene[] => [{ frames: chapterFrames(id) }];

  const chapters = aboutTelling
    .filter((plan) => plan.role === "tells")
    .map((plan) => ({ ...plan, scenes: scenesFor(plan.chapter) }));

  /*
   * N6 governs the telling's opening: no claim arrives before the work that
   * justifies it. Which chapter opens is a fact about the archive, so it is
   * derived rather than assumed to be C1.
   */
  const opensTheTelling = chapters.find((chapter) => chapter.scenes.some((scene) => scene.frames.length))
    ?.chapter;

  return (
    <>
      <Opening title={page.title} eyebrow={page.eyebrow} summary={page.summary} />

      {chapters.map(({ chapter, scenes }) => {
        const opensHere = chapter === opensTheTelling;

        /*
         * §23.4 and MIB R11.1: exactly one held moment per surface longer than
         * three viewport heights. There is no Recognition chapter here — §7.2
         * spends C3 on Manufacturing and C7 on Quality — so it stands before
         * **the return** (§24.3), which is the one moment this surface has that
         * §22.3's *silence before a claim* describes: C10's claim is permanence,
         * and §24.1 says permanence cannot be stated, only implied by somebody
         * carrying on. §24.4 puts a passage that asks nothing next to the last
         * scene; here it precedes it, because the Close follows and R39.3 will
         * not have silence standing between an argument and its action.
         *
         * It is asked of the chapter, not of the surface: silence held before a
         * chapter that refused itself is §23.5's fourth opening standing where
         * the chapter is not. Dependency 5 makes that the shipping state here.
         */
        const holdsBefore = chapter === "C10";
        const tellable = !sceneRefusal(scenes, { opensTheTelling: opensHere });

        return (
          <Fragment key={chapter}>
            {holdsBefore && tellable && <HeldMoment />}
            {/*
              §6.4 is Fixed — consecutive chapters on one surface may not open in
              the same manner — and this surface is the one place in the site
              where exactly two chapters sit adjacent. C1 opens on §23.5's first
              manner, a photograph at full bleed; C10 on its fourth, a held
              moment immediately preceding. The pair is also §24.3's symmetry
              made visible: the rooms arrive twice, entered differently.
            */}
            <Chapter
              id={chapter}
              opening={holdsBefore ? "held" : "photograph"}
              opensTheTelling={opensHere}
              priority={opensHere}
              scenes={scenes}
            />
          </Fragment>
        );
      })}

      {/*
        No close, and no action.

        UX Blueprint R39.3 permitted one here. The Presentation package removed
        it on the client's instruction: the site carried the same ask on eight
        surfaces, and an ask repeated eight times is not confidence, it is
        anxiety — Brand Bible §16.4, *a luxury brand does not chase.*

        The action now stands in three places only, and each is somewhere a
        visitor has already decided something: **Home** at the end of the whole
        documentary, the **product record** where one specific piece is in front
        of them, and **Enquiry**, where the action is the surface. R39.1 is
        untouched — one action, one door, one label.

        What stands here instead is the continuation — R39.2: *a link rather
        than a demand,* naming what comes next. §8.4: a chapter ends by
        releasing, and the last thing asked is smaller than the thing before it.
      */}
      <Section break="chapter">
        <Field type="full">
          <Continuation href={ROUTES.manufacturing}>How the work is done</Continuation>
        </Field>
      </Section>
    </>
  );
}
