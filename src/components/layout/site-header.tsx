import Link from "next/link";
import { HeaderShell } from "@/components/layout/header-shell";
import { SurfaceLink } from "@/components/layout/surface-link";
import { company } from "@/config";
import { primaryNav } from "@/config/navigation";
import { ROUTES } from "@/constants";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex max-w-field items-center justify-between gap-s4 px-6 py-s3 reading:px-12">
        <Link href={ROUTES.home} className="group -my-s1 flex min-h-11 flex-col justify-center py-s1">
          <span className="motion-panel font-serif text-t3 leading-none text-ink transition-opacity group-hover:opacity-60">
            {company.tradingName}
          </span>
          <span className="mt-2 hidden text-c tracking-rail text-ink-secondary uppercase reading:block">
            Leather manufacturers · Est. {company.foundedYear}
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="hidden items-center gap-s4 reading:flex field:gap-s5">
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
