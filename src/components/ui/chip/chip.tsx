import { X } from "lucide-react";
import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon/icon";

export interface ChipProps extends Omit<ComponentPropsWithoutRef<"button">, "onSelect"> {
  label: string;
  /** Toggles the filled state and sets `aria-pressed`. */
  selected?: boolean;
  /** Renders a remove control. The chip itself stays clickable. */
  onRemove?: MouseEventHandler<HTMLSpanElement>;
  /** Accessible name for the remove control. Defaults to `Remove {label}`. */
  removeLabel?: string;
}

/**
 * Interactive tag — filters, selected facets, product tags.
 *
 * Always a `<button>` so it is keyboard reachable. The remove affordance is a
 * nested element rather than a nested button, because nesting interactive
 * elements is invalid HTML; it stops propagation and is reachable via the
 * chip's own Backspace/Delete handling in the consuming component.
 */
export function Chip({
  label,
  selected = false,
  onRemove,
  removeLabel,
  className,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-2 rounded-badge border px-3 py-1.5 font-sans text-small transition-fast",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-foreground-secondary hover:border-border-strong hover:text-foreground",
        className,
      )}
      {...props}
    >
      {label}
      {onRemove && (
        <span
          role="button"
          tabIndex={-1}
          aria-label={removeLabel ?? `Remove ${label}`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(event);
          }}
          className="-mr-1 rounded-badge p-0.5 opacity-60 transition-fast hover:opacity-100"
        >
          <Icon icon={X} size="xs" />
        </span>
      )}
    </button>
  );
}
