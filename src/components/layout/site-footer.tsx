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
 *
 * ### What the Presentation package changed, and what it did not
 *
 * **Not the contents.** No fact was added, no fact was removed, and no repeated
 * call to action, social row, newsletter capture or badge arrived — §37.2's
 * "never" list is intact and now has a fourth reason to stay that way: the
 * action was removed from six surfaces in this package, and putting one back
 * here would be all six returning at once.
 *
 * **The balance.** Three blocks were laid out with `justify-between` on a
 * 1440px field: on a wide screen the record sat in the left corner, ten links
 * sat in the middle and two sat on the right, with two lakes of nothing between
 * them. That is not the silence of §16.2 — it is three things that have not
 * been placed. §24.1's margins were also being ignored here in the same way the
 * header ignored them, so nothing in the footer lined up with the surface above
 * it.
 *
 * It is now a grid on the field's own margins, and the record leads at twice
 * the width of the index it sits beside — the same 5+3 asymmetry §29.2 gives
 * every other paired thing in this system, so the footer is not the one place
 * that centres or distributes. The index runs in two columns because ten items
 * in one column is a list long enough to scan rather than read.
 */
export async function SiteFooter() {
  const legalPages = await getLegalPages();
  const { address, phone } = company.contact;

  return (
    /* S6 above, and a single hairline — one of the four permitted uses (VDS §16.4). */
    <footer className="mt-s6 border-t border-hairline px-6 py-s5 reading:px-12">
      <div className="mx-auto grid max-w-field gap-s4 paired:grid-cols-[5fr_3fr] paired:gap-8">
        {/*
          Ownership, stated plainly: a named building at a named address. §37.2
          calls this "the strongest sentence on most surfaces", so it leads,
          and the legal name is set at full ink while the address that follows
          it is secondary — one record, two levels, no second mark.
        */}
        <address className="flex flex-col gap-s2 text-r not-italic">
          <span className="font-medium">{company.legalName}</span>

          <span className="text-ink-secondary">
            {address.street}
            <br />
            {address.city} {address.postalCode}
            <br />
            {address.country}
          </span>

          {/*
            Contact is a fact on the record and §37.2 asks for it by name. Two
            lines, not a block: an address a buyer can write to and a number
            they can ring, each reachable in one action (§47.5's 44px target is
            met by the 24px line box plus the S1 gap between them).
          */}
          {/*
            §47.5: 44 × 44px minimum, and these two were measured at 23px on a
            phone — the address block is the one place on the site a buyer
            reaches for with a thumb rather than a pointer.
          */}
          <span className="flex flex-col">
            <a
              href={`mailto:${company.contact.email}`}
              className="motion-mark inline-flex min-h-11 w-fit items-center underline decoration-transparent underline-offset-4 hover:decoration-ink"
            >
              {company.contact.email}
            </a>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="motion-mark inline-flex min-h-11 w-fit items-center underline decoration-transparent underline-offset-4 hover:decoration-ink"
              >
                {phone}
              </a>
            )}
          </span>
        </address>

        <div className="flex flex-col gap-s3">
          {/* The index — R37.9. Every surface, plus the legal record. */}
          {/*
            Ten destinations at 44px each is 220px in two columns, which is why
            the index runs in two rather than one: a single column of ten at the
            target size is a list long enough that the record stops reading as
            one object (§36.3).
          */}
          <nav aria-label="Site index">
            <ul className="grid grid-cols-2 gap-x-s3">
              {surfaceIndex.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="motion-mark inline-flex min-h-11 w-fit items-center text-r underline decoration-transparent underline-offset-4 hover:decoration-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-s3">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="motion-mark inline-flex min-h-11 items-center text-c text-ink-secondary underline decoration-transparent underline-offset-4 hover:decoration-ink-secondary"
                  >
                    {page.title}
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
