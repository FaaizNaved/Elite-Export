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
      <div className={cn("flex flex-col gap-3", centered ? "items-center" : "max-w-2xl")}>
        {eyebrow && <Typography variant="overline">{eyebrow}</Typography>}
        <Typography variant="h2" as={as}>
          {heading}
        </Typography>
        {description && <Typography variant="lead">{description}</Typography>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
