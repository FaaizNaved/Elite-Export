import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FullBleedImage, PageHero, ProcessSteps, Prose } from "@/components/sections";
import { getCompanyPage } from "@/lib/content";
import { companyPageMetadata } from "@/lib/seo";
import { loadCompanyContent } from "@/lib/mdx";

const SLUG = "manufacturing";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

export default async function ManufacturingPage() {
  const page = await getCompanyPage(SLUG);
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

      <ProcessSteps
        steps={page.steps}
        eyebrow="The route"
        heading="Every order takes the same eight stages"
      />

      {/* Ends where the process ends: packed, marked and going out. */}
      <FullBleedImage
        image={{
          src: "/images/manufacturing/packaging.webp",
          alt: "Finished goods being packed into export cartons",
          width: 1600,
          height: 900,
        }}
      />
    </>
  );
}
