import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Prose } from "@/components/sections";
import { Typography } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { getBlogPost, getBlogRoutes } from "@/lib/content";
import { blogPostMetadata } from "@/lib/seo";
import { loadBlogContent } from "@/lib/mdx";
import { formatDate } from "@/utils/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogRoutes();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return post ? blogPostMetadata(post) : {};
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const Content = await loadBlogContent(slug);

  return (
    <>
      <PageHero
        title={post.title}
        eyebrow={`${formatDate(post.publishedAt)} · ${post.readingTime} min read`}
        summary={post.excerpt}
        image={post.cover}
        breadcrumbs={buildBreadcrumbs([
          { label: "Journal", href: ROUTES.blog },
          { label: post.title, href: post.href },
        ])}
      />

      <Prose>
        <Content />
        <Typography variant="caption" className="mt-12 block">
          Written by {post.author}
        </Typography>
      </Prose>
    </>
  );
}
