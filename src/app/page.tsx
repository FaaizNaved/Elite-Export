import { Fragment } from "react";
import type { Metadata } from "next";
import { Chapter, Close, HeldMoment, Overture } from "@/components/structure";
import { Range } from "@/components/sections";
import { Reveal } from "@/components/system";
import { Continuation } from "@/components/ui/action";
import { Passage, Statement } from "@/components/ui/typography";
import { company, homeTelling, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { sceneRefusal, type Scene } from "@/components/structure";
import { getCategories, getCompanyPage, getHomeContent } from "@/lib/content";
import { chapterFrames, framed, RECORD_ROW_SHAPE } from "@/lib/demo";
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
 * | | Field | Demand | Why here |
 * | --- | --- | --- | --- |
 * | The overture | paper | rising | One screen. The statement, the frame and the record: what the company is, before a word of argument (§20) |
 * | **C1 · The place** | paper | rising | Established, then examined (§17.3): the room at bleed, then the object off the bench, beside the words |
 * | **Silence** | **ink** | **none** | §17.4 ranks silence the strongest transition available and §22.3 names it *the pause that makes the next statement land.* It is the site's one held moment and its one inverted field (§23.4, §23.6, R16.3) |
 * | **C3 · The decision** | paper | **peak** | Recognition (§7.2, R16.2). Entered through the silence — §23.5's fourth opening — so it is entered differently in *kind* from C1, which §22.1 and §8.3 both require |
 * | The range | recessed | falling | E5: hand on plainly to the range. §16's secondary route, and the third value on the surface |
 * | The close | paper | low | One action, once, at the end (R16.5, R39.3) |
 *
 * Six fields, and no two of them adjacent are the same: paper, paper at bleed,
 * ink, paper, recessed, paper. No rule, border, label or background change
 * marks a chapter (§17.4, §12.4) — the transitions are silence, density, scale
 * and tone, and nothing else is available, because the chapter break is S6 and
 * the design system has no divider.
 *
 * ### Absence
 *
 * A chapter absent by rule is handed on; a chapter absent by dependency is
 * waiting on the archive. Every frame on this surface is a **reserved plate**
 * (`src/lib/demo.ts`): the exact space and ratio a photograph will occupy,
 * stamped with what has to be shot for it. Nothing here renders a photograph
 * the archive cannot prove (Photography Direction §24.4, §24.5), and nothing
 * moves by a pixel when the photographs land.
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

  const placeScenes: Scene[] = [
    {
      frames: place,
      /* §11.1: place, then the detail inside it. It earns the right to close attention (N4). */
      relationship: "establish-and-examine",
      annotation: (
        <>
          <Statement rank="t2" as="h2">
            {intro.description}
          </Statement>
          <Passage>{intro.body}</Passage>
        </>
      ),
      release: <Continuation href={ROUTES.about}>Who is in the building</Continuation>,
    },
  ];

  const decisionScenes: Scene[] = mechanism
    ? [
        {
          frames: decision,
          annotation: (
            <>
              <Statement rank="t1" as="h2">
                {mechanism.title}
              </Statement>
              <Passage>{mechanism.description}</Passage>
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
   * silence on a short page is an empty screen rather than a held moment.
   */
  const holds =
    !sceneRefusal(placeScenes) || !sceneRefusal(decisionScenes, { isRecognition: true });

  /*
   * The record at the foot of the first screen. Every value is read from the
   * company record and nothing is authored here (R7.1, Brand Bible §19.2): a
   * figure that cannot be checked is not printed, which is why there is no
   * headcount, no output number and no years-of-experience line.
   */
  const overtureRecord = [
    { label: "Established", value: String(company.foundedYear) },
    {
      label: "Manufacture",
      value: `Own facility, ${company.contact.address.city}`,
    },
    { label: "Capability", value: "OEM and ODM" },
    {
      label: "Audited by",
      value: company.certifications.map((certification) => certification.name).join(" · "),
    },
  ];

  return (
    <>
      {/* The one cross dissolve on the surface. It cannot hide content. */}
      <Reveal />

      {/*
        THE OVERTURE — one screen, and the only screen a visitor is guaranteed
        to see. §33.1 forbids text over a photograph, so the statement and the
        frame are placed side by side: the two things that have to arrive
        together, arriving together.

        The stitch, at 1.4%. A fine repeat rather than a silhouette — this is
        the arrival field and it needs a tooth at the threshold §14.5 permits,
        not a picture behind the words.
      */}
      <Overture
        title={hero.heading}
        eyebrow={hero.eyebrow}
        summary={hero.description}
        photograph={framed(hero.image, "E5", [1200, 1500], "The workshop, Kanpur")}
        record={overtureRecord}
        className="atmosphere-stitch"
      />

      {homeTelling.map(({ chapter, role }) => {
        /* Touched and handed on. Not rendered here — R16.1, §25.1 rule 3. */
        if (role === "hands") return null;

        if (chapter === "C1") {
          /*
            C1 — THE PLACE. "Is anybody actually here?"

            §7.1: rooms in use, from angles only somebody who works here would
            take, and **its argument is accumulation, not information**.

            §11.1, establish and examine: the place at bleed, then the object off
            the bench held beside the words on the paired field — which is the
            system's primary editorial unit and was going unused.

            No mark behind this chapter. A silhouette was tried here and
            removed: at any opacity at which it can be seen it is a picture of a
            horse behind a picture of a workshop, and at any opacity at which it
            cannot it is a value nobody can defend. The chapter is two frames
            and a paragraph — the field it needs is the paper it is printed on.
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
        */
        return (
          <Fragment key={chapter}>
            {/*
              THE CUT TO BLACK, and the sentence it was held for.

              §23.6 rations the inverted field to at most once per surface with a
              minimum extent of one viewport height, and calls it "the strongest
              chapter marker available". §23.4 fixes the held moment at one
              viewport height carrying **one element, or none**. The two
              specifications describe the same rectangle, so the strongest marker
              and the strongest transition in the system are spent together,
              once, on the entrance to Recognition.

              The element is the company's own sentence, at the peak register, in
              paper on ink. It was `none`, and one empty black screen in the
              middle of a document reads as a rendering fault rather than as a
              decision — §22.3 names what this construction is for: *silence
              before a claim — the pause that makes the next statement land.*
            */}
            {holds && <HeldMoment statement={intro.heading} className="bg-ink text-paper" />}

            <Chapter
              id="C3"
              opening="held"
              isRecognition
              scenes={decisionScenes}
              className="atmosphere-tooling"
            />
          </Fragment>
        );
      })}

      {/*
        THE RANGE — E5: hand on, plainly, to the range. §16's secondary route,
        and the demand falls here by design (§17.2: quiet passages are what make
        the good parts good).

        On Recessed, which §36.3 names the one permitted container in the system
        and states the use for: *it exists to bind a specification into one
        object.* A list of what the company makes is a specification of the
        range. It is the third value on a surface that had two — paper, ink,
        then this — so the eye now has somewhere to travel.

        Each row reserves a 3:2 frame on the 5-unit column: the shape a shot
        list should be giving, rather than the square the placeholder generator
        happened to emit.
      */}
      <Range
        eyebrow={sections.categories?.eyebrow}
        heading={sections.categories?.heading ?? "What we make"}
        description={sections.categories?.description}
        items={categories.map((category) => ({
          href: category.href,
          name: category.name,
          summary: category.shortDescription,
          image: category.thumbnail
            ? framed(category.thumbnail, "E6", RECORD_ROW_SHAPE, `${category.name}, finished`)
            : undefined,
        }))}
        continuation={<Continuation href={ROUTES.products}>Every product we make</Continuation>}
      />

      {/*
        THE CLOSE — and it is the only invitation on the whole surface.

        R39.3, R16.5: Home carries the action once, after Recognition. It is not
        repeated above, it is not in the bar, it is not in the footer, and there
        is no second door beside it (§35.2). The description states what happens
        after the ask rather than asking again.

        The saddle, at 2%: the last field before the record, and the mark gives
        it something to be without giving it anything to read (L14).
      */}
      <Close statement={cta.heading} description={cta.description} className="atmosphere-saddle" />
    </>
  );
}
