import Link from "next/link";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/cn";

export interface LogoProps {
  /** Renders as plain text when false — used inside the footer's own link set. */
  asLink?: boolean;
  className?: string;
  label: string;
}

/**
 * Wordmark. Deliberately typographic rather than an image file: it stays crisp
 * at any size, inherits the surrounding colour, and costs no request.
 * Swap the inner markup for an SVG when the client supplies a logotype.
 */
export function Logo({ asLink = true, label, className }: LogoProps) {
  const mark = (
    <span className={cn("font-display text-h4 font-medium tracking-tight", className)}>
      {label}
      <span aria-hidden className="ml-0.5 text-accent">
        .
      </span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href={ROUTES.home} aria-label={`${label} — home`} className="transition-fast hover:opacity-80">
      {mark}
    </Link>
  );
}
