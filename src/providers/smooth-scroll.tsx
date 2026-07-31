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
 * Lenis drives the real scroll position, so `window.scrollY` listeners
 * (`Navbar`, `BackToTop`, `ScrollProgress`) keep working unchanged.
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
