import type { ReactNode } from "react";
import { Record, Statement } from "@/components/ui/typography";
import { ContentImage } from "@/components/ui/image";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { imageSizes } from "@/utils/image";

/**
 * The held moment — one viewport, one element, nothing else in view.
 */
export interface HeldMomentProps {
  photograph?: ImageToken;
  statement?: ReactNode;
  /** A single line beneath the statement, at rank C. Not a second statement. */
  mark?: string;
  className?: string;
}

export function HeldMoment({ photograph, statement, mark, className }: HeldMomentProps) {
  const element = photograph?.width ? "photograph" : statement ? "statement" : "none";

  return (
    <div
      className={cn(
        "relative flex min-h-s7 w-full flex-col justify-center overflow-hidden",
        className,
      )}
      aria-hidden={element === "none" ? true : undefined}
    >
      {element === "photograph" && photograph && (
        <ContentImage image={photograph} sizes={imageSizes.bleed} />
      )}

      {element === "statement" && (
        <div className="mx-auto w-full max-w-field px-6 reading:px-12">
          <div data-reveal className="max-w-[20rem] reading:max-w-[46rem] field:max-w-[54rem]">
            <span aria-hidden className="mb-s5 block h-px w-14 bg-ink-secondary-inverse/70" />
            <Statement rank="d" as="p" className="reading:max-w-none">
              {statement}
            </Statement>
            {mark && (
              <Record
                rank="c"
                className="mt-s5 tracking-rail text-ink-secondary-inverse uppercase"
              >
                {mark}
              </Record>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
