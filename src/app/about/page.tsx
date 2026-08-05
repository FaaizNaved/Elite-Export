import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadCompanyContent } from "@/lib/mdx";
import { Milestones, PageHero, Prose, StatsBand } from "@/components/sections";
import { FeatureGrid } from "@/components/sections";
import { CtaBanner } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { getCompanyPage } from "@/lib/content";
import { companyPageMetadata } from "@/lib/seo";
import Link from "next/link";

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

      <StatsBand stats={page.stats} tone="dark" />

      <FeatureGrid features={page.features} eyebrow="Core values" heading="What we hold to" />

      <Milestones milestones={page.milestones} eyebrow="Timeline" heading="How we got here" />

      <CtaBanner
        heading="Come and see the factory"
        description="Buyers and their agencies are welcome on the floor, announced or unannounced."
        primaryAction={
          <Link
            href={ROUTES.contact}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Arrange a visit
          </Link>
        }
      />
    </>
  );
}
