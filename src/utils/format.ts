import { DEFAULT_LOCALE } from "../constants/locale";

/** "12 March 2026" — stable across server and client because the locale is fixed. */
export function formatDate(
  value: Date | string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, { ...options, timeZone: "UTC" }).format(date);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE).format(value);
}

/** `formatCount(1, "Product")` → "1 Product"; `formatCount(4, "Product")` → "4 Products". */
export function formatCount(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`;
}

/** Rough reading time in minutes, at 200 wpm. Never returns 0. */
export function readingTimeOf(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
