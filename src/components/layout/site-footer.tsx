import Link from "next/link";
import { company } from "@/config";
import { surfaceIndex } from "@/config/navigation";
import { getLegalPages } from "@/lib/content";

/**
 * The back cover.
 *
 * It is ink, not paper, and it is the second and last dark field on the site:
 * the page changes material one final time and the document closes. The band
 * above it is the same graded fall the silence uses, so the footer is arrived
 * at rather than bordered off.
 *
 * It carries the **complete index**, and that is the division of labour with
 * the masthead: the bar carries the five destinations a visitor is choosing
 * between, the back cover carries everything the company has. Technology,
 * Gallery, Journal and Enquiry live here and nowhere else in the shell.
 *
 * A complete index is not the same thing as a sitemap dump. It is set at rank
 * C, in one run of small capitals at the secondary inverse tone, under a
 * single label — the contents page of a monograph, not four columns of blue
 * links. Nothing in it is enlarged to look important.
 *
 * The order a book prints it: **the imprint** — who made this and where; **the
 * address** — a named building, which §37.2 calls the strongest sentence on
 * most surfaces; **correspondence** — how to reach a person; **the standing** —
 * what the house is audited against, as checkable text rather than as badges;
 * **the index**; and **the colophon** — the legal record and one closing line.
 */
export async function SiteFooter() {
  const legalPages = await getLegalPages();
  const { address, phone, email, businessHours } = company.contact;

  return (
    <>
      {/* The last change of material. Paper falls to ink over a graded band,
          exactly as it does on the way into the silence — no rule, no edge. */}
      <div aria-hidden className="dissolve-into-ink w-full" />

      <footer className="atmosphere-linen relative bg-ink text-paper">
        <div className="relative z-10 mx-auto max-w-field px-6 pt-s6 pb-s5 reading:px-12">
          {/* The imprint. */}
          <div className="grid gap-s5 paired:grid-cols-12 paired:items-end paired:gap-8">
            <div className="paired:col-span-7">
              <span className="optical-left block font-serif text-t1 leading-[1.02] text-paper">
                {company.legalName}
              </span>
              <span className="mt-s4 block text-c tracking-rail text-ink-secondary-inverse uppercase">
                Leather manufacturers · Est. {company.foundedYear}
              </span>
            </div>

            <address className="self-end font-sans text-r not-italic text-ink-secondary-inverse paired:col-span-4 paired:col-start-9">
              {address.street}
              <br />
              {address.city} {address.postalCode}
              <br />
              {address.country}
            </address>
          </div>

          {/* Correspondence and standing, on one inverse hairline. */}
          <div className="mt-s6 grid gap-s5 border-t border-paper/15 pt-s5 paired:grid-cols-12 paired:gap-8">
            <div className="paired:col-span-5">
              <span className="mb-s3 block text-c tracking-rail text-ink-secondary-inverse uppercase">
                Correspondence
              </span>
              <span className="flex flex-col gap-s1">
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex min-h-11 w-fit items-center text-r text-paper"
                >
                  <span className="rule-grow">{email}</span>
                </a>
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="group inline-flex min-h-11 w-fit items-center text-r text-paper"
                  >
                    <span className="rule-grow">{phone}</span>
                  </a>
                )}
                <span className="mt-s2 text-r text-ink-secondary-inverse">{businessHours}</span>
              </span>
            </div>

            <div className="paired:col-span-5 paired:col-start-8">
              <span className="mb-s3 block text-c tracking-rail text-ink-secondary-inverse uppercase">
                Audited by
              </span>
              <ul className="flex flex-col gap-s2 text-r">
                {company.certifications.map((certification) => (
                  <li key={certification.name} className="flex flex-col">
                    <span className="text-paper">{certification.name}</span>
                    <span className="text-c text-ink-secondary-inverse">
                      {certification.issuer} · {certification.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*
            The index. One label, one run of small capitals, two columns on a
            narrow field and four on a wide one — a contents page, read down
            rather than scanned across.
          */}
          <nav aria-label="Site index" className="mt-s6 border-t border-paper/15 pt-s5">
            <span className="mb-s4 block text-c tracking-rail text-ink-secondary-inverse uppercase">
              Explore
            </span>
            <ul className="grid grid-cols-2 gap-x-s4 reading:grid-cols-3 field:grid-cols-4">
              {surfaceIndex.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex min-h-11 items-center text-c tracking-mark text-ink-secondary-inverse uppercase"
                  >
                    <span className="rule-grow">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* The colophon. */}
          <div className="mt-s5 flex flex-col gap-s3 border-t border-paper/15 pt-s4 reading:flex-row reading:items-center reading:justify-between">
            <span className="text-c tracking-rail text-ink-secondary-inverse uppercase">
              {company.tagline}
            </span>

            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-x-s4">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="group inline-flex min-h-11 items-center text-c text-ink-secondary-inverse"
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
    </>
  );
}
