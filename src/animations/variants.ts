import type { Transition, Variants } from "framer-motion";
import { duration, easing, stagger, travel } from "./tokens";

/**
 * Reusable Framer Motion variants.
 *
 * Phase 5 wraps these in `<FadeIn>`, `<Reveal>`, `<Stagger>` components; they
 * live here so the motion language stays a token, not a per-component decision.
 * Every variant animates only `opacity`, `transform` and `clip-path` — the
 * properties the compositor can handle without layout work.
 */

const transition = (
  seconds: number = duration.slow,
  ease: readonly number[] = easing.entrance,
): Transition => ({ duration: seconds, ease: [...ease] as [number, number, number, number] });

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition() },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: travel.md },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const slideIn = (from: "left" | "right" | "up" | "down" = "up"): Variants => {
  const distance = travel.lg * (from === "left" || from === "up" ? -1 : 1);
  const horizontal = from === "left" || from === "right";

  return {
    hidden: horizontal ? { opacity: 0, x: distance } : { opacity: 0, y: distance },
    visible: horizontal
      ? { opacity: 1, x: 0, transition: transition() }
      : { opacity: 1, y: 0, transition: transition() },
  };
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition(duration.normal) },
};

/** Editorial masked reveal — the text wipes up from behind its own baseline. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: "40%", clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: "0%",
    clipPath: "inset(0 0 0% 0)",
    transition: transition(duration.premium, easing.premium),
  },
};

/** Parent variant: children with `hidden`/`visible` animate in sequence. */
export const staggerContainer = (delayChildren = 0, step: number = stagger.normal): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren } },
});

/** Counter/marquee are timing configs rather than variants — the components in
 *  Phase 5 read them so their pacing matches everything else. */
export const counter = {
  duration: 1.8,
  ease: easing.standard,
} as const;

export const marquee = {
  /** Pixels per second. Slow enough to read, fast enough to feel alive. */
  speed: 40,
  ease: "linear",
} as const;
