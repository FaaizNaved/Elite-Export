import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const spinnerVariants = cva("animate-spin motion-reduce:animate-none", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SpinnerProps
  extends Omit<ComponentPropsWithoutRef<"svg">, "children">,
    VariantProps<typeof spinnerVariants> {
  /** Announced to assistive technology. Omit when a visible label is adjacent. */
  label?: string;
}

/** Uses `currentColor`, so it inherits whatever it is placed inside. */
export function Spinner({ size, label, className, ...props }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
