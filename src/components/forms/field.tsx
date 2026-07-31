"use client";

import { createContext, useContext, useId, type ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

interface FieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * Wiring shared by every control: the generated id, the `aria-describedby`
 * pointing at description and error text, and the invalid flag.
 *
 * Controls call this instead of each re-implementing label association — which
 * is the part hand-rolled forms most often get wrong.
 */
export function useFieldProps() {
  const field = useContext(FieldContext);
  if (!field) return {};

  return {
    id: field.id,
    "aria-describedby": field.describedBy,
    "aria-invalid": field.invalid || undefined,
  };
}

export interface FieldProps {
  label: string;
  children: ReactNode;
  /** Helper text below the label. */
  description?: string;
  /** Validation message — usually `formState.errors.x?.message` from RHF. */
  error?: string;
  required?: boolean;
  /** Visually hides the label while keeping it available to screen readers. */
  hideLabel?: boolean;
  className?: string;
}

export function Field({
  label,
  children,
  description,
  error,
  required = false,
  hideLabel = false,
  className,
}: FieldProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const describedBy =
    [description && descriptionId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldContext value={{ id, describedBy, invalid: Boolean(error) }}>
      <div className={cn("flex flex-col gap-2", className)}>
        <label
          htmlFor={id}
          className={cn(
            "font-sans text-small font-medium",
            hideLabel && "sr-only",
          )}
        >
          {label}
          {required && (
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          )}
        </label>

        {description && (
          <Typography id={descriptionId} variant="caption" as="p">
            {description}
          </Typography>
        )}

        {children}

        {error && (
          <p id={errorId} role="alert" className="font-sans text-caption text-error">
            {error}
          </p>
        )}
      </div>
    </FieldContext>
  );
}

/** Shared surface styling for text-like controls. */
export const controlClasses = [
  "w-full rounded-input border border-border bg-surface px-4 py-3",
  "font-sans text-body text-foreground transition-fast",
  "placeholder:text-foreground-muted",
  "hover:border-border-strong",
  "aria-invalid:border-error",
  "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-60",
].join(" ");
