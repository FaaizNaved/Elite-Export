import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards";
import { CtaBanner } from "@/components/layout";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero, SectionHeader } from "@/components/sections";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/loading";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";
import { subcategoryBreadcrumbs } from "@/lib/breadcrumbs";
import { getCategory, getProducts, getSubcategory, getSubcategoryRoutes } from "@/lib/content";
import { categoryMetadata } from "@/lib/seo";
import { formatCount } from "@/utils/format";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateStaticParams() {
  return getSubcategoryRoutes();
}

// Reading searchParams would make this route dynamic and cost it static
// generation, which matters more than paging for listings of this size.
// ponytail: if a subcategory ever passes ~60 products, paginate with a
// `/page/[n]` segment so the pages stay prerendered.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const found = await getSubcategory(category, subcategory);
  return found ? categoryMetadata(found) : {};
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const [category, subcategory] = await Promise.all([
    getCategory(categorySlug),
    getSubcategory(categorySlug, subcategorySlug),
  ]);
  if (!category || !subcategory) notFound();

  const products = await getProducts({ category: categorySlug, subcategory: subcategorySlug });

  return (
    <>
      <PageHero
        title={subcategory.name}
        eyebrow={category.name}
        summary={subcategory.shortDescription}
        image={subcategory.hero ?? subcategory.thumbnail}
        breadcrumbs={subcategoryBreadcrumbs(category, subcategory)}
      />

      <Section spacing="lg">
        <Container size="lg" className="flex flex-col gap-12">
          <SectionHeader
            eyebrow={formatCount(products.length, "product")}
            heading={`${subcategory.name} we manufacture`}
            description={subcategory.description}
          />

          {products.length === 0 ? (
            <EmptyState
              title="No products published here yet"
              description="Tell us what you are looking for and we will confirm whether we can produce it."
              action={
                <Link href={ROUTES.buyerEnquiry} className={buttonVariants({ variant: "outline" })}>
                  Send an enquiry
                </Link>
              }
            />
          ) : (
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <StaggerItem key={product.href} className="h-full">
                  <ProductCard product={product} priority={index < 3} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>

      <CtaBanner
        heading="Private label production"
        description="Every piece on this page can be produced under your brand, with your hardware and packaging."
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
