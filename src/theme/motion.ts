/**
 * Motion tokens — the JavaScript half of the theme layer.
 *
 * These mirror the `--duration-*` and `--ease-*` custom properties in
 * `src/app/globals.css`: CSS drives hover and focus transitions, this file
 * drives JS-orchestrated animation. Change one, change the other; they describe
 * the same motion language.
 *
 * Nothing here should be inlined in a component. If a component needs a timing
 * value that is not listed, add it here first.
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

/**
 * Distance travelled by slide/reveal animations, in pixels.
 *
 * Entrances use `md` (24px). Blueprint §15 reduced this from 48: a heavy,
 * expensive object does not leap into place, and the smaller distance reads as
 * more substantial, not less.
 */
export const travel = {
  sm: 12,
  md: 24,
  /** Reserved for deliberate long moves. Not used by entrance variants. */
  lg: 48,
} as const;

/** Viewport trigger shared by every scroll-linked animation. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;

/** Count-up pacing for animated statistics. */
export const counter = {
  duration: 1.8,
  ease: easing.standard,
} as const;

/** Marquee pacing. Slow enough to read, fast enough to feel alive. */
export const marquee = {
  /** Pixels per second. */
  speed: 40,
  ease: "linear",
} as const;

/**
 * Spring physics for values that track a continuous input rather than playing a
 * fixed animation — the reading-progress bar being the only one today.
 * Damped well past critical, so it settles without overshooting.
 */
export const spring = {
  progress: { stiffness: 180, damping: 30, restDelta: 0.001 },
} as const;
