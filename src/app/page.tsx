import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CategoryCard, MachineCard, ProductCard, TestimonialCard } from "@/components/cards";
import { Carousel } from "@/components/carousel";
import { Hero } from "@/components/hero";
import { CtaBanner } from "@/components/layout";
import { SlideUp, Stagger, StaggerItem } from "@/components/motion";
import { FeatureGrid, SectionHeader, StatsBand } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants";
import { homeContent } from "@/data/home";
import { getFeaturedTestimonials } from "@/data/testimonials";
import {
  getCategories,
  getCompanyPage,
  getFeaturedMachines,
  getFeaturedProducts,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { BLUR_DATA_URL } from "@/utils/image";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

export default async function HomePage() {
  const [categories, featuredProducts, machines, about, manufacturing, quality, exportPage] =
    await Promise.all([
      getCategories(),
      getFeaturedProducts(6),
      getFeaturedMachines(3),
      getCompanyPage("about"),
      getCompanyPage("manufacturing"),
      getCompanyPage("quality"),
      getCompanyPage("export"),
    ]);

  const testimonials = getFeaturedTestimonials(2);
  const { hero, intro, sections, cta } = homeContent;

  return (
    <>
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
      />

      {/* Company overview */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SlideUp className="flex flex-col gap-6">
              <SectionHeader
                eyebrow={intro.eyebrow}
                heading={intro.heading}
                description={intro.description}
              />
              <Typography variant="body">{intro.body}</Typography>
              <Link
                href={ROUTES.about}
                className={buttonVariants({ variant: "outline", className: "self-start" })}
              >
                About Elite Export
              </Link>
            </SlideUp>

            <SlideUp delay={0.1}>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-image bg-surface-sunken">
                <Image
                  src={intro.image.src}
                  alt={intro.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </figure>
            </SlideUp>
          </div>
        </Container>
      </Section>

      <StatsBand stats={intro.stats} tone="dark" />

      {/* Why choose us — reuses the About page's value propositions. */}
      {about && (
        <FeatureGrid
          features={about.features}
          eyebrow={sections.whyUs?.eyebrow}
          heading={sections.whyUs?.heading ?? "Why buyers stay"}
          description={sections.whyUs?.description}
        />
      )}

      {/* Featured categories */}
      <Section spacing="lg" className="bg-surface-sunken">
        <Container size="lg" className="flex flex-col gap-12">
          <SectionHeader
            eyebrow={sections.categories?.eyebrow}
            heading={sections.categories?.heading ?? "Product categories"}
            description={sections.categories?.description}
            action={
              <Link href={ROUTES.products} className={buttonVariants({ variant: "outline" })}>
                All products
              </Link>
            }
          />

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <StaggerItem key={category.href} className="h-full">
                <CategoryCard category={category} priority={index === 0} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <Section spacing="lg">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader
              eyebrow={sections.products?.eyebrow}
              heading={sections.products?.heading ?? "Featured products"}
              description={sections.products?.description}
            />
            <Carousel label="Featured products" slideWidth="third" pagination>
              {featuredProducts.map((product) => (
                <ProductCard key={product.href} product={product} className="h-full" />
              ))}
            </Carousel>
          </Container>
        </Section>
      )}

      {/* Manufacturing preview */}
      {manufacturing && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader
              eyebrow={sections.manufacturing?.eyebrow}
              heading={sections.manufacturing?.heading ?? manufacturing.title}
              description={sections.manufacturing?.description ?? manufacturing.summary}
              action={
                <Link href={manufacturing.href} className={buttonVariants({ variant: "outline" })}>
                  How we manufacture
                </Link>
              }
            />

            <Stagger className="grid gap-px overflow-hidden rounded-card bg-border md:grid-cols-2 lg:grid-cols-4">
              {manufacturing.steps.slice(0, 4).map((step, index) => (
                <StaggerItem key={step.title} className="flex flex-col gap-3 bg-surface p-8">
                  <Typography variant="overline" className="text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography variant="h4" as="h3">
                    {step.title}
                  </Typography>
                  <Typography variant="small" className="text-foreground-secondary">
                    {step.description}
                  </Typography>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {/* Technology preview */}
      {machines.length > 0 && (
        <Section spacing="lg">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader
              eyebrow={sections.technology?.eyebrow}
              heading={sections.technology?.heading ?? "Technology & machinery"}
              description={sections.technology?.description}
              action={
                <Link href={ROUTES.technology} className={buttonVariants({ variant: "outline" })}>
                  All machinery
                </Link>
              }
            />

            <Stagger className="grid gap-6 md:grid-cols-3">
              {machines.map((machine) => (
                <StaggerItem key={machine.href} className="h-full">
                  <MachineCard
                    name={machine.title}
                    description={machine.shortDescription}
                    image={machine.gallery.thumbnail}
                    href={machine.href}
                    capacity={machine.capacity}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {/* Quality assurance */}
      {quality && <StatsBand stats={quality.stats} tone="dark" />}

      {/* Export capabilities */}
      {exportPage && (
        <FeatureGrid
          features={exportPage.features.slice(0, 3)}
          eyebrow={sections.exportCapabilities?.eyebrow}
          heading={sections.exportCapabilities?.heading ?? exportPage.title}
          description={sections.exportCapabilities?.description ?? exportPage.summary}
        />
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader
              eyebrow={sections.testimonials?.eyebrow}
              heading={sections.testimonials?.heading ?? "What our buyers say"}
              align="center"
            />
            <Stagger className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <StaggerItem key={testimonial.id} className="h-full">
                  <TestimonialCard testimonial={testimonial} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <CtaBanner
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        description={cta.description}
        backgroundImage={cta.image}
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
                  "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary",
              })}
            >
              {cta.secondaryCta.label}
            </Link>
          )
        }
      />
    </>
  );
}
