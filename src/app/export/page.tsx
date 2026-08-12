import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, HeldMoment, Opening, sceneRefusal, type Scene } from "@/components/structure";
import { Continuation } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { exportTelling } from "@/config";
import { getCompanyPage } from "@/lib/content";
import { chapterFrames } from "@/lib/demo";
import { companyPageMetadata } from "@/lib/seo";
import type { Chapter as ChapterId } from "@/types";

const SLUG = "export";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

/**
 * Export — the surface that answers *can you ship to me*.
 *
 * UX Blueprint §21: *to show that goods leave correctly, documented, to markets
 * already served — presented as **logistics competence rather than as reach***.
 * Creative Direction Book §20: *competent logistics, calmly handled*, and
 * **unglamorous by design — logistics competence should look like logistics
 * competence.**
 *
 * It is **one chapter**, C9, and nothing else. MIB R19.1: *dispatch as an
 * operation is the whole argument of the surface.* `exportTelling` carries why
 * the other nine are handed on — C8 among them, because the documents that
 * leave with the goods are inside C9 (§7 gives it the grade *process and
 * records*) and telling the record chapter twice is one fact stated twice
 * (L10). §25.1 rule 4 names this shape rather than treating it as a shortfall:
 * the shortest telling is one chapter, and below that make nothing.
 *
 * Four things the previous implementation offered are gone, each by name:
 *
 * - **The four-step order ladder** (`ProcessSteps`, *"From enquiry to
 *   dispatch"*). §7.4 is explicit that **the offer is not a chapter** — *there
 *   is no chapter that sells* — and R5.2 refuses the shape as well: the level
 *   between a surface and a component is a chapter, not a numbered sequence.
 *   Three of its four steps stated a lead time and the fourth stated an AQL
 *   band and an incoterm, all Brand Bible §19.4, and its first sentence was
 *   Quality's final inspection restated.
 * - **The hero photograph.** A generated placeholder; Photography Direction
 *   §24.5 has no exception.
 * - **The prose body.** MIB R5.3: a surface is chapters, and prose that belongs
 *   to no chapter has no level to live at. It also named eight countries, which
 *   is the whole of dependency 8 — *Export states process; no markets are
 *   named.*
 * - **"Ready to place an enquiry?"** — the close's sentence, authored in this
 *   file, which R6.4 does not permit. R39.8 fixes the action's wording
 *   site-wide.
 *
 * What is **absent** is as much the argument as what is here, and none of it is
 * substituted (X8):
 *
 * - **No market is named, and no reach is drawn.** R21.1: *no maps, globes,
 *   arcs, aircraft or animated route lines. Markets are a record.* R21.4: a
 *   country is a record on this surface, never a surface of its own. Dependency
 *   8 holds the record, so the surface states process instead — which is the
 *   instruction the register already carries.
 * - **No incoterm and no lead time.** R21.3: they are not published until
 *   confirmed (dependency 3); the surface states that terms are agreed per
 *   order and what is needed to agree them, which is copy and is dependency 12.
 * - **No failure path.** R21.5 puts it here — *what happens if a shipment is
 *   held or documentation is queried*, rank 6, *the reason an importer believes
 *   the rest* — and no document states it. Inventing one would be the failure
 *   the surface exists to refuse.
 * - **No named person.** §21's rank-7 row waits on dependency 20.
 */
export default async function ExportPage() {
  const page = await getCompanyPage(SLUG);
  if (!page) notFound();

  /*
   * One scene per chapter: the frames the archive holds for it (R8.7 — the
   * library governs what can be told, and the library wins).
   *
   * No annotation. §11.1's relationship is absent for the same reason it is on
   * Manufacturing and Quality — a relationship is what a *pair* proves (§11.4)
   * — and C9's own pair is already named: §11.1's `act-and-record`, *an
   * operation, then the document it produced. Trust, without a word.* That is
   * §21's second evidence row, and it arrives as C9's second scene rather than
   * as a chapter of its own.
   */
  const scenesFor = (id: ChapterId): Scene[] => [{ frames: chapterFrames(id) }];

  const chapters = exportTelling
    .filter((plan) => plan.role === "tells")
    .map((plan) => ({ ...plan, scenes: scenesFor(plan.chapter) }));

  /*
   * N6 governs the telling's opening: no claim arrives before the work that
   * justifies it. Which chapter opens is a fact about the archive, so it is
   * derived rather than assumed — and on a one-chapter surface it is also the
   * rule that decides whether the surface may lead on a record. §10.1 rule 5
   * refuses a telling whose first frame is one.
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
         * three viewport heights. There is no Recognition chapter here to
         * precede — §7.2 spends C3 on Manufacturing and C7 on Quality — so it
         * stands before the chapter that carries the surface's whole argument
         * (R19.1), which is §22.3's *silence before a claim, the pause that
         * makes the next statement land.*
         *
         * It is asked of the chapter, not of the surface: silence held before a
         * chapter that refused itself is §23.5's fourth opening standing where
         * the chapter is not. Found while composing Quality and fixed on three
         * surfaces now.
         */
        const tellable = !sceneRefusal(scenes, { opensTheTelling: opensHere });

        return (
          <Fragment key={chapter}>
            {tellable && <HeldMoment />}
            {/*
              §23.5's fourth opening — a held moment immediately preceding. It
              is the manner this chapter opens in, so the frames are not also
              spent as a bleed opening above it (§6.4 is about *kind*, and one
              chapter cannot open in two).
            */}
            <Chapter id={chapter} opening="held" opensTheTelling={opensHere} priority={opensHere} scenes={scenes} />
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
          <Continuation href={ROUTES.products}>What we make</Continuation>
        </Field>
      </Section>
    </>
  );
}
