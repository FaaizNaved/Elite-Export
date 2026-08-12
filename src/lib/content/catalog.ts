import { routeTo } from "../../constants/routes";
import { categoryMetaSchema, productFrontmatterSchema } from "../../models";
import type { Catalog, Category, Product, ProductRoute, Subcategory } from "../../types";
import { once } from "../../utils/cache";
import { withAlt, withAltAll } from "../../utils/image";
import { slugFromFilename } from "../../utils/slug";
import { assetScope, resolveImage, resolveImages } from "./assets";
/* R7.1: the shared comparators live once, in `./collection`. Both were declared
   again here, which is how two orderings of the same thing eventually differ. */
import { byOrderThenName, byOrderThenTitle } from "./collection";
import {
  CONTENT_DIR,
  ContentError,
  isPublished,
  listDirectories,
  listMdxFiles,
  readJsonFile,
  readMdxFile,
} from "./source";

/**
 * Builds the product catalog from the content tree.
 *
 * The hierarchy exists exactly once, as folders — a category owns its
 * subcategories, and a subcategory owns its products:
 *
 *   src/content/categories/<category>/category.json
 *   src/content/categories/<category>/<subcategory>/subcategory.json
 *   src/content/categories/<category>/<subcategory>/products/<product>.mdx
 *
 * Because the tree is walked top-down, a product cannot exist without the
 * category and subcategory that contain it, and category/subcategory are never
 * restated in frontmatter.
 *
 * ponytail: the depth is fixed at category → subcategory. If a category ever
 * needs to hold products directly, make `subcategorySlug` nullable here and in
 * `routeTo.product` — everything downstream reads those two.
 */

/** Folder inside a subcategory that holds its product documents. */
const PRODUCTS_DIR = "products";

async function loadProducts(
  categorySlug: string,
  subcategorySlug: string,
  categoryName: string,
  subcategoryName: string,
): Promise<Product[]> {
  const dir = `${CONTENT_DIR.categories}/${categorySlug}/${subcategorySlug}/${PRODUCTS_DIR}`;
  const files = await listMdxFiles(dir);

  const products = await Promise.all(
    files.map(async (fileName): Promise<Product> => {
      const { data, sourcePath } = await readMdxFile(
        `${dir}/${fileName}`,
        productFrontmatterSchema,
      );

      const slug = data.slug ?? slugFromFilename(fileName);
      const assets = assetScope.product(categorySlug, subcategorySlug, slug);

      return {
        ...data,
        slug,
        href: routeTo.product(categorySlug, subcategorySlug, slug),
        sourcePath,
        categorySlug,
        subcategorySlug,
        categoryName,
        subcategoryName,
        gallery: {
          thumbnail: withAlt(resolveImage(assets, data.gallery.thumbnail), data.title),
          images: withAltAll(resolveImages(assets, data.gallery.images), data.title),
        },
      };
    }),
  );

  return products.filter(isPublished).sort(byOrderThenTitle);
}

async function loadCategories(): Promise<{ categories: Category[]; products: Product[] }> {
  const categorySlugs = await listDirectories(CONTENT_DIR.categories);
  const allProducts: Product[] = [];

  const categories = await Promise.all(
    categorySlugs.map(async (slug): Promise<Category> => {
      const dir = `${CONTENT_DIR.categories}/${slug}`;
      const meta = await readJsonFile(`${dir}/category.json`, categoryMetaSchema);
      const categoryAssets = assetScope.category(slug);
      const subcategorySlugs = await listDirectories(dir);

      const subcategories = await Promise.all(
        subcategorySlugs.map(async (subSlug): Promise<Subcategory> => {
          const subMeta = await readJsonFile(
            `${dir}/${subSlug}/subcategory.json`,
            categoryMetaSchema,
          );
          const subAssets = assetScope.subcategory(slug, subSlug);

          const products = isPublished(subMeta)
            ? await loadProducts(slug, subSlug, meta.name, subMeta.name)
            : [];
          allProducts.push(...products);

          return {
            ...subMeta,
            thumbnail: withAlt(resolveImage(subAssets, subMeta.thumbnail), subMeta.name),
            hero: subMeta.hero && resolveImage(subAssets, subMeta.hero),
            slug: subSlug,
            href: routeTo.subcategory(slug, subSlug),
            sourcePath: `${dir}/${subSlug}/subcategory.json`,
            categorySlug: slug,
            productCount: products.length,
          };
        }),
      );

      const visibleSubcategories = subcategories.filter(isPublished).sort(byOrderThenName);

      return {
        ...meta,
        thumbnail: withAlt(resolveImage(categoryAssets, meta.thumbnail), meta.name),
        hero: meta.hero && resolveImage(categoryAssets, meta.hero),
        slug,
        href: routeTo.category(slug),
        sourcePath: `${dir}/category.json`,
        subcategories: visibleSubcategories,
        productCount: visibleSubcategories.reduce((sum, sub) => sum + sub.productCount, 0),
      };
    }),
  );

  const visible = categories.filter(isPublished).sort(byOrderThenName);
  const visibleSlugs = new Set(visible.map((category) => category.slug));

  return {
    categories: visible,
    // Products under an unpublished category are not part of the catalog.
    products: allProducts
      .filter((product) => visibleSlugs.has(product.categorySlug))
      .sort(byOrderThenTitle),
  };
}

/** Built once per process; content is static for the lifetime of a build. */
export const getCatalog = once(async (): Promise<Catalog> => {
  const { categories, products } = await loadCategories();

  const routes = new Set<string>();
  for (const product of products) {
    if (routes.has(product.href)) {
      throw new ContentError(`Duplicate product route "${product.href}" (${product.sourcePath}).`);
    }
    routes.add(product.href);
  }

  return { categories, products };
});

/* -------------------------------------------------------------------------- */
/* Queries                                                                     */
/* -------------------------------------------------------------------------- */

export async function getCategories(): Promise<Category[]> {
  return (await getCatalog()).categories;
}

export async function getCategory(slug: string): Promise<Category | null> {
  return (await getCategories()).find((category) => category.slug === slug) ?? null;
}

export async function getSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): Promise<Subcategory | null> {
  const category = await getCategory(categorySlug);
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug) ?? null;
}

/**
 * The two filters a surface actually asks for — the hierarchy it is standing
 * in. Four more were declared and none had a caller: `featured` and `limit`
 * promoted a subset, `tag` filtered by a field no surface reads, and `exclude`
 * documented itself as *"used for related products"*, which is the
 * recommendation UX Blueprint §24 and R19.3 keep off this site.
 */
export interface ProductFilter {
  category?: string;
  subcategory?: string;
}

export async function getProducts(filter: ProductFilter = {}): Promise<Product[]> {
  const { products } = await getCatalog();

  return products.filter((product) => {
    if (filter.category && product.categorySlug !== filter.category) return false;
    if (filter.subcategory && product.subcategorySlug !== filter.subcategory) return false;
    return true;
  });
}

export async function getProduct(route: ProductRoute): Promise<Product | null> {
  const href = routeTo.product(route.category, route.subcategory, route.product);
  const { products } = await getCatalog();
  return products.find((product) => product.href === href) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Static params                                                               */
/* -------------------------------------------------------------------------- */

export async function getProductRoutes(): Promise<ProductRoute[]> {
  const { products } = await getCatalog();
  return products.map((product) => ({
    category: product.categorySlug,
    subcategory: product.subcategorySlug,
    product: product.slug,
  }));
}

export async function getCategoryRoutes(): Promise<Array<{ category: string }>> {
  return (await getCategories()).map((category) => ({ category: category.slug }));
}

export async function getSubcategoryRoutes(): Promise<
  Array<{ category: string; subcategory: string }>
> {
  const categories = await getCategories();
  return categories.flatMap((category) =>
    category.subcategories.map((sub) => ({ category: category.slug, subcategory: sub.slug })),
  );
}
