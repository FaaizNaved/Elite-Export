import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Vertical rhythm for every page section.
 *
 * All values are steps on the 4px spacing scale — the generous whitespace is
 * what makes the layout read as premium, so resist tightening it per-page.
 */
const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      /** First section on a page — clears the fixed header. */
      hero: "pt-32 pb-16 md:pt-40 md:pb-24",
      none: "",
    },
  },
  defaultVariants: { spacing: "md" },
});

export interface SectionProps
  extends ComponentPropsWithoutRef<"section">,
    VariantProps<typeof sectionVariants> {
  as?: ElementType;
}

export function Section({ as: Component = "section", spacing, className, ...props }: SectionProps) {
  return <Component className={cn(sectionVariants({ spacing }), className)} {...props} />;
}
