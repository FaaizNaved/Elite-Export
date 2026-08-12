import Link from "next/link";
import { company } from "@/config";
import { surfaceIndex } from "@/config/navigation";
import { getLegalPages } from "@/lib/content";

/**
 * The footer — VDS §37.2, UX Blueprint R37.9.
 *
 * It is the company's record, not the last section: legal identity, the named
 * place, contact, and the complete index of every surface including the ones
 * the bar does not carry (R37.3). A record is complete rather than arranged,
 * so the index is one flat list in chapter order rather than marketing
 * columns.
 *
 * VDS §37.2 — never: a newsletter capture, a social row, a repeated call to
 * action, an award badge, a "trusted by" strip, or a certification logo that
 * is not a checkable fact. All six were present before this package.
 *
 * Facts come from the company record and nothing is added here (Brand Bible
 * §19.2, MIB R7.1). Headcount is not printed: it is on the unconfirmed list
 * (§19.4).
 */
export async function SiteFooter() {
  const legalPages = await getLegalPages();
  const { address } = company.contact;

  return (
    /* S6 above, and a single hairline — one of the four permitted uses (VDS §16.4). */
    <footer className="mt-s6 border-t border-hairline px-s2 py-s5">
      <div className="mx-auto flex max-w-field flex-col gap-s4 reading:flex-row reading:justify-between">
        {/* Ownership, stated plainly: a named building at a named address. */}
        <address className="text-r not-italic">
          <span className="block">{company.legalName}</span>
          <span className="block text-ink-secondary">{address.street}</span>
          <span className="block text-ink-secondary">
            {address.city} {address.postalCode}
          </span>
          <span className="block text-ink-secondary">{address.country}</span>
          <a href={`mailto:${company.contact.email}`} className="mt-s1 block">
            {company.contact.email}
          </a>
        </address>

        {/* The index — R37.9. Every surface, plus the legal record. */}
        <nav aria-label="Site index">
          <ul className="flex flex-col gap-s1">
            {surfaceIndex.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-r">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <ul className="flex flex-col gap-s1">
            {legalPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-c text-ink-secondary">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
