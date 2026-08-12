import Link from "next/link";
import { HeaderShell } from "@/components/layout/header-shell";
import { SurfaceLink } from "@/components/layout/surface-link";
import { company } from "@/config";
import { primaryNav } from "@/config/navigation";
import { ROUTES } from "@/constants";

/**
 * The masthead — VDS §37.1, UX Blueprint §37.
 *
 * Five destinations in chapter order (R37.2, R37.4). Home is the company name;
 * Enquiry is absent, because the ask does not precede Confidence (X5). No
 * dropdown, no hover panel (R37.7). Below the reading breakpoint the same five
 * open from one labelled control (R38.6), on native disclosure.
 *
 * ### What changed, and why
 *
 * **The name is set as a masthead rather than as a link.** §37.1 had it at
 * rank R in the sans — the same size and the same voice as the five
 * destinations beside it, distinguished only by weight, which is a difference a
 * reader has to be told about. It is now the serif, at T3, with the trade
 * stated beneath it at rank C: two lines that say who is speaking and what they
 * make, in the two voices §8.4 assigns those jobs. That is a masthead. The
 * previous treatment was a menu item that happened to be first.
 *
 * **The destinations are set as a record.** Rank C, tracked, uppercase — the
 * register §12.3 gives a location in a structure, which is exactly what a
 * navigation label is. At rank R in sentence case they read as prose competing
 * with the surface title below them.
 *
 * **The bar returns.** `HeaderShell` holds the behaviour and the reason.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex max-w-field items-end justify-between gap-s4 px-6 py-s3 reading:px-12">
        {/*
          Identity, not a destination — R37.2. The trade beneath the name is the
          one descriptor on the site and it is a fact, not a claim: it says what
          the company makes and where, which is what a masthead is for.
        */}
        <Link
          href={ROUTES.home}
          className="group -my-s1 flex min-h-11 flex-col justify-center py-s1"
        >
          <span className="motion-mark font-serif text-t3 leading-none text-ink group-hover:text-ink-secondary">
            {company.tradingName}
          </span>
          <span className="mt-1.5 hidden text-c tracking-mark text-ink-secondary uppercase reading:block">
            Leather manufacturers · Kanpur, India
          </span>
        </Link>

        {/* One Primary landmark at every field size: the wide list and the
            small-field disclosure are two presentations of the same five. */}
        <nav aria-label="Primary">
          <ul className="hidden items-center gap-s4 reading:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <SurfaceLink label={item.label} href={item.href} />
              </li>
            ))}
          </ul>

          <details className="reading:hidden">
            {/* A word, not a glyph (VDS §43.2), on a 48px target (§47.5). */}
            <summary className="motion-mark -mr-s1 flex min-h-12 list-none items-center px-s1 text-c tracking-mark uppercase hover:text-ink-secondary">
              Index
            </summary>
            <ul className="mt-s3 flex flex-col gap-s2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <SurfaceLink label={item.label} href={item.href} />
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </div>
    </HeaderShell>
  );
}
