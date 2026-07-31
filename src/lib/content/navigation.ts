import type { MegaMenu } from "../../types";
import { getCatalog, getFeaturedProducts } from "./catalog";

/**
 * Builds the products mega menu from the catalog.
 *
 * Server-only, because it reads the content tree. Call it in a Server
 * Component and pass the result to `<Navbar megaMenu={…} />` — adding a
 * category or subcategory then updates the menu with no code change.
 */
export async function getProductsMegaMenu(): Promise<MegaMenu> {
  const { categories } = await getCatalog();
  const [featured] = await getFeaturedProducts(1);

  return {
    columns: categories.map((category) => ({
      label: category.name,
      href: category.href,
      links: category.subcategories.map((subcategory) => ({
        label: subcategory.name,
        href: subcategory.href,
        description: subcategory.shortDescription,
        external: false,
      })),
    })),
    feature: featured && {
      label: featured.title,
      href: featured.href,
      description: featured.shortDescription,
      image: featured.gallery.thumbnail,
    },
  };
}
