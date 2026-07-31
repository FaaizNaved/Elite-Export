import type { ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export interface TimelineEntry {
  /** Year, date or stage number — whatever anchors the entry. */
  marker: string;
  title: string;
  description?: string;
  /** Anything extra: an image, a badge, a stat. */
  children?: ReactNode;
}

export interface TimelineProps {
  entries: readonly TimelineEntry[];
  /**
   * `vertical` stacks entries on one rail, `alternating` zig-zags them either
   * side of a centre rail (desktop only), `horizontal` scrolls sideways.
   */
  variant?: "vertical" | "alternating" | "horizontal";
  className?: string;
}

/**
 * Company milestones, manufacturing stages, certification history.
 *
 * Rendered as an ordered list so the sequence is conveyed structurally rather
 * than only visually; the rail and dots are decorative.
 */
export function Timeline({ entries, variant = "vertical", className }: TimelineProps) {
  if (variant === "horizontal") {
    return (
      <ol
        className={cn(
          "flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {entries.map((entry) => (
          <li
            key={entry.marker + entry.title}
            className="w-72 shrink-0 snap-start border-t border-border pt-5"
          >
            <span aria-hidden className="mb-4 block size-2.5 rotate-45 bg-accent" />
            <EntryBody entry={entry} />
          </li>
        ))}
      </ol>
    );
  }

  const alternating = variant === "alternating";

  return (
    <ol
      className={cn(
        "relative",
        // The rail: centred when alternating, left-aligned otherwise.
        alternating
          ? "before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border md:before:left-1/2"
          : "before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border",
        className,
      )}
    >
      {entries.map((entry, index) => {
        // On desktop the alternating layout puts odd entries in the left half
        // (rail on their right edge) and even entries in the right half.
        const leftSide = alternating && index % 2 === 0;
        const rightSide = alternating && index % 2 === 1;

        return (
          <li
            key={entry.marker + entry.title}
            className={cn(
              "relative pb-12 pl-12 last:pb-0",
              alternating && "md:w-1/2 md:pl-0",
              leftSide && "md:pr-12 md:text-right",
              rightSide && "md:ml-auto md:pl-12",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 left-4 block size-2.5 -translate-x-1/2 rotate-45 bg-accent",
                leftSide && "md:left-full",
                rightSide && "md:left-0",
              )}
            />
            <EntryBody entry={entry} />
          </li>
        );
      })}
    </ol>
  );
}

function EntryBody({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="overline" className="text-accent">
        {entry.marker}
      </Typography>
      <Typography variant="h4" as="h3">
        {entry.title}
      </Typography>
      {entry.description && <Typography variant="body">{entry.description}</Typography>}
      {entry.children}
    </div>
  );
}
