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
    /**
     * Material identity (blueprint §13). One material per section, never in two
     * adjacent sections, never over photography. The pattern is drawn on a
     * pseudo-element behind the content and disabled below 768px.
     */
    texture: {
      none: "",
      /** The raw material, under the story of the people. */
      grain: "texture-grain",
      /** The shapes products are cut from. */
      pattern: "texture-pattern",
      /** Process drawings under a process section. */
      blueprint: "texture-blueprint [--texture-opacity:0.04]",
      /** Regular, measured, repeating — the visual form of consistency. */
      stitch: "texture-stitch",
      /** Material, not literal freight iconography. */
      hardware: "texture-hardware",
      /** The most decorative motif, on the most emotional section. */
      tooling: "texture-tooling [--texture-opacity:0.05]",
    },
  },
  defaultVariants: { spacing: "md", texture: "none" },
});

export interface SectionProps
  extends ComponentPropsWithoutRef<"section">,
    VariantProps<typeof sectionVariants> {
  as?: ElementType;
}

export function Section({
  as: Component = "section",
  spacing,
  texture,
  className,
  ...props
}: SectionProps) {
  return <Component className={cn(sectionVariants({ spacing, texture }), className)} {...props} />;
}
