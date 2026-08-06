import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { CtaBanner } from "@/components/layout";
import { Counter, ImageReveal, SlideUp, Stagger, StaggerItem } from "@/components/motion";
import { EditorialSpread, FullBleedImage, SectionHeader } from "@/components/sections";
import { StickyCta } from "@/components/scroll";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { ContentImage } from "@/components/ui/image";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { company, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import {
  getCategories,
  getCompanyPage,
  getFeaturedMachines,
  getHomeContent,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { countryName } from "@/utils/country";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/**
 * Home page — implements `docs/design-system/home-creative-direction.md`.
 *
 * The narrative runs identity → story → manufacturing → technology → pause →
 * products → quality → reach → action. Manufacturing precedes the catalogue
 * deliberately: a buyer doing due diligence is asking whether this is a real
 * factory, and the answer has to arrive before the products do.
 *
 * Every figure on this page is derived from `config/company.ts` or the
 * catalogue at render time. Nothing countable is authored in the home content
 * files, so an unverified statistic cannot be introduced by a content edit.
 * The process, quality and machinery content files all carry figures — AQL
 * bands, rejection rates, cutting tonnage, per-shift capacity — and none of
 * them are on this page, because none of them are client-confirmed (§0).
 */
export default async function HomePage() {
  const [categories, manufacturing, quality, machines, home] = await Promise.all([
    getCategories(),
    getCompanyPage("manufacturing"),
    getCompanyPage("quality"),
    getFeaturedMachines(3),
    getHomeContent(),
  ]);

  const { hero, intro, pause, sections, cta } = home;
  const yearsManufacturing = new Date().getFullYear() - company.foundedYear;

  /**
   * §1 credential rail. Blueprint §4 specified five items; three survive the
   * facts register — OEM/ODM and the MOQ figure are unverified placeholder copy.
   */
  const credentials = [
    `Est. ${company.foundedYear}`,
    company.certifications.map((certification) => certification.name).join(" · "),
    `${company.exportMarkets.length} export markets`,
  ].filter(Boolean);

  /** Figures. Config only — no capacity or floor-area claims. */
  const figures = [
    { value: yearsManufacturing, label: "Years manufacturing" },
    { value: company.exportMarkets.length, label: "Export markets" },
    { value: company.certifications.length, label: "Independent certifications" },
  ];

  /**
   * Named rather than sliced. `slice(0, 4)` returned the first four in file
   * order and ended the section on "Machine processing" — a sequence titled
   * "the route every order takes" that never reached a finished piece, and that
   * dropped the two stages blueprint §7 chose precisely because they describe a
   * checkable mechanism (the saddle stitch, the three burnishing passes).
   */
  const stageTitles = ["Hide selection", "Cutting", "Assembly", "Finishing"];
  const namedStages = stageTitles.flatMap(
    (title) => manufacturing?.steps.find((step) => step.title === title) ?? [],
  );
  const stages =
    namedStages.length === stageTitles.length ? namedStages : (manufacturing?.steps.slice(0, 4) ?? []);

  /** The inspection photograph for §7. Falls back to the page hero. */
  const inspectionImage =
    quality?.steps.find((step) => step.image)?.image ?? quality?.hero;

  return (
    <>
      {/* ---------------------------------------------------------------- §1 */}
      {/* Copy anchored to the lower left rather than the centre of the frame.
          Centred copy over a photograph makes a poster; a title in the corner
          of a live frame makes a photograph that happens to carry a title, and
          it leaves the upper two-thirds — where the blueprint's blurred factory
          plane lives — unobstructed. */}
      <Hero
        variant="image"
        align="start"
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.image}
        overlay="strong"
        height="full"
        scrollIndicator
        className="justify-end pb-28 md:pb-32"
        actions={
          <>
            <Link href={hero.primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {hero.primaryCta.label}
            </Link>
            {/* One button, one decision. The second action stays reachable as a
                quiet link — two buttons of equal weight is a choice, and a
                choice is not confidence. */}
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-2 font-sans text-button font-medium text-primary-foreground/80 underline-offset-8 transition-base hover:text-accent sm:ml-4"
              >
                {hero.secondaryCta.label}
                <Icon
                  icon={ArrowRight}
                  size="xs"
                  className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            )}
          </>
        }
        meta={
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-caption tracking-[0.08em] uppercase text-primary-foreground/70">
            {credentials.map((credential, index) => (
              <li
                key={credential}
                // The certifications item is dropped whole below 640px, not just
                // its label — hiding the text alone left its gap behind.
                className={
                  index === 1 ? "flex items-center gap-6 max-sm:hidden" : "flex items-center gap-6"
                }
              >
                {/* Thin gold dividers between items, never before the first. */}
                {index > 0 && <span aria-hidden className="h-3 w-px bg-accent/40 max-sm:hidden" />}
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        }
      />

      {/* ------------------------------------------- §2 The house — story -- */}
      {/* The photograph breaks the container and runs to the left screen edge.
          A workshop contained in a rounded rectangle is an illustration of a
          point; a workshop running off the page is a building. */}
      <Section spacing="lg" texture="grain">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
          <ImageReveal amount={0.15} className="lg:col-span-7 lg:col-start-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-sunken lg:aspect-[4/3] lg:rounded-r-image">
              <ContentImage image={intro.image} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
          </ImageReveal>

          <SlideUp
            delay={0.1}
            className="flex flex-col gap-8 px-6 md:px-8 lg:col-span-4 lg:col-start-9 lg:px-0 lg:pr-8"
          >
            <SectionHeader eyebrow={intro.eyebrow} heading={intro.heading} />
            <Typography variant="body" className="max-w-narrow text-foreground-secondary">
              {intro.body}
            </Typography>
            <Link
              href={ROUTES.about}
              className={buttonVariants({ variant: "text", className: "group self-start" })}
            >
              About the company
              <Icon
                icon={ArrowRight}
                size="xs"
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </SlideUp>
        </div>
      </Section>

      {/* --------------------------- §3 How it is made — manufacturing ----- */}
      {/* Four stages, four photographs, alternating sides. This was a 2×2 text
          grid while four stage photographs sat unused in the content layer —
          a section about a factory floor that showed no factory floor. It is
          now the longest stretch of the page, which is correct: it is the part
          that answers the question the buyer actually arrived with. */}
      {stages.length > 0 && (
        <Section spacing="lg" texture="blueprint">
          <Container size="lg" className="mb-20 md:mb-24">
            <SectionHeader
              eyebrow={sections.manufacturing?.eyebrow}
              heading={sections.manufacturing?.heading ?? "How it is made"}
              description={sections.manufacturing?.description}
              as="h2"
            />
          </Container>

          <div className="flex flex-col gap-24 md:gap-32">
            {stages.map((stage, index) => (
              <EditorialSpread
                key={stage.title}
                marker={String(index + 1).padStart(2, "0")}
                title={stage.title}
                description={stage.description}
                image={stage.image ?? intro.image}
                side={index % 2 === 0 ? "left" : "right"}
                ratio={index % 2 === 0 ? "landscape" : "portrait"}
              />
            ))}
          </div>

          <Container size="lg" className="mt-20 md:mt-24">
            <Link
              href={ROUTES.manufacturing}
              className={buttonVariants({ variant: "text", className: "group" })}
            >
              See the full process
              <Icon
                icon={ArrowRight}
                size="xs"
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </Container>
        </Section>
      )}

      {/* ------------------------------------- §4 Technology — capability -- */}
      {/* The only tonal shift in the middle of the page, and the only section
          on charcoal before the close. A buyer discounts "manufacturer" and
          "technology" harder than any other claim; named equipment is evidence,
          and an icon grid of "Advanced Machinery / Skilled Team" is not.
          Specifications — tonnage, stitch speed, per-shift capacity — stay on
          the machine pages until the client confirms them. */}
      {machines.length > 0 && (
        <Section spacing="lg" className="bg-primary text-primary-foreground">
          <Container size="lg" className="flex flex-col gap-16 md:gap-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <div className="flex flex-col gap-3">
                <Typography variant="overline" className="text-primary-foreground/50">
                  Technology
                </Typography>
                <span aria-hidden className="rule-stitch" />
              </div>
              <Typography variant="h2" as="h2" className="text-primary-foreground">
                The floor is equipped for repeatability
              </Typography>
              <Typography variant="lead" className="max-w-xl text-primary-foreground/70">
                Hand finishing decides how a piece ages. Machinery decides whether the five
                hundredth matches the first.
              </Typography>
            </div>

            <Stagger className="grid gap-12 md:grid-cols-3 md:gap-8">
              {machines.map((machine) => (
                <StaggerItem key={machine.slug} className="group flex flex-col gap-6">
                  <Link href={machine.href} className="flex flex-col gap-6">
                    <AspectRatio
                      ratio="landscape"
                      className="overflow-hidden bg-primary-foreground/5"
                    >
                      <ContentImage
                        image={machine.gallery.thumbnail}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-premium group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                      />
                    </AspectRatio>

                    <div className="flex flex-col gap-3">
                      <Typography variant="overline" className="text-accent">
                        {machine.stage}
                      </Typography>
                      <Typography
                        variant="h3"
                        as="h3"
                        className="text-primary-foreground transition-base group-hover:text-accent"
                      >
                        {machine.title}
                      </Typography>
                      <Typography variant="small" className="text-primary-foreground/60">
                        {machine.shortDescription}
                      </Typography>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            <Link
              href={ROUTES.technology}
              className="group inline-flex items-center gap-2 self-start font-sans text-button font-medium text-primary-foreground underline-offset-8 transition-base hover:text-accent"
            >
              All machinery and specifications
              <Icon
                icon={ArrowRight}
                size="xs"
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </Container>
        </Section>
      )}

      {/* --------------------------------------------- §5 The Pause ------- */}
      <FullBleedImage image={pause.image} label={pause.label} />

      {/* --------------------------------------- §6 What we make ---------- */}
      {/* Offset plates, not a two-up grid. Symmetry is the signature of a
          template; the second plate drops to break it. */}
      <Section spacing="lg" texture="pattern" className="bg-surface-sunken">
        <Container size="lg" className="flex flex-col gap-16 md:gap-20">
          <SectionHeader
            eyebrow={sections.categories?.eyebrow}
            heading={sections.categories?.heading ?? "What we make"}
            description={sections.categories?.description}
            as="h2"
          />

          <Stagger className="grid gap-16 md:grid-cols-2 md:gap-12">
            {categories.map((category, index) => (
              <StaggerItem key={category.href} className={index % 2 === 1 ? "md:mt-24" : undefined}>
                <CategoryCard category={category} variant="editorial" />
              </StaggerItem>
            ))}
          </Stagger>

          <Link
            href={ROUTES.products}
            className={buttonVariants({ variant: "text", className: "group self-start" })}
          >
            All products
            <Icon
              icon={ArrowRight}
              size="xs"
              className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            />
          </Link>
        </Container>
      </Section>

      {/* ------------------------------------ §7 Why the quality holds ---- */}
      {/* Was two ruled lines of text with the inspection photography unused.
          The certifications now carry display weight, because the whole point
          of a certification is that somebody outside the building signed it. */}
      <Section spacing="lg" texture="stitch">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
          {inspectionImage && (
            <ImageReveal amount={0.15} className="lg:col-span-6 lg:col-start-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-sunken lg:rounded-r-image">
                <ContentImage image={inspectionImage} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </ImageReveal>
          )}

          <SlideUp
            delay={0.1}
            className="flex flex-col gap-10 px-6 md:px-8 lg:col-span-5 lg:col-start-8 lg:px-0 lg:pr-8"
          >
            <SectionHeader
              eyebrow={sections.quality?.eyebrow}
              heading={sections.quality?.heading ?? "Why the quality holds"}
              description={sections.quality?.description}
              as="h2"
            />

            <ul className="flex flex-col">
              {company.certifications.map((certification) => (
                <li
                  key={certification.name}
                  className="flex flex-col gap-2 border-t border-border py-8 last:border-b"
                >
                  <Typography variant="h3" as="p" className="text-h2">
                    {certification.name}
                  </Typography>
                  <Typography variant="small" className="text-foreground-secondary">
                    {[certification.issuer, certification.year].filter(Boolean).join(" · ")}
                  </Typography>
                </li>
              ))}
            </ul>

            <Link
              href={ROUTES.quality}
              className={buttonVariants({ variant: "text", className: "group self-start" })}
            >
              How we inspect
              <Icon
                icon={ArrowRight}
                size="xs"
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </SlideUp>
        </div>
      </Section>

      {/* ---------------------------------------- §8 Origin and markets --- */}
      {/* The markets were eight emoji flags in a grid — OS-rendered glyphs
          outside the type system, and the single most off-brand detail on the
          page. They are now typography: eight country names set large reads as
          a shipping manifest, a flag grid reads as a locale switcher. */}
      <Section spacing="lg" texture="hardware" className="bg-surface-sunken">
        <Container size="lg" className="flex flex-col gap-16 md:gap-20">
          <SectionHeader
            eyebrow={sections.origin?.eyebrow}
            heading={sections.origin?.heading ?? "Origin and markets"}
            description={sections.origin?.description}
            as="h2"
          />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-20">
            <div className="flex flex-col gap-3">
              <Typography variant="overline">Made in</Typography>
              <Typography variant="h3" as="p">
                {company.contact.address.city}
              </Typography>
              <Typography variant="small" className="text-foreground-secondary">
                {company.contact.address.state}, {company.contact.address.country}
              </Typography>
            </div>

            <div className="flex flex-col gap-6">
              <Typography variant="overline">Shipped to</Typography>
              <Stagger
                step={0.04}
                className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {company.exportMarkets.map((code) => (
                  <StaggerItem key={code}>
                    <Typography variant="h3" as="p" className="text-foreground">
                      {countryName(code)}
                    </Typography>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          {/* The record, moved here from the company section: three figures
              belong beside the reach they describe, not beside the story. */}
          <Stagger className="grid gap-8 border-t border-border pt-12 sm:grid-cols-3">
            {figures.map((figure) => (
              <StaggerItem key={figure.label} className="flex flex-col gap-2">
                <span className="font-sans text-h1 font-semibold tabular-nums">
                  <Counter value={figure.value} />
                </span>
                <Typography variant="small" className="text-foreground-secondary">
                  {figure.label}
                </Typography>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* §8 In their words — omitted. The only quotes in the project are
          fabricated sample data, and blueprint §10 requires real, attributable,
          permissioned quotes or none. */}

      {/* ------------------------------------- §9 What happens next ------- */}
      <CtaBanner
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        description={cta.description}
        align="left"
        texture="tooling"
        reassurances={cta.reassurances}
        primaryAction={
          <Link
            href={cta.primaryCta.href}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            {cta.primaryCta.label}
          </Link>
        }
        secondaryAction={
          cta.secondaryCta && (
            <Link
              href={cta.secondaryCta.href}
              className="group inline-flex items-center gap-2 font-sans text-button font-medium text-primary-foreground/80 underline-offset-8 transition-base hover:text-accent sm:ml-4"
            >
              {cta.secondaryCta.label}
              <Icon
                icon={ArrowRight}
                size="xs"
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          )
        }
      />

      {/* Intent peaks at the process section, so the bar appears after it. The
          figure is a scroll distance rather than a section boundary, so it
          lands inside the manufacturing spreads — later than a buyer has
          finished reading the company story, which is the point. */}
      <StickyCta threshold={4300}>
        <Typography variant="small" className="hidden sm:block">
          Tell us what you need manufactured.
        </Typography>
        <Link
          href={ROUTES.buyerEnquiry}
          className={buttonVariants({ size: "sm", className: "max-sm:w-full" })}
        >
          Start an enquiry
        </Link>
      </StickyCta>
    </>
  );
}
