import assert from "node:assert/strict";
import { faqs } from "../src/data/faqs";
import { testimonials } from "../src/data/testimonials";
import { productBreadcrumbs, subcategoryBreadcrumbs } from "../src/lib/breadcrumbs";
import {
  getBlogPosts,
  getCatalog,
  getCompanyPages,
  getLegalPages,
  getProduct,
  getProductRoutes,
  getProductsMegaMenu,
  getRelatedProducts,
} from "../src/lib/content";
import { getMainNav, isActivePath } from "../src/lib/navigation";
import { productMetadata } from "../src/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "../src/lib/structured-data";

/**
 * Loads every piece of content and asserts the engine's invariants.
 * Run with `npm run check:content`. Fails loudly on invalid frontmatter,
 * broken hierarchy, duplicate routes or a mis-wired derived value.
 */
async function main() {
  const { categories, products } = await getCatalog();

  assert.ok(categories.length > 0, "no categories were loaded");
  assert.ok(products.length > 0, "no products were loaded");

  // Hierarchy: every product resolves to a real category and subcategory,
  // and the derived counts add up.
  let counted = 0;
  for (const category of categories) {
    counted += category.subcategories.reduce((sum, sub) => sum + sub.productCount, 0);
    assert.equal(
      category.productCount,
      category.subcategories.reduce((sum, sub) => sum + sub.productCount, 0),
      `${category.slug}: productCount does not match its subcategories`,
    );
  }
  assert.equal(counted, products.length, "product counts do not add up to the catalog size");

  // Routing: hrefs are unique and resolve back to the same product.
  const routes = await getProductRoutes();
  assert.equal(new Set(routes.map((r) => `${r.category}/${r.subcategory}/${r.product}`)).size, routes.length);

  for (const route of routes) {
    const product = await getProduct(route);
    assert.ok(product, `route ${JSON.stringify(route)} did not resolve to a product`);
    assert.equal(product.href, `/products/${route.category}/${route.subcategory}/${route.product}`);
    assert.ok(product.gallery.thumbnail.alt.trim(), `${product.slug}: thumbnail alt was not backfilled`);
    assert.ok(
      product.gallery.images.every((image) => image.alt.trim()),
      `${product.slug}: a gallery image is missing alt text`,
    );
  }

  // Related products: never include the product itself, never repeat.
  for (const product of products) {
    const related = await getRelatedProducts(product, 3);
    assert.ok(
      related.every((candidate) => candidate.href !== product.href),
      `${product.slug}: related products include the product itself`,
    );
    assert.equal(new Set(related.map((r) => r.href)).size, related.length, "related products repeat");
  }

  // Breadcrumbs: Home first, current last, one crumb per level.
  const [first] = products;
  const crumbs = productBreadcrumbs(first);
  assert.equal(crumbs.length, 5, "product breadcrumbs should be Home → Products → Category → Sub → Product");
  assert.equal(crumbs[0].href, "/");
  assert.ok(crumbs.at(-1)?.current, "last breadcrumb must be marked current");
  assert.ok(crumbs.slice(0, -1).every((crumb) => !crumb.current));
  assert.equal(subcategoryBreadcrumbs(categories[0], categories[0].subcategories[0]).length, 4);

  // Navigation: the mega menu mirrors the catalog.
  const megaMenu = await getProductsMegaMenu();
  assert.equal(megaMenu.columns.length, categories.length);
  assert.ok(getMainNav().some((item) => item.megaMenu === "products"));
  assert.ok(isActivePath(first.href, "/products"), "/products should be active on a product page");
  assert.ok(!isActivePath(first.href, "/"), "home should not be active on a product page");
  assert.ok(!isActivePath("/products-archive", "/products"), "prefix match must respect segment boundaries");

  // SEO: metadata and JSON-LD build from real content.
  const metadata = productMetadata(first);
  assert.equal(metadata.title, first.seo?.title ?? first.title);
  assert.ok(String(metadata.alternates?.canonical).startsWith("http"), "canonical must be absolute");
  assert.equal(productJsonLd(first)["@type"], "Product");
  assert.equal(
    (breadcrumbJsonLd(crumbs).itemListElement as unknown[]).length,
    crumbs.length,
  );

  // Editorial content and static data.
  const [companyPages, blogPosts, legalPages] = await Promise.all([
    getCompanyPages(),
    getBlogPosts(),
    getLegalPages(),
  ]);
  assert.ok(companyPages.length > 0, "no company pages were loaded");
  assert.ok(blogPosts.every((post) => post.readingTime > 0), "reading time was not computed");
  assert.ok(legalPages.every((page) => page.updatedAt instanceof Date));
  assert.ok(faqs.length > 0 && testimonials.length > 0);

  console.log(
    `✓ content OK — ${categories.length} categories, ` +
      `${categories.reduce((n, c) => n + c.subcategories.length, 0)} subcategories, ` +
      `${products.length} products, ${blogPosts.length} posts, ` +
      `${companyPages.length} company pages, ${legalPages.length} legal pages`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
