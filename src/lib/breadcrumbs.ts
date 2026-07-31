import { ROUTES, routeTo } from "../constants/routes";
import type { Breadcrumb, Category, Product, Subcategory } from "../types";
import { titleFromSlug } from "../utils/slug";

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

export function subcategoryBreadcrumbs(
  category: Pick<Category, "name" | "href">,
  subcategory: Pick<Subcategory, "name" | "href">,
): Breadcrumb[] {
  return buildBreadcrumbs([
    { label: "Products", href: ROUTES.products },
    { label: category.name, href: category.href },
    { label: subcategory.name, href: subcategory.href },
  ]);
}

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

/**
 * Last-resort generator for routes with no content entity behind them.
 * Pass `labels` to override any segment: `{ "buyer-enquiry": "Buyer Enquiry" }`.
 */
export function breadcrumbsFromPath(
  path: string,
  labels: Readonly<Record<string, string>> = {},
): Breadcrumb[] {
  const segments = path.split("/").filter(Boolean);

  return buildBreadcrumbs(
    segments.map((segment, index) => ({
      label: labels[segment] ?? titleFromSlug(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  );
}
