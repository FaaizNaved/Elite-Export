import type { MegaMenu } from "../../types";
import { getCatalog } from "./catalog";

/**
 * Builds the products mega menu from the catalog.
 *
 * Server-only, because it reads the content tree. Call it in a Server
 * Component and pass the result to `<Navbar megaMenu={…} />` — adding a
 * category or subcategory then updates the menu with no code change.
 */
export async function getProductsMegaMenu(): Promise<MegaMenu> {
  const { categories } = await getCatalog();

  return {
    columns: categories.map((category) => ({
      label: category.name,
      href: category.href,
      // Empty subcategories are dropped. Their link is an anchor on the
      // category page, and that page only renders a band for a subcategory
      // that has products — so listing an empty one puts a dead jump in the
      // primary navigation. A subcategory reappears the moment it has stock.
      links: category.subcategories
        .filter((subcategory) => subcategory.productCount > 0)
        .map((subcategory) => ({
          label: subcategory.name,
          href: subcategory.href,
          description: subcategory.shortDescription,
          external: false,
        })),
    })),
  };
}
