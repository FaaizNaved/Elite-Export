"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { COUNTRIES, findCountry } from "@/utils/country";
import { controlClasses, useFieldProps } from "./field";

export interface PhoneValue {
  /** ISO 3166-1 alpha-2. */
  country: string;
  /** Digits only, without the dial code. */
  number: string;
  /** Ready to store or send: `+91 98765 43210` style. */
  e164: string;
}

export interface PhoneInputProps {
  name?: string;
  /** Controlled value. Omit for uncontrolled use with `defaultCountry`. */
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
  defaultCountry?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Dial-code selector plus a national number field.
 *
 * Emits a composed `PhoneValue`, so use it with React Hook Form's
 * `<Controller>` rather than `register()`.
 *
 * ponytail: no per-country format masking or validity checking — that needs a
 * metadata library (libphonenumber is ~150 KB). Validate server-side, and add
 * the library only if the enquiry funnel shows bad numbers getting through.
 */
export function PhoneInput({
  name,
  value,
  onChange,
  defaultCountry = "IN",
  placeholder = "Phone number",
  disabled = false,
  className,
}: PhoneInputProps) {
  const field = useFieldProps();
  const [internal, setInternal] = useState<PhoneValue>(() => compose(defaultCountry, ""));
  const current = value ?? internal;

  const dialCode = useMemo(() => findCountry(current.country)?.dialCode ?? "", [current.country]);

  const update = (next: PhoneValue) => {
    setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <select
        aria-label="Country dialling code"
        value={current.country}
        disabled={disabled}
        onChange={(event) => update(compose(event.target.value, current.number))}
        className={cn(controlClasses, "w-32 shrink-0 appearance-none px-3 text-small")}
      >
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} +{country.dialCode}
          </option>
        ))}
      </select>

      <input
        {...field}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        disabled={disabled}
        value={current.number}
        onChange={(event) =>
          update(compose(current.country, event.target.value.replace(/[^\d\s-]/g, "")))
        }
        className={cn(controlClasses, "flex-1")}
      />

      {/* Submitted value when the component is used inside a plain form. */}
      <input type="hidden" name={name ? `${name}_e164` : undefined} value={current.e164} readOnly />
      <span className="sr-only">Selected dialling code: +{dialCode}</span>
    </div>
  );
}

function compose(country: string, number: string): PhoneValue {
  const dialCode = findCountry(country)?.dialCode ?? "";
  const digits = number.replace(/\D/g, "");
  return { country, number, e164: digits ? `+${dialCode}${digits}` : "" };
}
