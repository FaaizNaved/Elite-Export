"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
 */
export function SurfaceLink({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={current ? "text-r underline decoration-1 underline-offset-4" : "text-r"}
    >
      {label}
    </Link>
  );
}
