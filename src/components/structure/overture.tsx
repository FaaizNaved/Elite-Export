import { EditorialImage } from "@/components/evidence";
import { Record, Statement } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

/** The overture — Home's first screen, and the only place this is used. */
export interface OvertureProps {
  title: string;
  eyebrow?: string;
  summary?: string;
  photograph?: ImageToken;
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
        "relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-between",
        "pt-s5 pb-s5 field:pt-0",
        className,
      )}
    >
      {/*
        The board runs the full height of the screen on the trailing edge —
        a hanging hide, trimmed by the viewport rather than by a container.
      */}
      {photograph?.width && (
        <div className="order-2 mt-s5 field:absolute field:top-0 field:right-0 field:bottom-[11rem] field:z-0 field:order-none field:mt-0 field:mr-0 field:w-[38%]">
          <div data-drift="10" className="h-full">
            <EditorialImage
              image={photograph}
              sizes="(min-width: 1280px) 40vw, 100vw"
              priority
              className="field:h-full"
            />
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-field flex-1 flex-col justify-center px-6 reading:px-12 field:pt-s6">
        <div className="field:max-w-[58%]">
          {eyebrow && (
            <Record
              rank="c"
              tone="secondary"
              weight="medium"
              className="mb-s4 flex items-center gap-s3 tracking-rail uppercase"
            >
              <span aria-hidden className="h-px w-10 bg-ink-secondary/60" />
              {eyebrow}
            </Record>
          )}

          <Statement rank="h" as="h1" className="max-w-[17ch]">
            {title}
          </Statement>

          {summary && (
            <p className="mt-s4 max-w-record font-sans text-b text-pretty text-ink-secondary">
              {summary}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 order-3 mx-auto w-full max-w-field px-6 reading:px-12 field:order-none">
        <dl className="grid grid-cols-2 gap-y-s4 border-t border-hairline pt-s4 reading:grid-cols-4 reading:gap-x-s4">
          {record.map((entry) => (
            <div key={entry.label} className="flex flex-col gap-s1">
              <Record as="dt" rank="c" tone="secondary" className="tracking-rail uppercase">
                {entry.label}
              </Record>
              <Record as="dd" rank="r" className="text-ink">
                {entry.value}
              </Record>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
