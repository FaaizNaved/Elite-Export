import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CHAPTERS, Opening } from "@/components/structure";
import { Prose } from "@/components/sections";
import { TextLink } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Record } from "@/components/ui/typography";
import { ROUTES } from "@/constants";
import { getArticle, getArticleRoutes } from "@/lib/content";
import { articleMetadata } from "@/lib/seo";
import { loadArticleContent } from "@/lib/mdx";
import { formatDate } from "@/utils/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleRoutes();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  return article ? articleMetadata(article) : {};
}

/**
 * The journal entry — MIB §12.1: *to present **one chapter told in depth**,
 * attributed to a named person. **It carries no action at its close, ever.***
 *
 * UX Blueprint §24's relationship note is the shape of this file: *each article
 * is one chapter told in depth (Documentary Storyboard §25.2) and **links to
 * the manufacturing chapter it belongs to**. Articles never link to Products as
 * a recommendation.*
 *
 * §25.2 gives the journal passage its own row in the medium table — *usually one
 * chapter, in depth; leading word Evidence; must never become content
 * marketing; ends by **space***. It is a telling in its own medium, which is why
 * an article telling C2 is not Quality's C2 told twice: the surfaces share one
 * telling between them (`tellings.ts`), and a journal passage is a different
 * one. What it may never do is claim the chapter — it links to where the chapter
 * is argued.
 *
 * ### Where the date went
 *
 * It was the eyebrow. §12.3 makes an eyebrow **a location in the structure**,
 * and a date in that position is the feed register R24.5 exists to refuse:
 * *publishing on a schedule turns the surface into a feed.* An article's
 * location in the structure is **the chapter it tells**, so that is the eyebrow
 * now, and R45.1's *date written* moves to the attribution at the foot, in the
 * record voice, where it is a fact about the article rather than its position in
 * a queue.
 *
 * ### The close
 *
 * **R24.3 — an article ends with space, not with an action.** *This is the one
 * surface class whose close is not a next step.* No `Close`, no `Continuation`
 * (MIB §12.1 removes it on Journal by name), no related-articles list, no
 * product recommendation. The chapter link sits at the **head**, as the
 * article's location, so that reaching the end of the body is reaching the end —
 * §24.4: *a passage that asks nothing, and then the telling stops.*
 */
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const chapter = CHAPTERS[article.chapter];
  const Content = await loadArticleContent(slug);

  return (
    <>
      <Opening
        title={article.title}
        eyebrow={chapter.title}
        summary={article.excerpt}
        /*
         * R45.1 makes the photograph optional and the model no longer demands
         * one, so an article without a frame opens on its words. §24.5 has no
         * exception for a stand-in, and X8 designs around the absence.
         */
        photograph={article.cover}
      />

      <Section>
        <Field type="reading">
          {/*
            §24: *links to the manufacturing chapter it belongs to.* At the head,
            because R24.3 will not have the ending be a next step — and because
            this is what the eyebrow above is naming. §47.5's 44px target.
          */}
          <Record rank="c" tone="secondary">
            <TextLink
              href={`${ROUTES.manufacturing}#${chapter.slug}`}
              className="inline-flex min-h-11 items-center"
            >
              {chapter.question}
            </TextLink>
          </Record>
        </Field>
      </Section>

      <Prose>
        <Content />

        {/*
          R24.6 and R45.1: **a named person who could answer a question about
          it** — rank 7, and R45.4 calls it the model *that converts a company
          into somebody*. R45.3's validation is one line — **no consent, no
          record** — and dependency 5 is blocking, which is why no article is
          published today.

          R45.1's *date written*, beside it, in the record voice. Then space.
        */}
        <Record rank="c" tone="secondary" className="mt-s5">
          Written by {article.author} · {formatDate(article.publishedAt)}
        </Record>
      </Prose>
    </>
  );
}
