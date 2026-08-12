"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * A navigation link that states whether you are on it.
 *
 * UX Blueprint R37.5: the current surface is identifiable from the navigation
 * itself — a visitor who cannot tell where they are has been asked to
 * remember. VDS §37.1 fixes the mark: a 1px underline at 4px offset, which is
 * the only mark available that is not a container (§16.4).
 *
 * The single client component in the shell. Reading the current URL from a
 * server component is not supported, and location is a requirement rather than
 * a nicety; nothing else here hydrates.
 *
 * ### The hover
 *
 * VDS §42.5: on hover **one property changes, in band 1**, and the list of what
 * may never change is explicit — scale, lift, shadow, colour, image zoom,
 * translation. The one property here is the underline's *colour*.
 *
 * Every link carries the underline at all times and it is transparent until it
 * is earned, so nothing reflows when a pointer crosses it: the 4px offset and
 * the 1px rule are already occupying their space (§37.1). Hovering brings the
 * mark to secondary ink; being on the surface brings it to full ink. A visitor
 * can therefore tell *where they are* and *what they are about to reach* apart
 * at a glance, which is R37.5 with a second state rather than a new mark.
 */
export function SurfaceLink({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "text-r underline decoration-1 underline-offset-4",
        "motion-mark transition-[text-decoration-color]",
        /*
          §47.5: the minimum interactive target is 44 × 44px, because below
          roughly that the error rate rises sharply for anyone whose hands are
          not steady. The label's line box is 20px, so the target is set to 44
          and the text sits in the middle of it — measured at 20px before this,
          in the bar *and* in the small-field index, where every destination on
          the site is reached by thumb.
        */
        "inline-flex min-h-11 items-center",
        current ? "decoration-ink" : "decoration-transparent hover:decoration-ink-secondary",
      )}
    >
      {label}
    </Link>
  );
}
