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
  /*
   * The measure, restored.
   *
   * Both annotations were set `measure={false}`, and that prop means *let the
   * field set the width, where the field **is** the reading column.* The field
   * they sit in is `paired`, which is `max-w-field` — 1440px. So the reading
   * column was discarded and the argument ran at **131 characters a line**,
   * measured, against the 66 §10.1 fixes.
   *
   * §10.1 states the failure exactly: past roughly 75 characters the eye loses
   * the return sweep and the reader re-reads a line without noticing. It is the
   * difference between prose that is read and prose that is skimmed, and on the
   * two passages that carry this surface's whole argument it was the second.
   */
  const placeScenes: Scene[] = [
    {
      frames: place,
      /* §11.1: place, then the detail inside it. It earns the right to close attention (N4). */
      relationship: "establish-and-examine",
      annotation: <Passage>{intro.body}</Passage>,
    },
  ];

  const decisionScenes: Scene[] = mechanism
    ? [
        {
          frames: decision,
          annotation: (
            <>
              {/*
                T2, not T3.

                This is the mechanism heading of the Recognition chapter — the
                peak of the surface (§17.2, R16.2). It was set at T3, 22px,
                while the category hand-off below it — which this file's own
                sequence table marks *falling* — was at T2, 30px. The page
                climaxed smaller than it released.

                Both are section headings and §9.2 gives a section heading T2,
                so the peak is not marked by being *larger* than the release —
                it is marked by the viewport of ink the reader passes through to
                reach it (§23.6). That is the stronger mark, and it is the one
                the system actually reserves for this.
              */}
              <Statement rank="t2" as="h2">
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
      <Opening
        title={hero.heading}
        eyebrow={hero.eyebrow}
        summary={hero.description}
        /*
          The arrival, compressed.

          A chapter break is S6 — 192px — and above the *first* element of the
          surface that put 272px of nothing between an 80px header and the first
          word, which is 38% of the first screen spent before the company has
          said anything. §23.1's S6 separates *two* chapters; there is no
          chapter above this one, and the header has already done the
          separating. S4 keeps §22.2's 3:1 ratio around the T1 intact (S4 above
          against S3 below) while letting the first frame reach the first
          screen, so a visitor arrives at a place rather than at a paragraph.
        */
        /*
          The stitch, at 2%. A fine repeat rather than a silhouette, because
          this band is 283px tall and a silhouette scaled to fit 283px is a
          logo. The repeat gives the arrival field a tooth at the threshold
          §14.5 permits and asks nothing of the reader.
        */
        className="atmosphere-stitch pt-s4 pb-s5"
      />

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
              /*
                The horse, at 1.8% ink, held at the right of the field and never
                repeated (M15): one animal, once, on the whole site.

                It belongs to *the place* rather than to the masthead. This is
                the tallest section on the surface, so the silhouette is drawn
                at its own scale instead of being squeezed into a band — and the
                chapter it sits behind is the workshop that makes tack, which is
                the one section where the mark is telling the truth rather than
                decorating.

                §14.5's threshold for simulated material is zero, and this is
                held below the value at which anything is being simulated: at
                1.8% it is not an image of a horse, it is the reason the field
                does not read as a screen. L14 is satisfied the same way — a
                mark that cannot be seen cannot carry an argument. Any frame
                that lands here covers it completely; evidence wins (R8.7).
              */
              className="atmosphere-horse"
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
            {/*
              THE CUT TO BLACK — and this is where the surface's one inverted
              field is spent.

              §23.6 rations the inverted field to **at most once per surface,
              with a minimum extent of one viewport height**, and calls it "the
              strongest chapter marker available". §23.4 fixes the held moment
              at exactly one viewport height, carrying one element or none. The
              two specifications describe the same rectangle, so the strongest
              marker in the system and the strongest transition in the system
              are spent together, once, on the entrance to Recognition.

              It was paper before, and that was the single largest failure on
              the surface: 720px of white — a whole empty screen on a phone — in
              the middle of a document that is white from top to bottom.
              §17.4 ranks silence the strongest transition available, but
              silence is only legible against something. White silence on a
              white page is not a pause, it is a gap, and a gap reads as a
              rendering fault rather than as a decision.

              Ink makes it a decision. The room goes dark before the one thing
              this surface exists to show, which is §22.3's construction stated
              in the only material the palette has: *silence before a claim —
              the pause that makes the next statement land.*
            */}
            {holds && <HeldMoment className="bg-ink" />}

            <Chapter id="C3" opening="held" isRecognition scenes={decisionScenes} className="atmosphere-tooling" />
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
      {/*
        The range, on Recessed.

        §36.3 names Recessed as **the one permitted container in the system**,
        and states what it is for: *it exists to bind a specification into one
        object.* A list of what the company makes is a specification of the
        range, so this is the row the tone was written for — and it is the third
        value on a surface that had one. Paper, then ink, then paper, then this:
        the eye now has somewhere to travel.

        It is not decoration and it is not a card. §16.3 leaves no border, no
        shadow and no radius expressible, so what changes is the ground and
        nothing else — the difference between a section and an object is 9
        points of luminance, which is all this system has ever needed.
      */}
      <Section break="chapter" tone="recessed">
        <Field type="full" className="flex flex-col gap-s4">
          <SectionHeader
            heading={sections.categories?.heading ?? "What we make"}
            description={sections.categories?.description}
          />
          {/*
            The record row, with its frame — VDS §36.2, *what replaces the
            card*: "a full-width row: an image at or above threshold on the
            5-unit column, a specification beside it on the 3-unit column."

            It was a text list. This is the one section on the surface whose
            subject is the product, and it was the only one carrying no image
            mass at all — two paragraphs where the range should be. `RecordSet`
            has always known how to do this; it was being handed items with no
            frame, so it fell back to passages and the pairing never engaged.

            The frames are reserved, not invented: a 3:2 field on the 5-unit
            column, which is the shape the shoot should deliver for a category
            record. Nothing is claimed about either category that the content
            layer does not already say.
          */}
          <RecordSet
            items={categories.map((category) => ({
              href: category.href,
              title: category.name,
              summary: category.shortDescription,
              image: category.thumbnail
                ? framed(category.thumbnail, "E6", RECORD_ROW_SHAPE)
                : undefined,
            }))}
          />
          <Continuation href={ROUTES.products}>All products</Continuation>
        </Field>
      </Section>

      {/*
        THE CLOSE — and it is the only invitation on the whole surface.

        R39.3, R16.5: Home carries the action once, after Recognition. The
        Presentation package removed it from six other surfaces, so this is now
        one of three places on the entire site where the company asks for
        anything, and the only one a visitor reaches by reading rather than by
        deciding. It is not repeated above, it is not in the bar, it is not in
        the footer, and there is no second door beside it (§35.2).

        The saddle, at 2%. It is the last field before the record, the eye has
        just come off a Recessed object, and a bare white rectangle with a black
        button in it was the weakest thing on the page — the one moment that
        looked like a form rather than a document. The mark gives the field
        something to be without giving it anything to read (L14).
      */}
      <Close statement={cta.heading} className="atmosphere-saddle" />
    </>
  );
}
