"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import {
  fade,
  fadeUp,
  imageReveal,
  reveal,
  scaleIn,
  slideIn,
  staggerContainer,
  stagger,
} from "@/animations";

/**
 * Thin wrappers around Framer Motion so pages never write animation code.
 *
 * Every wrapper reads its variants from `src/animations` — the motion language
 * is a token, not a per-component decision. When the user prefers reduced
 * motion each wrapper renders a plain `<div>`, so content still appears
 * instantly instead of animating at 0.01s.
 */

/**
 * Framer Motion redefines the drag and animation event handlers, so those
 * native props are dropped to keep the two prop sets compatible.
 */
type MotionDivProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

export interface MotionProps extends MotionDivProps {
  /** Seconds to wait before animating. Use for hand-tuned sequences. */
  delay?: number;
  /** `viewport` animates on scroll into view, `mount` animates immediately. */
  trigger?: "viewport" | "mount";
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
}

/** Merges a delay into a variant without discarding its own transition. */
function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible as TargetAndTransition;

  return {
    ...variants,
    visible: { ...visible, transition: { ...visible.transition, delay } },
  };
}

interface AnimatedProps extends MotionProps {
  variants: Variants;
}

function Animated({
  variants,
  delay = 0,
  trigger = "viewport",
  once = true,
  amount = 0.25,
  children,
  ...props
}: AnimatedProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <div {...props}>{children}</div>;

  const resolved = withDelay(variants, delay);

  return (
    <motion.div
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once, amount } })}
      variants={resolved}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn(props: MotionProps) {
  return <Animated variants={fade} {...props} />;
}

export function SlideUp(props: MotionProps) {
  return <Animated variants={fadeUp} {...props} />;
}

export function ScaleIn(props: MotionProps) {
  return <Animated variants={scaleIn} {...props} />;
}

/** Editorial masked reveal — the content wipes up from behind its own baseline. */
export function Reveal(props: MotionProps) {
  return <Animated variants={reveal} {...props} />;
}

/**
 * Photography reveal — the frame is uncovered rather than moved. Use on large
 * editorial images; `SlideUp` on a 700px photograph reads as a wobble.
 *
 * Renders the children untouched and slides a panel off them, rather than
 * animating the image's own `clip-path`. Framer does not animate `clip-path`
 * reliably in this project — the first implementation left every large
 * photograph stuck at its hidden value — and a transform is what the rest of
 * the motion system already depends on.
 */
export function ImageReveal({
  className,
  children,
  delay = 0,
  once = true,
  amount = 0.15,
  ...props
}: MotionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {children}
      <motion.div
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={withDelay(imageReveal, delay)}
        className="pointer-events-none absolute inset-0 bg-background"
      />
    </div>
  );
}

export interface SlideInProps extends MotionProps {
  from?: "left" | "right" | "up" | "down";
}

export function SlideIn({ from = "up", ...props }: SlideInProps) {
  return <Animated variants={slideIn(from)} {...props} />;
}

export interface StaggerProps extends MotionProps {
  /** Seconds between each child. Defaults to the `normal` stagger token. */
  step?: number;
}

/**
 * Animates direct `<StaggerItem>` children in sequence.
 * The parent owns the timing; children only declare what they animate.
 */
export function Stagger({
  step = stagger.normal,
  delay = 0,
  trigger = "viewport",
  once = true,
  amount = 0.2,
  children,
  ...props
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <div {...props}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once, amount } })}
      variants={staggerContainer(delay, step)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends MotionDivProps {
  /** Motion applied to each item. Defaults to a fade-up. */
  variant?: "fade" | "fadeUp" | "scale";
}

const itemVariants = { fade, fadeUp, scale: scaleIn } as const;

export function StaggerItem({ variant = "fadeUp", children, ...props }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <div {...props}>{children}</div>;

  return (
    <motion.div variants={itemVariants[variant]} {...props}>
      {children}
    </motion.div>
  );
}
