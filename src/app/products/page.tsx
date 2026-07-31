import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard, ProductCard } from "@/components/cards";
import { CtaBanner } from "@/components/layout";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero, SectionHeader } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { getCategories, getFeaturedProducts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatCount } from "@/utils/format";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Equestrian tack, leather bags and accessories manufactured for export — browse the full range by category.",
  path: ROUTES.products,
});

export default async function ProductsPage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedProducts(6)]);
  const total = categories.reduce((sum, category) => sum + category.productCount, 0);

  return (
    <>
      <PageHero
        title="Products"
        eyebrow="Our range"
        summary={`${formatCount(total, "product")} across ${formatCount(categories.length, "category", "categories")}, all available for private label production.`}
        href={ROUTES.products}
      />

      <Section spacing="lg">
        <Container size="lg" className="flex flex-col gap-12">
          <SectionHeader
            eyebrow="Browse"
            heading="Categories"
            description="Each category is organised by subcategory, mirroring how the factory is laid out."
          />

          {categories.length === 0 ? (
            <EmptyState
              title="No categories published yet"
              description="Product categories will appear here as soon as they are added to the catalogue."
            />
          ) : (
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <StaggerItem key={category.href} className="h-full">
                  <CategoryCard category={category} priority={index < 3} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>

      {featured.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader eyebrow="Selected work" heading="Featured products" />
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((product) => (
                <StaggerItem key={product.href} className="h-full">
                  <ProductCard product={product} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <CtaBanner
        heading="Not seeing what you need?"
        description="We manufacture to buyer specification. Send a drawing, a sample or a photograph."
        primaryAction={
          <Link
            href={ROUTES.buyerEnquiry}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Start an enquiry
          </Link>
        }
      />
    </>
  );
}
