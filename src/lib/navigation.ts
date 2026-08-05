import { ROUTES } from "../constants/routes";

/**
 * Client-safe navigation helpers.
 *
 * Structure lives in `src/config/navigation.ts`; menus derived from the catalog
 * are built in `src/lib/content/navigation.ts`. This module only answers
 * "which entry is active?", which is the one navigation question a client
 * component needs to ask.
 *
 * It must never import the content engine: `Navbar` and `MobileMenu` are client
 * components, and pulling `src/lib/content` in would drag `node:fs` into the
 * browser bundle.
 */

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

const normalize = (path: string) => {
  const withoutQuery = path.split(/[?#]/)[0];
  const trimmed = withoutQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};
