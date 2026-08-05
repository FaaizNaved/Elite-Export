/**
 * The theme layer — where every visual constant is defined.
 *
 * Tokens live in one of two places, and which one is not arbitrary:
 *
 * **`src/app/globals.css` (`@theme`)** owns every token Tailwind generates a
 * utility for. Tailwind reads CSS, not TypeScript, so this is the only place
 * these can be authored — a TypeScript copy would be a second source of truth
 * that silently drifts.
 *
 * | Concern      | Tokens                                   | Used as |
 * | ------------ | ---------------------------------------- | ------- |
 * | Colours      | `--color-*`                              | `bg-primary`, `text-foreground-muted` |
 * | Typography   | `--text-display` … `--text-overline`     | `text-h2` (size, leading and tracking together) |
 * | Fonts        | `--font-sans`, `--font-display`          | `font-display` |
 * | Spacing      | `--spacing` (4px base)                   | `p-6`, `gap-12` |
 * | Radius       | `--radius-button|input|card|image|badge` | `rounded-card` |
 * | Shadows      | `--shadow-sm|md|lg|floating`             | `shadow-md` |
 * | Blur         | `--blur-glass|overlay`                   | `backdrop-blur-glass` |
 * | Motion       | `--duration-*`, `--ease-*`               | `transition-base`, `ease-premium` |
 * | Z-index      | `--z-*`                                  | `z-modal`, `z-tooltip` |
 * | Containers   | `--container-narrow|content|wide`        | `max-w-wide` |
 * | Breakpoints  | `--breakpoint-3xl`                       | `3xl:` |
 * | Layout sizes | `--height-hero-tall`, `--width-drawer`   | `min-h-hero-tall`, `w-drawer` |
 *
 * **`./motion.ts`** owns the same motion language expressed as numbers, because
 * Framer Motion animates in JavaScript and cannot read a CSS variable.
 *
 * A component should never invent a visual constant. If a value is missing,
 * add it to whichever of the two places owns that concern, then use it.
 */
export {
  counter,
  duration,
  easing,
  marquee,
  spring,
  stagger,
  travel,
  viewportOnce,
} from "./motion";
export type { Duration, Easing } from "./motion";
