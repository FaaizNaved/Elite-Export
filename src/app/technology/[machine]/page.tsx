import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { SpecificationList } from "@/components/evidence";
import { Opening } from "@/components/structure";
import { Prose, SectionHeader } from "@/components/sections";
import { PairedField, Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Eyebrow, Record } from "@/components/ui/typography";
import { getMachine, getMachineRoutes } from "@/lib/content";
import { machineMetadata } from "@/lib/seo";
import { loadMachineContent } from "@/lib/mdx";

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
  return machine ? machineMetadata(machine) : {};
}

/**
 * The machine record — MIB §12.1: "to state what a machine does and what it
 * makes repeatable."
 *
 * Its specification attributes and its capacity are withheld until the Facts
 * Register confirms them (§20.2 item 9): "records state the operation and what
 * it makes repeatable, nothing more." The record still exists without them,
 * which is why they are conditional here rather than the surface being absent.
 */
export default async function MachinePage({ params }: PageProps) {
  const { machine: slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) notFound();

  const Content = await loadMachineContent(slug);
  const images = [machine.gallery.thumbnail, ...machine.gallery.images];

  return (
    <>
      <Opening
        title={machine.title}
        eyebrow={machine.manufacturer}
        summary={machine.shortDescription}
        photograph={machine.gallery.images[0] ?? machine.gallery.thumbnail}
      />

      <Section>
        <Field type="paired">
          <PairedField className="items-start">
            <Prose standalone={false}>
              <Content />
            </Prose>

            <aside className="flex flex-col gap-s4">
              {machine.specifications.length > 0 && (
                <div className="flex flex-col gap-s2">
                  <Eyebrow>Specifications</Eyebrow>
                  <SpecificationList entries={machine.specifications} />
                </div>
              )}

              {machine.applications.length > 0 && (
                <div className="flex flex-col gap-s2">
                  <Eyebrow>Used for</Eyebrow>
                  {/* A record, not a row of pills — Visual Design System §39.3. */}
                  <ul className="flex flex-col gap-s1">
                    {machine.applications.map((application) => (
                      <li key={application}>
                        <Record>{application}</Record>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </PairedField>
        </Field>
      </Section>

      {images.length > 1 && (
        <Section>
          <Field type="full" className="flex flex-col gap-s4">
            <SectionHeader heading="The machine at work" eyebrow={machine.title} />
            <Gallery images={images} columns={3} />
          </Field>
        </Section>
      )}

      {/* No action. R39.3: Technology, never. */}
    </>
  );
}
