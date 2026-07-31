import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ROUTES } from "@/constants";
import { getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/utils/format";
import { BLUR_DATA_URL } from "@/utils/image";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description:
    "Notes on leather, manufacturing and sourcing from the Elite Export workshop floor.",
  path: ROUTES.blog,
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        title="Journal"
        eyebrow="Notes"
        summary="What we have learned about leather, manufacturing and sourcing — written for buyers."
        href={ROUTES.blog}
      />

      <Section spacing="lg">
        <Container size="lg">
          {posts.length === 0 ? (
            <EmptyState title="Nothing published yet" description="Articles will appear here soon." />
          ) : (
            <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <StaggerItem key={post.href} className="h-full">
                  <Card variant="interactive" className="h-full">
                    <Link href={post.href} className="flex flex-1 flex-col">
                      <AspectRatio ratio="wide" className="bg-surface-sunken">
                        <Image
                          src={post.cover.src}
                          alt={post.cover.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          priority={index < 3}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="object-cover"
                        />
                      </AspectRatio>
                      <CardBody>
                        <Typography variant="caption">
                          {formatDate(post.publishedAt)} · {post.readingTime} min read
                        </Typography>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardBody>
                    </Link>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>
    </>
  );
}
