import type { MetadataRoute } from "next";
import { ROUTES } from "@/constants";
import {
  getBlogPosts,
  getCatalog,
  getCompanyPages,
  getLegalPages,
  getMachines,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap generated from the content layer, so a new product, machine or
 * article is indexed without anyone remembering to add it here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catalog, companyPages, machines, posts, legalPages] = await Promise.all([
    getCatalog(),
    getCompanyPages(),
    getMachines(),
    getBlogPosts(),
    getLegalPages(),
  ]);

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified?: Date,
  ) => ({ url: absoluteUrl(path), priority, changeFrequency, lastModified });

  return [
    entry(ROUTES.home, 1, "weekly"),
    entry(ROUTES.products, 0.9, "weekly"),
    entry(ROUTES.gallery, 0.6),
    entry(ROUTES.buyerEnquiry, 0.8),
    entry(ROUTES.contact, 0.8),
    entry(ROUTES.blog, 0.6, "weekly"),

    ...companyPages.map((page) => entry(page.href, 0.8)),
    ...catalog.categories.flatMap((category) => [
      entry(category.href, 0.8, "weekly"),
      ...category.subcategories.map((subcategory) => entry(subcategory.href, 0.7, "weekly")),
    ]),
    ...catalog.products.map((product) => entry(product.href, 0.7, "monthly", product.updatedAt)),
    ...machines.map((machine) => entry(machine.href, 0.5, "yearly", machine.updatedAt)),
    ...posts.map((post) => entry(post.href, 0.5, "yearly", post.updatedAt ?? post.publishedAt)),
    ...legalPages.map((page) => entry(page.href, 0.2, "yearly", page.updatedAt)),
  ];
}
