import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { CtaBanner } from "@/components/layout";
import { PageHero } from "@/components/sections";
import { Tabs } from "@/components/tabs";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { getAllGalleryImages, getGalleryAlbums } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Inside the Elite Export factory — cutting floor, machinery, finished products, export packing and buyer visits.",
  path: ROUTES.gallery,
});

export default async function GalleryPage() {
  const [albums, allImages] = await Promise.all([getGalleryAlbums(), getAllGalleryImages()]);

  return (
    <>
      <PageHero
        title="Gallery"
        eyebrow="Inside Elite Export"
        summary="The factory, the machinery and the work — photographed on ordinary production days."
        image={albums[0]?.cover}
        href={ROUTES.gallery}
      />

      <Section spacing="lg">
        <Container size="lg">
          {albums.length === 0 ? (
            <EmptyState
              title="No photographs published yet"
              description="Gallery albums will appear here as they are added."
            />
          ) : (
            <Tabs
              label="Gallery albums"
              items={[
                {
                  value: "all",
                  label: "All",
                  content: <Gallery images={allImages} layout="masonry" columns={3} />,
                },
                ...albums.map((album) => ({
                  value: album.slug,
                  label: album.name,
                  content: <Gallery images={album.images} layout="masonry" columns={3} />,
                })),
              ]}
            />
          )}
        </Container>
      </Section>

      <CtaBanner
        heading="See it for yourself"
        description="Photographs only go so far. Buyers and their agencies are welcome on the factory floor."
        primaryAction={
          <Link
            href={ROUTES.contact}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Arrange a visit
          </Link>
        }
      />
    </>
  );
}
