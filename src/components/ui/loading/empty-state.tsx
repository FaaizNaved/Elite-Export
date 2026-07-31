import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon/icon";
import { Typography } from "../typography/typography";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Takes precedence over `icon` — an image, SVG or Lottie wrapper. */
  illustration?: ReactNode;
  /** Usually a `Button` — "Clear filters", "Contact us". */
  action?: ReactNode;
  className?: string;
}

/** Shown when a list, search or filter returns nothing. */
export function EmptyState({
  title,
  description,
  icon,
  illustration,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border px-6 py-16 text-center",
        className,
      )}
    >
      {illustration ?? (icon && <Icon icon={icon} size="xl" tone="muted" />)}

      <div className="flex flex-col gap-2">
        <Typography variant="h4" as="p">
          {title}
        </Typography>
        {description && (
          <Typography variant="muted" className="max-w-md">
            {description}
          </Typography>
        )}
      </div>

      {action}
    </div>
  );
}
