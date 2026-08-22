import type { Metadata } from "next";
import Link from "next/link";
import { ImageReveal, SlideUp } from "@/components/motion";
import { HomeOpening, StatementPanel } from "@/components/sections";
import { ContentImage } from "@/components/ui/image";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { company, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import {
  getCategories,
  getCompanyPage,
  getFeaturedMachines,
  getHomeContent,
  getProducts,
  getStatement,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { countryName } from "@/utils/country";
import type { Product } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/** Page gutter, matched to `Container size="lg"`. */
const gutter = "mx-auto w-full max-w-wide px-6 md:px-8";

const quietLink =
  "group inline-flex items-center gap-2 self-start border-b border-border-strong pb-1 font-sans text-button font-medium tracking-[0.06em] uppercase transition-base hover:border-accent hover:text-accent-strong";

const arrow = "transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0";

/**
 * Home.
 *
 * The governing decision of this pass: the placeholders are empty tonal fields,
 * and an empty field given 99% of the viewport is not a powerful image — it is
 * a large blank rectangle. The previous version handed nearly every act a
 * full-bleed frame, so the page read as a stack of coloured blocks with good
 * typography between them.
 *
 * The identity is carried by the *document* instead: a manufacturer's index
 * with item codes and leather weights, a production register, a shipping
 * manifest. Those are things only this company can print. Photographs sit in
 * considered, modest frames — big enough to matter, not so big that emptiness
 * becomes the composition. When real photography lands in the same paths the
 * frames are already placed, and the page gains a subject rather than gaining
 * its first idea.
 *
 * Every figure derives from `config/company.ts` or the catalogue.
 *
 * The frames on this page are sized for photographs that do not exist yet.
 * What each one is waiting for — subject, orientation, distance, and the area
 * that has to stay quiet because type sits over it — is written down in
 * `docs/design-system/photography-brief.md`. Read it before changing any
 * aspect ratio here; the ratios are the brief.
 */
export default async function HomePage() {
  const [categories, products, manufacturing, machines, home, statement] = await Promise.all([
    getCategories(),
    getProducts(),
    getCompanyPage("manufacturing"),
    getFeaturedMachines(3),
    getHomeContent(),
    getStatement(),
  ]);

  const { hero, intro, sections } = home;
  const credentials = company.certifications.map((certification) => certification.name);

  const stageTitles = ["Hide selection", "Assembly", "Finishing"];
  const stages = stageTitles.flatMap(
    (title) => manufacturing?.steps.find((step) => step.title === title) ?? [],
  );

  /** The catalogue, grouped the way the factory is laid out. */
  const index = categories
    .map((category) => ({
      category,
      items: products.filter((product) => product.categorySlug === category.slug),
    }))
    .filter((group) => group.items.length > 0);

  const materials = [...new Set(products.map((product) => product.material).filter(Boolean))];

  return (
    <>
      {/* ══════════════════════════════════════ I — ARRIVAL ════════════════ */}
      <HomeOpening
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
        image={hero.image}
        action={hero.primaryCta}
        credentials={credentials}
      />

      {/* ══════════════════════════════════════ II — THE OBJECT ════════════ */}
      {/* An index, not a pair of tiles.
          A buyer landing here asks one question — what do you actually make —
          and a manufacturer answers it the way its catalogue does: the pieces by
          name, the leather each is cut from, and the code it is ordered by. The
          plate beside each line is small on purpose. The line is the content;
          the photograph confirms it. */}
      {index.length > 0 && (
        <Section spacing="lg">
          <div className={gutter}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <Typography variant="overline">{sections.categories?.eyebrow}</Typography>
              <Typography
                variant="small"
                className="max-w-sm text-foreground-secondary md:text-right"
              >
                {sections.categories?.description}
              </Typography>
            </div>

            <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-16">
              {index.map(({ category, items }) => (
                <section key={category.href} aria-labelledby={`cat-${category.slug}`}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-foreground/25 pb-3">
                    <Link href={category.href} className="group">
                      <h2
                        id={`cat-${category.slug}`}
                        className="font-display text-h3 font-medium transition-base group-hover:text-accent-strong"
                      >
                        {category.name}
                      </h2>
                    </Link>
                    <span className="shrink-0 text-right font-sans text-caption tracking-[0.1em] uppercase text-foreground-muted">
                      {category.subcategories
                        .filter((sub) => sub.productCount > 0)
                        .map((sub) => sub.name)
                        .join(" · ")}
                    </span>
                  </div>

                  <ul>
                    {items.map((item) => (
                      <li key={item.href}>
                        <IndexRow product={item} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <Link href={ROUTES.products} className={`${quietLink} mt-12`}>
              The full catalogue
              <span aria-hidden className={arrow}>
                &rarr;
              </span>
            </Link>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════ III — THE HAND ═════════════ */}
      {/* The one place on the page where somebody is present, and the quietest
          thing on it. A plate, one line set at the foot of it, and three empty
          columns between them.

          It used to be a heading, a paragraph and a link — the "image + heading
          + paragraph" block the rest of the page was built to avoid — and the
          paragraph restated the hero almost exactly. Subtracting it left the
          sentence that was authored for this section and never rendered: the
          heading and its second half now read as one line, which is the whole
          annotation. The section is deliberately the only one without an
          eyebrow. It is an interruption, not a chapter. */}
      <Section spacing="lg" className="bg-surface-sunken">
        <div className={gutter}>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
            <ImageReveal amount={0.15} className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-background">
                <ContentImage image={intro.image} sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
            </ImageReveal>

            {/* Set at reading size rather than heading size. A section carrying
                one sentence does not need that sentence enlarged; the
                photograph is the evidence and this is the caption under it. */}
            <SlideUp delay={0.1} className="flex flex-col gap-4 pb-1 md:col-span-4 md:col-start-8">
              <h2 className="font-display text-body-lg font-medium">
                {intro.heading}
                {intro.description && (
                  <span className="text-foreground-secondary"> {intro.description}</span>
                )}
              </h2>
              {/* The quiet reference link, not the chapter link the other acts
                  use. An uppercase letterspaced rule-under-it action was the
                  last piece of website marketing left in this section; a
                  caption cites its source, it does not call anyone to act.
                  Same treatment as "How we inspect" in the record — no new
                  vocabulary, just the softer of the two that already exist. */}
              <Link
                href={ROUTES.about}
                className="self-start font-sans text-small text-foreground-secondary underline underline-offset-4 transition-fast hover:text-accent-strong"
              >
                About the company
              </Link>
            </SlideUp>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════ IV — THE MATERIAL ══════════ */}
      {/* One transformation. The hide is a wide shallow band — a material
          sample, not a cinematic still. The bench is smaller and set right; the
          finished piece smaller again and set left, carrying only its name. The
          leather gets more resolved as the frames get quieter, which is the
          argument of the section. */}
      {stages.length === 3 && (
        <Section spacing="lg">
          <div className={gutter}>
            <div className="flex flex-col gap-3">
              <Typography variant="overline">{sections.manufacturing?.eyebrow}</Typography>
              <Typography variant="h3" as="h2" className="max-w-xl">
                {sections.manufacturing?.heading ?? "How it is made"}
              </Typography>
            </div>
          </div>

          <ImageReveal amount={0.15} className={`${gutter} mt-12 md:mt-14`}>
            {/* The band is only a band once there is width to run across. At
                360px a 5:2 crop is 119px tall — a strip, not a hide, and
                shorter than the finished piece three frames later, which
                inverts the whole argument of the section. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken sm:aspect-[5/2] lg:aspect-[3/1]">
              <ContentImage image={stages[0].image ?? intro.image} sizes="100vw" quality={88} />
            </div>
          </ImageReveal>

          {/* Every caption in this sequence is set identically: one column,
              four grid units wide, name over note, same two sizes. This one was
              a wider heading laid out beside its note instead of above it,
              which made the first stage read as a section of its own rather
              than the first of three. With the text held constant the only
              thing changing down the sequence is the size of the plate — which
              is the argument being made. */}
          <div className={`${gutter} mt-5`}>
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <SlideUp className="flex flex-col gap-2 md:col-span-4">
                <h3 className="font-display text-body-lg font-medium">{stages[0].title}</h3>
                <p className="font-sans text-small text-foreground-secondary">
                  {stages[0].description}
                </p>
              </SlideUp>
            </div>
          </div>

          <div className={`${gutter} mt-16 md:mt-20`}>
            <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
              <SlideUp className="order-2 flex flex-col gap-2 pb-1 md:order-1 md:col-span-4">
                <h3 className="font-display text-body-lg font-medium">{stages[1].title}</h3>
                <p className="font-sans text-small text-foreground-secondary">
                  {stages[1].description}
                </p>
              </SlideUp>
              <ImageReveal
                amount={0.15}
                className="order-1 md:order-2 md:col-span-7 md:col-start-6"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-sunken">
                  <ContentImage
                    image={stages[1].image ?? intro.image}
                    sizes="(min-width: 768px) 58vw, 100vw"
                  />
                </div>
              </ImageReveal>
            </div>
          </div>

          <div className={`${gutter} mt-16 md:mt-20`}>
            <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
              {/* The resolution of the sequence, and it has to survive being
                  the smallest thing in it. At three columns this plate came
                  out 314px on a 1440 screen — narrower than an ordinary
                  product card in the catalogue grid, so the object every
                  previous frame was working towards arrived smaller than
                  routine furniture elsewhere on the site. One column wider
                  reads as a finished piece set down and looked at. The drop
                  from the bench is still emphatic: roughly 96 / 55 / 30 per
                  cent of the measure, and now decelerating evenly instead of
                  falling off a cliff at the end.

                  Held narrow on phones by the same argument — stacking every
                  frame to the full measure made the finished object the
                  largest plate in the sequence. */}
              <ImageReveal amount={0.2} className="max-w-52 md:col-span-4 md:max-w-none">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-sunken">
                  <ContentImage
                    image={stages[2].image ?? intro.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
              </ImageReveal>
              <SlideUp className="flex flex-col gap-2 pb-1 md:col-span-4 md:col-start-6">
                <h3 className="font-display text-body-lg font-medium">{stages[2].title}</h3>
                <Link href={ROUTES.manufacturing} className={`${quietLink} mt-3`}>
                  See the full process
                  <span aria-hidden className={arrow}>
                    &rarr;
                  </span>
                </Link>
              </SlideUp>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════ V — THE WORKSHOP ═══════════ */}
      {/* A production register on a warm charcoal floor. Stage against
          equipment, hairline-ruled, set in sans. Equipment gets recorded, not
          advertised — the register is the section, and the photograph is one
          modest plate beside it rather than a black hero. */}
      {machines.length > 0 && (
        <Section spacing="md" className="bg-ink text-primary-foreground">
          <div className={gutter}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-4 lg:col-span-4">
                <Typography variant="overline" className="text-primary-foreground/60">
                  The floor
                </Typography>
                <Typography variant="h4" as="h2" className="font-display text-primary-foreground">
                  Hands decide how it ages. Machines decide whether the five hundredth matches the
                  first.
                </Typography>

                <ImageReveal amount={0.2} className="mt-2">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary">
                    <ContentImage
                      image={machines[0].gallery.thumbnail}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                </ImageReveal>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="flex items-baseline justify-between border-b border-primary-foreground/25 pb-2 font-sans text-caption tracking-[0.1em] uppercase text-primary-foreground/55">
                  <span>Stage</span>
                  <span>Equipment</span>
                </div>

                <ul>
                  {machines.map((machine) => (
                    <li key={machine.slug}>
                      <Link
                        href={machine.href}
                        // Two columns once the row can hold them. At 360px the
                        // equipment names wrap to two lines while the stage
                        // stays pinned to the first baseline, so the register
                        // reads ragged; stacked, it stays a register.
                        className="group flex flex-col gap-1 border-b border-primary-foreground/15 py-4 transition-fast hover:text-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                      >
                        <span className="shrink-0 font-sans text-caption tracking-[0.1em] uppercase text-primary-foreground/65">
                          {machine.stage}
                        </span>
                        <span className="font-sans text-body font-medium sm:text-right">
                          {machine.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={ROUTES.technology}
                  className="group mt-8 inline-flex items-center gap-2 border-b border-primary-foreground/25 pb-1 font-sans text-button font-medium tracking-[0.06em] uppercase text-primary-foreground/90 transition-base hover:border-accent hover:text-accent"
                >
                  The full register
                  <span aria-hidden className={arrow}>
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════ VI — THE RECORD ════════════ */}
      {/* Paperwork, set as paperwork. Nothing here is larger than body size.
          The materials column quotes the leather weights straight from the
          catalogue — the most specific language the company owns, and it was
          not on this page at all before. */}
      <Section spacing="md">
        <div className={gutter}>
          <div className="grid gap-8 border-y border-border py-8 sm:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-3">
              <Typography variant="overline">Audited by</Typography>
              <ul className="flex flex-col gap-1.5">
                {company.certifications.map((certification) => (
                  <li key={certification.name} className="font-sans text-small">
                    {certification.name}
                    <span className="text-foreground-muted">
                      {" — "}
                      {[certification.issuer, certification.year].filter(Boolean).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={ROUTES.quality}
                className="mt-1 self-start font-sans text-small text-foreground-secondary underline underline-offset-4 transition-fast hover:text-accent-strong"
              >
                How we inspect
              </Link>
            </div>

            {materials.length > 0 && (
              <div className="flex flex-col gap-3">
                <Typography variant="overline">Leather we cut</Typography>
                <ul className="flex flex-col gap-1.5">
                  {materials.map((material) => (
                    <li key={material} className="font-sans text-small text-foreground-secondary">
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════ VII — THE DEPARTURE ════════ */}
      {/* Made here, then it goes. Set as a manifest: the origin on one side, the
          destinations ruled off on the other. Typographic rather than a
          photograph of a container, because the fact is the point and both
          sides of it come from config. */}
      <Section spacing="lg" className="bg-surface-sunken">
        <div className={gutter}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-2 lg:col-span-4">
              <Typography variant="overline">Made in</Typography>
              <Typography variant="h3" as="h2">
                {company.contact.address.city}
              </Typography>
              <Typography variant="small" className="text-foreground-secondary">
                {company.contact.address.state}, {company.contact.address.country}
              </Typography>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-7 lg:col-start-6">
              <Typography variant="overline">Shipped to</Typography>
              <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3">
                {company.exportMarkets.map((code) => (
                  <li key={code} className="border-b border-border py-2.5 font-sans text-small">
                    {countryName(code)}
                  </li>
                ))}
              </ul>
              <Link href={ROUTES.exportCapabilities} className={`${quietLink} mt-3`}>
                How we ship
                <span aria-hidden className={arrow}>
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════ VIII — SILENCE ═════════════ */}
      <StatementPanel statement={statement.statement} caption={statement.caption} />
    </>
  );
}

/**
 * One line of the catalogue index: plate, name, leather, code.
 *
 * The whole row is the link, so the target is the piece rather than a word
 * inside a card. The code sits in tabular figures on the right, where a trade
 * catalogue would put a price — this house does not publish prices, so what
 * occupies that column is the order reference.
 */
function IndexRow({ product }: { product: Product }) {
  return (
    <Link
      href={product.href}
      aria-label={`${product.title}, item code ${product.itemCode}`}
      className={cn(
        "group grid grid-cols-[4rem_1fr] items-center gap-x-5 gap-y-1 border-b border-border py-4",
        "transition-fast hover:border-border-strong",
        "md:grid-cols-[5rem_minmax(0,15rem)_1fr_auto] md:gap-x-8",
      )}
    >
      <div className="relative aspect-square w-16 shrink-0 overflow-hidden bg-surface-sunken md:w-20">
        <ContentImage
          image={product.gallery.thumbnail}
          sizes="80px"
          className="object-cover transition-premium group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        />
      </div>

      <span className="font-display text-body-lg font-medium transition-base group-hover:text-accent-strong">
        {product.title}
      </span>

      {/* The leather, in the manufacturer's own words. Hidden on phones, where
          the name and the code are what identify the piece. */}
      <span className="font-sans text-small text-foreground-secondary max-md:hidden">
        {product.material}
      </span>

      {/* Tracked like the other technical labels on the page. Set solid, the
          code read as ordinary small print sitting next to the leather; a
          reference number on an order sheet is something a buyer transcribes
          into an email, and it should look like one. */}
      <span className="col-start-2 font-sans text-caption tracking-[0.08em] tabular-nums text-foreground-muted md:col-start-4 md:text-right">
        {product.itemCode}
      </span>
    </Link>
  );
}
