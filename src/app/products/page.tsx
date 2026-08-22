import type { Metadata } from "next";
import { ProductBrowser } from "@/components/products";
import { PageHero } from "@/components/sections";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { getCategories, getProducts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatCount } from "@/utils/format";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Equestrian tack, leather bags and accessories manufactured for export — the full range, by category.",
  path: ROUTES.products,
});

/**
 * The catalogue, on one page.
 *
 * Was a page of category tiles that led to a page of subcategory tiles that led
 * to a page of products — three navigations before a buyer saw a single piece.
 * For a catalogue of roughly thirty items that is a filing cabinet. Everything
 * is now on this page, grouped under its category and filterable in place, and
 * the category pages exist for buyers who arrive knowing what they want.
 */
export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <PageHero
        title="Products"
        eyebrow="The range"
        summary={`${formatCount(products.length, "product")} across ${formatCount(
          categories.length,
          "category",
          "categories",
        )}, every one of them available for private label production.`}
        href={ROUTES.products}
      />

      <Section spacing="lg">
        <Container size="lg">
          {products.length === 0 ? (
            <EmptyState
              title="No products published yet"
              description="The catalogue is being photographed. It will appear here as pieces are added."
            />
          ) : (
            <ProductBrowser
              products={products}
              categories={categories.map((category) => ({
                slug: category.slug,
                name: category.name,
              }))}
            />
          )}
        </Container>
      </Section>
    </>
  );
}
