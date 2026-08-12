import { Action } from "@/components/ui/action";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Passage, Statement } from "@/components/ui/typography";

/**
 * The close — where the surface's one action lives.
 *
 * UX Blueprint R39.3 fixes where it appears: **once, at the close, after the
 * argument** — Home, Manufacturing, Products (category and record), Quality,
 * Export, About. R39.3 also fixes where it never does: Technology, Gallery,
 * Journal and every system surface. This component is not imported by those
 * five, and that absence is the enforcement.
 *
 * It replaced a banner that carried a heading, a description, an eyebrow, a
 * primary action, a **secondary** action, a background photograph, an aside
 * and three "reassurance" lines. Every one of those is removed by name:
 *
 * - Two actions — §35.2: "there is no secondary button. A second action on a
 *   surface is a second door, and offering two doors is the visible form of not
 *   knowing what the visitor came for."
 * - A tinted band — §23.6 rations the inverted field to one per surface at a
 *   minimum of one viewport height; a short tinted strip is a decorative stripe.
 * - A background photograph — §33.1, and §32.1: a background image is
 *   cover-fitted by definition, which is a second crop.
 * - Reassurance lines — Brand Bible §16.4: a luxury brand does not chase.
 *
 * §23.3: a chapter ends by releasing. The last thing asked is smaller than the
 * thing before it, which is why the statement sits above the action and the
 * action is the size of its label.
 */
export interface CloseProps {
  /**
   * The statement that precedes the ask. Copy is Brand Bible §12 and the
   * surface's, not this component's (MIB R6.4).
   */
  statement?: string;
  /**
   * What happens after the ask, stated plainly. It is not a second pitch and
   * not reassurance (Brand Bible §16.4): it is the process, so a buyer knows
   * what they are starting. Copy is the surface's (MIB R6.4).
   */
  description?: string;
  /**
   * The surface's atmosphere mark, if it spends one here. A class, not a
   * variant: §14.5's marks are a property of the *field* a surface composes,
   * not a setting this component offers, and giving it a `texture` prop is how
   * the removed `Section` texture variant came back.
   */
  className?: string;
}

export function Close({ statement, description, className }: CloseProps) {
  return (
    <Section break="chapter" className={className}>
      {/*
        §23.3: a chapter ends by releasing, and the last thing asked is smaller
        than the thing before it. The statement is held at the reading measure
        rather than run across the whole field — a closing line at 131
        characters is the same failure the chapters above had, and it is worse
        here because this line is the one the visitor is meant to act on.
      */}
      <Field type="full">
        <div
          data-reveal
          /*
            The invitation, composed rather than stacked.

            It was a heading with a black rectangle beneath it in an otherwise
            empty field — the one moment on the surface that looked like a form.
            It is now a record: a hairline across the field, the ask on the
            leading column at the peak register, and what actually happens next
            beside it on the trailing one. The action is still one action, still
            once, still after the argument (R39.3, §35.2) — nothing was added to
            the ask, only to what the reader knows before making it.
          */
          className="grid gap-s4 border-t border-hairline pt-s5 paired:grid-cols-[5fr_3fr] paired:gap-8"
        >
          <div className="flex flex-col gap-s4">
            {statement && (
              <Statement rank="t1" as="h2" className="max-w-reading">
                {statement}
              </Statement>
            )}
            <Action />
          </div>

          {description && (
            <Passage className="max-w-record self-end text-ink-secondary">{description}</Passage>
          )}
        </div>
      </Field>
    </Section>
  );
}
