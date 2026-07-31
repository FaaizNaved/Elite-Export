"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

export interface ScrollProgressProps {
  className?: string;
  /** Reading position of a specific element instead of the whole page. */
  target?: React.RefObject<HTMLElement | null>;
}

/**
 * Hairline progress bar for long documents.
 *
 * Decorative — the value is not announced, because a screen reader user gets
 * position from the document structure, not from a moving bar.
 */
export function ScrollProgress({ className, target }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    target ? { target, offset: ["start start", "end end"] } : undefined,
  );
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-sticky h-0.5 origin-left bg-accent",
        className,
      )}
    />
  );
}
