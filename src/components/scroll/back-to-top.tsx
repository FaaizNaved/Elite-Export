"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export interface BackToTopProps {
  /** Pixels scrolled before the button appears. */
  threshold?: number;
  label?: string;
  className?: string;
}

/**
 * Appears once the user is well down the page.
 *
 * Uses `window.scrollTo` rather than a Lenis instance so the component stays
 * usable with or without smooth scrolling installed; Lenis picks up native
 * scrolls when it is mounted.
 */
export function BackToTop({ threshold = 600, label = "Back to top", className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label={label}
      // Hidden from the tab order while off-screen, so keyboard users don't
      // land on an invisible control.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-6 bottom-6 z-sticky inline-flex size-11 items-center justify-center",
        "rounded-badge bg-primary text-primary-foreground shadow-lg transition-base",
        "hover:bg-accent hover:text-accent-foreground",
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        className,
      )}
    >
      <Icon icon={ArrowUp} size="sm" />
    </button>
  );
}
