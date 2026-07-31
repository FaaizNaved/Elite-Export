import { routeTo } from "../../constants/routes";
import { categoryMetaSchema, productFrontmatterSchema } from "../../schemas";
import type { Catalog, Category, Product, ProductRoute, Subcategory } from "../../types";
import { once } from "../../utils/cache";
import { withAlt, withAltAll } from "../../utils/image";
import { slugFromFilename } from "../../utils/slug";
import {
  CONTENT_DIR,
  ContentError,
  INCLUDE_DRAFTS,
  isPublished,
  listDirectories,
  listMdxFiles,
  readJsonFile,
  readMdxFile,
} from "./source";

/**
 * Builds the product catalog from the content tree.
 *
 * Hierarchy is expressed by folders, not frontmatter:
 *
 *   src/content/categories/<category>/category.json
 *   src/content/categories/<category>/<subcategory>/subcategory.json
 *   src/content/products/<category>/<subcategory>/<product>.mdx
 *
 * ponytail: the depth is fixed at category → subcategory. If a category ever
 * needs to hold products directly, make `subcategorySlug` nullable here and in
 * `routeTo.product` — everything downstream reads those two.
 */

const byOrderThenName = <T extends { order: number; name: string }>(a: T, b: T) =>
  a.order - b.order || a.name.localeCompare(b.name);

const byOrderThenTitle = <T extends { order: number; title: string }>(a: T, b: T) =>
  a.order - b.order || a.title.localeCompare(b.title);

async function loadCategories(): Promise<Category[]> {
  const categorySlugs = await listDirectories(CONTENT_DIR.categories);

  const categories = await Promise.all(
    categorySlugs.map(async (slug): Promise<Category> => {
      const dir = `${CONTENT_DIR.categories}/${slug}`;
      const meta = await readJsonFile(`${dir}/category.json`, categoryMetaSchema);
      const subcategorySlugs = await listDirectories(dir);

      const subcategories = await Promise.all(
        subcategorySlugs.map(async (subSlug): Promise<Subcategory> => {
          const subMeta = await readJsonFile(
            `${dir}/${subSlug}/subcategory.json`,
            categoryMetaSchema,
          );

          return {
            ...subMeta,
            thumbnail: withAlt(subMeta.thumbnail, subMeta.name),
            slug: subSlug,
            href: routeTo.subcategory(slug, subSlug),
            sourcePath: `${dir}/${subSlug}/subcategory.json`,
            categorySlug: slug,
            productCount: 0,
          };
        }),
      );

      return {
        ...meta,
        thumbnail: withAlt(meta.thumbnail, meta.name),
        slug,
        href: routeTo.category(slug),
        sourcePath: `${dir}/category.json`,
        subcategories: subcategories.filter(isPublished).sort(byOrderThenName),
        productCount: 0,
      };
    }),
  );

  return categories.filter(isPublished).sort(byOrderThenName);
}

async function loadProducts(categories: Map<string, Category>): Promise<Product[]> {
  const categorySlugs = await listDirectories(CONTENT_DIR.products);
  const products: Product[] = [];

  for (const categorySlug of categorySlugs) {
    const category = categories.get(categorySlug);
    if (!category) {
      // In production a missing category may simply be unpublished — skip its
      // products. In development every category is loaded, so this is a typo.
      if (!INCLUDE_DRAFTS) continue;
      throw new ContentError(
        `Products exist in "${CONTENT_DIR.products}/${categorySlug}" but there is no ` +
          `"${CONTENT_DIR.categories}/${categorySlug}/category.json".`,
      );
    }

    const categoryDir = `${CONTENT_DIR.products}/${categorySlug}`;

    for (const subcategorySlug of await listDirectories(categoryDir)) {
      const subcategory = category.subcategories.find((sub) => sub.slug === subcategorySlug);
      if (!subcategory) {
        if (!INCLUDE_DRAFTS) continue;
        throw new ContentError(
          `Products exist in "${categoryDir}/${subcategorySlug}" but there is no ` +
            `"${CONTENT_DIR.categories}/${categorySlug}/${subcategorySlug}/subcategory.json".`,
        );
      }

      const subcategoryDir = `${categoryDir}/${subcategorySlug}`;

      for (const fileName of await listMdxFiles(subcategoryDir)) {
        const { data, sourcePath } = await readMdxFile(
          `${subcategoryDir}/${fileName}`,
          productFrontmatterSchema,
        );
        if (!isPublished(data)) continue;

        const slug = data.slug ?? slugFromFilename(fileName);

        products.push({
          ...data,
          slug,
          href: routeTo.product(categorySlug, subcategorySlug, slug),
          sourcePath,
          categorySlug,
          subcategorySlug,
          categoryName: category.name,
          subcategoryName: subcategory.name,
          gallery: {
            thumbnail: withAlt(data.gallery.thumbnail, data.title),
            images: withAltAll(data.gallery.images, data.title),
          },
        });
      }
    }
  }

  return products.sort(byOrderThenTitle);
}

/** Built once per process; content is static for the lifetime of a build. */
export const getCatalog = once(async (): Promise<Catalog> => {
  const categories = await loadCategories();
  const categoryMap = new Map(categories.map((category) => [category.slug, category]));
  const products = await loadProducts(categoryMap);

  for (const product of products) {
    const category = categoryMap.get(product.categorySlug);
    if (!category) continue;
    category.productCount += 1;

    const subcategory = category.subcategories.find((sub) => sub.slug === product.subcategorySlug);
    if (subcategory) subcategory.productCount += 1;
  }

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

export async function getFeaturedCategories(limit?: number): Promise<Category[]> {
  const featured = (await getCategories()).filter((category) => category.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export interface ProductFilter {
  category?: string;
  subcategory?: string;
  tag?: string;
  featured?: boolean;
  /** Product slugs to leave out — used for "related products". */
  exclude?: readonly string[];
  limit?: number;
}

export async function getProducts(filter: ProductFilter = {}): Promise<Product[]> {
  const { products } = await getCatalog();

  const matched = products.filter((product) => {
    if (filter.category && product.categorySlug !== filter.category) return false;
    if (filter.subcategory && product.subcategorySlug !== filter.subcategory) return false;
    if (filter.tag && !product.tags.includes(filter.tag)) return false;
    if (filter.featured !== undefined && product.featured !== filter.featured) return false;
    if (filter.exclude?.includes(product.href)) return false;
    return true;
  });

  return typeof filter.limit === "number" ? matched.slice(0, filter.limit) : matched;
}

export async function getProduct(route: ProductRoute): Promise<Product | null> {
  const href = routeTo.product(route.category, route.subcategory, route.product);
  const { products } = await getCatalog();
  return products.find((product) => product.href === href) ?? null;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return getProducts({ featured: true, limit });
}

/**
 * Related products, widening the net until `limit` is reached:
 * same subcategory → same category → featured elsewhere.
 * Nothing is hand-maintained, so a new product appears in related lists on its own.
 */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const related: Product[] = [];
  const seen = new Set<string>([product.href]);

  const add = (candidates: Product[]) => {
    for (const candidate of candidates) {
      if (related.length >= limit) return;
      if (seen.has(candidate.href)) continue;
      seen.add(candidate.href);
      related.push(candidate);
    }
  };

  add(await getProducts({ category: product.categorySlug, subcategory: product.subcategorySlug }));
  if (related.length < limit) add(await getProducts({ category: product.categorySlug }));
  if (related.length < limit) add(await getProducts({ featured: true }));

  return related;
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
