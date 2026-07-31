import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { CtaBanner } from "@/components/layout";
import { PageHero, Prose, SectionHeader } from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { getMachine, getMachineRoutes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { loadMachineContent } from "@/mdx";

interface PageProps {
  params: Promise<{ machine: string }>;
}

export async function generateStaticParams() {
  return getMachineRoutes();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { machine: slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) return {};

  return buildMetadata({
    title: machine.title,
    description: machine.shortDescription,
    path: machine.href,
    seo: machine.seo,
    image: machine.gallery.thumbnail,
    modifiedTime: machine.updatedAt,
  });
}

export default async function MachinePage({ params }: PageProps) {
  const { machine: slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) notFound();

  const Content = await loadMachineContent(slug);
  const images = [machine.gallery.thumbnail, ...machine.gallery.images];

  return (
    <>
      <PageHero
        title={machine.title}
        eyebrow={machine.manufacturer}
        summary={machine.shortDescription}
        image={machine.gallery.images[0] ?? machine.gallery.thumbnail}
        breadcrumbs={buildBreadcrumbs([
          { label: "Technology & Machinery", href: ROUTES.technology },
          { label: machine.title, href: machine.href },
        ])}
      />

      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
            <Prose standalone={false}>
              <Content />
            </Prose>

            <aside className="flex flex-col gap-8">
              {machine.capacity && (
                <div className="flex flex-col gap-2">
                  <Typography variant="overline">Capacity</Typography>
                  <Typography variant="h4" as="p">
                    {machine.capacity}
                  </Typography>
                </div>
              )}

              {machine.specifications.length > 0 && (
                <div className="flex flex-col gap-3">
                  <Typography variant="overline">Specifications</Typography>
                  <dl className="divide-y divide-border border-y border-border">
                    {machine.specifications.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-6 py-3">
                        <dt className="font-sans text-small text-foreground-secondary">
                          {spec.label}
                        </dt>
                        <dd className="text-right font-sans text-small">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {machine.applications.length > 0 && (
                <div className="flex flex-col gap-3">
                  <Typography variant="overline">Used for</Typography>
                  <ul className="flex flex-wrap gap-2">
                    {machine.applications.map((application) => (
                      <li key={application}>
                        <Badge variant="outline">{application}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      {images.length > 1 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader heading="Gallery" eyebrow={machine.title} />
            <Gallery images={images} columns={3} />
          </Container>
        </Section>
      )}

      <CtaBanner
        heading="Want to see it running?"
        description="We host buyer and agency visits at any stage of production."
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
