import { routeTo } from "../../constants/routes";
import {
  articleFrontmatterSchema,
  chapterSchema,
  companyPageFrontmatterSchema,
  legalPageFrontmatterSchema,
} from "../../models";
import type { Article, CompanyPage, LegalPage } from "../../types";
import { withAlt } from "../../utils/image";
import { assetScope, resolveDocumentImages, resolveImage } from "./assets";
import { byOrderThenTitle, defineCollection, type Collection } from "./collection";
import { CONTENT_DIR } from "./source";

/**
 * Editorial content: company pages, journal articles and legal documents.
 *
 * Each is a registry declaration — the list/read/validate/filter/sort pipeline
 * lives once, in `./collection`.
 */

const companyPages: Collection<CompanyPage> = defineCollection({
  dir: CONTENT_DIR.company,
  schema: companyPageFrontmatterSchema,
  sort: byOrderThenTitle,
  resolve: ({ data, sourcePath, slug }): CompanyPage => {
    // Company pages name shared assets absolutely; the walk is here for the
    // frames inside each step, which no field-by-field resolution reached.
    const resolved = resolveDocumentImages("", data);
    return {
      ...resolved,
      hero: resolved.hero && withAlt(resolved.hero, data.title),
      slug,
      href: routeTo.companyPage(slug),
      sourcePath,
    };
  },
});

/**
 * The order is the chapter set's, not the calendar's.
 *
 * `byNewestFirst` stood here as "the only sensible default for the journal
 * index", and it is the ordering UX Blueprint R24.5 removes: *publishing on a
 * schedule turns the surface into a feed.* MIB §12.1 says the same thing about
 * the index item — it lists an article **by what it is about, not by when it
 * was posted**, and it disappears *where it would carry a date-led, feed-like
 * ordering that implies a schedule*. Hiding the dates while sorting by them
 * left the feed in place with its labels removed.
 *
 * What an article is about is its chapter (R45.1, R24.2), so the canonical
 * chapter order is the order — §25.1 rule 1, the one order this brand never
 * re-arranges — with the title deciding between articles telling the same
 * chapter. `chapterSchema.options` is that set, already declared once (R7.1).
 */
const byChapterThenTitle = (a: Article, b: Article) =>
  chapterSchema.options.indexOf(a.chapter) - chapterSchema.options.indexOf(b.chapter) ||
  a.title.localeCompare(b.title);

const articles: Collection<Article> = defineCollection({
  dir: CONTENT_DIR.journal,
  schema: articleFrontmatterSchema,
  sort: byChapterThenTitle,
  resolve: ({ data, sourcePath, slug }): Article => ({
    ...data,
    /*
     * R45.1 makes the photograph optional, so an article without one resolves
     * without one rather than acquiring a stand-in (X8, Photography §24.5).
     */
    cover: data.cover
      ? withAlt(resolveImage(assetScope.journal(data.slug ?? slug), data.cover), data.title)
      : undefined,
    slug: data.slug ?? slug,
    href: routeTo.article(data.slug ?? slug),
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

export const getArticles = articles.all;
export const getArticle = articles.bySlug;
export const getArticleRoutes = articles.routes;

export const getLegalPages = legalPages.all;
export const getLegalPage = legalPages.bySlug;
export const getLegalRoutes = legalPages.routes;
