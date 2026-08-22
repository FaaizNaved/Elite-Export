import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { categoryBreadcrumbs } from "@/lib/breadcrumbs";
import { getCategory, getCategoryRoutes, getProducts } from "@/lib/content";
import { categoryMetadata } from "@/lib/seo";
import { formatCount } from "@/utils/format";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategoryRoutes();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  return category ? categoryMetadata(category) : {};
}

/**
 * One category, all of it.
 *
 * Subcategories are bands on this page rather than pages of their own. The
 * grouping a tack buyer navigates by — headstalls apart from breast collars —
 * is fully visible, but seeing it no longer costs a page load, and every
 * product in the category is reachable by scrolling rather than by guessing
 * which tile hides it. The jump rail is the concession to long categories.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  /** Products fetched per subcategory so each band renders its own set. */
  const bands = await Promise.all(
    category.subcategories.map(async (subcategory) => ({
      subcategory,
      products: await getProducts({ category: slug, subcategory: subcategory.slug }),
    })),
  );

  const populated = bands.filter((band) => band.products.length > 0);

  return (
    <>
      <PageHero
        title={category.name}
        eyebrow="Category"
        summary={category.shortDescription}
        image={category.hero ?? category.thumbnail}
        breadcrumbs={categoryBreadcrumbs(category)}
      />

      {(category.description || populated.length > 1) && (
        <Section spacing="md">
          <Container size="lg" className="flex flex-col gap-10">
            {category.description && (
              <Typography variant="lead" className="max-w-narrow">
                {category.description}
              </Typography>
            )}

            {/* Jump rail. Only earns its place when there is more than one
                band — a table of contents with one entry is furniture. */}
            {populated.length > 1 && (
              <nav aria-label={`${category.name} sections`} className="flex flex-wrap gap-x-8 gap-y-3">
                {populated.map(({ subcategory, products }) => (
                  <a
                    key={subcategory.slug}
                    href={`#${subcategory.slug}`}
                    className="group inline-flex items-baseline gap-2 font-sans text-small text-foreground-secondary underline-offset-8 transition-fast hover:text-accent hover:underline"
                  >
                    {subcategory.name}
                    <span className="font-sans text-caption tabular-nums text-foreground-muted">
                      {products.length}
                    </span>
                  </a>
                ))}
              </nav>
            )}
          </Container>
        </Section>
      )}

      {populated.length === 0 ? (
        <Section spacing="lg">
          <Container size="lg">
            <EmptyState
              title="Nothing published in this category yet"
              description="These pieces are being photographed. They will appear here as they are added."
            />
          </Container>
        </Section>
      ) : (
        populated.map(({ subcategory, products }, index) => (
          <Section
            key={subcategory.slug}
            spacing="lg"
            className={index % 2 === 1 ? "bg-surface-sunken" : undefined}
          >
            <Container size="lg" className="flex flex-col gap-12">
              {/* `scroll-mt` clears the fixed header, or the anchor lands with
                  the heading tucked underneath it. */}
              <div id={subcategory.slug} className="flex flex-col gap-5 scroll-mt-32">
                <div className="flex flex-col gap-3">
                  <Typography variant="overline">
                    {formatCount(products.length, "product")}
                  </Typography>
                </div>
                <Typography variant="h2" as="h2">
                  {subcategory.name}
                </Typography>
                {subcategory.description && (
                  <Typography variant="lead" className="max-w-xl">
                    {subcategory.description}
                  </Typography>
                )}
              </div>

              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, productIndex) => (
                  <StaggerItem key={product.href} className="h-full">
                    <ProductCard
                      product={product}
                      priority={index === 0 && productIndex < 3}
                      className="h-full"
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>
        ))
      )}
    </>
  );
}
