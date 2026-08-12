import { Record } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/action";
import { cn } from "@/lib/cn";

/**
 * The sibling index — Master Implementation Blueprint §11.1, UX Blueprint
 * R37.8.
 *
 *   > Secondary navigation exists only within a surface that has depth —
 *   > Products, Technology, Journal, and the chapter set of Manufacturing. It
 *   > lists siblings and the route up. **It never lists the whole site again.**
 *
 * It disappears on any surface without real depth (§11.1). It is not a
 * recommendation and never becomes one: R38.2 removes "you may also like" and
 * "related products", and R38.3 says a fact links once per surface.
 *
 * The current entry is listed and marked, not omitted — a record that hides
 * where you are is a record with a gap in it — and it is not a link, because a
 * link to the surface you are on is a route to nowhere.
 */
export interface SiblingIndexItem {
  href: string;
  label: string;
}

export interface SiblingIndexProps {
  /** The route up. R37.8: siblings **and** the route up, not one or the other. */
  parent: SiblingIndexItem;
  siblings: readonly SiblingIndexItem[];
  /** The href of the surface being viewed, if it is one of the siblings. */
  current?: string;
  className?: string;
}

export function SiblingIndex({ parent, siblings, current, className }: SiblingIndexProps) {
  if (siblings.length === 0) return null;

  return (
    <nav aria-label={`Within ${parent.label}`} className={cn("flex flex-col gap-s2", className)}>
      <Record rank="c" tone="secondary" weight="medium">
        <TextLink href={parent.href}>{parent.label}</TextLink>
      </Record>

      <ul className="flex flex-col gap-s1">
        {siblings.map((sibling) => {
          const isCurrent = sibling.href === current;

          return (
            <li key={sibling.href}>
              {isCurrent ? (
                <Record rank="r" aria-current="page">
                  {sibling.label}
                </Record>
              ) : (
                <Record rank="r" tone="secondary">
                  <TextLink href={sibling.href}>{sibling.label}</TextLink>
                </Record>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
