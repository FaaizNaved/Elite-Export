import type { Metadata } from "next";
import { RecordSet } from "@/components/evidence";
import { Chapter, Opening } from "@/components/structure";
import { Continuation } from "@/components/ui/action";
import { StateNotice } from "@/components/system";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { productsTelling, surfaceIndex } from "@/config";
import { ROUTES } from "@/constants";
import { getCategories } from "@/lib/content";
import { chapterFrames } from "@/lib/plates";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Equestrian tack, leather bags and accessories manufactured for export — browse the full range by category.",
  path: ROUTES.products,
});

/**
 * Products — a catalogue of capability, not an inventory of stock.
 *
 * UX Blueprint §19: *to show the breadth of what the company can make.* Its
 * question is **"What can you make?"**, and R19.1 states the failure it must
 * not become in the same breath: *no counting of items, no stock, no
 * availability, no "new", no sorting by popularity.*
 *
 * `productsTelling` carries the plan: **C6 is told** — finished work,
 * unretouched, which is §19's own evidence row and the only chapter that
 * answers the question with something observed. The other nine are handed on,
 * each to the surface that tells it whole. §7.4 is why the range itself is not
 * a chapter: **the offer is not one** — *there is no chapter that sells.*
 *
 * The order is C6 first, then the range. Creative Direction Book §17.3: a
 * sequence establishes before it examines, and a visitor cannot locate their
 * requirement inside a range they have not seen the work of.
 *
 * ### What was removed, and by which rule
 *
 * - **"3 products across 2 categories".** R19.1's first named prohibition is
 *   counting items. It was the surface's opening sentence.
 * - **"all available for private label production".** A capability claim
 *   authored in this file (R6.4, Brand Bible §19.2).
 * - **The eyebrow, the "Categories" heading and its description, and the close's
 *   sentence.** All authored here. Copy is Brand Bible §11–§12's and the
 *   copywriter's (R6.4, dependency 12).
 * - **The category thumbnails.** Generated placeholders (§24.5) — and a row of
 *   pictures beside names is the product grid this surface must never become
 *   (VDS §36.1). The finished work is C6's, at the presence §31.3 gives it.
 *
 * The title is the surface's own name from the index — UX Blueprint Part III's
 * word for it, which is where every navigation label in this system comes from
 * (Package 005) rather than a sentence written here.
 */
export default async function ProductsPage() {
  const categories = await getCategories();

  /* §19's evidence row: finished work, unretouched. The archive decides. */
  const finished = chapterFrames("C6");

  return (
    <>
      <Opening title={surfaceIndex.find((item) => item.href === ROUTES.products)?.label ?? "Products"} />

      {productsTelling.map(({ chapter, role }) =>
        role === "hands" ? null : (
          <Chapter
            key={chapter}
            id={chapter}
            opening="photograph"
            opensTheTelling
            priority
            scenes={[{ frames: finished }]}
          />
        ),
      )}

      {/*
        The range. Three levels — category, sub-category, product record (§19)
        — and this is the first of them.

        §36.2's record row, without photographs: a name, what the family is in
        construction terms, and a route into it. R19.7 keeps the structure
        honest from the content side; nothing here creates a level in advance of
        the records that justify it (X8).
      */}
      <Section break="chapter">
        <Field type="full">
          {categories.length === 0 ? (
            <StateNotice state="empty">No categories have been published yet.</StateNotice>
          ) : (
            <RecordSet
              items={categories.map((category) => ({
                href: category.href,
                title: category.name,
                summary: category.shortDescription,
              }))}
            />
          )}
        </Field>
      </Section>

      {/*
        No close, and no action.

        UX Blueprint R39.3 permitted one here. The Presentation package removed
        it on the client's instruction: the site carried the same ask on eight
        surfaces, and an ask repeated eight times is not confidence, it is
        anxiety — Brand Bible §16.4, *a luxury brand does not chase.*

        The action now stands in three places only, and each is somewhere a
        visitor has already decided something: **Home** at the end of the whole
        documentary, the **product record** where one specific piece is in front
        of them, and **Enquiry**, where the action is the surface. R39.1 is
        untouched — one action, one door, one label.

        What stands here instead is the continuation — R39.2: *a link rather
        than a demand,* naming what comes next. §8.4: a chapter ends by
        releasing, and the last thing asked is smaller than the thing before it.
      */}
      <Section break="chapter">
        <Field type="full">
          <Continuation href={ROUTES.manufacturing}>How these are made</Continuation>
        </Field>
      </Section>
    </>
  );
}
