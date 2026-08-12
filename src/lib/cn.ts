import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about this system's scale names.
 *
 * Without it, `text-r` (a rank from Visual Design System §9.2) and `text-ink`
 * (a value from §15.1) look like two conflicting `text-*` utilities, and the
 * one declared first is silently dropped. The symptom is a record rendering at
 * body size — which is not a styling slip but a hierarchy error: §9.2 says R
 * "is a different job, not a lower rank", and losing it collapses the record
 * voice into the argument.
 *
 * Every group below is a scale declared in `globals.css` that shares a utility
 * prefix with a built-in Tailwind group. Scales the token source sets to
 * `initial` — radius, shadow, blur, z — need no entry, because there is nothing
 * left in them to conflict with (§16.3, §16.5), and the four duration bands are
 * reached through the `motion-*` utilities rather than through `duration-*`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      /** §9.2 — the seven ranks. */
      "font-size": [{ text: ["d", "t1", "t2", "t3", "b", "r", "c"] }],
      /** §27.2 — five containers, each the output of a measurement. */
      "max-w": [{ "max-w": ["reading", "record", "annotation", "field"] }],
    },
  },
});

/**
 * Merges class names, letting later Tailwind utilities win over earlier ones.
 * Every component funnels its `className` prop through this so callers can
 * override styling without fighting specificity.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
