import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Derived from item count when omitted. */
  duration?: number;
  direction?: "left" | "right";
  /** Fades the leading and trailing edges into the background. */
  fadeEdges?: boolean;
  className?: string;
}

/**
 * Infinite horizontal ticker for logos, certifications or country names.
 *
 * Pure CSS — the track is duplicated once and translated by exactly 50%, so the
 * loop is seamless with no JS and no layout thrash. Pauses on hover and on
 * keyboard focus within, and stops entirely under reduced motion.
 */
export function Marquee({
  children,
  duration = 40,
  direction = "left",
  fadeEdges = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden",
        fadeEdges &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
        className={cn(
          "flex w-max animate-[marquee_linear_infinite]",
          "group-hover/marquee:[animation-play-state:paused]",
          "group-focus-within/marquee:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        {/* Duplicate is decorative: the first copy already carries the content. */}
        <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
