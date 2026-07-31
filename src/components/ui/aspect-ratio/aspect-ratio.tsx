import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Named ratios used across the site, so pages don't invent their own. */
export const ASPECT_RATIOS = {
  square: "1 / 1",
  portrait: "3 / 4",
  landscape: "4 / 3",
  wide: "16 / 9",
  ultrawide: "21 / 9",
  /** Product photography standard for this catalogue. */
  product: "4 / 5",
} as const;

export type AspectRatioName = keyof typeof ASPECT_RATIOS;

export interface AspectRatioProps extends ComponentPropsWithoutRef<"div"> {
  ratio?: AspectRatioName;
}

/**
 * Reserves space before an image loads, which keeps CLS at zero.
 * Uses the native `aspect-ratio` property — no padding-top hack needed.
 */
export function AspectRatio({ ratio = "landscape", className, style, ...props }: AspectRatioProps) {
  return (
    <div
      style={{ aspectRatio: ASPECT_RATIOS[ratio], ...style }}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    />
  );
}
