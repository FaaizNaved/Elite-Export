import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Record } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

/**
 * The coda — how the surface ends.
 *
 * It does not ask for anything. A house that makes what it sells closes on a
 * sentence and a door, and the door leads further into the work rather than
 * into a form.
 */
export interface CodaProps {
  statement: string;
  /** A short line beneath, at rank C. */
  mark?: string;
  /** One quiet way onward. Never an enquiry. */
  continuation?: React.ReactNode;
  className?: string;
}

export function Coda({ statement, mark, continuation, className }: CodaProps) {
  return (
    <Section break="chapter" className={cn("overflow-hidden", className)}>
      <Field type="full">
        <div data-reveal className="grid gap-s5 paired:grid-cols-12 paired:gap-8">
          <div className="paired:col-span-9">
            <span aria-hidden className="mb-s5 block h-px w-14 bg-hairline" />
            <p className="font-serif text-coda text-balance hyphens-none">{statement}</p>
          </div>

          <div className="flex flex-col justify-end gap-s4 paired:col-span-3 paired:col-start-10">
            {mark && (
              <Record rank="c" tone="secondary" className="tracking-rail uppercase">
                {mark}
              </Record>
            )}
            {continuation}
          </div>
        </div>
      </Field>
    </Section>
  );
}
