import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Contact, NavLink, SocialLink } from "@/types";

export interface FooterColumn {
  heading: string;
  links: readonly NavLink[];
}

export interface FooterProps {
  /** Brand mark. Usually the same node passed to `Navbar`. */
  logo?: ReactNode;
  /** Short positioning statement under the logo. */
  description?: string;
  columns?: readonly FooterColumn[];
  contact?: Contact;
  social?: readonly SocialLink[];
  /** Privacy, terms — rendered inline beside the copyright. */
  legalLinks?: readonly NavLink[];
  /** Certification names, rendered as badges above the link columns. */
  certifications?: readonly string[];
  /** Defaults to `© {year} {companyName}`. */
  companyName?: string;
  className?: string;
}

/**
 * Site footer. Every region is optional and driven by props, so the same
 * component serves the marketing site and any future sub-brand.
 *
 * Social links are rendered as text rather than brand glyphs — it suits the
 * editorial language, and it avoids shipping approximated third-party logos.
 */
export function Footer({
  logo,
  description,
  columns = [],
  contact,
  social = [],
  legalLinks = [],
  certifications = [],
  companyName,
  className,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("mt-auto bg-primary text-primary-foreground", className)}>
      {/* Back cover, not a final section. Was py-16/py-24 — the same vertical
          weight as a content section, so the page appeared to start again. */}
      <Container size="lg" className="py-12 md:py-14">
        {/* The trust strip that used to sit here counted years, markets and
            headcount in display type. It is gone, and so is the prop that fed
            it: the figures were already stated above where they are sourced,
            and an empty numeric slot on a back cover is an invitation to fill
            it with something nobody can verify. Certifications stay — they are
            the one claim a buyer can check. */}
        {certifications.length > 0 && (
          <ul className="mb-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-primary-foreground/15 pb-12">
            {certifications.map((certification) => (
              <li key={certification}>
                <Badge
                  variant="outline"
                  className="border-primary-foreground/25 text-primary-foreground/70"
                >
                  {certification}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex max-w-sm flex-col gap-5">
            {logo}
            {description && (
              <Typography variant="body" className="text-primary-foreground/70">
                {description}
              </Typography>
            )}

            {social.length > 0 && (
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-overline font-semibold uppercase text-primary-foreground/60 transition-fast hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-4">
                <Typography variant="overline" className="text-primary-foreground/50">
                  {column.heading}
                </Typography>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="font-sans text-small text-primary-foreground/70 transition-fast hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {contact && (
              <div className="flex flex-col gap-4">
                <Typography variant="overline" className="text-primary-foreground/50">
                  Contact
                </Typography>
                {/* The glyphs are muted, not brass. Three gold icons stacked in
                    the contact block were the densest use of the accent
                    anywhere on the site — gold as an icon colour rather than
                    as a mark. An address already looks like an address; the
                    icon only has to locate the row. */}
                <ul className="flex flex-col gap-3 font-sans text-small text-primary-foreground/70">
                  <li className="flex gap-3">
                    <Icon icon={MapPin} size="sm" className="mt-0.5 text-primary-foreground/40" />
                    <address className="not-italic">
                      {contact.address.street}
                      <br />
                      {contact.address.city}
                      {contact.address.state ? `, ${contact.address.state}` : ""}{" "}
                      {contact.address.postalCode}
                      <br />
                      {contact.address.country}
                    </address>
                  </li>
                  <li className="flex gap-3">
                    <Icon icon={Phone} size="sm" className="mt-0.5 text-primary-foreground/40" />
                    <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-accent">
                      {contact.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Icon icon={Mail} size="sm" className="mt-0.5 text-primary-foreground/40" />
                    <a href={`mailto:${contact.email}`} className="hover:text-accent">
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <Divider className="my-10 border-primary-foreground/15" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Typography variant="caption" className="text-primary-foreground/50">
            © {year} {companyName}. All rights reserved.
          </Typography>

          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-caption text-primary-foreground/50 transition-fast hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
