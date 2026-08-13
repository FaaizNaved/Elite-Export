import Link from "next/link";
import { company } from "@/config";
import { surfaceIndex } from "@/config/navigation";
import { getLegalPages } from "@/lib/content";

/**
 * The colophon — the last page of the book, not a footer.
 *
 * The name, the place, the two ways to reach a person, what the house is
 * audited against, and the contents of the volume set as one continuous run of
 * small capitals. No columns of links, no groups in boxes, no rule around
 * anything: a hairline under the imprint and a hairline over the legal line,
 * and nothing else.
 */
export async function SiteFooter() {
  const legalPages = await getLegalPages();
  const { address, phone, email, businessHours } = company.contact;

  return (
    <footer className="atmosphere-linen relative">
      <div className="mx-auto max-w-field px-6 pt-s5 pb-s5 reading:px-12">
        {/* The imprint. */}
        <div className="grid gap-s5 pb-s6 paired:grid-cols-12 paired:items-end paired:gap-8">
          <div className="paired:col-span-7">
            <span className="optical-left block font-serif text-t1 leading-[1.02]">
              {company.legalName}
            </span>
            <span className="mt-s4 block text-c tracking-rail text-ink-secondary uppercase">
              {address.city}, {address.country} · Est. {company.foundedYear}
            </span>
          </div>

          <address className="self-end font-sans text-r not-italic text-ink-secondary paired:col-span-4 paired:col-start-9">
            {address.street}
            <br />
            {address.city} {address.postalCode}
            <br />
            {address.country}
          </address>
        </div>

        {/* Correspondence and standing — two short runs, unequal, on one rule. */}
        <div className="grid gap-s5 border-t border-hairline pt-s5 paired:grid-cols-12 paired:gap-8">
          <div className="paired:col-span-5">
            <span className="mb-s3 block text-c tracking-rail text-ink-secondary uppercase">
              Correspondence
            </span>
            <span className="flex flex-col gap-s1">
              <a href={`mailto:${email}`} className="group w-fit text-r">
                <span className="rule-grow">{email}</span>
              </a>
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="group w-fit text-r">
                  <span className="rule-grow">{phone}</span>
                </a>
              )}
              <span className="mt-s2 text-r text-ink-secondary">{businessHours}</span>
            </span>
          </div>

          <div className="paired:col-span-5 paired:col-start-8">
            <span className="mb-s3 block text-c tracking-rail text-ink-secondary uppercase">
              Audited by
            </span>
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
          </div>
        </div>

        {/* The contents, set as one run rather than as a grid of links. */}
        <nav aria-label="Site index" className="mt-s5">
          <ul className="flex flex-wrap items-baseline gap-x-s4 gap-y-s1">
            {surfaceIndex.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex min-h-9 items-center text-c tracking-rail text-ink-secondary uppercase"
                >
                  <span className="rule-grow">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-s5 flex flex-col gap-s3 border-t border-hairline pt-s4 reading:flex-row reading:items-center reading:justify-between">
          <span className="text-c tracking-rail text-ink-secondary uppercase">
            {company.tagline}
          </span>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-s4">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group inline-flex min-h-9 items-center text-c text-ink-secondary"
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
