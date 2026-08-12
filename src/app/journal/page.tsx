import type { Metadata } from "next";
import { CHAPTERS, Opening } from "@/components/structure";
import { StateNotice } from "@/components/system";
import { TextLink } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Record, Statement } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { getArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description: "Notes on leather and manufacturing from the New Elite Exports workshop floor.",
  path: ROUTES.journal,
});

/**
 * Journal — the index.
 *
 * UX Blueprint §24: *to demonstrate knowledge of the material by telling **one
 * chapter in depth**.* Question: **"Do you know your material?"** Creative
 * Direction Book §20: *knowledge shared by someone with nothing to prove* —
 * **instructive and unhurried**, and never *content marketing, opinion, or a
 * news feed.*
 *
 * The index is MIB §12.1's *Journal index item*: **to list an article by what
 * it is about, not by when it was posted**, and it disappears *where it would
 * carry a date-led, feed-like ordering that implies a schedule*. What an article
 * is about is its chapter (R45.1, R24.2), so the chapter is what each entry
 * states and the canonical chapter order is the order it states them in —
 * §25.1 rule 1, fixed in the content layer rather than here.
 *
 * The previous index said it was not date-led in a comment while the collection
 * sorted `byNewestFirst`. That is fixed where the ordering lives.
 *
 * Two authored strings are gone from the Opening. The eyebrow read *"Notes"*,
 * which is a magazine register rather than §12.3's *location in the structure*;
 * the summary read *"What we have learned … written for buyers"*, which is
 * R24.4's forbidden move — **expertise is demonstrated, never asserted** — and
 * copy this file does not own (R6.4).
 *
 * **Nothing here ends.** R24.3: *an article ends with space, not with an
 * action*, and MIB §12.1 removes the `Continuation` on Journal by name — *it
 * ends in space*. R39.3: Journal, never. So this surface imports neither, and
 * `check:content` asserts that it cannot acquire one.
 */
export default async function JournalPage() {
  const articles = await getArticles();

  return (
    <>
      <Opening title="Journal" />

      <Section>
        <Field type="reading">
          {articles.length === 0 ? (
            /*
              R24.5: *an article exists when there is a chapter worth telling in
              depth* — there is no schedule to be behind, so the empty state is
              a fact rather than an apology (R47.1).

              `route={false}`: R39.3 keeps every enquiry path off this surface,
              and the footer's index carries the route to a person regardless.
            */
            <StateNotice state="empty" route={false}>
              Nothing has been published here yet.
            </StateNotice>
          ) : (
            <ul className="flex flex-col gap-s5">
              {articles.map((article) => (
                <li key={article.href} className="flex flex-col gap-s1">
                  {/*
                    The chapter, stated before the title: it is what the article
                    is about (R24.2), and stating it is what keeps the list from
                    reading as a set of posts on topics. Not a link — the title
                    is the article's route, and the chapter's own route is
                    inside the article (§24), where one destination per entry
                    keeps the index a record rather than a menu.
                  */}
                  <Record rank="c" tone="secondary">
                    {CHAPTERS[article.chapter].title}
                  </Record>
                  <Statement rank="t3" as="h2">
                    <TextLink href={article.href}>{article.title}</TextLink>
                  </Statement>
                  <Record tone="secondary">{article.excerpt}</Record>
                </li>
              ))}
            </ul>
          )}
        </Field>
      </Section>

      {/* No action and no continuation. R39.3 and R24.3: Journal ends in space. */}
    </>
  );
}
