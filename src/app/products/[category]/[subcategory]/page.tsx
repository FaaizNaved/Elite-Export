import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordSet } from "@/components/evidence";
import { Breadcrumb } from "@/components/layout";
import { Opening, SiblingIndex } from "@/components/structure";
import { StateNotice } from "@/components/system";
import { Field } from "@/components/ui/field";
import { Passage } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { subcategoryBreadcrumbs } from "@/lib/breadcrumbs";
import { getCategory, getProducts, getSubcategory, getSubcategoryRoutes } from "@/lib/content";
import { categoryMetadata } from "@/lib/seo";

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
      {/* Placeholder frame removed (§24.5); the breadcrumb states the location (§12.3, R38.4). */}
      <Opening
        title={subcategory.name}
        summary={subcategory.shortDescription}
        breadcrumb={<Breadcrumb items={subcategoryBreadcrumbs(category, subcategory)} />}
      />

      <Section break="chapter">
        <Field type="full" className="flex flex-col gap-s4">
          {/*
            R19.1: no counting of items. The eyebrow read "2 products" and the
            heading was assembled in this file from the sub-category's name.
            What the family is, is the sub-category's own description.
          */}
          {subcategory.description && <Passage>{subcategory.description}</Passage>}

          {products.length === 0 ? (
            <StateNotice state="empty">
              Nothing has been published in this subcategory yet.
            </StateNotice>
          ) : (
            <RecordSet
              items={products.map((product) => ({
                href: product.href,
                title: product.title,
                summary: product.shortDescription,
              }))}
            />
          )}

          {/* R37.8: siblings and the route up, within a surface that has depth. */}
          <SiblingIndex
            parent={{ href: category.href, label: category.name }}
            siblings={category.subcategories.map((sibling) => ({
              href: sibling.href,
              label: sibling.name,
            }))}
            current={subcategory.href}
            className="mt-s4"
          />
        </Field>
      </Section>

      {/*
        No action. **R19.6: every product record ends at Enquiry, and it is the
        only deep surface that does** — a buyer at a record has a specific
        requirement, and a buyer three levels up is still reading the range.
        R39.3's table agrees by omission: it names Products, Products — category
        and Products — product record, and no subcategory row.

        A `Close` stood here citing R39.3, which is the shape of drift the Action
        gate was supposed to catch and could not: it reads content, and where an
        action renders is a fact about a page file. `check:content` now asserts
        R39.3's table against the imports directly.
      */}
    </>
  );
}
