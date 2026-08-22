import type { Metadata } from "next";
import { Suspense } from "react";
import { Accordion } from "@/components/accordion";
import { BuyerEnquiryForm } from "@/components/forms";
import { PageHero, SectionHeader } from "@/components/sections";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SkeletonText } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { company } from "@/config";
import { ROUTES } from "@/constants";
import { getFaqsByTopic } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buyer Enquiry",
  description:
    "Send New Elite Exports your requirement — products, quantities and finishes — and receive feasibility and indicative pricing from the team that would make it.",
  path: ROUTES.buyerEnquiry,
});

export default async function BuyerEnquiryPage() {
  const { contact } = company;
  const faqs = await getFaqsByTopic("ordering");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <PageHero
        title="Buyer Enquiry"
        eyebrow="Start here"
        summary="The more you can tell us up front, the faster we can come back with something useful. Nothing here commits you to anything."
        href={ROUTES.buyerEnquiry}
      />

      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            {/* The form reads `?product=` from the URL, so it needs a
                Suspense boundary to keep this page statically prerendered. */}
            <Suspense fallback={<SkeletonText lines={8} />}>
              <BuyerEnquiryForm fallbackEmail={contact.salesEmail ?? contact.email} />
            </Suspense>

            <aside className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <Typography variant="overline">What happens next</Typography>
                <ol className="flex flex-col gap-3">
                  {/* No day counts. The turnaround figures that used to sit
                      here were unverified, and this is the one page where a
                      buyer is most likely to hold us to them. */}
                  {[
                    "We confirm feasibility and materials, and tell you what we cannot do as clearly as what we can.",
                    "A prototype is produced for your approval, and revised until you sign it off.",
                    "Bulk runs against the approved sample, with dates confirmed in writing before you commit.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-display text-h4 text-foreground-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Typography variant="small" className="text-foreground-secondary">
                        {step}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col gap-3">
                <Typography variant="overline">Prefer email?</Typography>
                <a
                  href={`mailto:${contact.salesEmail ?? contact.email}`}
                  className="font-sans text-small transition-fast hover:text-accent"
                >
                  {contact.salesEmail ?? contact.email}
                </a>
                <Typography variant="caption">{contact.businessHours}</Typography>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {faqs.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="md" className="flex flex-col gap-10">
            <SectionHeader eyebrow="Before you ask" heading="Ordering questions" />
            <Accordion
              type="single"
              name="enquiry-faqs"
              items={faqs.map((faq) => ({
                value: faq.id,
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </Container>
        </Section>
      )}
    </>
  );
}
