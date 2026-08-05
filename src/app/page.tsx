import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { CtaBanner } from "@/components/layout";
import { Counter, SlideUp, Stagger, StaggerItem } from "@/components/motion";
import { FullBleedImage, SectionHeader } from "@/components/sections";
import { StickyCta } from "@/components/scroll";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { ContentImage } from "@/components/ui/image";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { company, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { getCategories, getCompanyPage, getHomeContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { countryName, flagEmoji } from "@/utils/country";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/**
 * Home page — implements `docs/design-system/home-creative-direction.md`.
 *
 * Nine sections were specified; eight ship. §8 (testimonials) is omitted because
 * the only quotes in the project are fabricated sample data, and the blueprint
 * requires real, attributable, permissioned quotes or none (§10).
 *
 * Every figure on this page is derived from `config/company.ts` or the
 * catalogue at render time. Nothing countable is authored in the home content
 * files, so an unverified statistic cannot be introduced by a content edit.
 */
export default async function HomePage() {
  const [categories, manufacturing, home] = await Promise.all([
    getCategories(),
    getCompanyPage("manufacturing"),
    getHomeContent(),
  ]);

  const { hero, intro, pause, sections, cta } = home;
  const yearsManufacturing = new Date().getFullYear() - company.foundedYear;

  /**
   * §4 credential rail. Blueprint §4 specified five items; three survive the
   * facts register — OEM/ODM and the MOQ figure are unverified placeholder copy.
   */
  const credentials = [
    `Est. ${company.foundedYear}`,
    company.certifications.map((certification) => certification.name).join(" · "),
    `${company.exportMarkets.length} export markets`,
  ].filter(Boolean);

  /** §2 figures. Config only — no capacity or floor-area claims. */
  const figures = [
    { value: yearsManufacturing, suffix: "", label: "Years manufacturing" },
    { value: company.exportMarkets.length, suffix: "", label: "Export markets" },
    { value: company.certifications.length, suffix: "", label: "Independent certifications" },
  ];

  /**
   * §4 shows four stages of the documented process, not a count of them.
   *
   * Named rather than sliced. `slice(0, 4)` returned the first four in file
   * order and ended the section on "Machine processing" — a section titled "the
   * route every order takes" that never reached a finished piece, and that
   * dropped the two stages blueprint §7 chose precisely because they describe a
   * checkable mechanism (the saddle stitch, the three burnishing passes).
   */
  const stageTitles = ["Hide selection", "Cutting", "Assembly", "Finishing"];
  const namedStages = stageTitles.flatMap(
    (title) => manufacturing?.steps.find((step) => step.title === title) ?? [],
  );
  // If the content is retitled the lookup comes back short; show the opening
  // stages rather than an empty section, and let `check:content` catch the drift.
  const stages = namedStages.length === stageTitles.length ? namedStages : (manufacturing?.steps.slice(0, 4) ?? []);

  return (
    <>
      {/* ---------------------------------------------------------------- §1 */}
      <Hero
        variant="image"
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.image}
        overlay="strong"
        height="full"
        scrollIndicator
        actions={
          <>
            <Link href={hero.primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {hero.primaryCta.label}
            </Link>
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {hero.secondaryCta.label}
              </Link>
            )}
          </>
        }
        meta={
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-caption tracking-[0.08em] uppercase text-primary-foreground/70">
            {credentials.map((credential, index) => (
              <li
                key={credential}
                // The certifications item is dropped whole below 640px, not just
                // its label — hiding the text alone left its gap behind.
                className={index === 1 ? "flex items-center gap-6 max-sm:hidden" : "flex items-center gap-6"}
              >
                {/* Thin gold dividers between items, never before the first. */}
                {index > 0 && <span aria-hidden className="h-3 w-px bg-accent/40 max-sm:hidden" />}
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        }
      />

      {/* ------------------------------------------------- §2 The house ---- */}
      <Section spacing="lg" texture="grain">
        <Container size="lg">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <SlideUp className="lg:col-span-7">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-image bg-surface-sunken">
                <ContentImage image={intro.image} sizes="(min-width: 1024px) 58vw, 100vw" />
              </figure>
            </SlideUp>

            <SlideUp delay={0.08} className="flex flex-col gap-6 lg:col-span-5">
              <SectionHeader eyebrow={intro.eyebrow} heading={intro.heading} />
              <Typography variant="body" className="max-w-narrow">
                {intro.body}
              </Typography>
              <Link
                href={ROUTES.about}
                className={buttonVariants({ variant: "text", className: "self-start" })}
              >
                About the company
                <Icon icon={ArrowRight} size="xs" />
              </Link>
            </SlideUp>
          </div>

          {/* Figures on ivory, not on a dark band — a record, not an advertisement. */}
          {/* One column, then three. Two columns left the third figure orphaned
              in a half-empty row, which reads as a layout that ran out. */}
          <Stagger className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3 md:mt-24">
            {figures.map((figure) => (
              <StaggerItem key={figure.label} className="flex flex-col gap-2">
                <span className="font-sans text-h1 font-semibold tabular-nums">
                  <Counter value={figure.value} suffix={figure.suffix} />
                </span>
                <Typography variant="small" className="text-foreground-secondary">
                  {figure.label}
                </Typography>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* --------------------------------------------- §3 What we make ---- */}
      <Section spacing="lg" texture="pattern" className="bg-surface-sunken">
        <Container size="lg" className="flex flex-col gap-14">
          <SectionHeader
            eyebrow={sections.categories?.eyebrow}
            heading={sections.categories?.heading ?? "What we make"}
            description={sections.categories?.description}
            as="h2"
            action={
              <Link href={ROUTES.products} className={buttonVariants({ variant: "outline" })}>
                All products
              </Link>
            }
          />

          {/* No `priority` here. The first plate sits roughly two viewports
              down, and marking it priority emitted a second image preload that
              competed with the hero — the actual LCP element — for bandwidth. */}
          <Stagger className="grid gap-12 md:grid-cols-2 md:gap-10">
            {categories.map((category) => (
              <StaggerItem key={category.href}>
                <CategoryCard category={category} variant="editorial" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------ §4 How it is made ----- */}
      {stages.length > 0 && (
        <Section spacing="lg" texture="blueprint">
          <Container size="lg" className="flex flex-col gap-14">
            <SectionHeader
              eyebrow={sections.manufacturing?.eyebrow}
              heading={sections.manufacturing?.heading ?? "How it is made"}
              description={sections.manufacturing?.description}
              as="h2"
            />

            <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
              {stages.map((stage, index) => (
                <li key={stage.title}>
                  <SlideUp delay={index * 0.04} className="flex flex-col gap-5">
                    {/* Number and seam occupy the same slot as eyebrow and seam
                        in a section heading, so the mark lands in the same place
                        whether it opens a chapter or a stage. */}
                    {/* The number is not gold: accent on ivory measures 2.81:1,
                        well under the 4.5:1 that 12px text needs. The seam
                        directly beneath it carries the gold instead, where it is
                        decorative and exempt. */}
                    <div className="flex flex-col gap-3">
                      <Typography variant="overline">
                        {String(index + 1).padStart(2, "0")}
                      </Typography>
                      <span aria-hidden className="rule-stitch" />
                    </div>
                    <Typography variant="h3" as="h3">
                      {stage.title}
                    </Typography>
                    <Typography variant="body" className="max-w-narrow text-foreground-secondary">
                      {stage.description}
                    </Typography>
                  </SlideUp>
                </li>
              ))}
            </ol>

            <Link
              href={ROUTES.manufacturing}
              className={buttonVariants({ variant: "text", className: "self-start" })}
            >
              See the full process
              <Icon icon={ArrowRight} size="xs" />
            </Link>
          </Container>
        </Section>
      )}

      {/* --------------------------------------------- §5 The Pause ------- */}
      <FullBleedImage image={pause.image} label={pause.label} />

      {/* ------------------------------------ §6 Why the quality holds ---- */}
      {/* The Pause already gave the page its silence; restating a full section
          of it here would read as a gap rather than a breath. */}
      <Section spacing="lg" texture="stitch" className="pt-16 md:pt-24">
        <Container size="lg" className="flex flex-col gap-14">
          <SectionHeader
            eyebrow={sections.quality?.eyebrow}
            heading={sections.quality?.heading ?? "Why the quality holds"}
            description={sections.quality?.description}
            as="h2"
          />

          {/* Ruled entries, not cells. The certifications were previously two
              white boxes on a hairline grid — the look of a settings panel, on
              the one section whose whole job is to look like a record. */}
          <Stagger className="grid border-t border-border md:grid-cols-2 md:gap-x-16">
            {company.certifications.map((certification) => (
              <StaggerItem
                key={certification.name}
                className="flex flex-col gap-3 border-b border-border py-8"
              >
                <Typography variant="h3" as="h3">
                  {certification.name}
                </Typography>
                <Typography variant="small" className="text-foreground-secondary">
                  {[certification.issuer, certification.year].filter(Boolean).join(" · ")}
                </Typography>
              </StaggerItem>
            ))}
          </Stagger>

          <Link
            href={ROUTES.quality}
            className={buttonVariants({ variant: "text", className: "self-start" })}
          >
            How we inspect
            <Icon icon={ArrowRight} size="xs" />
          </Link>
        </Container>
      </Section>

      {/* ---------------------------------------- §7 Origin and markets --- */}
      <Section spacing="lg" texture="hardware" className="bg-surface-sunken">
        <Container size="lg" className="flex flex-col gap-14">
          <SectionHeader
            eyebrow={sections.origin?.eyebrow}
            heading={sections.origin?.heading ?? "Origin and markets"}
            description={sections.origin?.description}
            as="h2"
          />

          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
            <div className="flex flex-col gap-3">
              <Typography variant="overline">Origin</Typography>
              <Typography variant="h4" as="p">
                {company.contact.address.city}
              </Typography>
              <Typography variant="small" className="text-foreground-secondary">
                {company.contact.address.state}, {company.contact.address.country}
              </Typography>
            </div>

            <div className="flex flex-col gap-4">
              <Typography variant="overline">Shipping to</Typography>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                {company.exportMarkets.map((code) => (
                  <li key={code} className="flex items-center gap-2.5 font-sans text-body">
                    <span aria-hidden className="text-lg leading-none">
                      {flagEmoji(code)}
                    </span>
                    {countryName(code)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* §8 In their words — omitted. See the note on this component above. */}

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
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary",
              })}
            >
              {cta.secondaryCta.label}
            </Link>
          )
        }
      />

      {/* Intent peaks at the process section, so the bar appears after it — at
          2200 it was arriving in the middle of the product plates, two sections
          early. The figure is a scroll distance rather than a section boundary,
          so it lands just past the process section on desktop and inside it on
          a phone; either is later than a buyer has finished reading §3. */}
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
