import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about our custom theme scale names.
 *
 * Without this it cannot tell `text-caption` (a font size) from
 * `text-primary-foreground` (a colour) — it treats them as conflicting `text-*`
 * utilities and silently drops the one declared first, which makes button and
 * badge labels inherit the body colour instead of their variant colour.
 *
 * Every custom scale that shares a utility prefix with a built-in Tailwind
 * group is registered here.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "hero",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "small",
            "caption",
            "overline",
            "button",
          ],
        },
      ],
      rounded: [{ rounded: ["button", "input", "card", "image", "badge"] }],
      shadow: [{ shadow: ["floating"] }],
      "max-w": [{ "max-w": ["narrow", "content", "wide"] }],
      // The transition-*property* group — not `transition-behavior`, which is
      // where Tailwind's own `transition-normal`/`transition-discrete` live.
      transition: [{ transition: ["fast", "base", "slow", "premium"] }],
      z: [{ z: ["base", "raised", "sticky", "dropdown", "overlay", "modal", "tooltip", "toast"] }],
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
