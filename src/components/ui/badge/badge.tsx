import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-badge font-sans font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "border border-border bg-secondary text-secondary-foreground",
        outline: "border border-border-strong bg-transparent text-foreground-secondary",
        success: "bg-success-subtle text-success",
        warning: "bg-warning-subtle text-warning",
        neutral: "bg-surface-sunken text-foreground-secondary",
      },
      size: {
        sm: "px-2.5 py-1 text-caption",
        md: "px-3 py-1.5 text-small",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  },
);

export interface BadgeProps
  extends ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

/** Static status label. For anything clickable or removable, use `Chip`. */
export function Badge({ variant, size, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
