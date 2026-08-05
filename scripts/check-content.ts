import assert from "node:assert/strict";
import { mainNav } from "../src/config/navigation";
import { productBreadcrumbs, subcategoryBreadcrumbs } from "../src/lib/breadcrumbs";
import {
  contentRegistry,
  getBlogPosts,
  getCatalog,
  getCompanyPages,
  getFaqs,
  getGalleryAlbums,
  getHomeContent,
  getLegalPages,
  getMachines,
  getProduct,
  getProductRoutes,
  getProductsMegaMenu,
  getRelatedProducts,
  getTestimonials,
} from "../src/lib/content";
import { isActivePath } from "../src/lib/navigation";
import { productMetadata } from "../src/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "../src/lib/seo";

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

    // Assets: content names images relatively, the resolver turns them into
    // paths under the product's own folder.
    const expectedBase = `/images/products/${route.category}/${route.subcategory}/${route.product}/`;
    for (const image of [product.gallery.thumbnail, ...product.gallery.images]) {
      assert.ok(
        image.src.startsWith(expectedBase),
        `${product.slug}: "${image.src}" was not resolved into ${expectedBase}`,
      );
    }
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
  assert.ok(mainNav.some((item) => item.megaMenu === "products"));
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

  // Editorial content, machinery, gallery and the singleton documents.
  const [companyPages, blogPosts, legalPages, machines, albums, faqs, testimonials, home] =
    await Promise.all([
      getCompanyPages(),
      getBlogPosts(),
      getLegalPages(),
      getMachines(),
      getGalleryAlbums(),
      getFaqs(),
      getTestimonials(),
      getHomeContent(),
    ]);

  assert.ok(companyPages.length > 0, "no company pages were loaded");
  assert.ok(blogPosts.every((post) => post.readingTime > 0), "reading time was not computed");
  assert.ok(legalPages.every((page) => page.updatedAt instanceof Date));
  assert.ok(machines.length > 0, "no machines were loaded");
  assert.ok(
    albums.every((album) => album.images.length > 0),
    "a gallery album has no images",
  );
  assert.ok(faqs.length > 0 && testimonials.length > 0, "singleton collections are empty");

  // Home is assembled from one file per section; every section the page reads
  // must be present after composition.
  assert.ok(home.hero.heading.length > 0, "home hero did not load");
  assert.ok(home.intro.body.length > 0, "home company body did not load");
  assert.ok(home.pause.image.src.length > 0, "home pause image did not load");
  assert.ok(home.cta.primaryCta.href.length > 0, "home CTA did not load");
  for (const key of ["categories", "manufacturing", "quality", "origin"]) {
    assert.ok(home.sections[key]?.heading, `home section "${key}" is missing after composition`);
  }

  // Registry: the facade and the loaders must agree, or one of them is stale.
  assert.equal((await contentRegistry.products.list()).length, products.length);
  assert.equal((await contentRegistry.machines.list()).length, machines.length);
  assert.equal((await contentRegistry.pages.list()).length, companyPages.length);
  assert.ok(await contentRegistry.machines.exists(machines[0].slug));
  assert.ok(!(await contentRegistry.machines.exists("no-such-machine")));
  assert.equal((await contentRegistry.machines.find("no-such-machine")), null);
  assert.equal((await contentRegistry.home.get()).hero.heading, home.hero.heading);

  // Facts register (blueprint §0): the home page must not author figures.
  // Anything countable is derived from config or the catalogue at render time.
  const homeJson = JSON.stringify(home);
  for (const forbidden of ["40,000", "40000", "45,000", "AQL", "0.4%", "MOQ"]) {
    assert.ok(
      !homeJson.includes(forbidden),
      `home content contains the unverified figure "${forbidden}" — see the facts register`,
    );
  }

  // Every machine resolves from its own route.
  assert.equal(new Set(machines.map((machine) => machine.href)).size, machines.length);

  console.log(
    `✓ content OK — ${categories.length} categories, ` +
      `${categories.reduce((n, c) => n + c.subcategories.length, 0)} subcategories, ` +
      `${products.length} products, ${machines.length} machines, ${albums.length} albums, ` +
      `${blogPosts.length} posts, ${companyPages.length} company pages, ` +
      `${legalPages.length} legal pages, ${faqs.length} FAQs`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
