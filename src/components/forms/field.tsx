"use client";

import { createContext, useContext, useId, type ReactNode } from "react";
import { Record } from "@/components/ui/typography";
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
      {/* §38.3: between fields, S3. The label sits S1 above its own field. */}
      <div className={cn("flex flex-col gap-s1", className)}>
        <label htmlFor={id} className={cn("font-sans text-r font-medium", hideLabel && "sr-only")}>
          {label}
          {/*
            §38.3: every field is required unless marked "optional" in words at
            rank C. An asterisk is a symbol where a word fits (§43.2), so the
            mark is on the exception rather than on the rule.
          */}
          {!required && <span className="ml-1 font-regular text-c text-ink-secondary">optional</span>}
        </label>

        {description && (
          <Record id={descriptionId} rank="c" tone="secondary" as="p">
            {description}
          </Record>
        )}

        {children}

        {/*
          §38.4: Oxide text at rank C below the field, plus the field's hairline
          at Oxide, plus a word — hue is never the only carrier (§15.2).
        */}
        {error && (
          <p id={errorId} role="alert" className="font-sans text-c text-oxide">
            {error}
          </p>
        )}
      </div>
    </FieldContext>
  );
}

/**
 * §38.3, fixed: a 1px hairline **underneath only** — no box, no fill, no
 * radius, because §16.4 encloses nothing on four sides. Height 48px, matching
 * the action and clearing the touch target at §47.5.
 *
 * There is no placeholder styling because §38.3 removes the placeholder: "it
 * vanishes at the moment of use and cannot be checked afterwards; it is a label
 * that hides."
 */
export const controlClasses = [
  "w-full min-h-12 border-0 border-b border-hairline bg-transparent px-0 py-s1",
  "font-sans text-b text-ink motion-mark",
  "hover:border-ink-secondary",
  "aria-invalid:border-oxide",
].join(" ");
