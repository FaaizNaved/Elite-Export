import { EditorialImage } from "@/components/evidence";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Eyebrow, Passage, Statement } from "@/components/ui/typography";
import type { Image as ImageToken } from "@/types";
import { imageSizes } from "@/utils/image";

/**
 * The chapter opening — Master Implementation Blueprint §11.1: "a statement or
 * a photograph, to mark that something new has begun, **felt before it is
 * read**." At the start of a chapter, and at the start of a surface, which is
 * the first chapter of one.
 *
 * It replaces the page hero, and three things went with that component:
 *
 * - **The overlay.** §33.1: text sits beside a photograph or below it, never on
 *   it, because text over a photograph removes part of what can be examined.
 *   §18.2 permits an overlay only under §33.2's single exception.
 * - **A fixed height.** §32.1: the container gives the width, the photograph
 *   gives the height. A `tall` / `content` prop is a box, and a box crops.
 * - **The scroll cue.** A chevron inviting a scroll is a mark carrying no
 *   argument (L14) and is not one of the four icons §43.3 permits.
 *
 * The heading rule is §22.2: at T1 the space above is at least three times the
 * space below. Here that is the chapter break above (S6) against S3 below —
 * measured at 177px against 31px, which is 5.7:1. It had been overriding the
 * chapter break down to S5, giving 2.9:1 and failing the rule the paragraph
 * above states.
 */
export interface OpeningProps {
  /** The surface's one `h1`. Rank T1 — "surface title, chapter opening" (§9.2). */
  title: string;
  /**
   * §12.3 — a location in the structure, and **at most one per surface**. It
   * exists so a visitor who arrived here directly knows where "here" is.
   */
  eyebrow?: string;
  /** One passage. Not a tagline: copy is Brand Bible §12 (MIB R6.4). */
  summary?: string;
  /**
   * The photograph, below the words and at full bleed (§31.3: bleed is the
   * default for E1, E2 and E5). It carries its own record — an image with no
   * caption is a picture, not evidence (§12.2, R12.2).
   */
  photograph?: ImageToken;
  /** Products only: the trail (R38.4). */
  breadcrumb?: React.ReactNode;
  className?: string;
}

export function Opening({
  title,
  eyebrow,
  summary,
  photograph,
  breadcrumb,
  className,
}: OpeningProps) {
  return (
    <Section break="chapter" className={className}>
      <Field type="full" className="flex flex-col">
        {breadcrumb && <div className="mb-s3">{breadcrumb}</div>}
        {eyebrow && <Eyebrow className="mb-s1">{eyebrow}</Eyebrow>}

        <Statement rank="t1" as="h1">
          {title}
        </Statement>

        {summary && <Passage className="mt-s3 text-ink-secondary">{summary}</Passage>}
      </Field>

      {photograph?.width && (
        <EditorialImage
          image={photograph}
          sizes={imageSizes.bleed}
          priority
          className="mt-s5"
        />
      )}
    </Section>
  );
}
