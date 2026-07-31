"use client";

import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { COUNTRIES } from "@/utils/country";
import { controlClasses, useFieldProps } from "./field";

/**
 * Text-like and boolean form controls.
 *
 * Each is a thin, styled wrapper over the native element, so React Hook Form's
 * `register()` spreads straight on:
 *
 *   <Field label="Company"><Input {...register("company")} /></Field>
 *
 * Native elements also give us mobile keyboards, autofill and the platform's
 * own accessibility for free.
 */

/* ------------------------------------------------------------------- Input */

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  /** Decorative adornment inside the field, e.g. a search icon. */
  leadingIcon?: ReactNode;
}

export function Input({ className, leadingIcon, ...props }: InputProps) {
  const field = useFieldProps();

  if (!leadingIcon) {
    return <input {...field} {...props} className={cn(controlClasses, className)} />;
  }

  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute top-1/2 left-4 -translate-y-1/2 text-foreground-muted"
      >
        {leadingIcon}
      </span>
      <input {...field} {...props} className={cn(controlClasses, "pl-11", className)} />
    </div>
  );
}

/* ---------------------------------------------------------------- Textarea */

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className, rows = 5, ...props }: TextareaProps) {
  const field = useFieldProps();
  return (
    <textarea
      {...field}
      rows={rows}
      {...props}
      className={cn(controlClasses, "resize-y", className)}
    />
  );
}

/* ------------------------------------------------------------------ Select */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  options: readonly SelectOption[];
  /** Shown as a disabled first option when the field is empty. */
  placeholder?: string;
}

export function Select({ options, placeholder, className, ...props }: SelectProps) {
  const field = useFieldProps();

  return (
    <div className="relative">
      <select
        {...field}
        {...props}
        className={cn(controlClasses, "appearance-none pr-11", className)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      <Icon
        icon={ChevronDown}
        size="sm"
        tone="muted"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
      />
    </div>
  );
}

/* ---------------------------------------------------------- Country select */

export type CountrySelectProps = Omit<SelectProps, "options">;

/** Every ISO country, sorted by name, with an emoji flag. */
export function CountrySelect({ placeholder = "Select a country", ...props }: CountrySelectProps) {
  return (
    <Select
      placeholder={placeholder}
      options={COUNTRIES.map((country) => ({
        value: country.code,
        label: `${country.flag}  ${country.name}`,
      }))}
      {...props}
    />
  );
}

/* -------------------------------------------------------------- Checkbox */

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label: ReactNode;
}

/**
 * Checkbox and switch render their own label, because the control and its text
 * form a single click target — unlike text inputs, which use `Field`'s label.
 */
export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input
        type="checkbox"
        {...props}
        className="mt-0.5 size-5 shrink-0 rounded-[4px] border-border accent-primary"
      />
      <span className="font-sans text-small text-foreground-secondary">{label}</span>
    </label>
  );
}

/* ------------------------------------------------------------------ Radio */

export interface RadioGroupProps {
  name: string;
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: ComponentPropsWithoutRef<"input">["onChange"];
  legend: string;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  legend,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            name={name}
            value={option.value}
            disabled={option.disabled}
            defaultChecked={defaultValue === option.value}
            {...(value !== undefined ? { checked: value === option.value } : {})}
            onChange={onChange}
            className="size-5 shrink-0 border-border accent-primary"
          />
          <span className="font-sans text-small text-foreground-secondary">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

/* ----------------------------------------------------------------- Switch */

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label: ReactNode;
}

export function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-3", className)}>
      {/* A real checkbox stays underneath: keyboard, form submission and
          assistive technology all keep working; only the visuals change. */}
      <input type="checkbox" role="switch" {...props} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-badge bg-border-strong transition-fast",
          "peer-checked:bg-primary",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
          // The knob is a descendant, not a sibling of the input, so it is
          // targeted through the track.
          "peer-checked:[&>span]:translate-x-5",
        )}
      >
        <span className="absolute top-1 left-1 size-4 rounded-badge bg-surface transition-base" />
      </span>
      <span className="font-sans text-small text-foreground-secondary">{label}</span>
    </label>
  );
}
