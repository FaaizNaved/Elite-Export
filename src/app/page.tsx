import type { Metadata } from "next";
import { EditorialImage } from "@/components/evidence";
import { Reveal } from "@/components/system";
import { Continuation } from "@/components/ui/action";
import { Passage, Record, Statement } from "@/components/ui/typography";
import { company, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { getCategories, getCompanyPage, getHomeContent } from "@/lib/content";
import { chapterFrames, framed } from "@/lib/plates";
import { imageSizes } from "@/utils/image";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/**
 * Home — one document, seven movements, no seams.
 *
 * **Every movement renders, always.** There is no flag, no mode and no
 * conditional that can remove one: the composition is the website, not a state
 * the website can be in. Frames come from `chapterFrames`, which hands back
 * the archive's photographs where they exist and the plate — the space at its
 * own ratio — where they do not, so a missing photograph changes what is
 * *inside* a frame and never whether the frame is there.
 *
 * What is set here is the sequence: where the eye enters, which edge a board
 * leaves by, how long the silence runs, and how one ground becomes the next.
 *
 *   I    ARRIVAL      paper       words left · board hung right · full screen
 *   II   THE PLACE    paper       board bleeding left and up · words right, low
 *   III  THE OBJECT   paper→ink   one small board, held right of centre
 *   IV   SILENCE      ink         one sentence, one screen
 *   V    THE DECISION ink→paper   the widest board on the site · words split
 *   VI   THE RANGE    recessed    two spreads composed against each other
 *   VII  THE CODA     paper       one line, and a door
 */
const FIELD = "mx-auto w-full max-w-field px-6 reading:px-12";

export default async function HomePage() {
  const [categories, manufacturing, home] = await Promise.all([
    getCategories(),
    getCompanyPage("manufacturing"),
    getHomeContent(),
  ]);

  const { hero, intro, sections } = home;

  /*
   * The frames. C1 is the place and the object off the bench; C3 is the one
   * decision being taken. Real photographs where the archive holds them,
   * plates at the same ratios where it does not — see `lib/plates`.
   */
  const [room, object] = chapterFrames("C1");
  const [cut] = chapterFrames("C3");
  const mechanism = manufacturing?.steps.find(
    (step) => step.title === "Cutting",
  );
  /*
   * No shape argument. The board's ratio is the library's, because the library
   * is the only thing that will still be describing this frame once the
   * photograph exists.
   *
   * It read `framed(hero.image, "E5", [1000, 1250])` — a 4:5 override applied,
   * by `framed`'s own contract, *only to a generated file*. The record said
   * 16:9. So the plate drew one shape, the photograph would have arrived in
   * another, and the geometry was going to move on the day the archive filled:
   * the single thing the plate is built to prevent, hidden inside the
   * mechanism built to prevent it.
   *
   * 4:5 was the right shape and is kept — it is what the composition has been
   * reviewed at, and it matches the E5 the chapter plan already reserves for
   * the place (C1, 1800×2250). What changed is where it is said:
   * `DELIVERY_SHAPES` states it, the generator draws the file at it, the
   * library measures it, this line reads it, and `check:content` refuses the
   * three ever disagreeing again.
   */
  const board = framed(hero.image, "E5");

  /*
   * The record. Four facts, each read from the company record and none stated
   * here — the rail is a view of `config/company.ts`, not a second copy of it.
   *
   * "Capability" was the exception until now: `"OEM and ODM"` was typed into
   * this array as a literal. Brand Bible §19 governs a capability claim exactly
   * as it governs a certification, and there was no field behind this one, no
   * Register entry and no dependency — so no gate could see it and no client
   * was ever asked to confirm it. It is `company.capabilities` now, registered
   * as `manufacturing-capability` against dependency 3.
   *
   * Four, not the five the creative direction first specified. MOQ and the
   * export-market count are the two that were dropped, and they stay dropped:
   * both are Register items in their own right, both are still unconfirmed,
   * and a rail is a credential rather than a specification dashboard.
   */
  const record = [
    { label: "Established", value: String(company.foundedYear) },
    {
      label: "Manufacture",
      value: `Own facility, ${company.contact.address.city}`,
    },
    { label: "Capability", value: company.capabilities.join(" and ") },
    {
      label: "Audited by",
      value: company.certifications
        .map((certification) =>
          certification.name.replace("Leather Working Group", "LWG"),
        )
        .join(" · "),
    },
  ];

  const range = categories.map((category, index) => ({
    ...category,
    frame: category.thumbnail
      ? framed(
          category.thumbnail,
          "E6",
          /* Each spread reserves a different shape. A catalogue is not a grid. */
          index % 2 === 0
            ? ([2400, 1500] as [number, number])
            : ([1400, 1800] as [number, number]),
        )
      : undefined,
  }));

  return (
    <div className="field-grade">
      <Reveal />

      {/* ══ I ═══ ARRIVAL ══════════════════════════════════════════════════

          Two zones, both in normal flow, and nothing is positioned.

          The spread — words on the leading six columns, the board on the
          trailing five — and beneath it the record, on its own rule. The board
          cannot reach the record because the record is its *sibling*: the row
          ends, the margin follows, the rule is drawn. There is no arithmetic
          holding them apart and nothing to get wrong when a value grows.

          What this replaces: the board was `absolute`, pinned `top-0` to
          `bottom-[13rem]`, sitting at `z-0` under a rail raised to `z-10`.
          Those two numbers were the only thing keeping the board off the
          record — a reserved 13rem against a rail that measured 122px at 1024
          and 239px at 375. The clearance was 1px at 1024. One certification
          name long enough to wrap and the board would have run underneath the
          record with the stacking order hiding it, which is the failure mode
          the whole arrangement invited.

          The board is width-driven, as a photograph is: the column gives the
          width, the ratio gives the height (§32.1). So the day a real frame
          replaces it, the geometry is identical — no crop, no `object-fit`, no
          height cap that a photograph would not obey.

          **What `min-h-[calc(100svh-6rem)]` is, stated accurately.**

          It is a floor and it reads the viewport, so this section is *not*
          viewport-independent and no comment here should say it is. What it
          does not do is decide where anything sits: the spread starts at `pt`,
          the record follows the spread, and both are true whether or not the
          floor binds.

          Measured, it binds at one of the nine widths under review — 1920×1080,
          where the composition is 974px against a 984px floor. At 1600×900 and
          everything below it, the content is already taller than the floor and
          the declaration changes nothing at all. So the floor is a preference
          about tall screens (the arrival should not leave the next chapter
          showing), not a mechanism the layout depends on.

          `6rem` is an approximation and is worth naming as one. The masthead is
          content-sized — `py-s3` either side of a two-line brand block whose
          second line appears at `reading` — so it measures **96.8px at 375 and
          112.8px at 1920**, and no token in the space scale tracks that curve:
          `s6` is 96 at the phone end and 192 at the wide end. The subtraction
          is therefore up to 16.8px short, which makes the floor slightly too
          tall on a wide screen and costs nothing anywhere, because on every
          screen where it would matter the content already exceeds it.

          Publishing the masthead's measured height as a custom property from
          `HeaderShell` would make it exact — that component already runs an
          effect — and it was rejected: it moves a layout value into JavaScript
          to win at most 17px on one breakpoint, and the value would change
          after hydration, which trades a harmless approximation for a real
          layout shift.

          **Where the free space goes, and why it is not shared out.**

          The screen is a floor, not a measurement: `min-h` states that the
          arrival owns the first screen, and past that the composition is the
          content's own height. Which leaves one question the previous revision
          answered by accident — where the slack goes on a screen taller than
          the composition.

          It went to `justify-center` inside a `flex-1` wrapper, so it was split
          evenly above and below the spread. That put a *measurement* above the
          board: 29px of clearance under the masthead at 1920, and 0 at 1440 and
          1280, where the content already exceeds the floor and there is no
          slack left to split. `field:pt-0` had removed the stated padding on
          the assumption that the centring would stand in for it, and above 1280
          — the widest field, the tallest board — it did not. The board hung off
          the bottom edge of the bar with nothing between them.

          So the wrapper is gone and `justify-between` does the job it was
          always written for. The top of the spread is set by `pt`, which is a
          stated value at every width; every pixel of slack falls into the one
          gap on this screen that is meant to open — the breath between the
          spread and the record. On a tall screen the record closes the arrival
          at the foot of the field. On a short one `mt-s5` is its floor and the
          section simply runs on. Neither case reads the viewport's height to
          decide where anything starts. */}
      <section className="atmosphere-light relative flex min-h-[calc(100svh-6rem)] flex-col justify-between pt-s5 pb-s4 paired:pt-s4">
        <div className={FIELD}>
          <div className="grid gap-s5 paired:grid-cols-12 paired:items-center paired:gap-8">
            <div className="paired:col-span-6">
              {hero.eyebrow && (
                <Record
                  rank="c"
                  tone="secondary"
                  weight="medium"
                  className="mb-s4 flex items-center gap-s3 tracking-rail uppercase"
                >
                  <span aria-hidden className="h-px w-12 bg-ink-secondary/50" />
                  {hero.eyebrow}
                </Record>
              )}

              {/* Optically flush: the ink sits on the margin, not the box. */}
              <Statement rank="h" as="h1" className="optical-left max-w-[16ch]">
                {hero.heading}
              </Statement>

              <p className="mt-s4 max-w-[34ch] font-sans text-b text-pretty text-ink-secondary">
                {hero.description}
              </p>
            </div>

            {/*
              The board is given a column at every width, not only where the
              grid exists.

              Below `paired` there was no constraint at all, so the board fell
              back to a full-width flow item: 93% of the field at 658 and over
              1,100px tall — a banner, not a plate. It swamped the headline it
              is supposed to support and pushed the record a screen away from
              the spread it belongs to.

              The cap is on **width**, which is the only dimension this system
              lets a frame be sized by (§32.1): the height follows the ratio, so
              the plate stays uncropped, keeps its proportion, and a photograph
              dropped at this path lands in exactly the same box. At `paired`
              the cap is released and the 5-unit column governs instead.
            */}
            <div
              data-drift="12"
              className="max-w-[78%] reading:max-w-[62%] paired:col-span-5 paired:col-start-8 paired:max-w-none"
            >
              <EditorialImage image={board} sizes={imageSizes.overture} priority />
            </div>
          </div>
        </div>

        {/* The record. Hairlines between the facts, not around them. */}
        <div className={`mt-s5 ${FIELD}`}>
          <dl className="grid grid-cols-2 border-t border-hairline pt-s4 reading:grid-cols-4">
            {record.map((entry, index) => (
              <div
                key={entry.label}
                className={
                  index === 0
                    ? "flex flex-col gap-s2 pt-s3 reading:pt-0"
                    : "flex flex-col gap-s2 pt-s3 pl-s4 reading:border-l reading:border-hairline reading:pt-0"
                }
              >
                <Record
                  as="dt"
                  rank="c"
                  tone="secondary"
                  className="tracking-rail uppercase"
                >
                  {entry.label}
                </Record>
                <Record as="dd" rank="r" className="rail-figure text-ink">
                  {entry.value}
                </Record>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ II ══ THE PLACE ════════════════════════════════════════════════
          The board leaves by the leading edge; the words are held low on the
          trailing columns, so the eye crosses the spread in the opposite
          direction to the one it just travelled.

          **The climb is gone, and what it was doing is why.**

          The board carried `field:-mt-s6` — a flat −192px, to pull it up into
          the screen above. A negative margin knows nothing about what is above
          it, and what is above it here is the hero's record: the four facts the
          whole surface exists to be checked against.

          Measured, across the field widths:

            1280   +69   inert — the words are the taller column, so
                         `items-end` had already placed the board low
            1440    +5   five pixels, before the drift is counted
            1600   −77   the board is over the record
            1920  −160   **two entries — Established, and Manufacture — sit
                         entirely behind the board**, which paints over them:
                         both are `z-index: auto`, so the later element in the
                         document wins and the evidence is simply not there

          It fires only where it breaks something. Below 1600 the grid's own
          alignment absorbs it, so it buys no composition; at and above 1600 it
          spends the record to buy one. That is the same arithmetic-against-an-
          assumed-height the first chapter was rewritten to remove, and it fails
          the same way — silently, and worse on a larger screen.

          Nothing is substituted for it. The chapter's asymmetry was never in
          the offset: it is the board leaving by the leading edge at column one
          with no margin, against words held low on the trailing five, and both
          survive untouched. The board now begins where its row begins, so the
          record above it cannot be reached at any width. */}
      <section
        id="the-place"
        className="relative pt-s5 field:pt-0"
      >
        <div className="grid gap-s5 paired:grid-cols-12 paired:items-end paired:gap-8">
          <div
            data-drift="20"
            className="paired:col-span-7 paired:col-start-1 field:col-span-6"
          >
            <EditorialImage image={room} sizes={imageSizes.spread} priority />
          </div>

          <div className="px-6 pb-s5 reading:px-12 paired:col-span-4 paired:col-start-9 paired:px-0 paired:pr-12 paired:pb-s6 field:col-span-5 field:col-start-8">
            <Record
              rank="c"
              tone="secondary"
              weight="medium"
              className="mb-s4 tracking-rail uppercase"
            >
              The place
            </Record>

            <Statement
              rank="t1"
              as="h2"
              className="optical-left reading:max-w-none"
            >
              {intro.description}
            </Statement>

            <Passage className="mt-s4 max-w-[38ch] text-ink-secondary">
              {intro.body}
            </Passage>

            <Continuation href={ROUTES.about} className="mt-s5">
              Who is in the building
            </Continuation>
          </div>
        </div>
      </section>

      {/* ══ III ═ THE OBJECT ═══════════════════════════════════════════════
          One small board, off centre, nothing beside it, and the ground already
          beginning to fall away beneath it. */}
      <section className="relative pt-s6">
        <div className={FIELD}>
          <div className="grid paired:grid-cols-12">
            <div
              data-drift="-10"
              className="paired:col-span-5 paired:col-start-7 field:col-span-4 field:col-start-8"
            >
              <EditorialImage image={object} sizes={imageSizes.inset} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ IV ══ SILENCE ══════════════════════════════════════════════════

          The dark field. Paper falls away over a long graded band, the ground
          becomes ink for a full screen, one sentence sits in it, and the ground
          comes back. It is the page changing material, not a section with a
          black background — which is why both dissolves are as tall as they
          are and why there is no rule anywhere near it.

          It is unconditional, and it carries a sentence rather than a
          photograph, so nothing about the archive can take it away. */}
      <>
        <div aria-hidden className="dissolve-into-ink mt-s6 w-full" />

        <section className="relative flex min-h-svh w-full flex-col justify-center bg-ink text-paper">
          <div className={FIELD}>
            <div
              data-reveal
              className="max-w-[18rem] reading:max-w-[34rem] field:max-w-[40rem]"
            >
              <span
                aria-hidden
                className="mb-s5 block h-px w-16 bg-ink-secondary-inverse/60"
              />
              <Statement
                rank="d"
                as="p"
                className="optical-left reading:max-w-none"
              >
                {intro.heading}
              </Statement>
              <Record
                rank="c"
                className="mt-s5 tracking-rail text-ink-secondary-inverse uppercase"
              >
                {company.contact.address.city},{" "}
                {company.contact.address.country}
              </Record>
            </div>
          </div>
        </section>

        <div aria-hidden className="dissolve-out-of-ink w-full" />
      </>

      {/* ══ V ═══ THE DECISION ═════════════════════════════════════════════
          The widest board on the site, edge to edge, and the argument split
          across the spread beneath it: the word on the leading columns, the
          mechanism on the trailing ones, set lower. */}
      <section id="the-decision" className="relative">
        <EditorialImage image={cut} sizes={imageSizes.bleed} bleed />

        <div className={`${FIELD} mt-s6`}>
          <div className="grid gap-s4 paired:grid-cols-12 paired:gap-8">
            <div data-reveal className="paired:col-span-5">
              <Statement
                rank="d"
                as="h2"
                className="optical-left reading:max-w-none"
              >
                {mechanism?.title ?? "Cutting"}
              </Statement>
            </div>

            <div
              data-reveal
              className="paired:col-span-5 paired:col-start-8 paired:pt-s4"
            >
              {mechanism?.description && (
                <Passage className="max-w-[40ch] text-ink-secondary">
                  {mechanism.description}
                </Passage>
              )}
              <Continuation href={ROUTES.manufacturing} className="mt-s5">
                The whole process, stage by stage
              </Continuation>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VI ══ THE RANGE ════════════════════════════════════════════════ */}
      <div aria-hidden className="dissolve-into-recessed mt-s6 w-full" />

      <section className="relative bg-recessed pb-s6">
        <div className={FIELD}>
          <div
            data-reveal
            className="grid gap-s4 paired:grid-cols-12 paired:gap-8"
          >
            <Record
              rank="c"
              tone="secondary"
              weight="medium"
              className="tracking-rail uppercase paired:col-span-3 paired:pt-s2"
            >
              {sections.categories?.eyebrow ?? "What we make"}
            </Record>

            <Statement
              rank="d"
              as="h2"
              className="optical-left paired:col-span-8 reading:max-w-none"
            >
              {sections.categories?.heading ?? "What we make"}
            </Statement>
          </div>
        </div>

        {/* Spread one — the board leaves by the trailing edge; the name is set
            on the leading columns, low, against the board's foot. */}
        <div className="mt-s6 grid gap-s5 paired:grid-cols-12 paired:items-end paired:gap-8">
          <a
            href={range[0].href}
            className="group order-2 px-6 reading:px-12 paired:order-none paired:col-span-4 paired:col-start-1 paired:px-0 paired:pl-12 paired:pb-s6 field:col-span-4"
          >
            <Record
              rank="c"
              tone="secondary"
              weight="medium"
              className="mb-s3 tracking-rail"
            >
              01
            </Record>
            <Statement rank="t1" as="h3" className="optical-left">
              <span className="rule-grow">{range[0].name}</span>
            </Statement>
            <p className="mt-s3 max-w-[32ch] font-sans text-r text-pretty text-ink-secondary">
              {range[0].shortDescription}
            </p>
          </a>

          {range[0].frame && (
            <div
              data-drift="16"
              className="paired:col-span-8 paired:col-start-5 field:col-span-8 field:col-start-5"
            >
              <EditorialImage
                image={range[0].frame}
                sizes={imageSizes.spread}
              />
            </div>
          )}
        </div>

        {/* Spread two — a portrait board, inset from the leading margin, the
            name high on the trailing columns. Shape, side, height and alignment
            all change. */}
        <div className={`${FIELD} mt-s6`}>
          <div className="grid gap-s5 paired:grid-cols-12 paired:gap-8">
            {range[1].frame && (
              <div
                data-drift="-16"
                className="paired:col-span-5 paired:col-start-2 field:col-span-4 field:col-start-2"
              >
                <EditorialImage
                  image={range[1].frame}
                  sizes={imageSizes.inset}
                />
              </div>
            )}

            <a
              href={range[1].href}
              className="group paired:col-span-4 paired:col-start-8 paired:pt-s6 field:col-span-4 field:col-start-8"
            >
              <Record
                rank="c"
                tone="secondary"
                weight="medium"
                className="mb-s3 tracking-rail"
              >
                02
              </Record>
              <Statement rank="t1" as="h3" className="optical-left">
                <span className="rule-grow">{range[1].name}</span>
              </Statement>
              <p className="mt-s3 max-w-[32ch] font-sans text-r text-pretty text-ink-secondary">
                {range[1].shortDescription}
              </p>
              <span className="mt-s5 block max-w-[34ch] font-sans text-b text-pretty text-ink-secondary">
                {sections.categories?.description}
              </span>
            </a>
          </div>
        </div>

        <div className={`${FIELD} mt-s6`}>
          <Continuation href={ROUTES.products}>
            Every product we make
          </Continuation>
        </div>
      </section>

      <div aria-hidden className="dissolve-out-of-recessed w-full" />

      {/* ══ VII ═ THE CODA ═════════════════════════════════════════════════
          One line, at the largest measure the page has used since the first
          screen, and one door. Nothing is asked for. */}
      <section className="relative pt-s6 pb-s6">
        <div className={FIELD}>
          <div
            data-reveal
            className="grid gap-s5 paired:grid-cols-12 paired:gap-8"
          >
            <div className="paired:col-span-8">
              <span aria-hidden className="mb-s5 block h-px w-16 bg-hairline" />
              <p className="optical-left font-serif text-coda text-balance hyphens-none">
                {sections.origin?.heading ?? intro.heading}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-s4 paired:col-span-3 paired:col-start-10">
              <Record
                rank="c"
                tone="secondary"
                className="tracking-rail uppercase"
              >
                Est. {company.foundedYear} · {company.contact.address.city}
              </Record>
              <Continuation href={ROUTES.manufacturing}>
                How a piece is made
              </Continuation>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
