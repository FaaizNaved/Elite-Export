import Link from "next/link";
import { EditorialImage } from "@/components/evidence";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Record, Statement } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

/** The range — a catalogue spread, not an index. */
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
        <div data-reveal className="grid gap-s4 paired:grid-cols-12 paired:gap-8">
          {eyebrow && (
            <Record
              rank="c"
              tone="secondary"
              weight="medium"
              className="flex items-center gap-s3 tracking-rail uppercase paired:col-span-12"
            >
              <span aria-hidden className="h-px w-10 bg-ink-secondary/60" />
              {eyebrow}
            </Record>
          )}

          <Statement rank="d" as="h2" className="paired:col-span-7 reading:max-w-none">
            {heading}
          </Statement>

          {description && (
            <p className="self-end font-sans text-b text-pretty text-ink-secondary paired:col-span-4 paired:col-start-9">
              {description}
            </p>
          )}
        </div>

        {/* The spreads. Unequal, offset, and never twice the same. */}
        <ul className="mt-s6 flex flex-col gap-s6">
          {items.map((item, index) => {
            const leading = index % 2 === 0;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-reveal
                  className="group grid gap-s4 paired:grid-cols-12 paired:items-end paired:gap-8"
                >
                  {item.image?.width && (
                    <div
                      data-drift={leading ? "12" : "-12"}
                      className={cn(
                        "paired:col-span-7",
                        leading ? "paired:col-start-1" : "paired:col-start-6",
                      )}
                    >
                      <EditorialImage image={item.image} sizes="(min-width: 1024px) 62vw, 100vw" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex flex-col paired:col-span-4 paired:pb-s5",
                      leading ? "paired:col-start-9" : "paired:col-start-1 paired:row-start-1",
                    )}
                  >
                    <Record
                      rank="c"
                      tone="secondary"
                      weight="medium"
                      className="mb-s3 tracking-rail"
                    >
                      {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </Record>

                    <Statement rank="t1" as="h3">
                      <span className="rule-grow">{item.name}</span>
                    </Statement>

                    {item.summary && (
                      <p className="mt-s3 font-sans text-r text-pretty text-ink-secondary">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {continuation && (
          <div data-reveal className="mt-s6 border-t border-hairline pt-s4">
            {continuation}
          </div>
        )}
      </Field>
    </Section>
  );
}
