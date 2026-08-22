import type { Transition, Variants } from "framer-motion";
import { duration, easing, stagger, travel } from "../theme/motion";

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
  // 24px, not 48. Blueprint §15: heavy things move less, not more.
  const distance = travel.md * (from === "left" || from === "up" ? -1 : 1);
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

/**
 * Editorial masked reveal — the text wipes up from behind its own baseline.
 *
 * A pure translate. `<Reveal>` supplies the mask by clipping an
 * `overflow-hidden` wrapper, exactly as `<ImageReveal>` does, so nothing here
 * depends on animating `clip-path`.
 *
 * It *was* a `clipPath` inset, and it never animated once — the wrapper held
 * its hidden value forever and its content stayed invisible. That is the same
 * failure `imageReveal` hit and was rewritten to a transform to escape; this
 * variant kept the bug for longer only because nothing called it. Transforms
 * are what this project can rely on. Do not reintroduce `clip-path` here.
 *
 * 115%, not 100%: the glyphs have to start fully below the mask edge including
 * descenders, or the first frame shows the tail of every "g" already sitting in
 * the open.
 */
export const reveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: transition(duration.premium, easing.premium),
  },
};

/**
 * Photography reveal — the curtain that uncovers a frame, not the frame itself.
 *
 * Applied to a panel sitting over the image, which slides down and off. The
 * photograph never moves: a photograph that slides in is a slide, a photograph
 * that is uncovered is a print being laid down. On a 1000px frame a 24px drift
 * reads as a wobble, so travel is not an option here.
 *
 * This was originally a `clipPath` wipe, which is the obvious way to write it.
 * Framer never animated it — the element held its `hidden` value through the
 * whole page and the six largest photographs on the home page never appeared.
 * Transforms are what this codebase can rely on; see `ImageReveal`.
 */
export const imageReveal: Variants = {
  hidden: { y: "0%" },
  visible: {
    y: "100%",
    transition: transition(duration.premium, easing.premium),
  },
};

/**
 * Panel entrance for menus and dropdowns: a short drop with a fade, fast enough
 * that it never delays the pointer.
 */
export const panel: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: transition(duration.normal) },
  exit: { opacity: 0, y: -8, transition: transition(duration.fast) },
};

/** Parent variant: children with `hidden`/`visible` animate in sequence. */
export const staggerContainer = (delayChildren = 0, step: number = stagger.normal): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren } },
});
