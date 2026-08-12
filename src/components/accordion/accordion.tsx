import type { ReactNode } from "react";
import { Mark } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  /** Stable key, and the grouping name when `type` is `single`. */
  value: string;
  title: string;
  content: ReactNode;
  /** Open on first render. */
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  /** `single` closes the open panel when another is opened. */
  type?: "single" | "multiple";
  /** Shared grouping name. Only meaningful when `type` is `single`. */
  name?: string;
  className?: string;
}

/**
 * Accordion built on native `<details>`/`<summary>`.
 *
 * No JavaScript and no client boundary: expand/collapse, keyboard support and
 * in-page find all work natively, and the content is present for search engines
 * even while collapsed. `type="single"` uses the `name` attribute, which makes
 * the group mutually exclusive in the browser itself.
 *
 * The open/close animation comes from `::details-content` (see globals.css);
 * browsers without it simply toggle instantly.
 */
export function Accordion({ items, type = "multiple", name, className }: AccordionProps) {
  const groupName = type === "single" ? (name ?? "accordion") : undefined;

  return (
    <div className={cn("divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item) => (
        <details
          key={item.value}
          name={groupName}
          open={item.defaultOpen}
          className="group/item accordion-item"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:hidden">
            <span className="font-sans text-r font-medium text-pretty">{item.title}</span>
            {/*
              The accordion state marker — one of the four marks §43.3 permits.
              It states open or closed positionally, and the word would repeat
              the row's own label. Plus becomes minus rather than rotating: a
              rotation is a movement with no cause the reader can see (M6).
            */}
            <Mark name="plus" className="shrink-0 text-ink-secondary group-open/item:hidden" />
            <Mark name="minus" className="hidden shrink-0 text-ink-secondary group-open/item:block" />
          </summary>

          <div className="pb-5 font-sans text-b text-ink-secondary text-pretty">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
