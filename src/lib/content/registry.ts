import type {
  BlogPost,
  Category,
  CompanyPage,
  Faq,
  GalleryAlbum,
  LegalPage,
  Machine,
  Product,
  ProductRoute,
  Subcategory,
  Testimonial,
} from "../../types";
import type { HomeContent } from "../../models/home";
import {
  getCategories,
  getCategory,
  getProduct,
  getProducts,
  getSubcategory,
} from "./catalog";
import { getGalleryAlbums } from "./gallery";
import { getMachine, getMachines } from "./machines";
import {
  getBlogPost,
  getBlogPosts,
  getCompanyPage,
  getCompanyPages,
  getLegalPage,
  getLegalPages,
} from "./pages";
import { getFaqs, getHomeContent, getTestimonials } from "./singletons";

/**
 * The content registry — one entry point for reading content.
 *
 * It is a facade, not a layer: every method delegates to the loader that
 * already existed, so there is no second implementation to keep in sync. Its
 * value is that a page depends on "the registry" rather than on which module
 * happens to own machines this week, and that every content type answers the
 * same three questions.
 *
 *   contentRegistry.products.list()
 *   contentRegistry.machines.find("clicking-press")
 *   contentRegistry.blog.exists("choosing-full-grain-leather")
 *   contentRegistry.home.get()
 *
 * Registering a new content type is one entry pointing at its loader.
 *
 * The individual loaders remain exported from `@/lib/content` — the registry is
 * the recommended entry point, not a wall.
 */

/** A content type addressed by slug. */
export interface ContentCollection<Doc, Key = string> {
  /** Every published document, in the collection's own order. */
  list: () => Promise<Doc[]>;
  /** One document, or `null` when it does not exist or is unpublished. */
  find: (key: Key) => Promise<Doc | null>;
  exists: (key: Key) => Promise<boolean>;
}

/** A content type that exists exactly once. */
export interface ContentSingleton<Doc> {
  get: () => Promise<Doc>;
}

/** Builds an entry from a loader pair; `exists` is always derived from `find`. */
function collection<Doc, Key>(
  list: () => Promise<Doc[]>,
  find: (key: Key) => Promise<Doc | null>,
): ContentCollection<Doc, Key> {
  return {
    list,
    find,
    exists: async (key) => (await find(key)) !== null,
  };
}

export interface ContentRegistry {
  /** Addressed by its route segments, because a product slug is only unique within its subcategory. */
  products: ContentCollection<Product, ProductRoute>;
  categories: ContentCollection<Category> & {
    subcategory: (category: string, subcategory: string) => Promise<Subcategory | null>;
  };
  machines: ContentCollection<Machine>;
  gallery: ContentCollection<GalleryAlbum>;
  blog: ContentCollection<BlogPost>;
  legal: ContentCollection<LegalPage>;
  /** Editorial company pages: about, manufacturing, technology, quality, export. */
  pages: ContentCollection<CompanyPage>;
  home: ContentSingleton<HomeContent>;
  faqs: ContentSingleton<Faq[]>;
  testimonials: ContentSingleton<Testimonial[]>;
}

const findIn = <Doc extends { slug: string }>(list: () => Promise<Doc[]>) =>
  async (slug: string): Promise<Doc | null> =>
    (await list()).find((doc) => doc.slug === slug) ?? null;

export const contentRegistry: ContentRegistry = {
  products: collection(() => getProducts(), getProduct),
  categories: {
    ...collection(getCategories, getCategory),
    subcategory: getSubcategory,
  },
  machines: collection(getMachines, getMachine),
  gallery: collection(getGalleryAlbums, findIn(getGalleryAlbums)),
  blog: collection(getBlogPosts, getBlogPost),
  legal: collection(getLegalPages, getLegalPage),
  pages: collection(getCompanyPages, getCompanyPage),
  home: { get: getHomeContent },
  faqs: { get: getFaqs },
  testimonials: { get: getTestimonials },
};
