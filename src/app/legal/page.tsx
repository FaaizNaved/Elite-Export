import type { Metadata } from "next";
import { Opening } from "@/components/structure";
import { StateNotice } from "@/components/system";
import { TextLink } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Eyebrow, Record } from "@/components/ui/typography";
import { company } from "@/config";
import { ROUTES } from "@/constants";
import { getLegalPages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/utils/format";

export const metadata: Metadata = buildMetadata({
  title: "Legal",
  description: "Elite Export's legal identity record and published legal documents.",
  path: ROUTES.legal,
});

/**
 * The legal index — UX Blueprint R26.1.
 *
 * §26.1 names three legal surfaces: privacy, terms of use (only if counsel
 * requires one), and **the legal identity record** — registration details,
 * address, and the company's formal identity. They were individually
 * addressable and collectively unreachable; this is the index that gathers
 * them.
 *
 * R26.3: a legal surface is a record, in the record voice, and is never used to
 * carry marketing copy that could not be placed elsewhere. R26.5: no system
 * surface carries the site's action.
 *
 * **What is deliberately absent.** MIB §20.2 item 2 makes confirmation of the
 * company name **Blocking** for the legal record, and Brand Bible §19.2 says
 * anything unconfirmed is removed rather than softened. So the registration
 * identifiers — CIN, GST, IEC, the registered office — are not invented and not
 * left as empty labels: the record states the identity the company record
 * actually holds, and no more. Nothing here waits on a design decision.
 */
export default async function LegalIndexPage() {
  const pages = await getLegalPages();
  const { address } = company.contact;

  return (
    <>
      <Opening
        title="Legal"
        eyebrow="The record"
        summary="The company's formal identity, and the documents it publishes."
      />

      <Section>
        <Field type="record" className="flex flex-col gap-s5">
          <div className="flex flex-col gap-s2">
            <Eyebrow>Legal identity</Eyebrow>
            <Record weight="medium">{company.legalName}</Record>
            <Record as="address" className="text-ink-secondary not-italic">
              {address.street}
              <br />
              {address.city}
              {address.state ? `, ${address.state}` : ""} {address.postalCode}
              <br />
              {address.country}
            </Record>
            {/*
              Registration identifiers are absent, not blank. MIB §20.2 item 2
              is Blocking and Brand Bible §19.2 removes rather than softens: a
              labelled field with nothing in it is a claim that something exists
              and is being withheld.
            */}
          </div>

          <div className="flex flex-col gap-s2">
            <Eyebrow>Published documents</Eyebrow>
            {pages.length === 0 ? (
              <StateNotice state="empty" route={false}>
                No legal documents have been published yet.
              </StateNotice>
            ) : (
              <ul className="flex flex-col gap-s2">
                {pages.map((page) => (
                  <li key={page.href} className="flex flex-col gap-0.5">
                    <Record>
                      <TextLink href={page.href}>{page.title}</TextLink>
                    </Record>
                    <Record rank="c" tone="secondary">
                      Last updated {formatDate(page.updatedAt)}
                    </Record>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>
      </Section>

      {/* R26.5: no system surface carries the site's action. */}
    </>
  );
}
