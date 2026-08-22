"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { duration, easing } from "@/animations";

export interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis smooth scrolling for the whole document.
 *
 * Disabled entirely when the user prefers reduced motion — smooth scrolling is
 * a common trigger for motion sickness, and hijacking the scroll wheel is
 * exactly the kind of thing that setting exists to prevent.
 *
 * Lenis drives the real scroll position and emits native `scroll` events
 * sparsely rather than per frame, which is enough for the two things that
 * listen for them: `Navbar` and `BackToTop` both compare `scrollY` against a
 * threshold, so they only need an event after the threshold is crossed. Both
 * were verified against a real wheel gesture.
 *
 * Do NOT re-add a bridge that re-dispatches `scroll` on every Lenis tick.
 * Lenis listens for `scroll` itself, so dispatching one from inside its own
 * callback recurses until the stack overflows — it took down every page with a
 * "Maximum call stack size exceeded" the moment it shipped. If something ever
 * genuinely needs per-frame scroll position, subscribe it to Lenis directly.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: duration.premium * 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        // Touch devices already have excellent native inertia.
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export { easing as scrollEasing };
