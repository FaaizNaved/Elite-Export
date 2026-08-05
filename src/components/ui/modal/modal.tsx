"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../icon/icon";
import { Typography } from "../typography/typography";

/**
 * Modal shell, built on the native `<dialog>` element.
 *
 * `showModal()` gives focus trapping, Escape-to-close, background inertness and
 * the top-layer stacking context for free — all the parts a hand-rolled modal
 * usually gets wrong. This is deliberately a shell: content, forms and motion
 * are the caller's business.
 */

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Required — it becomes the dialog's accessible name. */
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Set false for flows that must be completed (rare). */
  dismissible?: boolean;
  className?: string;
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
} as const;

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  dismissible = true,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The background stays scrollable behind an open dialog by default.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onCancel={(event) => {
        if (!dismissible) event.preventDefault();
      }}
      onClick={(event) => {
        // A click landing on the dialog itself is a click on the backdrop:
        // the content sits inside the child element below.
        if (dismissible && event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "z-modal m-auto w-[calc(100%-2rem)] rounded-card bg-surface p-0 text-foreground shadow-floating",
        "backdrop:bg-overlay backdrop:backdrop-blur-overlay",
        sizes[size],
        className,
      )}
    >
      <div className="flex flex-col">
        <header className="flex items-start justify-between gap-6 border-b border-border p-6">
          <div className="flex flex-col gap-1.5">
            <Typography id={titleId} variant="h4" as="h2">
              {title}
            </Typography>
            {description && (
              <Typography id={descriptionId} variant="small" className="text-foreground-secondary">
                {description}
              </Typography>
            )}
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mt-1 -mr-1 rounded-button p-2 text-foreground-muted transition-fast hover:bg-surface-sunken hover:text-foreground"
            >
              <Icon icon={X} size="sm" />
            </button>
          )}
        </header>

        {children && <div className="p-6">{children}</div>}
        {footer && (
          <footer className="flex items-center justify-end gap-3 border-t border-border p-6">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  );
}
