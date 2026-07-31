"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { counter as counterConfig, viewportOnce } from "@/animations";
import { DEFAULT_LOCALE } from "@/constants";
import { cn } from "@/lib/cn";

export interface CounterProps {
  /** The final value. Counting starts at `from`. */
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. Defaults to the shared counter timing token. */
  duration?: number;
  /** Decimal places to display. */
  decimals?: number;
  className?: string;
}

/**
 * Counts up when scrolled into view.
 *
 * The final value is always in the DOM for assistive technology and for users
 * who prefer reduced motion — the animation is decoration on top of real text,
 * never the only way to read the number.
 */
export function Counter({
  value,
  from = 0,
  prefix,
  suffix,
  duration = counterConfig.duration,
  decimals = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewportOnce);
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(from);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    const controls = animate(from, value, {
      duration,
      ease: [...counterConfig.ease],
      onUpdate: setAnimated,
    });

    return () => controls.stop();
  }, [inView, prefersReducedMotion, from, value, duration]);

  // The final value is rendered until the animation can actually run, so the
  // number is correct on the server, before hydration and under reduced motion.
  const display = !inView || prefersReducedMotion ? value : animated;

  const formatted = new Intl.NumberFormat(DEFAULT_LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
