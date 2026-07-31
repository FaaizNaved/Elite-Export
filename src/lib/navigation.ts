import { ROUTES } from "../constants/routes";
import { mainNav } from "../data/navigation/main-nav";
import type { NavItem } from "../types";

/**
 * Client-safe navigation helpers.
 *
 * This module must never import the content engine: `Navbar` and `MobileMenu`
 * are client components, and pulling `src/lib/content` in would drag `node:fs`
 * into the browser bundle. The catalog-derived mega menu lives in
 * `src/lib/content/navigation.ts` and is resolved on the server, then passed
 * down as a prop.
 */

export function getMainNav(): NavItem[] {
  return mainNav;
}

/**
 * Active-state matcher for nav links.
 *
 * `/products` is active on `/products/western-tack`, but `/` is only ever
 * active on `/` — otherwise every link would light up on the home page.
 */
export function isActivePath(currentPath: string, href: string, exact = false): boolean {
  const current = normalize(currentPath);
  const target = normalize(href);

  if (exact || target === ROUTES.home) return current === target;
  return current === target || current.startsWith(`${target}/`);
}

/** The top-level nav entry that owns the current route, if any. */
export function findActiveNavItem(items: readonly NavItem[], currentPath: string): NavItem | null {
  return (
    items.find(
      (item) =>
        isActivePath(currentPath, item.href) ||
        item.children.some((child) => isActivePath(currentPath, child.href)),
    ) ?? null
  );
}

const normalize = (path: string) => {
  const withoutQuery = path.split(/[?#]/)[0];
  const trimmed = withoutQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};
