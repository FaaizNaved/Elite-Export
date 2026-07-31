import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "../loading/spinner";

/**
 * Exported so a `next/link` can be styled as a button without wrapping an
 * anchor in a `<button>`: `<Link className={buttonVariants({ variant: "outline" })}>`.
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-button",
    "font-sans text-button font-medium whitespace-nowrap select-none",
    "transition-base",
    "disabled:pointer-events-none disabled:opacity-45",
  ],
  {
    variants: {
      variant: {
        /** Dark → gold on hover. The site's primary call to action. */
        primary: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        /** Ivory → dark on hover. */
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground",
        /** Border → fill. */
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "bg-transparent text-foreground hover:bg-surface-sunken",
        text: "bg-transparent text-foreground underline-offset-4 hover:text-accent hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-body",
        icon: "size-11 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      // A text button is a link in disguise: no box, so no horizontal padding.
      { variant: "text", size: ["sm", "md", "lg"], class: "h-auto px-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Swaps the leading icon for a spinner and blocks interaction. */
  loading?: boolean;
  /** Announced while `loading` is true. */
  loadingLabel?: string;
}

export function Button({
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  loading = false,
  loadingLabel = "Loading",
  disabled,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} label={loadingLabel} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
