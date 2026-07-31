import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards";
import { ProductGallery } from "@/components/gallery";
import { CtaBanner } from "@/components/layout";
import { Stagger, StaggerItem } from "@/components/motion";
import { PageHero, Prose, SectionHeader } from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { productBreadcrumbs } from "@/lib/breadcrumbs";
import { getProduct, getProductRoutes, getRelatedProducts } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import { loadProductContent } from "@/mdx";

interface PageProps {
  params: Promise<{ category: string; subcategory: string; product: string }>;
}

export async function generateStaticParams() {
  return getProductRoutes();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const route = await params;
  const product = await getProduct(route);
  return product ? productMetadata(product) : {};
}

export default async function ProductPage({ params }: PageProps) {
  const route = await params;
  const product = await getProduct(route);
  if (!product) notFound();

  const [related, Content] = await Promise.all([
    getRelatedProducts(product, 3),
    loadProductContent(route.category, route.subcategory, route.product),
  ]);

  const breadcrumbs = productBreadcrumbs(product);
  const images = [product.gallery.thumbnail, ...product.gallery.images];

  /** Specifications grouped by their optional `group` heading. */
  const specGroups = product.specifications.reduce<Record<string, typeof product.specifications>>(
    (groups, spec) => {
      const key = spec.group ?? "Specifications";
      (groups[key] ??= []).push(spec);
      return groups;
    },
    {},
  );

  return (
    <>
      {/* Product and breadcrumb structured data for rich results. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productJsonLd(product), breadcrumbJsonLd(breadcrumbs)]),
        }}
      />

      <PageHero
        title={product.title}
        eyebrow={product.subcategoryName}
        summary={product.shortDescription}
        breadcrumbs={breadcrumbs}
      />

      <Section spacing="md">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={images} title={product.title} />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">{product.categoryName}</Badge>
                  {product.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <Typography variant="overline">Item code {product.itemCode}</Typography>
                <Typography variant="lead">{product.shortDescription}</Typography>
              </div>

              {product.features.length > 0 && (
                <div className="flex flex-col gap-3">
                  <Typography variant="overline">Features</Typography>
                  <ul className="flex flex-col gap-3">
                    {product.features.map((feature) => (
                      <li key={feature.title} className="flex flex-col gap-0.5">
                        <span className="font-sans text-small font-medium">{feature.title}</span>
                        {feature.description && (
                          <Typography variant="caption">{feature.description}</Typography>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Divider />

              <dl className="flex flex-col gap-4">
                {product.material && (
                  <div className="flex flex-col gap-1">
                    <dt className="font-sans text-caption text-foreground-muted">Material</dt>
                    <dd className="font-sans text-small">{product.material}</dd>
                  </div>
                )}
                {product.colors.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <dt className="font-sans text-caption text-foreground-muted">Colours</dt>
                    <dd className="font-sans text-small">{product.colors.join(", ")}</dd>
                  </div>
                )}
                {product.sizes.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <dt className="font-sans text-caption text-foreground-muted">Sizes</dt>
                    <dd className="font-sans text-small">{product.sizes.join(", ")}</dd>
                  </div>
                )}
              </dl>

              <Link
                href={`${ROUTES.buyerEnquiry}?product=${encodeURIComponent(product.itemCode)}`}
                className={buttonVariants({ size: "lg", className: "self-start" })}
              >
                Enquire about this product
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Prose>
        <Content />
      </Prose>

      {product.specifications.length > 0 && (
        <Section spacing="lg" className="bg-surface-sunken">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader heading="Specifications" eyebrow={product.itemCode} />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(specGroups).map(([group, specs]) => (
                <div key={group} className="flex flex-col gap-3">
                  <Typography variant="overline">{group}</Typography>
                  <dl className="divide-y divide-border border-y border-border">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-6 py-3">
                        <dt className="font-sans text-small text-foreground-secondary">
                          {spec.label}
                        </dt>
                        <dd className="text-right font-sans text-small">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section spacing="lg">
          <Container size="lg" className="flex flex-col gap-12">
            <SectionHeader eyebrow="You may also need" heading="Related products" />
            <Stagger className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <StaggerItem key={item.href} className="h-full">
                  <ProductCard product={item} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <CtaBanner
        heading="Request a sample"
        description="Samples ship within 10–15 working days. Tell us the finish, hardware and quantity you need."
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
