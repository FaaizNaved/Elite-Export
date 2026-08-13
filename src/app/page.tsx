import type { Metadata } from "next";
import { EditorialImage } from "@/components/evidence";
import { Reveal } from "@/components/system";
import { Continuation } from "@/components/ui/action";
import { Passage, Record, Statement } from "@/components/ui/typography";
import { company, homeTelling, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { sceneRefusal, type Scene } from "@/components/structure";
import { getCategories, getCompanyPage, getHomeContent } from "@/lib/content";
import { chapterFrames, framed } from "@/lib/demo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/**
 * Home — one document, seven movements, no seams.
 *
 * The architecture is untouched: `homeTelling` names the chapters,
 * `chapterFrames` supplies the frames, `sceneRefusal` decides whether a
 * chapter may be told, and every frame reaches the page through
 * `EditorialImage`. What is set here is the sequence — where the eye enters,
 * which edge a board leaves by, how long the silence runs, and how one ground
 * becomes the next.
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

  const place = chapterFrames("C1");
  const decision = chapterFrames("C3");
  const mechanism = manufacturing?.steps.find((step) => step.title === "Cutting");

  const placeScenes: Scene[] = [{ frames: place, relationship: "establish-and-examine" }];
  const decisionScenes: Scene[] = mechanism ? [{ frames: decision }] : [];

  const tells = new Set(
    homeTelling.filter(({ role }) => role !== "hands").map(({ chapter }) => chapter),
  );
  const tellsPlace = tells.has("C1") && !sceneRefusal(placeScenes, { opensTheTelling: true });
  const tellsDecision =
    tells.has("C3") && !sceneRefusal(decisionScenes, { isRecognition: true }) && mechanism;
  const holds = tellsPlace || tellsDecision;

  const [room, object] = place;
  const [cut] = decision;
  const board = framed(hero.image, "E5", [1000, 1500]);

  const record = [
    { label: "Established", value: String(company.foundedYear) },
    { label: "Manufacture", value: `Own facility, ${company.contact.address.city}` },
    { label: "Capability", value: "OEM and ODM" },
    {
      label: "Audited by",
      value: company.certifications
        .map((certification) => certification.name.replace("Leather Working Group", "LWG"))
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
          index % 2 === 0 ? ([2400, 1500] as [number, number]) : ([1400, 1800] as [number, number]),
        )
      : undefined,
  }));

  return (
    <div className="field-grade">
      <Reveal />

      {/* ══ I ═══ ARRIVAL ══════════════════════════════════════════════════ */}
      <section className="atmosphere-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-between pt-s5 pb-s5 field:pt-0">
        {board.width && (
          <div className="order-2 mt-s5 field:absolute field:top-0 field:right-0 field:bottom-[14rem] field:z-0 field:order-none field:mt-0 field:w-[37%]">
            <div data-drift="14" className="h-full field:[&_.reserved-frame]:h-full">
              <EditorialImage
                image={board}
                sizes="(min-width: 1280px) 40vw, 100vw"
                priority
                className="field:h-full"
              />
            </div>
          </div>
        )}

        <div className={`relative z-10 flex flex-1 flex-col justify-center ${FIELD} field:pt-s6`}>
          <div className="field:max-w-[56%]">
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

            <p className="mt-s4 max-w-[34ch] font-sans text-b text-pretty text-ink-secondary field:mt-s5">
              {hero.description}
            </p>
          </div>
        </div>

        {/* The rail. Hairlines between the facts, not around them. */}
        <div className={`relative z-10 order-3 ${FIELD} field:order-none`}>
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
                <Record as="dt" rank="c" tone="secondary" className="tracking-rail uppercase">
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
          The board leaves by the leading edge and climbs into the screen above
          it; the words are held low on the trailing columns, so the eye crosses
          the spread in the opposite direction to the one it just travelled. */}
      {tellsPlace && room && (
        <section id="the-place" className="atmosphere-stitch relative pt-s5 field:pt-0">
          <div className="grid gap-s5 paired:grid-cols-12 paired:items-end paired:gap-8">
            <div
              data-drift="20"
              className="paired:col-span-7 paired:col-start-1 field:col-span-6 field:-mt-s6"
            >
              <EditorialImage image={room} sizes="(min-width: 1024px) 56vw, 100vw" priority />
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

              <Statement rank="t1" as="h2" className="optical-left reading:max-w-none">
                {intro.description}
              </Statement>

              <Passage className="mt-s4 max-w-[38ch] text-ink-secondary">{intro.body}</Passage>

              <Continuation href={ROUTES.about} className="mt-s5">
                Who is in the building
              </Continuation>
            </div>
          </div>
        </section>
      )}

      {/* ══ III ═ THE OBJECT ═══════════════════════════════════════════════
          One small board, off centre, nothing beside it, and the ground already
          beginning to fall away beneath it. */}
      {tellsPlace && object && (
        <section className="relative pt-s6">
          <div className={FIELD}>
            <div className="grid paired:grid-cols-12">
              <div
                data-drift="-10"
                className="paired:col-span-5 paired:col-start-7 field:col-span-4 field:col-start-8"
              >
                <EditorialImage image={object} sizes="(min-width: 1024px) 32vw, 100vw" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ IV ══ SILENCE ══════════════════════════════════════════════════ */}
      {holds && (
        <>
          <div aria-hidden className="dissolve-into-ink mt-s6 w-full" />

          <section className="relative flex min-h-svh w-full flex-col justify-center bg-ink text-paper">
            <div className={FIELD}>
              <div data-reveal className="max-w-[18rem] reading:max-w-[34rem] field:max-w-[40rem]">
                <span aria-hidden className="mb-s5 block h-px w-16 bg-ink-secondary-inverse/60" />
                <Statement rank="d" as="p" className="optical-left reading:max-w-none">
                  {intro.heading}
                </Statement>
                <Record
                  rank="c"
                  className="mt-s5 tracking-rail text-ink-secondary-inverse uppercase"
                >
                  {company.contact.address.city}, {company.contact.address.country}
                </Record>
              </div>
            </div>
          </section>

          <div aria-hidden className="dissolve-out-of-ink w-full" />
        </>
      )}

      {/* ══ V ═══ THE DECISION ═════════════════════════════════════════════
          The widest board on the site, edge to edge, and the argument split
          across the spread beneath it: the word on the leading columns, the
          mechanism on the trailing ones, set lower. */}
      {tellsDecision && cut && mechanism && (
        <section id="the-decision" className="atmosphere-emboss relative">
          <EditorialImage image={cut} sizes="100vw" bleed className="w-screen" />

          <div className={`${FIELD} mt-s6`}>
            <div className="grid gap-s4 paired:grid-cols-12 paired:gap-8">
              <div data-reveal className="paired:col-span-5">
                <Statement rank="d" as="h2" className="optical-left reading:max-w-none">
                  {mechanism.title}
                </Statement>
              </div>

              <div data-reveal className="paired:col-span-5 paired:col-start-8 paired:pt-s4">
                <Passage className="max-w-[40ch] text-ink-secondary">
                  {mechanism.description}
                </Passage>
                <Continuation href={ROUTES.manufacturing} className="mt-s5">
                  The whole process, stage by stage
                </Continuation>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ VI ══ THE RANGE ════════════════════════════════════════════════ */}
      <div aria-hidden className="dissolve-into-recessed mt-s6 w-full" />

      <section className="relative bg-recessed pb-s6">
        <div className={FIELD}>
          <div data-reveal className="grid gap-s4 paired:grid-cols-12 paired:gap-8">
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
        {range[0] && (
          <div className="mt-s6 grid gap-s5 paired:grid-cols-12 paired:items-end paired:gap-8">
            <a
              href={range[0].href}
              className="group order-2 px-6 reading:px-12 paired:order-none paired:col-span-4 paired:col-start-1 paired:px-0 paired:pl-12 paired:pb-s6 field:col-span-4"
            >
              <Record rank="c" tone="secondary" weight="medium" className="mb-s3 tracking-rail">
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
                <EditorialImage image={range[0].frame} sizes="(min-width: 1024px) 66vw, 100vw" />
              </div>
            )}
          </div>
        )}

        {/* Spread two — a portrait board, inset from the leading margin, the
            name high on the trailing columns. Shape, side, height and alignment
            all change. */}
        {range[1] && (
          <div className={`${FIELD} mt-s6`}>
            <div className="grid gap-s5 paired:grid-cols-12 paired:gap-8">
              {range[1].frame && (
                <div
                  data-drift="-16"
                  className="paired:col-span-5 paired:col-start-2 field:col-span-4 field:col-start-2"
                >
                  <EditorialImage image={range[1].frame} sizes="(min-width: 1024px) 38vw, 100vw" />
                </div>
              )}

              <a
                href={range[1].href}
                className="group paired:col-span-4 paired:col-start-8 paired:pt-s6 field:col-span-4 field:col-start-8"
              >
                <Record rank="c" tone="secondary" weight="medium" className="mb-s3 tracking-rail">
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
        )}

        <div className={`${FIELD} mt-s6`}>
          <Continuation href={ROUTES.products}>Every product we make</Continuation>
        </div>
      </section>

      <div aria-hidden className="dissolve-out-of-recessed w-full" />

      {/* ══ VII ═ THE CODA ═════════════════════════════════════════════════
          One line, at the largest measure the page has used since the first
          screen, and one door. Nothing is asked for. */}
      <section className="atmosphere-linen relative pt-s6 pb-s6">
        <div className={FIELD}>
          <div data-reveal className="grid gap-s5 paired:grid-cols-12 paired:gap-8">
            <div className="paired:col-span-8">
              <span aria-hidden className="mb-s5 block h-px w-16 bg-hairline" />
              <p className="optical-left font-serif text-coda text-balance hyphens-none">
                {sections.origin?.heading ?? intro.heading}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-s4 paired:col-span-3 paired:col-start-10">
              <Record rank="c" tone="secondary" className="tracking-rail uppercase">
                Est. {company.foundedYear} · {company.contact.address.city}
              </Record>
              <Continuation href={ROUTES.manufacturing}>How a piece is made</Continuation>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
