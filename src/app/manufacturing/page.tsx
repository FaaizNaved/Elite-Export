import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/layout";
import { PageHero, ProcessSteps, Prose, StatsBand } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants";
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

      <StatsBand stats={page.stats} tone="dark" />

      <ProcessSteps
        steps={page.steps}
        eyebrow="The route"
        heading="Every order takes the same eight stages"
      />

      <CtaBanner
        heading="Have a piece you want manufactured?"
        description="Send drawings, a reference sample or photographs and we will return a prototype for approval."
        primaryAction={
          <Link
            href={ROUTES.buyerEnquiry}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Start an enquiry
          </Link>
        }
        secondaryAction={
          <Link
            href={ROUTES.technology}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary",
            })}
          >
            See the machinery
          </Link>
        }
      />
    </>
  );
}
