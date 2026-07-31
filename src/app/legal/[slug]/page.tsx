import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Prose } from "@/components/sections";
import { ROUTES } from "@/constants";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { getLegalPage, getLegalRoutes } from "@/lib/content";
import { legalPageMetadata } from "@/lib/seo";
import { loadLegalContent } from "@/mdx";
import { formatDate } from "@/utils/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getLegalRoutes();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  return page ? legalPageMetadata(page) : {};
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) notFound();

  const Content = await loadLegalContent(slug);

  return (
    <>
      <PageHero
        title={page.title}
        eyebrow={`Last updated ${formatDate(page.updatedAt)}`}
        summary={page.summary}
        breadcrumbs={buildBreadcrumbs([
          { label: "Legal", href: ROUTES.legal },
          { label: page.title, href: page.href },
        ])}
      />

      <Prose>
        <Content />
      </Prose>
    </>
  );
}
