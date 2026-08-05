import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificateCard } from "@/components/cards";
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

const SLUG = "quality";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

export default async function QualityPage() {
  const page = await getCompanyPage(SLUG);
  if (!page) notFound();

  const Content = await loadCompanyContent(SLUG);
  const { certifications } = company;

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

      <Prose>
        <Content />
      </Prose>

      <ProcessSteps
        steps={page.steps}
        eyebrow="Inspection"
        heading="Four gates, every order"
      />

      <FeatureGrid
        features={page.features}
        eyebrow="How we evidence it"
        heading="Documentation and testing"
      />

      {certifications.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Certifications"
              heading="Audited and certified"
              description="Copies of current certificates are available to buyers on request."
            />
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((certification) => (
                <StaggerItem key={certification.name} className="h-full">
                  <CertificateCard
                    title={certification.name}
                    issuer={certification.issuer}
                    year={certification.year}
                    preview={certification.image}
                    fileUrl={certification.fileUrl}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <CtaBanner
        heading="Book an inspection"
        description="We host buyer and third-party inspections at any stage of production, announced or unannounced."
        primaryAction={
          <Link
            href={ROUTES.contact}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Contact quality team
          </Link>
        }
      />
    </>
  );
}
