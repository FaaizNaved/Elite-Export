import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialImage, SpecificationList, SpecificationTable } from "@/components/evidence";
import { Breadcrumb } from "@/components/layout";
import { bleedsAtRank, Close, Opening } from "@/components/structure";
import { Continuation } from "@/components/ui/action";
import { Prose } from "@/components/sections";
import { Field, PairedField } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Eyebrow, Record } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { productBreadcrumbs } from "@/lib/breadcrumbs";
import { getProduct, getProductRoutes, isEvidence } from "@/lib/content";
import { breadcrumbJsonLd, productJsonLd, productMetadata } from "@/lib/seo";
import { loadProductContent } from "@/lib/mdx";
import { imageSizes } from "@/utils/image";

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

/**
 * The product record — MIB §12.1: "to be a specification: what a piece is, what
 * it is made of, how it is constructed, what varies."
 *
 * "It never carries price, stock, availability or quantity" (R19.3, R36.4), and
 * none of those fields exists in the content model, so it cannot.
 */
export default async function ProductPage({ params }: PageProps) {
  const route = await params;
  const product = await getProduct(route);
  if (!product) notFound();

  const Content = await loadProductContent(route.category, route.subcategory, route.product);

  const breadcrumbs = productBreadcrumbs(product);
  const frames = [product.gallery.thumbnail, ...product.gallery.images].filter(isEvidence);

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

      {/*
        §12.3 allows at most one eyebrow per surface, and this surface's is the
        item code below. The eyebrow here repeated the sub-category, which the
        breadcrumb states as a location already (R38.4).
      */}
      <Opening
        title={product.title}
        summary={product.shortDescription}
        breadcrumb={<Breadcrumb items={breadcrumbs} />}
      />

      <Section>
        <Field type="paired">
          <PairedField className="items-start">
            {/*
              The photographs, in sequence, each at its own height.

              They stood in a **two-column grid**. §31.1: *two photographs of
              equal weight halve each other, and comparison is a shopping
              behaviour* — the one exception is an E3 set, three to five frames
              of the same operation, which a product's views are not. A grid of
              product pictures is the inventory R19.1 forbids the whole surface
              from becoming, arriving one level down.

              `Gallery` also does not belong here: MIB §12.1 scopes the Gallery
              item to **Gallery only** (R23.3). The editorial image is §12.1's
              entry for a photograph carrying its record, and it is what a
              specification's frames are.

              The pointer-tracked zoom viewer that stood here before was removed
              by MIB §14.1 (VDS §40.3): a photograph that magnifies under the
              pointer is a second crop.

              And the frames are filtered: a photograph the archive cannot prove
              is not published (§24.4, §24.5), which is why this surface shows
              none today.
            */}
            {frames.map((frame, index) => (
              <EditorialImage
                key={frame.src}
                image={frame}
                bleed={bleedsAtRank(frame.evidenceRank)}
                sizes={imageSizes.record}
                priority={index === 0}
                className="mt-s4 first:mt-0"
              />
            ))}

            <div className="flex flex-col gap-s4">
              {/*
                The item code, stated once. The short description that stood
                beside it is already the surface's summary — L10: one fact,
                stated once, and the second statement is deleted rather than
                moved.

                §12.3 allows **at most one eyebrow per surface**. This is it;
                the "Construction" and specification-group eyebrows below became
                records, which is what a label on a set of facts is (§39.2).
              */}
              <Eyebrow>Item code {product.itemCode}</Eyebrow>

              {product.features.length > 0 && (
                <div className="flex flex-col gap-s2">
                  <Record weight="medium">Construction</Record>
                  <ul className="flex flex-col gap-s2">
                    {product.features.map((feature) => (
                      <li key={feature.title} className="flex flex-col gap-0.5">
                        <Record weight="medium">{feature.title}</Record>
                        {feature.description && (
                          <Record rank="c" tone="secondary">
                            {feature.description}
                          </Record>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Label-and-value pairs for one subject — §39.2. */}
              <SpecificationList
                entries={[
                  ...(product.material ? [{ label: "Material", value: product.material }] : []),
                  ...(product.colors.length > 0
                    ? [{ label: "Colours", value: product.colors.join(", ") }]
                    : []),
                  ...(product.sizes.length > 0
                    ? [{ label: "Sizes", value: product.sizes.join(", ") }]
                    : []),
                ]}
              />
            </div>
          </PairedField>
        </Field>
      </Section>

      <Prose>
        <Content />
      </Prose>

      {/*
        §19's relationship note: each level *links up to its parent and **across
        to the manufacturing chapter that produced the work***. Across, not
        into — a product record that narrates how the piece is made has retold
        Manufacturing, which L10 refuses (one fact, stated once) and R7.1
        answers (a reference is always preferable to a copy).

        The route is to the surface rather than to a named chapter because no
        product references one: which chapter produced a given piece is a fact
        for the content model at §43.2, not for this file to decide.
      */}
      <Section>
        <Field type="reading">
          <Continuation href={ROUTES.manufacturing}>How the work is made</Continuation>
        </Field>
      </Section>

      {product.specifications.length > 0 && (
        <Section tone="recessed">
          <Field type="record" className="flex flex-col gap-s4">
            {/*
              The heading was authored here and the eyebrow repeated the item
              code already stated above (R6.4, L10, §12.3). A specification
              table names itself by its columns (§39.1).
            */}

            {/*
              A set of facts sharing a structure is a table; two facts about one
              thing is a list (§39.1, §12.1). `SpecificationTable` refuses a
              single row for exactly that reason, so short groups fall through
              to the list on their own.
            */}
            {Object.entries(specGroups).map(([group, specs]) => (
              <div key={group} className="flex flex-col gap-s2">
                <Record weight="medium">{group}</Record>
                <SpecificationTable
                  columns={["Attribute", "Value"]}
                  rows={specs.map((spec) => [spec.label, spec.value])}
                />
                {specs.length < 2 && <SpecificationList entries={specs} />}
              </div>
            ))}
          </Field>
        </Section>
      )}

      {/*
        R19.6: **every product record ends at Enquiry, and it is the only deep
        surface that does** — a buyer here has a specific requirement and the
        next reasonable step is a conversation about it.

        The sentence that stood here read "Request a sample", which is a second
        ask in different words: R39.8 fixes the action's wording for the entire
        site, and R6.4 makes any sentence above it the copywriter's.
      */}
      <Close />
    </>
  );
}
