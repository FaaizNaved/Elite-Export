import { routeTo } from "../../constants/routes";
import {
  blogPostFrontmatterSchema,
  companyPageFrontmatterSchema,
  legalPageFrontmatterSchema,
} from "../../models";
import type { BlogPost, CompanyPage, LegalPage } from "../../types";
import { readingTimeOf } from "../../utils/format";
import { withAlt } from "../../utils/image";
import { assetScope, resolveImage } from "./assets";
import {
  byNewestFirst,
  byOrderThenTitle,
  defineCollection,
  type Collection,
} from "./collection";
import { CONTENT_DIR } from "./source";

/**
 * Editorial content: company pages, blog posts and legal documents.
 *
 * Each is a registry declaration — the list/read/validate/filter/sort pipeline
 * lives once, in `./collection`.
 */

const companyPages: Collection<CompanyPage> = defineCollection({
  dir: CONTENT_DIR.company,
  schema: companyPageFrontmatterSchema,
  sort: byOrderThenTitle,
  resolve: ({ data, sourcePath, slug }): CompanyPage => ({
    ...data,
    hero: data.hero && withAlt(data.hero, data.title),
    slug,
    href: routeTo.companyPage(slug),
    sourcePath,
  }),
});

const blogPosts: Collection<BlogPost> = defineCollection({
  dir: CONTENT_DIR.blog,
  schema: blogPostFrontmatterSchema,
  // Newest first — the only sensible default for a blog index.
  sort: byNewestFirst,
  resolve: ({ data, body, sourcePath, slug }): BlogPost => ({
    ...data,
    cover: withAlt(resolveImage(assetScope.blog(data.slug ?? slug), data.cover), data.title),
    readingTime: data.readingTime ?? readingTimeOf(body),
    slug: data.slug ?? slug,
    href: routeTo.blogPost(data.slug ?? slug),
    sourcePath,
  }),
});

const legalPages: Collection<LegalPage> = defineCollection({
  dir: CONTENT_DIR.legal,
  schema: legalPageFrontmatterSchema,
  sort: (a, b) => a.title.localeCompare(b.title),
  resolve: ({ data, sourcePath, slug }): LegalPage => ({
    ...data,
    slug,
    href: routeTo.legalPage(slug),
    sourcePath,
  }),
});

export const getCompanyPages = companyPages.all;
export const getCompanyPage = companyPages.bySlug;

export const getBlogPosts = blogPosts.all;
export const getBlogPost = blogPosts.bySlug;
export const getBlogRoutes = blogPosts.routes;

export const getLegalPages = legalPages.all;
export const getLegalPage = legalPages.bySlug;
export const getLegalRoutes = legalPages.routes;
