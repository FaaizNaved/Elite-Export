import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const dividerVariants = cva("border-border", {
  variants: {
    orientation: {
      horizontal: "w-full border-t",
      vertical: "h-full self-stretch border-l",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export interface DividerProps
  extends Omit<ComponentPropsWithoutRef<"hr">, "children">,
    VariantProps<typeof dividerVariants> {
  /** Adds a small gold lozenge at the centre. Section breaks, not list rows. */
  decorative?: boolean;
}

export function Divider({ orientation, decorative = false, className, ...props }: DividerProps) {
  if (decorative) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex w-full items-center gap-4", className)}
      >
        <span className="h-px flex-1 bg-border" />
        <span className="size-1.5 rotate-45 bg-accent" aria-hidden />
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return (
    <hr
      aria-orientation={orientation === "vertical" ? "vertical" : undefined}
      className={cn(dividerVariants({ orientation }), className)}
      {...props}
    />
  );
}
