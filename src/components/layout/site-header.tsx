import Link from "next/link";
import { HeaderShell } from "@/components/layout/header-shell";
import { SurfaceLink } from "@/components/layout/surface-link";
import { company } from "@/config";
import { primaryNav } from "@/config/navigation";
import { ROUTES } from "@/constants";

/**
 * The masthead.
 *
 * Two things, and nothing between them: the company on the left, five
 * destinations on the right.
 *
 * It carried nine for one revision — every surface plus the ask — and the
 * result was a sitemap printed across the top of a page whose first screen is
 * one serif sentence. The bar competed with the headline, which is the single
 * thing on this surface that must not be competed with. Five is what the
 * composition can hold without raising its voice; the rest is on the back
 * cover, where a complete index belongs.
 *
 * The name is the route Home. Enquiry is not here — it is reached from the
 * record of every product and from the index below, and a bar that carries the
 * ask offers Conversation before Confidence (X5).
 *
 * Below `paired` the five open from a native `details`: no panel, no overlay,
 * no script, and the wordmark never moves.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex max-w-field items-center justify-between gap-s5 px-6 py-s3 reading:px-12">
        <Link
          href={ROUTES.home}
          className="group -my-s1 flex min-h-11 shrink-0 flex-col justify-center py-s1"
        >
          <span className="motion-panel font-serif text-t3 leading-none whitespace-nowrap text-ink transition-opacity group-hover:opacity-60">
            {company.tradingName}
          </span>
          <span className="mt-2 hidden whitespace-nowrap text-c tracking-mark text-ink-secondary uppercase reading:block">
            Leather manufacturers · Est. {company.foundedYear}
          </span>
        </Link>

        <nav aria-label="Primary" className="min-w-0">
          <ul className="hidden items-center justify-end gap-s3 reading:flex field:gap-s5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <SurfaceLink label={item.label} href={item.href} />
              </li>
            ))}
          </ul>

          <details className="reading:hidden">
            <summary className="motion-mark -mr-s1 flex min-h-12 list-none items-center px-s1 text-c tracking-rail uppercase hover:opacity-60">
              Index
            </summary>
            {/*
              `items-end`, because the panel is sized by its trigger.

              The bar is one flex row and the nav is its trailing item, so the
              nav's box is shrink-to-fit around the word "Index" — 87px at 375.
              The open list inherits that box, and a destination longer than the
              trigger has nowhere to go: "Manufacturing" needs 132px, ran 45px
              past the field margin and 21px past the viewport, and took the
              document's horizontal scroll with it.

              Aligning the items to the box's trailing edge puts them on the
              field margin — where the summary above them and the five
              destinations at `reading` already sit — and lets a long label grow
              inwards, into the page, rather than outwards off it. The width of
              the trigger stops governing the width of what it opens.
            */}
            <ul className="mt-s3 flex flex-col items-end gap-s1">
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
