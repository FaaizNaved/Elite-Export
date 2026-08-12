import { Fragment } from "react";
import type { Metadata } from "next";
import { RecordSet } from "@/components/evidence";
import { Chapter, Close, HeldMoment, Opening } from "@/components/structure";
import { SectionHeader } from "@/components/sections";
import { Continuation } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Passage, Statement } from "@/components/ui/typography";
import { homeTelling, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { sceneRefusal, type Scene } from "@/components/structure";
import { chapterFrames, getCategories, getCompanyPage, getHomeContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/**
 * Home — one continuous documentary.
 *
 * UX Blueprint §16: to establish, before anything is claimed, that a real
 * factory is speaking. Creative Direction Book §20: *arrival somewhere real and
 * already working*; never explaining itself, never summarising the site, never
 * opening with a claim.
 *
 * The chapter plan is `homeTelling` and is not this file's to change: ten
 * declared, C1 and C3 told, eight handed on. What this file governs is the
 * thing the plan cannot express — **the order things arrive in, and the
 * intervals between them.**
 *
 * ### The sequence, and the rule behind each move
 *
 * Creative Direction Book §17.1: an experience held at one level is monotony,
 * and §17.2: a peak is a relationship between an element and its neighbours,
 * not a property of one. So the surface alternates demand and release (§22.5),
 * and the release before Recognition is the longest interval on the site.
 *
 * | | Demand | Why here |
 * | --- | --- | --- |
 * | Opening — the words | low | The surface is entered by reading, so the first photograph is not competing with a title (§33.1) |
 * | **C1 · The place** | rising | Established, then examined (§17.3): the room at bleed, then the frames inside it |
 * | **Silence** | **none** | §17.4 ranks silence the strongest transition available and §22.3 names it *the pause that makes the next statement land*. It is the site's one held moment (§23.4, R16.3) |
 * | **C3 · The decision** | **peak** | Recognition (§7.2, R16.2). Entered through the silence — §23.5's fourth opening — so it is entered differently in *kind* from C1, which §22.1 and §8.3 both require |
 * | The range | falling | E5: hand on plainly to the range. §16's secondary route |
 * | The close | low | One action, once, at the end (R16.5, R39.3). §16's close |
 *
 * Inside a chapter the order is the same argument at a smaller scale:
 * **establish → examine → annotate → release.** §17.3: a detail with no
 * established context is decoration, and a sequence should resolve. §22.2: a
 * chapter ends by releasing rather than concluding — the last thing asked of
 * the reader is smaller than the thing before it, and then there is space. So
 * the words follow the photographs (Brand Bible D1: photography carries the
 * argument, everything else annotates) and the continuation is last.
 *
 * ### What the visitor is not given
 *
 * No rule, border, label or background change marks a chapter (§17.4, §12.4).
 * The transitions are silence, density and scale, and nothing else is
 * available: the chapter break is S6 and the design system has no divider.
 *
 * ### Absence
 *
 * A chapter absent by rule is handed on; a chapter absent by dependency is
 * waiting on the archive. §16's dependency note governs the second:
 *
 *   > Requires an E1 photograph. Without one, Home cannot discharge its
 *   > obligation and **the surface is built to the extent the library permits,
 *   > with the Recognition passage absent rather than substituted (X8).**
 *
 * Nothing here renders a photograph the archive cannot prove (Photography
 * Direction §24.4, §24.5), which is why the surface currently carries none.
 */
export default async function HomePage() {
  const [categories, manufacturing, home] = await Promise.all([
    getCategories(),
    getCompanyPage("manufacturing"),
    getHomeContent(),
  ]);

  const { hero, intro, sections, cta } = home;

  /*
   * The frames are the archive's, not this surface's — Photography Direction
   * §25, MIB R8.7: the order governs surfaces; the library governs what can be
   * told, and the library wins.
   */
  const place = chapterFrames("C1");
  const decision = chapterFrames("C3");

  /*
   * §16's evidence table asks C3 for two things: one decision being taken (E1)
   * and **one precisely described mechanism** (E2). Brand Bible §17.6 supplies
   * the mechanism — along the backbone, where the fibre is tightest — and the
   * content layer states it once, on the cutting stage. Read from there rather
   * than restated here: R7.1, a reference is always preferable to a copy.
   */
  const mechanism = manufacturing?.steps.find((step) => step.title === "Cutting");

  /*
   * The scenes, composed once — Documentary Storyboard §9, §11. Each states
   * what it is made of and what its pair proves; `Chapter` decides whether the
   * archive can carry it (§10.1, `sceneRefusal`).
   */
  const placeScenes: Scene[] = [
    {
      frames: place,
      /* §11.1: place, then the detail inside it. It earns the right to close attention (N4). */
      relationship: "establish-and-examine",
      annotation: <Passage measure={false}>{intro.body}</Passage>,
    },
  ];

  const decisionScenes: Scene[] = mechanism
    ? [
        {
          frames: decision,
          annotation: (
            <>
              <Statement rank="t3" as="h2">
                {mechanism.title}
              </Statement>
              <Passage measure={false}>{mechanism.description}</Passage>
            </>
          ),
          release: (
            <Continuation href={ROUTES.manufacturing}>
              The whole process, stage by stage
            </Continuation>
          ),
        },
      ]
    : [];

  /*
   * §23.4: the held moment exists once per surface **longer than three viewport
   * heights**. A surface on which no chapter is told is not that surface, and
   * silence on a short page is an empty screen rather than a held moment. The
   * test is whether a chapter will actually be told, which is the same question
   * `Chapter` asks itself.
   */
  const holds =
    !sceneRefusal(placeScenes) || !sceneRefusal(decisionScenes, { isRecognition: true });

  return (
    <>
      {/*
        The surface opens on words, and C1 opens on the photograph. Two openings
        carrying a frame each would spend the same evidence twice, and §33.1
        forbids the alternative — text over a photograph — outright.
      */}
      <Opening title={hero.heading} eyebrow={hero.eyebrow} summary={hero.description} />

      {homeTelling.map(({ chapter, role }) => {
        /* Touched and handed on. Not rendered here — R16.1, §25.1 rule 3. */
        if (role === "hands") return null;

        if (chapter === "C1") {
          /*
            C1 — THE PLACE. "Is anybody actually here?"

            §7.1: rooms in use, from angles only somebody who works here would
            take, and **its argument is accumulation, not information**.

            §11.1, establish and examine: the place, then the detail inside it.
            The opening frame is the first of the scene, and how each frame
            after it is presented follows its rank (§31.3) rather than anything
            this surface decides.
          */
          return (
            <Chapter
              key={chapter}
              id="C1"
              opening="photograph"
              priority
              opensTheTelling
              scenes={placeScenes}
            />
          );
        }

        /*
          C3 — THE DECISION. "Where is the skill that cannot be seen?"

          **Recognition** (§7.2, R16.2), and the reason the surface exists. §7.1:
          the chapter's job is to make a viewer understand that *a decision was
          taken*, not that a machine was operated.

          It is entered through silence — §23.5's fourth opening, and §17.4's
          strongest transition — so it opens in a different **kind** from C1
          (§22.1, §8.3), which is what keeps two chapters from reading as two
          items in a stack.

          `isRecognition` is the chapter telling the scene layer what it is:
          §10.1 rule 3 and Photography §5.1 both say Recognition is bought only
          with a decision being taken, so without an E1 frame this chapter
          refuses itself rather than standing on what it has.
        */
        return (
          <Fragment key={chapter}>
            {/*
              The silence — §23.4, and the site's one held moment (R16.3). It
              sits here rather than after Recognition because §22.3 names this
              exact construction: *silence before a claim — the pause that makes
              the next statement land.* §17.4 ranks it the strongest transition
              available, and Recognition is what it is spent on.
            */}
            {holds && <HeldMoment />}

            <Chapter id="C3" opening="held" isRecognition scenes={decisionScenes} />
          </Fragment>
        );
      })}

      {/*
        The hand-on — E5: hand on, plainly, to the range. §16's secondary route,
        and the demand falls here by design (§17.2: quiet passages are what make
        the good parts good).

        No photograph: a category thumbnail the archive cannot prove is a
        placeholder, and §24.5 has no exception.
      */}
      <Section break="chapter">
        <Field type="full" className="flex flex-col gap-s4">
          <SectionHeader
            heading={sections.categories?.heading ?? "What we make"}
            description={sections.categories?.description}
          />
          <RecordSet
            items={categories.map((category) => ({
              href: category.href,
              title: category.name,
              summary: category.shortDescription,
            }))}
          />
          <Continuation href={ROUTES.products}>All products</Continuation>
        </Field>
      </Section>

      {/* R39.3, R16.5: Home carries the action once, at the close, after Recognition. */}
      <Close statement={cta.heading} />
    </>
  );
}
