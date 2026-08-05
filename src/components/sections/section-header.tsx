import type { ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  heading: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level. Sections inside a page are `h2`; nested groups are `h3`. */
  as?: "h1" | "h2" | "h3";
  /** Usually a `Button` — "View all products". */
  action?: ReactNode;
  className?: string;
}

/**
 * The heading group that introduces every section on every page.
 *
 * Exists so eyebrow/heading/description spacing is defined once — this is the
 * single most repeated pattern on the site.
 */
export function SectionHeader({
  heading,
  eyebrow,
  description,
  align = "left",
  as = "h2",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex gap-6",
        centered
          ? "flex-col items-center text-center"
          : "flex-col md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-5", centered ? "items-center" : "max-w-2xl")}>
        {/* Eyebrow and seam are one unit — the label and its mark — so they sit
            closer to each other than the group does to the heading. */}
        {eyebrow && (
          <div className={cn("flex flex-col gap-3", centered && "items-center")}>
            <Typography variant="overline">{eyebrow}</Typography>
            <span aria-hidden className="rule-stitch" />
          </div>
        )}
        <Typography variant="h2" as={as}>
          {heading}
        </Typography>
        {/* Narrower than the heading it sits under: a section standfirst is read
            in one pass, and 74 characters is past the point where that holds. */}
        {description && (
          <Typography variant="lead" className={cn("max-w-xl", centered && "mx-auto")}>
            {description}
          </Typography>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
