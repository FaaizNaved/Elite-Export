import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountryCard } from "@/components/cards";
import { CtaBanner } from "@/components/layout";
import { Stagger, StaggerItem } from "@/components/motion";
import { FeatureGrid, PageHero, ProcessSteps, Prose, SectionHeader, StatsBand } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { company } from "@/config";
import { ROUTES } from "@/constants";
import { getCompanyPage } from "@/lib/content";
import { companyPageMetadata } from "@/lib/seo";
import { loadCompanyContent } from "@/lib/mdx";

const SLUG = "export";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

export default async function ExportPage() {
  const page = await getCompanyPage(SLUG);
  if (!page) notFound();

  const Content = await loadCompanyContent(SLUG);
  const { exportMarkets } = company;

  return (
    <>
      <PageHero
        title={page.title}
        eyebrow={page.eyebrow}
        summary={page.summary}
        image={page.hero}
        href={page.href}
      />

      <StatsBand stats={page.stats} tone="dark" />

      <FeatureGrid
        features={page.features}
        eyebrow="What we offer"
        heading="Export capability"
        columns={3}
      />

      {exportMarkets.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Countries served"
              heading="Where our containers go"
              description="Buyers in adjacent markets are welcome to enquire — nothing about our process is market-specific."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {exportMarkets.map((code) => (
                <StaggerItem key={code} className="h-full">
                  <CountryCard code={code} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <ProcessSteps
        steps={page.steps}
        eyebrow="How an order runs"
        heading="From enquiry to dispatch"
      />

      <Prose>
        <Content />
      </Prose>

      <CtaBanner
        heading="Ready to place an enquiry?"
        description="Tell us the styles, quantities and incoterm you need and we will come back within three working days."
        primaryAction={
          <Link
            href={ROUTES.buyerEnquiry}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Buyer enquiry
          </Link>
        }
      />
    </>
  );
}
