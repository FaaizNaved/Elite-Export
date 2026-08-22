import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/gallery";
import { Prose } from "@/components/sections";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { productBreadcrumbs } from "@/lib/breadcrumbs";
import { getProduct, getProductRoutes } from "@/lib/content";
import { breadcrumbJsonLd, productJsonLd, productMetadata } from "@/lib/seo";
import { loadProductContent } from "@/lib/mdx";

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

/** Labels surfaced beside the object rather than buried in the spec table. */
const HEADLINE_SPECS = ["Dimensions"];

/**
 * A catalogue plate.
 *
 * The page is: what it is, the object, what it is made of, one way to ask about
 * it — then how it is built, then the numbers. Nothing else.
 *
 * Removed on this pass: the related-products gallery (three more objects
 * competing with the one the visitor came for), the 7/5 column split that shrank
 * the photograph to make room for a table, and the gold seams. A buyer who
 * wants another product uses the catalogue; a buyer on this page wants *this*
 * piece, and the page should be about it.
 */
export default async function ProductPage({ params }: PageProps) {
  const route = await params;
  const product = await getProduct(route);
  if (!product) notFound();

  const Content = await loadProductContent(route.category, route.subcategory, route.product);
  const breadcrumbs = productBreadcrumbs(product);
  const images = [product.gallery.thumbnail, ...product.gallery.images];

  /** Dimensions read beside the object; everything else waits for the table. */
  const headline = product.specifications.filter((spec) =>
    HEADLINE_SPECS.includes(spec.label),
  );
  const remaining = product.specifications.filter(
    (spec) => !HEADLINE_SPECS.includes(spec.label),
  );

  const facts = [
    product.material && { label: "Material", value: product.material },
    product.colors.length > 0 && { label: "Colours", value: product.colors.join(" · ") },
    ...headline.map((spec) => ({ label: spec.label, value: spec.value })),
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const specGroups = remaining.reduce<Record<string, typeof remaining>>((groups, spec) => {
    const key = spec.group ?? "Specifications";
    (groups[key] ??= []).push(spec);
    return groups;
  }, {});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productJsonLd(product), breadcrumbJsonLd(breadcrumbs)]),
        }}
      />

      <Section spacing="none" className="pt-24 pb-14 md:pt-28 md:pb-16">
        <Container size="md" className="flex flex-col gap-8">
          <Breadcrumb items={breadcrumbs} />

          {/* Identity above the object, set narrow. The name appears exactly
              once on this page. */}
          <div className="flex max-w-2xl flex-col gap-4">
            <Typography variant="overline">{product.subcategoryName}</Typography>
            <Typography variant="h1" as="h1">
              {product.title}
            </Typography>
            <Typography variant="lead">{product.shortDescription}</Typography>
          </div>
        </Container>

        {/* The object, given the full content measure rather than a column. */}
        <Container size="md" className="mt-8 md:mt-10">
          <ProductGallery images={images} title={product.title} />
        </Container>

        <Container size="md" className="mt-10 flex flex-col gap-8 md:mt-12">
          {facts.length > 0 && (
            <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1.5">
                  <dt className="font-sans text-caption tracking-[0.12em] uppercase text-foreground-muted">
                    {fact.label}
                  </dt>
                  <dd className="font-sans text-body">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* The action stands alone. The reference number and the private-label
              note used to sit directly beneath it in caption grey, which read as
              the small print under a buy button — shop furniture. Both are
              genuinely useful facts, so they moved down to the specifications
              where a buyer goes looking for them. */}
          <div className="border-t border-border pt-8">
            <Link
              href={`${ROUTES.buyerEnquiry}?product=${encodeURIComponent(product.itemCode)}`}
              className="group inline-flex items-center gap-3 border-b border-border-strong pb-2 font-sans text-button font-medium tracking-[0.06em] uppercase transition-base hover:border-accent hover:text-accent-strong"
            >
              Enquire about this piece
              <span
                aria-hidden
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Construction, in the product's own words. */}
      <Prose>
        <Content />
      </Prose>

      <Section spacing="md" className="border-t border-border">
        <Container size="md" className="flex flex-col gap-8">
          <Typography variant="overline">Specifications</Typography>

          <div className="grid gap-x-16 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Reference and production terms are specifications, not shop
                small print. */}
            <div className="flex flex-col gap-2">
              <Typography variant="caption" className="text-foreground-muted">
                Reference
              </Typography>
              <dl>
                <div className="flex justify-between gap-6 border-b border-border py-2.5">
                  <dt className="font-sans text-small text-foreground-secondary">Item code</dt>
                  <dd className="text-right font-sans text-small tracking-[0.08em] tabular-nums">
                    {product.itemCode}
                  </dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-border py-2.5">
                  <dt className="font-sans text-small text-foreground-secondary">Production</dt>
                  <dd className="text-right font-sans text-small">Private label</dd>
                </div>
              </dl>
            </div>

            {Object.entries(specGroups).map(([group, specs]) => (
                <div key={group} className="flex flex-col gap-2">
                  <Typography variant="caption" className="text-foreground-muted">
                    {group}
                  </Typography>
                  <dl>
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between gap-6 border-b border-border py-2.5"
                      >
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
    </>
  );
}
