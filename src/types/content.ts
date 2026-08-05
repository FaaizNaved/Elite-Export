import type {
  BlogPostFrontmatter,
  CategoryMeta,
  CompanyPageFrontmatter,
  GalleryAlbumMeta,
  LegalPageFrontmatter,
  MachineFrontmatter,
  ProductFrontmatter,
} from "../models";

/**
 * Fields the content engine derives for every document, regardless of type.
 * `slug` and `href` come from the file's location, never from frontmatter, so
 * the folder hierarchy stays the only source of truth for routing.
 */
export interface ContentRef {
  slug: string;
  /** Site-relative route, e.g. `/products/western-tack/headstall/one-ear-headstall`. */
  href: string;
  /** Path relative to the content root — used in error messages and CMS migration mapping. */
  sourcePath: string;
}

export interface Product extends Omit<ProductFrontmatter, "slug">, ContentRef {
  categorySlug: string;
  subcategorySlug: string;
  /** Denormalised display names so cards and breadcrumbs need no extra lookup. */
  categoryName: string;
  subcategoryName: string;
}

export interface Subcategory extends CategoryMeta, ContentRef {
  categorySlug: string;
  productCount: number;
}

export interface Category extends CategoryMeta, ContentRef {
  subcategories: Subcategory[];
  productCount: number;
}

export interface CompanyPage extends CompanyPageFrontmatter, ContentRef {}

export interface Machine extends Omit<MachineFrontmatter, "slug">, ContentRef {}

export interface GalleryAlbum extends GalleryAlbumMeta, ContentRef {}

export interface BlogPost extends Omit<BlogPostFrontmatter, "slug" | "readingTime">, ContentRef {
  readingTime: number;
}

export interface LegalPage extends LegalPageFrontmatter, ContentRef {}

/** The fully-resolved product catalog, built once per process. */
export interface Catalog {
  categories: Category[];
  products: Product[];
}

/** Identifies a product by its route segments. */
export interface ProductRoute {
  category: string;
  subcategory: string;
  product: string;
}
