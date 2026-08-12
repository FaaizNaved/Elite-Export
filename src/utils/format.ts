import { DEFAULT_LOCALE } from "../constants/locale";

/** "12 March 2026" — stable across server and client because the locale is fixed. */
export function formatDate(
  value: Date | string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, { ...options, timeZone: "UTC" }).format(date);
}

