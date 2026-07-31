import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms";
import { PageHero, SectionHeader } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Elite Export — factory address, phone, email and a direct enquiry form. We reply within two business days.",
  path: ROUTES.contact,
});

export default function ContactPage() {
  const { contact } = siteConfig.company;
  const { address } = contact;

  return (
    <>
      <PageHero
        title="Contact"
        eyebrow="Talk to us"
        summary="A person reads every message. We reply within two business days — usually sooner."
        href={ROUTES.contact}
      />

      <Section spacing="lg">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-8">
              <SectionHeader
                eyebrow="Send a message"
                heading="How can we help?"
                as="h2"
              />
              <ContactForm fallbackEmail={contact.email} />
            </div>

            <aside className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <Typography variant="overline">Factory &amp; office</Typography>

                <div className="flex gap-3">
                  <Icon icon={MapPin} size="sm" tone="accent" className="mt-1" />
                  <address className="font-sans text-small not-italic text-foreground-secondary">
                    {address.street}
                    <br />
                    {address.city}
                    {address.state ? `, ${address.state}` : ""} {address.postalCode}
                    <br />
                    {address.country}
                  </address>
                </div>

                <div className="flex gap-3">
                  <Icon icon={Phone} size="sm" tone="accent" className="mt-1" />
                  <div className="flex flex-col gap-1">
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="font-sans text-small transition-fast hover:text-accent"
                    >
                      {contact.phone}
                    </a>
                    {contact.whatsapp && (
                      <Typography variant="caption">WhatsApp {contact.whatsapp}</Typography>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Icon icon={Mail} size="sm" tone="accent" className="mt-1" />
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-sans text-small transition-fast hover:text-accent"
                    >
                      {contact.email}
                    </a>
                    {contact.salesEmail && (
                      <a
                        href={`mailto:${contact.salesEmail}`}
                        className="font-sans text-small transition-fast hover:text-accent"
                      >
                        {contact.salesEmail}
                      </a>
                    )}
                  </div>
                </div>

                {contact.businessHours && (
                  <Typography variant="caption">{contact.businessHours}</Typography>
                )}
              </div>

              <Divider />

              <div className="flex flex-col gap-3">
                <Typography variant="overline">Placing an order?</Typography>
                <Typography variant="small" className="text-foreground-secondary">
                  The buyer enquiry form captures everything we need to quote — products,
                  quantities, finishes and your shipping terms.
                </Typography>
                <Link
                  href={ROUTES.buyerEnquiry}
                  className={buttonVariants({ variant: "outline", className: "self-start" })}
                >
                  Buyer enquiry
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
