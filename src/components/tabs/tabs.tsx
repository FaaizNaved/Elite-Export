"use client";

import { motion } from "framer-motion";
import { useId, useRef, useState, type ReactNode } from "react";
import { duration, easing } from "@/animations";
import { cn } from "@/lib/cn";

export interface TabItem {
  /** Stable key, also used in the generated ARIA ids. */
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: readonly TabItem[];
  /** Uncontrolled starting tab. Defaults to the first enabled item. */
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  label: string;
  className?: string;
}

/**
 * Accessible tabs following the WAI-ARIA tabs pattern.
 *
 * Roving tabindex: exactly one tab is in the tab order, and arrow keys move
 * between them (Home/End jump to the ends). Panels are only rendered when
 * active, so heavy content is not built until it is needed.
 */
export function Tabs({
  items,
  defaultValue,
  orientation = "horizontal",
  label,
  className,
}: TabsProps) {
  const enabled = items.filter((item) => !item.disabled);
  const [active, setActive] = useState(defaultValue ?? enabled[0]?.value ?? "");
  const baseId = useId();
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeItem = items.find((item) => item.value === active);
  const isVertical = orientation === "vertical";

  const focusTab = (value: string) => {
    setActive(value);
    tabRefs.current.get(value)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as const;
    const forwardKey = isVertical ? "ArrowDown" : "ArrowRight";
    const backKey = isVertical ? "ArrowUp" : "ArrowLeft";

    if (event.key !== forwardKey && event.key !== backKey && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();

    if (event.key === "Home") return focusTab(enabled[0].value);
    if (event.key === "End") return focusTab(enabled[enabled.length - 1].value);

    const delta = next[event.key as keyof typeof next];
    const position = enabled.findIndex((item) => item.value === items[index]?.value);
    const target = enabled[(position + delta + enabled.length) % enabled.length];
    focusTab(target.value);
  };

  return (
    <div className={cn(isVertical ? "flex gap-8" : "flex flex-col gap-8", className)}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        className={cn(
          "relative",
          isVertical
            ? "flex shrink-0 flex-col gap-1 border-l border-border"
            : "flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {items.map((item, index) => {
          const selected = item.value === active;

          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) tabRefs.current.set(item.value, node);
                else tabRefs.current.delete(item.value);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setActive(item.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "relative shrink-0 px-4 py-3 font-sans text-small whitespace-nowrap transition-fast",
                "disabled:pointer-events-none disabled:opacity-40",
                selected ? "text-foreground" : "text-foreground-secondary hover:text-foreground",
                isVertical && "text-left",
              )}
            >
              {item.label}

              {selected && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  aria-hidden
                  transition={{ duration: duration.normal, ease: [...easing.entrance] }}
                  className={cn(
                    "absolute bg-accent",
                    isVertical ? "inset-y-0 -left-px w-px" : "inset-x-0 -bottom-px h-px",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {activeItem && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeItem.value}`}
          aria-labelledby={`${baseId}-tab-${activeItem.value}`}
          tabIndex={0}
          className="flex-1"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
