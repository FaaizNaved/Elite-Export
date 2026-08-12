import Link from "next/link";
import { EditorialImage } from "@/components/evidence";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Record, Statement } from "@/components/ui/typography";
import { Mark } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

/**
 * The range — Visual Design System §36.2, *what replaces the card*, taken all
 * the way rather than half way.
 *
 *   > A full-width row: an image at or above threshold on the 5-unit column, a
 *   > specification beside it on the 3-unit column… Rows are unequal in height
 *   > because their images are unequal in ratio.
 *
 * `RecordSet` renders that shape for an index — a list of equals a visitor is
 * scanning. This is not that. Home hands on to the range once, and the two
 * lines are the two things the company makes: it is the last argument before
 * the ask and the only section on the surface whose subject is the product.
 * Rendered as an index it was two paragraphs and a link, on the surface's
 * biggest section, below its biggest heading.
 *
 * So it is composed instead of listed. Four things separate the two:
 *
 * 1. **The frame leads and it is large.** Full 5-unit column at 3:2, alternating
 *    side by side — the eye is given a new place to start on each row, which is
 *    §17.1's alternation at the scale of a section rather than of a surface.
 * 2. **The row is the target.** The whole row is one link, and the mark that
 *    says so is a rule drawn under the name — no card, no border, no lift, no
 *    shadow, and nothing scales or zooms (§42.5, §16.3).
 * 3. **It is numbered.** A range has an order and the order is a fact: 01, 02.
 *    Set at rank C beside a hairline, which is a record and not an ornament.
 * 4. **One continuation, at the end.** Not one per row: a link on every row and
 *    a link beneath them is the same door offered three times (§35.2).
 */
export interface RangeItem {
  href: string;
  name: string;
  summary?: string;
  image?: ImageToken;
}

export interface RangeProps {
  heading: string;
  description?: string;
  eyebrow?: string;
  items: readonly RangeItem[];
  /** The one link out of the section, beneath the rows. */
  continuation?: React.ReactNode;
  className?: string;
}

export function Range({
  heading,
  description,
  eyebrow,
  items,
  continuation,
  className,
}: RangeProps) {
  if (items.length === 0) return null;

  return (
    <Section break="chapter" tone="recessed" className={className}>
      <Field type="full">
        {/*
          The header is a row, not a stack.

          Stacked it was an eyebrow, a heading and a paragraph in the leading
          third of the field with 250px of nothing beneath them and the rest of
          the width empty — the exact shape §16.2's silence is not. On the
          5 + 3 the description sits beside the heading and is read with it,
          which is what a standfirst is, and the section starts as one object.
        */}
        <div
          data-reveal
          className="grid items-end gap-s3 border-b border-hairline pb-s4 paired:grid-cols-[5fr_3fr] paired:gap-8"
        >
          <div className="flex flex-col">
            {eyebrow && (
              <Record
                rank="c"
                tone="secondary"
                weight="medium"
                className="mb-s3 flex items-center gap-s2 tracking-mark uppercase"
              >
                <span aria-hidden className="h-px w-8 bg-ink-secondary" />
                {eyebrow}
              </Record>
            )}

            <Statement rank="t1" as="h2" className="max-w-reading">
              {heading}
            </Statement>
          </div>

          {description && (
            <p className="max-w-record font-sans text-b text-pretty text-ink-secondary">
              {description}
            </p>
          )}
        </div>

        <ul className="mt-s5 flex flex-col gap-s5">
          {items.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-reveal
                className={cn(
                  "group grid items-center gap-s4 paired:gap-8",
                  /*
                   * The row alternates, and the column template alternates with
                   * it — reordering alone moved the frame into the 4-unit
                   * column, so every second row was drawn smaller than the one
                   * above it. Evidence leads in size on both.
                   */
                  index % 2 === 1
                    ? "paired:grid-cols-[4fr_5fr] paired:[&>*:first-child]:order-last"
                    : "paired:grid-cols-[5fr_4fr]",
                )}
              >
                {item.image?.width && (
                  <EditorialImage
                    image={item.image}
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    stitched
                  />
                )}

                <div className="flex flex-col">
                  <Record
                    rank="c"
                    tone="secondary"
                    weight="medium"
                    className="mb-s3 flex items-center gap-s2 tracking-mark"
                  >
                    <span aria-hidden className="h-px w-6 bg-ink-secondary" />
                    {String(index + 1).padStart(2, "0")}
                  </Record>

                  <Statement rank="t2" as="h3">
                    <span className="rule-grow">{item.name}</span>
                  </Statement>

                  {item.summary && (
                    <p className="mt-s3 max-w-record font-sans text-b text-pretty text-ink-secondary">
                      {item.summary}
                    </p>
                  )}

                  {/*
                    The row's own mark: the one glyph §43.3 permits for
                    direction, at rank C beside the words it belongs to. It is
                    not a button and it is not repeated — the row is the target
                    and this is what says so.
                  */}
                  <Record
                    rank="c"
                    weight="medium"
                    className="mt-s4 inline-flex items-center gap-s2 tracking-mark uppercase"
                  >
                    <span className="rule-grow">The {item.name.toLowerCase()} range</span>
                    <Mark name="arrow" />
                  </Record>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {continuation && <div className="mt-s5 border-t border-hairline pt-s4">{continuation}</div>}
      </Field>
    </Section>
  );
}
