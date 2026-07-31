/**
 * Motion tokens for Framer Motion.
 *
 * These mirror the CSS custom properties in `src/app/globals.css` — CSS drives
 * hover/focus transitions, this file drives JS-orchestrated animation. Change
 * one, change the other; they describe the same motion language.
 */

/** Seconds, because Framer Motion works in seconds while CSS works in ms. */
export const duration = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  premium: 0.7,
} as const;

/** Cubic-bézier control points, in Framer's array form. */
export const easing = {
  standard: [0.4, 0, 0.2, 1],
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
  premium: [0.19, 1, 0.22, 1],
} as const satisfies Record<string, [number, number, number, number]>;

/** Delay between children in a staggered group. */
export const stagger = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.14,
} as const;

/** Distance travelled by slide/reveal animations, in pixels. */
export const travel = {
  sm: 12,
  md: 24,
  lg: 48,
} as const;

/** Viewport trigger shared by every scroll-linked animation. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
