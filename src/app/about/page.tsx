import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadCompanyContent } from "@/lib/mdx";
import { FullBleedImage, Milestones, PageHero, Prose } from "@/components/sections";
import { FeatureGrid } from "@/components/sections";
import { getCompanyPage } from "@/lib/content";
import { companyPageMetadata } from "@/lib/seo";

const SLUG = "about";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage(SLUG);
  return page ? companyPageMetadata(page) : {};
}

export default async function AboutPage() {
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

      <FeatureGrid features={page.features} eyebrow="Core values" heading="What we hold to" />

      <Milestones milestones={page.milestones} eyebrow="Timeline" heading="How we got here" />

      {/* This page ends on a person, because the page is about who we are. */}
      <FullBleedImage
        image={{
          src: "/images/about/craftsman.webp",
          alt: "A craftsman at the finishing bench",
          width: 1200,
          height: 1600,
        }}
        ratio="wide"
      />
    </>
  );
}
