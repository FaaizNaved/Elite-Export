import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    tone: {
      inherit: "text-current",
      accent: "text-accent",
      muted: "text-foreground-muted",
      secondary: "text-foreground-secondary",
    },
  },
  defaultVariants: { size: "md", tone: "inherit" },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  /** Any icon from `lucide-react`. */
  icon: LucideIcon;
  /**
   * Accessible name. Leave undefined for decorative icons — they are hidden
   * from assistive technology, which is the right default next to a text label.
   */
  label?: string;
  className?: string;
  strokeWidth?: number;
}

/** Keeps icon sizing, alignment and stroke weight consistent site-wide. */
export function Icon({ icon: IconComponent, label, size, tone, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <IconComponent
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable={false}
      strokeWidth={strokeWidth}
      className={cn(iconVariants({ size, tone }), className)}
    />
  );
}
