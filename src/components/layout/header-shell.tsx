"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The bar's behaviour on scroll.
 *
 * The original rule was that the bar leaves with the field, and the reason
 * given was §23.4's held moment: *persistent elements in view — zero*. A bar
 * that follows the visitor turns a held moment into an advertisement.
 *
 * That reason is honoured here rather than the rule. Three states:
 *
 *   at rest    Paper is the field's own; the bar carries no ground and no rule.
 *   returning  The reader is going back up. Paper, one hairline, nothing else.
 *   leaving    The reader is going down. **The bar leaves.**
 *
 * So during a held moment — which is always entered by scrolling down — there
 * is nothing in view but the moment, which is the guarantee §23.4 actually
 * asks for. What changes is that reaching the index no longer costs a journey
 * back to the top of a 7,000px document.
 *
 * One property changes per state and the change is a dissolve of the ground
 * plus the bar's own extent. Nothing under it moves: the bar is `sticky`, so it
 * occupies its space in the flow and the first screen is not composed around a
 * floating object.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"rest" | "returning" | "leaving">("rest");
  const previous = useRef(0);

  useEffect(() => {
    /* The threshold is the bar's own height: below it there is nothing to
       leave, and a bar that flickers on a two-pixel scroll is a mechanism. */
    const REST = 96;
    const STEP = 6;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - previous.current;

      if (y <= REST) setState("rest");
      else if (delta > STEP) setState("leaving");
      else if (delta < -STEP) setState("returning");

      if (Math.abs(delta) > STEP || y <= REST) previous.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-(--z-veil) w-full",
        "motion-panel transition-[background-color,border-color,translate]",
        "border-b",
        state === "rest" && "border-transparent bg-transparent",
        state === "returning" && "border-hairline bg-paper",
        state === "leaving" && "-translate-y-full border-transparent bg-paper",
      )}
    >
      {children}
    </header>
  );
}
