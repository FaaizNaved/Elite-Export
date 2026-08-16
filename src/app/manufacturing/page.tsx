import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chapter, HeldMoment, Opening, sceneRefusal, type Scene } from "@/components/structure";
import { Continuation } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Passage, Statement } from "@/components/ui/typography";
import { manufacturingTelling } from "@/config";
import { ROUTES } from "@/constants";
import { getCompanyPage } from "@/lib/content";
import { chapterFrames } from "@/lib/plates";
import { companyPageMetadata } from "@/lib/seo";
import type { Chapter as ChapterId, StepBlock } from "@/types";

const SLUG = "manufacturing";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

/**
 * Which operation answers which chapter's question.
 *
 * Documentary Storyboard §8.1: **a chapter is a change of question, not a
 * change of place, subject or operation.** The floor performs many operations
 * and the set has ten members for exactly that reason — *the operations are
 * numerous, the questions are few.* This table is the mapping between the two,
 * and every row is §7.1's own description of the chapter:
 *
 *   C2  the material entering, and the standard applied before any value is added
 *   C3  cutting — where skill is consequential and invisible
 *   C4  skiving, forming, edges worked in stages
 *   C5  the stitch, the seam, the hardware
 *   C6  burnishing, oiling — care after it stops being visible
 *   C7  the gate
 *   C9  packing and dispatch
 *
 * **Design and pattern making answers none of the ten.** It is a real operation
 * and it is not a chapter; §25.1 rule 1 and N14 forbid an eleventh, so it is
 * not told here. Recorded rather than forced into a chapter it does not belong
 * to.
 *
 * C1, C8 and C10 have no operation in the content because their subjects are
 * the place, the record and the floor continuing. They are told by their frames.
 */
const OPERATION_FOR: Partial<Record<ChapterId, string>> = {
  C2: "Hide selection",
  C3: "Cutting",
  C4: "Machine processing",
  C5: "Assembly",
  C6: "Finishing",
  C7: "Quality inspection",
  C9: "Packaging",
};

/**
 * Manufacturing — the complete telling.
 *
 * UX Blueprint §17: *the spine of the site, carrying C1–C10 in canonical order,
 * and the primary engine of Recognition and Confidence.* Creative Direction
 * Book §20: *being walked through a working floor by someone who does the job* —
 * absorbed, unhurried, sequential, and **the longest and most immersive passage
 * in the brand** (R17.1).
 *
 * Three things the previous implementation offered are gone, each by name:
 *
 * - **The eight numbered stages.** R17.2: *the process is never compressed into
 *   a diagram, an icon row or an infographic — this removes the numbered-steps
 *   pattern from the surface entirely.* The operations are now the annotations
 *   of the chapters whose questions they answer.
 * - **The hero photograph.** A generated placeholder; Photography Direction
 *   §24.5 has no exception.
 * - **The prose body, and the close's sentence.** MIB R5.3: a surface is
 *   chapters, and prose that belongs to no chapter has no level to live at
 *   (R5.2). The body also carried two figures Brand Bible §19.4 governs — a
 *   monthly piece count and a number of lines — which reached the surface
 *   because the Register gate reads frontmatter and not MDX bodies. The close's
 *   sentence was authored in this file, which R6.4 does not permit.
 *
 * R17.4 and §25.1 rule 3: a chapter with insufficient evidence is **absent from
 * the surface; it does not appear as a heading with a sentence beneath it.**
 * The archive holds no frame for any chapter, so every one of the ten is
 * currently absent — the surface is a shorter telling, not a broken one.
 */
export default async function ManufacturingPage() {
  const page = await getCompanyPage(SLUG);
  if (!page) notFound();

  const operations = new Map(page.steps.map((step: StepBlock) => [step.title, step]));

  /**
   * One scene per chapter: the frames the archive holds for it, annotated by
   * the operation that answers its question.
   *
   * §11.1's relationship is absent because each chapter currently has one
   * scene, and a relationship is what a *pair* proves (§11.4). It arrives with
   * the second scene of a chapter, which arrives with the library.
   */
  const scenesFor = (id: ChapterId): Scene[] => {
    const frames = chapterFrames(id);
    const operation = OPERATION_FOR[id] ? operations.get(OPERATION_FOR[id]) : undefined;

    return [
      {
        frames,
        annotation: operation && (
          <>
            <Statement rank="t3" as="h2">
              {operation.title}
            </Statement>
            <Passage measure={false}>{operation.description}</Passage>
          </>
        ),
      },
    ];
  };

  const chapters = manufacturingTelling.map((plan) => ({ ...plan, scenes: scenesFor(plan.chapter) }));

  /*
   * N6 governs the telling's opening: no claim arrives before the work that
   * justifies it. Which chapter opens the telling is a fact about the archive —
   * the first one it can carry — so it is derived rather than assumed to be C1.
   */
  const opensTheTelling = chapters.find((chapter) => chapter.scenes.some((scene) => scene.frames.length))
    ?.chapter;

  return (
    <>
      <Opening title={page.title} eyebrow={page.eyebrow} summary={page.summary} />

      {chapters.map(({ chapter, scenes }) => {
        const isRecognition = chapter === "C3";
        const opensHere = chapter === opensTheTelling;

        /*
         * §23.4 and MIB R11.1: exactly one held moment per surface longer than
         * three viewport heights. It precedes C3 — §22.3, *silence before a
         * claim, the pause that makes the next statement land*; §17.4, the
         * strongest transition available; and §23.5's fourth opening, so
         * Recognition is entered in a different kind from the chapters around
         * it.
         *
         * It is asked of **this** chapter rather than of the surface. Asked of
         * the surface, a floor that could prove C4 but not C3 held silence
         * before a chapter that had refused itself — the §23.5 opening standing
         * where the chapter is not. Found while composing Quality, where C7
         * refuses without a rejection frame while C2 and C8 tell (MIB
         * dependency 4), which is the state that makes it visible.
         */
        const tellable = !sceneRefusal(scenes, { isRecognition, opensTheTelling: opensHere });

        /*
         * §7.2 designates C3 as the Recognition chapter, and §10.1 rule 3 with
         * Photography §5.1 decide whether it may be told: Recognition is bought
         * only with a decision being taken, and no accumulation of anything
         * else will do. Without an E1 frame this chapter refuses itself.
         */
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
        R17.6: no chapter on this surface carries an action, and after the
        Presentation package neither does its close.

        R39.3 permitted one here. It was removed on the client's instruction:
        the same ask stood on eight surfaces, and an ask repeated eight times is
        not confidence, it is anxiety (Brand Bible §16.4 — *a luxury brand does
        not chase*). The action now stands on Home, the product record and
        Enquiry, and nowhere else.

        What stands here is the continuation — R39.2, *a link rather than a
        demand.* Manufacturing hands on to the machines the process runs on,
        which is the next thing a buyer asks about.
      */}
      <Section break="chapter">
        <Field type="full">
          <Continuation href={ROUTES.technology}>The machines this runs on</Continuation>
        </Field>
      </Section>
    </>
  );
}
