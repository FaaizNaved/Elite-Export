import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, HeldMoment, Opening, RESERVE_RECOGNITION_CHAPTER, sceneRefusal, type Scene } from "@/components/structure";
import { Continuation } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { Passage, Statement } from "@/components/ui/typography";
import { qualityTelling } from "@/config";
import { getCompanyPage } from "@/lib/content";
import { chapterFrames } from "@/lib/demo";
import { companyPageMetadata } from "@/lib/seo";
import type { Chapter as ChapterId, StepBlock } from "@/types";

const SLUG = "quality";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

/**
 * Which inspection answers which chapter's question.
 *
 * The same table Manufacturing carries, asked of a different surface. UX
 * Blueprint §20's evidence rows are three, and each names the check that
 * answers it:
 *
 *   C2  the first gate, at the door — the standard applied before any value is added
 *   C7  the gate — what happens to something that is not right
 *   C8  the record — what was checked, kept so it can be answered for later
 *
 * **Pre-finishing inspection answers none of the three.** It is a real check
 * and its chapter is C6 — *care taken after it stops being visible* — which
 * Manufacturing tells and this surface hands on (`qualityTelling`). §25.1 rule
 * 1 and N14 forbid an eleventh chapter, and R5.2 forbids promoting it to one
 * under another name, so it is not told here rather than forced into a chapter
 * it does not belong to.
 *
 * The count of these is deliberately not stated anywhere on the surface. The
 * number of inspection gates is Brand Bible §19.4 and R20.3 names it: *the
 * surface states how inspection works and where it happens; confirmed figures
 * are added later into a structure that already holds them.* This is that
 * structure — three chapters, each named by its question rather than by its
 * position in a sequence.
 */
const INSPECTION_FOR: Partial<Record<ChapterId, string>> = {
  C2: "Raw material inspection",
  C7: "In-process inspection",
  C8: "Final inspection",
};

/**
 * Quality — the evidence surface.
 *
 * UX Blueprint §20: *to show that the standard is applied, that it costs
 * something, and that somebody outside the company has checked — **in that
 * order***. Creative Direction Book §20: *somebody outside this building
 * checked, and here is what they checked* — sober and evidential, and **the
 * least decorated page in the brand** (R20.6).
 *
 * It is composed as three chapters and nothing else, and four things the
 * previous implementation offered are gone, each by name:
 *
 * - **The four numbered gates.** R20.3: the inspection gate count is
 *   unconfirmed (Brand Bible §19.4), and a numbered sequence of four publishes
 *   it whether or not a figure is typed. R5.2 also refuses the shape: the level
 *   between a surface and a component is a chapter, not a section somebody put
 *   a heading on. The inspections are now the annotations of the chapters whose
 *   questions they answer.
 * - **The hero photograph.** A generated placeholder; Photography Direction
 *   §24.5 has no exception.
 * - **The prose body.** MIB R5.3: a surface is chapters, and prose that belongs
 *   to no chapter has no level to live at. It also carried an unqualified
 *   quality claim and a capability claim with no evidence beneath it (Brand
 *   Bible §11.2, UX Blueprint E1).
 * - **The close's sentence.** *"Book an inspection"* was authored in this file,
 *   which R6.4 does not permit; R39.8 fixes the action's wording site-wide.
 *
 * What is **not** here is the surface's argument as much as what is. R20.1:
 * *never lead with badges — a row of certification marks at the top of this
 * surface is the single most damaging arrangement available to it.* No
 * certification record appears at all: MIB dependency 7 holds issuer,
 * reference, date and scope, and R20.4 does not publish a finding missing any
 * of them. *Quality states mechanism; no marks appear.*
 *
 * R11.1 and §25.1 rule 3: a chapter with insufficient evidence is **absent from
 * the surface; it does not appear as a heading with a sentence beneath it.**
 * The archive holds no frame for any chapter, so all three are currently
 * absent — and C7 would refuse itself even with frames until one of them shows
 * a rejection (MIB dependency 4). The surface is a shorter telling, not a
 * broken one.
 */
export default async function QualityPage() {
  const page = await getCompanyPage(SLUG);
  if (!page) notFound();

  const inspections = new Map(page.steps.map((step: StepBlock) => [step.title, step]));

  /**
   * One scene per chapter: the frames the archive holds for it, annotated by
   * the inspection that answers its question.
   *
   * §11.1's relationship is absent because each chapter currently has one
   * scene, and a relationship is what a *pair* proves (§11.4). C7's pair is
   * already named — §11.1's `refusal-and-acceptance`, *a piece rejected beside
   * a piece passed: the threshold has a location* — and it arrives with the
   * second scene, which arrives with the library.
   */
  const scenesFor = (id: ChapterId): Scene[] => {
    const frames = chapterFrames(id);
    const inspection = INSPECTION_FOR[id] ? inspections.get(INSPECTION_FOR[id]) : undefined;

    return [
      {
        frames,
        annotation: inspection && (
          <>
            <Statement rank="t3" as="h2">
              {inspection.title}
            </Statement>
            <Passage measure={false}>{inspection.description}</Passage>
          </>
        ),
      },
    ];
  };

  const chapters = qualityTelling
    .filter((plan) => plan.role === "tells")
    .map((plan) => ({ ...plan, scenes: scenesFor(plan.chapter) }));

  /*
   * N6 governs the telling's opening: no claim arrives before the work that
   * justifies it — and §21.1 is the same rule stated for this surface in
   * particular, *an outside finding shown early is a badge; the same finding
   * shown after the process that earned it is a conclusion.* Which chapter
   * opens is a fact about the archive, so it is derived rather than assumed.
   */
  const opensTheTelling = chapters.find((chapter) => chapter.scenes.some((scene) => scene.frames.length))
    ?.chapter;

  return (
    <>
      <Opening title={page.title} eyebrow={page.eyebrow} summary={page.summary} />

      {chapters.map(({ chapter, scenes }) => {
        /*
         * §7.2 makes C7 Recognition's reserve and R20.2 spends it here: *the
         * rejection is the argument. A gate shown passing things is a
         * formality; a gate shown refusing something is a threshold with a
         * cost.* §10.1 rule 3 with Photography §5.1 decide whether it may be
         * told at all — Recognition is bought only with a decision being taken,
         * and without an E1 frame this chapter refuses itself. That is MIB
         * dependency 4 expressed as code rather than as a note: until a
         * rejection can be observed rather than arranged, Quality carries C2
         * and C8 only.
         */
        const isRecognition = chapter === RESERVE_RECOGNITION_CHAPTER;
        const opensHere = chapter === opensTheTelling;

        /*
         * §23.4 and MIB R11.1: exactly one held moment per surface longer than
         * three viewport heights, and it precedes C7 — §22.3, *silence before a
         * claim, the pause that makes the next statement land.* It is asked of
         * **this** chapter rather than of the surface, because a held moment
         * before a chapter that refused itself is silence before nothing: the
         * §23.5 opening the chapter was given, standing where the chapter is
         * not. R11.1's "never removed to fit content; the content is removed
         * instead" runs the other way too — when the content is absent, so is
         * the space held for it.
         */
        const tellable = !sceneRefusal(scenes, { isRecognition, opensTheTelling: opensHere });

        const element = (
          <Chapter
            id={chapter}
            opening={isRecognition ? "held" : "photograph"}
            isRecognition={isRecognition}
            opensTheTelling={opensHere}
            priority={opensHere}
            scenes={scenes}
          />
        );

        return isRecognition ? (
          <Fragment key={chapter}>
            {tellable && <HeldMoment />}
            {element}
          </Fragment>
        ) : (
          <Fragment key={chapter}>{element}</Fragment>
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
          <Continuation href={ROUTES.exportCapabilities}>What leaves the building</Continuation>
        </Field>
      </Section>
    </>
  );
}

