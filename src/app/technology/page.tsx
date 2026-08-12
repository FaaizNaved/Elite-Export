import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Opening } from "@/components/structure";
import { Prose, SectionHeader } from "@/components/sections";
import { TextLink } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Record, Statement } from "@/components/ui/typography";
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
      <Opening
        title={page.title}
        eyebrow={page.eyebrow}
        summary={page.summary}
        photograph={page.hero}
      />

      <Prose>
        <Content />
      </Prose>

      {/* Machinery, grouped by where it sits in the production line. */}
      {stages.map((group) => (
        <Section key={group.stage}>
          <Field type="reading" className="flex flex-col gap-s4">
            <SectionHeader eyebrow="Production stage" heading={STAGE_LABELS[group.stage]} />

            {/*
              A list of machine records, not a card grid (Master Implementation
              Blueprint §14.1, Visual Design System §36.1). Each record states
              what the machine does; its specification attributes are withheld
              until the Facts Register confirms them (§20.2 item 9).
            */}
            <ul className="flex flex-col gap-8">
              {group.machines.map((machine) => (
                <li key={machine.href} className="flex flex-col gap-2">
                  <Statement rank="t3" as="h3">
                    <TextLink href={machine.href}>{machine.title}</TextLink>
                  </Statement>
                  <Record tone="secondary">{machine.shortDescription}</Record>
                </li>
              ))}
            </ul>
          </Field>
        </Section>
      ))}

      {/* No action. R39.3: Technology, never — a machine is not a reason to
          make contact. */}
    </>
  );
}
