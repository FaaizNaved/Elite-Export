import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * The single place text styling is defined.
 *
 * Headings use Playfair Display, everything else uses Inter. Sizes come from
 * the fluid `--text-*` tokens, so no component ever sets a font size directly.
 */
export const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "font-display text-display font-medium text-balance",
      hero: "font-display text-hero font-medium text-balance",
      h1: "font-display text-h1 font-medium text-balance",
      h2: "font-display text-h2 font-medium text-balance",
      h3: "font-display text-h3 font-medium text-balance",
      h4: "font-sans text-h4 font-semibold",
      lead: "font-sans text-body-lg text-foreground-secondary text-pretty",
      bodyLg: "font-sans text-body-lg text-pretty",
      body: "font-sans text-body text-pretty",
      small: "font-sans text-small",
      caption: "font-sans text-caption text-foreground-muted",
      muted: "font-sans text-body text-foreground-muted text-pretty",
      overline: "font-sans text-overline font-semibold uppercase text-foreground-muted",
    },
  },
  defaultVariants: { variant: "body" },
});

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

/** Sensible semantic element per variant — override with `as` when the
 *  document outline needs something different from the visual size. */
const defaultElement: Record<TypographyVariant, ElementType> = {
  display: "h1",
  hero: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  bodyLg: "p",
  body: "p",
  small: "p",
  caption: "p",
  muted: "p",
  overline: "p",
};

export interface TypographyProps
  extends Omit<ComponentPropsWithoutRef<"p">, "color">,
    VariantProps<typeof typographyVariants> {
  as?: ElementType;
}

export function Typography({ as, variant, className, ...props }: TypographyProps) {
  const Component = as ?? defaultElement[variant ?? "body"];

  return <Component className={cn(typographyVariants({ variant }), className)} {...props} />;
}
