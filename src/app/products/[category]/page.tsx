import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard, SubcategoryCard } from "@/components/cards";
import { CtaBanner } from "@/components/layout";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero, SectionHeader } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
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

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProducts({ category: slug, limit: 6 });

  return (
    <>
      <PageHero
        title={category.name}
        eyebrow="Category"
        summary={category.shortDescription}
        image={category.hero ?? category.thumbnail}
        breadcrumbs={categoryBreadcrumbs(category)}
      />

      {category.description && (
        <Section spacing="md">
          <Container size="lg">
            <Typography variant="lead" className="max-w-narrow">
              {category.description}
            </Typography>
          </Container>
        </Section>
      )}

      <Section spacing="lg">
        <Container size="lg" className="flex flex-col gap-12">
          <SectionHeader
            eyebrow={formatCount(category.productCount, "product")}
            heading="Browse by type"
          />

          {category.subcategories.length === 0 ? (
            <EmptyState
              title="Nothing published in this category yet"
              description="Check back shortly, or send us an enquiry describing what you need."
            />
          ) : (
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {category.subcategories.map((subcategory) => (
                <StaggerItem key={subcategory.href} className="h-full">
                  <SubcategoryCard subcategory={subcategory} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>

      {products.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader eyebrow="From this category" heading="Selected products" />
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <StaggerItem key={product.href} className="h-full">
                  <ProductCard product={product} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <CtaBanner
        heading={`Enquire about ${category.name.toLowerCase()}`}
        description="Tell us the styles, quantities and finishes you need and we will come back with a quotation."
        primaryAction={
          <Link
            href={ROUTES.buyerEnquiry}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Buyer enquiry
          </Link>
        }
      />
    </>
  );
}
