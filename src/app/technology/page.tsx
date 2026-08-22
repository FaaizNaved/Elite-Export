import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MachineCard } from "@/components/cards";
import { Stagger, StaggerItem } from "@/components/motion";
import {
  FeatureGrid,
  FullBleedImage,
  PageHero,
  Prose,
  SectionHeader,
} from "@/components/sections";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getCompanyPage, getMachinesByStage } from "@/lib/content";
import { companyPageMetadata } from "@/lib/seo";
import { loadCompanyContent } from "@/lib/mdx";
import type { ProductionStage } from "@/types";

const SLUG = "technology";

/** Reader-facing names for the production stages a machine can belong to. */
const STAGE_LABELS: Record<ProductionStage, string> = {
  cutting: "Cutting",
  preparation: "Preparation",
  stitching: "Stitching",
  finishing: "Finishing",
  quality: "Quality",
  packing: "Packing",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

export default async function TechnologyPage() {
  const [page, stages] = await Promise.all([getCompanyPage(SLUG), getMachinesByStage()]);
  if (!page) notFound();

  const Content = await loadCompanyContent(SLUG);

  return (
    <>
      <PageHero
        title={page.title}
        eyebrow={page.eyebrow}
        summary={page.summary}
        image={page.hero}
        href={page.href}
      />

      <Prose>
        <Content />
      </Prose>

      {/* Machinery, grouped by where it sits in the production line. */}
      {stages.map((group, index) => (
        <Section
          key={group.stage}
          spacing="lg"
          className={index % 2 === 1 ? "bg-surface-sunken" : undefined}
        >
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader eyebrow="Production stage" heading={STAGE_LABELS[group.stage]} />

            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.machines.map((machine) => (
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
      ))}

      <FeatureGrid features={page.features} eyebrow="How we run it" heading="Equipment discipline" />

      {/* Ends on the machinery itself rather than on a grid of claims about it. */}
      <FullBleedImage
        image={{
          src: "/images/machinery/clicking-press/clicking-press-hero.webp",
          alt: "Hydraulic clicking press on the cutting floor",
          width: 2400,
          height: 1200,
        }}
      />
    </>
  );
}
