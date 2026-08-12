import { EditorialImage } from "@/components/evidence";
import { Field } from "@/components/ui/field";
import { Record, Statement } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

/**
 * The overture — Home's first screen, and the only place this component is
 * used.
 *
 * `Opening` is the chapter opening every other surface arrives on: a title, a
 * passage, and a photograph beneath them. On Home it produced a paragraph
 * floating in 700px of nothing, because a surface title is not an arrival — it
 * is a label, and a label is what a document has when nobody has decided what
 * the first screen is *for*.
 *
 * This is what it is for: a visitor should know, before reading a word, that
 * they are looking at a manufacturer. Four things do that and there is nothing
 * else in the field:
 *
 * 1. **A statement at rank H**, set in the serif, three lines at most. It is
 *    the company speaking, at the one size above D, once on the whole site.
 * 2. **A frame with real extent**, held on the trailing column and running to
 *    the edge of the viewport. §33.1 forbids text over a photograph, so the two
 *    are placed side by side rather than stacked — which is also the only
 *    composition in which both reach the first screen.
 * 3. **The record**, at the foot of the field: place, trade, standing. Facts
 *    from `config/company.ts` and nothing authored here (R7.1, Brand Bible
 *    §19.2). It is the line that separates a manufacturer from a brand.
 * 4. **No action.** R39.3: the ask is once, at the close, after the argument.
 *    A visitor who has been here four seconds has not been given an argument.
 *
 * §22.2's heading rule holds: the space above the statement is more than three
 * times the space below it.
 */
export interface OvertureProps {
  /** The surface's one `h1`. */
  title: string;
  /** §12.3 — where you are. At most one per surface. */
  eyebrow?: string;
  /** One passage, beneath the statement. Not a tagline (MIB R6.4). */
  summary?: string;
  /** The frame on the trailing column. Portrait: it is a column, not a band. */
  photograph?: ImageToken;
  /**
   * The record at the foot — label and value pairs, from the company record.
   * Four at most: a fifth is a specification table, and this is an arrival.
   */
  record?: ReadonlyArray<{ label: string; value: string }>;
  className?: string;
}

export function Overture({
  title,
  eyebrow,
  summary,
  photograph,
  record = [],
  className,
}: OvertureProps) {
  return (
    <section
      className={cn(
        /*
         * One screen, and the bar is inside it rather than above it — the
         * masthead is `sticky` and therefore in the flow, so the field below
         * subtracts it. `min-h` rather than `h`: on a short landscape window
         * the content sets the height and nothing is cropped.
         */
        "relative flex min-h-[calc(100svh-6.5rem)] flex-col justify-between",
        "pt-s4 pb-s3",
        className,
      )}
    >
      {/*
        8 + 4, not 5 + 3.

        The pair on this row is not evidence and its annotation — it is the
        statement and the frame, and the statement is what has to arrive first
        (§20). At 5 + 3 the frame took a third of the field and, at the ratio a
        column of leather wants, stood 700px tall: the first screen then could
        not hold both, and the statement was pushed below the fold on a 900px
        window. The frame is narrower and taller here, which is the shape it
        should have been — a hide hangs, it does not lie down.
      */}
      <Field
        type="full"
        /*
          The trailing margin is dropped rather than pulled back with a negative
          one: §24.1 already says what the right edge should do — below 1440 the
          field is the viewport and the frame reaches its edge; above it the
          field is centred and the surplus becomes margin. Removing the padding
          expresses exactly that, at every width, with no arithmetic.
        */
        className="grid flex-1 items-center gap-s5 field:grid-cols-[8fr_4fr] field:gap-8 field:pr-0"
      >
        <div className="flex flex-col">
          {eyebrow && (
            <Record
              rank="c"
              tone="secondary"
              weight="medium"
              className="mb-s3 flex items-center gap-s2 tracking-mark uppercase"
            >
              {/*
                The rule before the location — one hairline, 32px, the mark a
                masthead uses to say *this is a dateline*. It is the fourth of
                §16.4's permitted uses and it carries the same argument the
                eyebrow does, which is why it is beside it rather than anywhere
                else on the surface.
              */}
              <span aria-hidden className="h-px w-8 bg-ink-secondary" />
              {eyebrow}
            </Record>
          )}

          <Statement rank="h" as="h1">
            {title}
          </Statement>

          {summary && (
            <p className="mt-s4 max-w-record font-sans text-b text-pretty text-ink-secondary">
              {summary}
            </p>
          )}
        </div>

        {/*
          The frame. It runs off the trailing edge of the viewport on a wide
          field — an image that continues past the edge of the field implies a
          world that continues past the edge of the frame (§31.3) — and it is
          the first thing on the site that has any mass at all.
        */}
        {photograph?.width && (
          <div className="-mr-6 reading:-mr-12 field:mr-0">
            <EditorialImage
              image={photograph}
              sizes="(min-width: 1280px) 36vw, 100vw"
              priority
              stitched
            />
          </div>
        )}
      </Field>

      {/*
        The record — the foot of the first screen, on a hairline.

        It exists because the first screen was 38% empty and because a buyer
        deciding whether to read on is deciding whether this is a factory. Four
        facts, each checkable, set as a record rather than as a claim: no
        adjectives, no icons, no badges, no counters.
      */}
      {record.length > 0 && (
        <Field type="full" className="mt-s4">
          <dl className="grid grid-cols-2 gap-x-s4 gap-y-s3 border-t border-hairline pt-s3 reading:grid-cols-4">
            {record.map((entry) => (
              <div key={entry.label} className="flex flex-col gap-1">
                <Record as="dt" rank="c" tone="secondary" className="tracking-mark uppercase">
                  {entry.label}
                </Record>
                <Record as="dd" rank="r">
                  {entry.value}
                </Record>
              </div>
            ))}
          </dl>
        </Field>
      )}
    </section>
  );
}
