"use client";

import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TooltipProps {
  /** Short text only. Anything longer belongs in the page, not a tooltip. */
  content: string;
  /** The trigger. Must be a single focusable element for keyboard users. */
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const sideClasses = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
} as const;

/**
 * CSS-driven tooltip: shows on hover and on keyboard focus, with the trigger
 * wired to it through `aria-describedby`.
 *
 * ponytail: positioning is static — no collision detection against the
 * viewport. Fine for the icon buttons and spec labels this is built for; if a
 * tooltip ever needs to flip near an edge, that is the moment to reach for a
 * positioning library, not before.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const id = useId();

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": id,
      })
    : children;

  return (
    <span className="group/tooltip relative inline-flex">
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-tooltip w-max max-w-56 rounded-button bg-primary px-3 py-1.5",
          "font-sans text-caption text-primary-foreground shadow-md",
          "opacity-0 transition-fast group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          sideClasses[side],
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
