import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordSet } from "@/components/evidence";
import { Breadcrumb } from "@/components/layout";
import { Opening } from "@/components/structure";
import { StateNotice } from "@/components/system";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Passage } from "@/components/ui/typography";
import { categoryBreadcrumbs } from "@/lib/breadcrumbs";
import { getCategory, getCategoryRoutes } from "@/lib/content";
import { categoryMetadata } from "@/lib/seo";

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
 * The category record — MIB §12.1: "to name a family of work in construction
 * terms." It disappears with fewer than three products: then it is a product,
 * one level up (R19.7). The Category gate at `check:publication` refuses those
 * rather than the surface hiding them.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  return (
    <>
      {/*
        The hero photograph is gone: the frames content names here are generated
        placeholders (§24.5), and finished work is C6's, shown at the presence
        §31.3 gives it rather than as a banner. The eyebrow said "Category",
        which is a label for the thing it sits on — §12.3 wants a location in
        the structure, and the breadcrumb already is one (R38.4).
      */}
      <Opening
        title={category.name}
        summary={category.shortDescription}
        breadcrumb={<Breadcrumb items={categoryBreadcrumbs(category)} />}
      />

      {category.description && (
        <Section>
          <Field type="reading">
            <Passage>{category.description}</Passage>
          </Field>
        </Section>
      )}

      {/*
        R19.1: **no counting of items.** The eyebrow here read "3 products", and
        a heading above it read "Browse by type" — a count is an inventory
        statement and the heading was authored in this file (R6.4). The records
        name themselves.
      */}
      <Section break="chapter">
        <Field type="full" className="flex flex-col gap-s4">
          {category.subcategories.length === 0 ? (
            <StateNotice state="empty">
              Nothing has been published in this category yet.
            </StateNotice>
          ) : (
            <RecordSet
              items={category.subcategories.map((subcategory) => ({
                href: subcategory.href,
                title: subcategory.name,
                summary: subcategory.shortDescription,
              }))}
            />
          )}
        </Field>
      </Section>

      {/* No second product list. R38.3: a fact links once per surface. */}

      {/*
        No action, and no continuation either.

        R39.3 permitted an action here, and the Presentation package removed it
        on the client's instruction: a category page is a place a visitor is
        still choosing, and an ask arriving before the choice is made is an ask
        arriving early. The product record is where one piece is in front of
        them, and that is where it now stands.

        No continuation either, because the subcategory list above **is** the
        continuation — R38.3: a fact links once per surface, and a second link
        to the same place is the one that gets ignored.
      */}
    </>
  );
}
