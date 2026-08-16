import type { Metadata } from "next";
import { Suspense } from "react";
import { Accordion } from "@/components/accordion";
import { EnquiryForm } from "@/components/forms";
import { Opening } from "@/components/structure";
import { SectionHeader } from "@/components/sections";
import { Field, PairedField } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Eyebrow, Record } from "@/components/ui/typography";
import { company } from "@/config";
import { ROUTES } from "@/constants";
import { getFaqsByTopic } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Enquiry",
  description:
    "Send New Elite Exports your requirement — products, quantities and finishes — or write to us directly. A person reads every enquiry.",
  path: ROUTES.enquiry,
});

/**
 * Enquiry — the one door.
 *
 * UX Blueprint R25.2: "there is one enquiry surface, not two. A 'contact'
 * surface and an 'enquiry' surface are two doors, and Brand Bible §3.4 permits
 * one. **The single surface carries both the form and the direct means of
 * contact (address, and a person).**" This surface is that merge; `/contact`
 * and `/buyer-enquiry` both resolve here (R29.2).
 *
 * R25.3 is why the direct route sits beside the form rather than behind it: "a
 * buyer who prefers to write directly is not required to use a form; requiring
 * it is friction moved onto the visitor."
 *
 * R39.3: on Enquiry, the action *is* the surface — so there is no `Close` here.
 *
 * R25.4 states who reads it and what happens next. No reply time is published:
 * whether one is operationally guaranteed is dependency 10 in MIB §20 and is
 * unconfirmed, and R25.4 says a stated reply time is an operational commitment.
 */
export default async function EnquiryPage() {
  const { contact } = company;
  const faqs = await getFaqsByTopic("ordering");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <Opening
        title="Enquiry"
        eyebrow="Start here"
        summary="Tell us what you need made — the piece, the quantity, and whatever you already know about materials, finishes and timing. If you have a drawing, a reference sample or photographs, say so and we will ask for them in our reply. Nothing here commits you to anything."
      />

      <Section>
        <Field type="record">
          <PairedField className="items-start">
            {/* The form reads `?product=` from the URL, so it needs a Suspense
                boundary to keep this surface statically prerendered. The
                fallback is nothing: §38.4 removes the skeleton, and a wait is
                stated in words or not disguised at all — never drawn as a shape
                pretending to be content. */}
            <Suspense fallback={null}>
              <EnquiryForm fallbackEmail={contact.salesEmail ?? contact.email} />
            </Suspense>

            <aside className="flex flex-col gap-s4">
              {/*
                R25.3, the direct route. It is beside the form, not below it and
                not behind a link, because a buyer who prefers to write directly
                is not required to use a form.
              */}
              <div className="flex flex-col gap-s1">
                <Eyebrow>Write to us directly</Eyebrow>
                <Record>
                  <a
                    href={`mailto:${contact.salesEmail ?? contact.email}`}
                    className="underline decoration-1 underline-offset-1 motion-mark hover:decoration-2"
                  >
                    {contact.salesEmail ?? contact.email}
                  </a>
                </Record>
                {/* The number is published only when there is one to publish. */}
                {contact.phone && (
                  <Record>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="underline decoration-1 underline-offset-1 motion-mark hover:decoration-2"
                    >
                      {contact.phone}
                    </a>
                  </Record>
                )}
                {contact.businessHours && (
                  <Record rank="c" tone="secondary">
                    {contact.businessHours}
                  </Record>
                )}
              </div>

              <div className="flex flex-col gap-s1">
                <Eyebrow>The factory</Eyebrow>
                <Record as="address" className="text-ink-secondary not-italic">
                  {contact.address.street}
                  <br />
                  {contact.address.city}
                  {contact.address.state ? `, ${contact.address.state}` : ""}{" "}
                  {contact.address.postalCode}
                  <br />
                  {contact.address.country}
                </Record>
              </div>

              <div className="flex flex-col gap-s2">
                <Eyebrow>What happens next</Eyebrow>
                {/* A sequence: numbered, sans figures, hanging (§39.2). No
                    figure is enlarged for effect — B is the ceiling (§12.1). */}
                <ol className="flex flex-col gap-s2">
                  {[
                    "We confirm feasibility and materials.",
                    "A prototype is produced for your approval.",
                    "Bulk production runs from sample sign-off.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-s3">
                      <Record rank="r" tone="secondary" as="span" className="tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </Record>
                      <Record tone="secondary" as="span">
                        {step}
                      </Record>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </PairedField>
        </Field>
      </Section>

      {faqs.length > 0 && (
        <Section tone="recessed">
          <Field type="record" className="flex flex-col gap-s4">
            <SectionHeader eyebrow="Before you ask" heading="Ordering questions" />
            {/*
              The accordion — MIB §13.1: record surfaces only, three or more
              independent items, "to let a reference set be consulted without
              being read". Never on a surface carrying an argument.
            */}
            <Accordion
              type="single"
              name="enquiry-faqs"
              items={faqs.map((faq) => ({
                value: faq.id,
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </Field>
        </Section>
      )}
    </>
  );
}
