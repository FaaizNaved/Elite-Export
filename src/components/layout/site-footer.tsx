import Link from "next/link";
import { company } from "@/config";
import { surfaceIndex } from "@/config/navigation";
import { getLegalPages } from "@/lib/content";

/** The back cover. */
export async function SiteFooter() {
  const legalPages = await getLegalPages();
  const { address, phone, email, businessHours } = company.contact;

  return (
    <footer className="atmosphere-linen relative border-t border-hairline">
      <div className="mx-auto max-w-field px-6 pt-s6 pb-s5 reading:px-12">
        {/* The imprint. */}
        <div className="grid gap-s5 pb-s6 paired:grid-cols-12 paired:gap-8">
          <div className="paired:col-span-7">
            <span className="block font-serif text-t1 leading-none">{company.legalName}</span>
            <span className="mt-s3 block text-c tracking-rail text-ink-secondary uppercase">
              Kanpur, India · Est. {company.foundedYear}
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

        <div className="grid gap-s5 border-t border-hairline pt-s5 reading:grid-cols-2 field:grid-cols-4 field:gap-8">
          <Group label="Correspondence">
            <span className="flex flex-col gap-s1">
              <a href={`mailto:${email}`} className="group w-fit text-r">
                <span className="rule-grow">{email}</span>
              </a>
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="group w-fit text-r">
                  <span className="rule-grow">{phone}</span>
                </a>
              )}
              <span className="mt-s1 text-r text-ink-secondary">{businessHours}</span>
            </span>
          </Group>

          <Group label="Audited by">
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
          </Group>

          <Group label="Index" className="field:col-span-2">
            <nav aria-label="Site index">
              <ul className="grid grid-cols-2 gap-x-s4 gap-y-s1">
                {surfaceIndex.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex min-h-9 w-fit items-center text-r text-ink-secondary"
                    >
                      <span className="rule-grow">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Group>
        </div>

        <div className="mt-s6 flex flex-col gap-s3 border-t border-hairline pt-s4 reading:flex-row reading:items-center reading:justify-between">
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

function Group({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="mb-s3 block text-c tracking-rail text-ink-secondary uppercase">{label}</span>
      {children}
    </div>
  );
}
