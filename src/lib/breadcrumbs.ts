import { ROUTES, routeTo } from "../constants/routes";
import type { Breadcrumb, Category, Product } from "../types";

/**
 * Breadcrumb generation.
 *
 * `Home` is always the first crumb and the last crumb is always `current`, so
 * the UI never has to special-case either end.
 */

const HOME_CRUMB: Breadcrumb = { label: "Home", href: ROUTES.home, current: false };

export function buildBreadcrumbs(
  trail: ReadonlyArray<{ label: string; href: string }>,
): Breadcrumb[] {
  const crumbs = [HOME_CRUMB, ...trail.map((crumb) => ({ ...crumb, current: false }))];
  const last = crumbs[crumbs.length - 1];
  return [...crumbs.slice(0, -1), { ...last, current: true }];
}

export function categoryBreadcrumbs(category: Pick<Category, "name" | "href">): Breadcrumb[] {
  return buildBreadcrumbs([
    { label: "Products", href: ROUTES.products },
    { label: category.name, href: category.href },
  ]);
}

/**
 * The subcategory crumb points at a band on the category page, not a page of
 * its own — see `routeTo.subcategory`. It stays in the trail because it is
 * still how a buyer describes where they are ("western tack, headstalls"); only
 * the destination changed.
 */
export function productBreadcrumbs(product: Product): Breadcrumb[] {
  return buildBreadcrumbs([
    { label: "Products", href: ROUTES.products },
    { label: product.categoryName, href: routeTo.category(product.categorySlug) },
    {
      label: product.subcategoryName,
      href: routeTo.subcategory(product.categorySlug, product.subcategorySlug),
    },
    { label: product.title, href: product.href },
  ]);
}

