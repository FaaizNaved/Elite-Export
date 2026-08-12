"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
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

/**
 * §38.3 removes two things from this control, and both are removed from the
 * type rather than from the call sites:
 *
 * - **`placeholder`** — "it vanishes at the moment of use and cannot be checked
 *   afterwards; it is a label that hides." The label is always visible instead.
 * - **A leading icon** — §43.2 forbids an icon inside a container and as a
 *   substitute for a word, and §43.3 closes the set at four, none of which is
 *   a field adornment.
 */
export type InputProps = Omit<ComponentPropsWithoutRef<"input">, "placeholder">;

export function Input({ className, ...props }: InputProps) {
  const field = useFieldProps();

  return <input {...field} {...props} className={cn(controlClasses, className)} />;
}

/* ---------------------------------------------------------------- Textarea */

/** §38.3: no placeholder here either — the label is always visible. */
export type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "placeholder">;

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
        className={cn(controlClasses, "appearance-none pr-4", className)}
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

      {/*
        No chevron. §43.3 closes the icon list at four and none of them is a
        disclosure caret on a select; §43.2 forbids an icon beside a control as
        decoration. The native select draws its own affordance, which is the
        one every visitor already knows.
      */}
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
        className="mt-0.5 size-5 shrink-0 accent-ink"
      />
      <span className="font-sans text-r text-ink-secondary">{label}</span>
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
            className="size-5 shrink-0 accent-ink"
          />
          <span className="font-sans text-r text-ink-secondary">{option.label}</span>
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
          "relative h-6 w-11 shrink-0 rounded-full bg-hairline motion-mark",
          "peer-checked:bg-ink",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
          // The knob is a descendant, not a sibling of the input, so it is
          // targeted through the track.
          "peer-checked:[&>span]:translate-x-5",
        )}
      >
        <span className="absolute top-1 left-1 size-4 rounded-full bg-paper motion-mark" />
      </span>
      <span className="font-sans text-r text-ink-secondary">{label}</span>
    </label>
  );
}
