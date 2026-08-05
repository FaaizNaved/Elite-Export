"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface StickyCtaProps {
  children: ReactNode;
  /** Reveals the bar once this element has scrolled out of view. */
  after?: React.RefObject<HTMLElement | null>;
  /** Fallback trigger when no `after` element is given. */
  threshold?: number;
  /** Hidden once this element is reached — usually the footer's own CTA. */
  hideAfter?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Slide-up bar that keeps the primary action reachable on long pages.
 *
 * Purely a positioning helper: the caller supplies the buttons, so it works for
 * an enquiry CTA, a download or anything else.
 */
export function StickyCta({ children, after, threshold = 800, hideAfter, className }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const passedTrigger = after?.current
        ? after.current.getBoundingClientRect().bottom < 0
        : window.scrollY > threshold;

      const reachedEnd = hideAfter?.current
        ? hideAfter.current.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(passedTrigger && !reachedEnd);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [after, hideAfter, threshold]);

  return (
    <div
      ref={barRef}
      // `inert`, not `aria-hidden`. The bar is only translated and faded out, so
      // its buttons stayed in the tab order — a keyboard user reached an
      // invisible enquiry link, and `aria-hidden` over a focusable child is an
      // ARIA violation in its own right. `inert` removes the subtree from the
      // tab order and the accessibility tree together.
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-sticky border-t border-border bg-surface/90 backdrop-blur-md",
        "transition-base",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        className,
      )}
    >
      <div className="mx-auto flex max-w-wide items-center justify-between gap-4 px-6 py-4">
        {children}
      </div>
    </div>
  );
}
