import { routeTo } from "../../constants/routes";
import {
  blogPostFrontmatterSchema,
  companyPageFrontmatterSchema,
  legalPageFrontmatterSchema,
} from "../../schemas";
import type { BlogPost, CompanyPage, LegalPage } from "../../types";
import { once } from "../../utils/cache";
import { readingTimeOf } from "../../utils/format";
import { withAlt } from "../../utils/image";
import { slugFromFilename } from "../../utils/slug";
import { CONTENT_DIR, isPublished, listMdxFiles, readMdxFile } from "./source";

/** Editorial content: company pages, blog posts and legal documents. */

/* -------------------------------------------------------------------------- */
/* Company pages                                                               */
/* -------------------------------------------------------------------------- */

export const getCompanyPages = once(async (): Promise<CompanyPage[]> => {
  const files = await listMdxFiles(CONTENT_DIR.company);

  const pages = await Promise.all(
    files.map(async (fileName): Promise<CompanyPage> => {
      const { data, sourcePath } = await readMdxFile(
        `${CONTENT_DIR.company}/${fileName}`,
        companyPageFrontmatterSchema,
      );
      const slug = slugFromFilename(fileName);

      return {
        ...data,
        hero: data.hero && withAlt(data.hero, data.title),
        slug,
        href: routeTo.companyPage(slug),
        sourcePath,
      };
    }),
  );

  return pages.filter(isPublished).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});

export async function getCompanyPage(slug: string): Promise<CompanyPage | null> {
  return (await getCompanyPages()).find((page) => page.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

export const getBlogPosts = once(async (): Promise<BlogPost[]> => {
  const files = await listMdxFiles(CONTENT_DIR.blog);

  const posts = await Promise.all(
    files.map(async (fileName): Promise<BlogPost> => {
      const { data, body, sourcePath } = await readMdxFile(
        `${CONTENT_DIR.blog}/${fileName}`,
        blogPostFrontmatterSchema,
      );
      const slug = data.slug ?? slugFromFilename(fileName);

      return {
        ...data,
        cover: withAlt(data.cover, data.title),
        readingTime: data.readingTime ?? readingTimeOf(body),
        slug,
        href: routeTo.blogPost(slug),
        sourcePath,
      };
    }),
  );

  // Newest first — the only sensible default for a blog index.
  return posts.filter(isPublished).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
});

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return (await getBlogPosts()).find((post) => post.slug === slug) ?? null;
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  return (await getBlogPosts()).filter((post) => post.featured).slice(0, limit);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return (await getBlogPosts()).filter((post) => post.tags.includes(tag));
}

/** Every tag in use, sorted alphabetically. */
export async function getBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}

/* -------------------------------------------------------------------------- */
/* Legal                                                                       */
/* -------------------------------------------------------------------------- */

export const getLegalPages = once(async (): Promise<LegalPage[]> => {
  const files = await listMdxFiles(CONTENT_DIR.legal);

  const pages = await Promise.all(
    files.map(async (fileName): Promise<LegalPage> => {
      const { data, sourcePath } = await readMdxFile(
        `${CONTENT_DIR.legal}/${fileName}`,
        legalPageFrontmatterSchema,
      );
      const slug = slugFromFilename(fileName);

      return { ...data, slug, href: routeTo.legalPage(slug), sourcePath };
    }),
  );

  return pages.filter(isPublished).sort((a, b) => a.title.localeCompare(b.title));
});

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return (await getLegalPages()).find((page) => page.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Static params                                                               */
/* -------------------------------------------------------------------------- */

export async function getBlogRoutes(): Promise<Array<{ slug: string }>> {
  return (await getBlogPosts()).map((post) => ({ slug: post.slug }));
}

export async function getLegalRoutes(): Promise<Array<{ slug: string }>> {
  return (await getLegalPages()).map((page) => ({ slug: page.slug }));
}

export async function getCompanyRoutes(): Promise<Array<{ slug: string }>> {
  return (await getCompanyPages()).map((page) => ({ slug: page.slug }));
}
