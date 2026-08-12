import Link from "next/link";
import { company } from "@/config";
import { surfaceIndex } from "@/config/navigation";
import { getLegalPages } from "@/lib/content";

/**
 * The footer — VDS §37.2, UX Blueprint R37.9.
 *
 * It is the company's record, not the last section: legal identity, the named
 * place, contact, and the complete index of every surface including the ones
 * the bar does not carry (R37.3).
 *
 * §37.2 — never: a newsletter capture, a social row, a repeated call to action,
 * an award badge, a "trusted by" strip, or a certification logo that is not a
 * checkable fact. None of the six is here, and the fourth is the one worth
 * stating twice: the certifications below are set as **text with an issuer and
 * a year**, which is a fact a buyer can go and check, rather than as marks a
 * designer arranged.
 *
 * Facts come from the company record and nothing is added here (Brand Bible
 * §19.2, MIB R7.1). Headcount is not printed: it is on the unconfirmed list.
 *
 * ### What changed
 *
 * It read as generated because it had no hierarchy: three blocks of 15px sans,
 * all at one level, in two columns, with the legal name doing the work of a
 * masthead by being 500 weight. A record still has a top.
 *
 * So the record now opens on the company's own name in the serif at T2 — the
 * one place besides the masthead where the company signs its name — with the
 * hairline above it running the full field. Beneath that, four columns on the
 * field's own margins: the place, the index, the record, the ways to reach a
 * person. The order is the order a buyer needs them in, and every group is
 * labelled at rank C so the eye can land rather than read.
 */
export async function SiteFooter() {
  const legalPages = await getLegalPages();
  const { address, phone, email, businessHours } = company.contact;

  return (
    /* S6 above, and a single hairline — one of the four permitted uses (VDS §16.4). */
    <footer className="mt-s6 border-t border-hairline px-6 pt-s5 pb-s4 reading:px-12">
      <div className="mx-auto max-w-field">
        {/*
          The signature. §37.2 calls a named building at a named address "the
          strongest sentence on most surfaces"; the name that owns it belongs
          above it, in the voice the company speaks in (§8.4).
        */}
        <div className="flex flex-col gap-s2 pb-s5 paired:flex-row paired:items-end paired:justify-between">
          <span className="font-serif text-t2">{company.legalName}</span>
          <span className="text-c tracking-mark text-ink-secondary uppercase">
            {company.tagline}
          </span>
        </div>

        <div className="grid gap-s4 border-t border-hairline pt-s4 reading:grid-cols-2 field:grid-cols-4 field:gap-8">
          <FooterGroup label="The place">
            <address className="flex flex-col text-r not-italic text-ink-secondary">
              {address.street}
              <span>
                {address.city} {address.postalCode}
              </span>
              <span>{address.country}</span>
            </address>
          </FooterGroup>

          <FooterGroup label="Reach a person">
            {/* §47.5: 44 × 44px minimum — the one place on the site a buyer
                reaches for with a thumb rather than a pointer. */}
            <span className="flex flex-col">
              <a
                href={`mailto:${email}`}
                className="motion-mark inline-flex min-h-11 w-fit items-center text-r underline decoration-transparent underline-offset-4 hover:decoration-ink"
              >
                {email}
              </a>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="motion-mark inline-flex min-h-11 w-fit items-center text-r underline decoration-transparent underline-offset-4 hover:decoration-ink"
                >
                  {phone}
                </a>
              )}
              <span className="mt-s1 text-r text-ink-secondary">{businessHours}</span>
            </span>
          </FooterGroup>

          <FooterGroup label="Audited by">
            {/* A checkable fact, set as one: name, issuer, year (§37.2). */}
            <ul className="flex flex-col gap-s2 text-r">
              {company.certifications.map((certification) => (
                <li key={certification.name} className="flex flex-col">
                  <span>{certification.name}</span>
                  <span className="text-c text-ink-secondary">
                    {certification.issuer} · {certification.year}
                  </span>
                </li>
              ))}
            </ul>
          </FooterGroup>

          {/* The index — R37.9. Every surface, plus the legal record. */}
          <FooterGroup label="Index">
            <nav aria-label="Site index">
              <ul className="grid grid-cols-2 gap-x-s3 reading:grid-cols-2">
                {surfaceIndex.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group motion-mark inline-flex min-h-11 w-fit items-center text-r text-ink-secondary hover:text-ink"
                    >
                      <span className="rule-grow">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterGroup>
        </div>

        {/*
          The colophon. One rule, one line: who made it, where, and the legal
          record. Nothing is asked for here (§37.2).
        */}
        <div className="mt-s4 flex flex-col gap-s2 border-t border-hairline pt-s4 reading:flex-row reading:items-center reading:justify-between">
          <span className="text-c tracking-mark text-ink-secondary uppercase">
            Manufactured in {address.city}, {address.country} · Est. {company.foundedYear}
          </span>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-s3">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group motion-mark inline-flex min-h-11 items-center text-c text-ink-secondary hover:text-ink"
                  >
                    <span className="rule-grow">{page.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/**
 * One group of the record. The label is rank C, tracked, on a hairline — the
 * same mark the surface uses for a dateline, so a reader who has scrolled the
 * whole document recognises it without being told.
 */
function FooterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-s2">
      <span className="text-c tracking-mark text-ink-secondary uppercase">{label}</span>
      {children}
    </div>
  );
}
