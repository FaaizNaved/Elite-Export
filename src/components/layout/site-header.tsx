import Link from "next/link";
import { SurfaceLink } from "@/components/layout/surface-link";
import { company } from "@/config";
import { primaryNav } from "@/config/navigation";
import { ROUTES } from "@/constants";

/**
 * The navigation shell — VDS §37.1, UX Blueprint §37.
 *
 * - Static, never sticky: it leaves with the field (VDS §37.1, §42.6). A bar
 *   that follows the visitor turns a held moment into an advertisement
 *   (CDB §22.4), and it may never overlay a photograph.
 * - No border, no shadow, no background change on scroll (VDS §37.1).
 * - Five destinations in chapter order (UX R37.2, R37.4). Home is the company
 *   name; Enquiry is absent, because the ask does not precede Confidence (X5).
 * - No dropdown, no hover panel (R37.7).
 * - Below the reading breakpoint the *same* five open from one labelled
 *   control (R38.6), on native disclosure — no state, no script.
 *
 * Height is 48px of control plus S2 above and below on a large field, S1 on a
 * small one, which is how VDS §37.1 derives 80/64.
 */
export function SiteHeader() {
  return (
    <header className="px-s2 py-s1 reading:py-s2">
      {/* min-h-12 is the 48px control height VDS §37.1 derives 80/64 from. */}
      <div className="mx-auto flex min-h-12 max-w-field items-center justify-between gap-s4">
        {/* Identity, not a destination — UX R37.2. */}
        <Link href={ROUTES.home} className="text-r">
          {company.tradingName}
        </Link>

        {/* One Primary landmark at every field size: the wide list and the
            small-field disclosure are two presentations of the same five. */}
        <nav aria-label="Primary">
          <ul className="hidden items-center gap-s3 reading:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <SurfaceLink label={item.label} href={item.href} />
              </li>
            ))}
          </ul>

          <details className="reading:hidden">
            {/* A word, not a glyph (VDS §43.2), on a 48px target (§47.5). */}
            <summary className="-mr-s1 flex min-h-12 list-none items-center px-s1 text-r">Index</summary>
            <ul className="mt-s3 flex flex-col gap-s3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <SurfaceLink label={item.label} href={item.href} />
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </div>
    </header>
  );
}
