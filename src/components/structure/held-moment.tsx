import type { ReactNode } from "react";
import { Statement } from "@/components/ui/typography";
import { ContentImage } from "@/components/ui/image";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { imageSizes } from "@/utils/image";

/**
 * The held moment — Visual Design System §23.4, Master Implementation
 * Blueprint §11.1.
 *
 * R11.3 explains why it is a component at all: "the held moment is a
 * component, not an absence. It is listed here because things that are not
 * built do not survive a sprint."
 *
 * §23.4 measures it, and every row is expressed below:
 *
 *   Extent    ≥ one viewport height, never less than 560px  → S7
 *   Contents  **one element, or none**
 *   Persistent elements in view  **zero**
 *   Frequency exactly one per surface longer than three viewport heights
 *
 * **The zero is the rule.** Creative Direction Book §22.4: space around an
 * element that still shares its field with a persistent control is not
 * silence, it is padding. A held moment with a sticky header in it does not
 * exist, however much space it has. Nothing in this system is sticky — the
 * navigation has been `position: static` since the navigation package and the
 * back-to-top, sticky CTA and chat widget were removed before that — so the
 * zero holds structurally rather than by a rule somebody has to remember.
 *
 * "Never removed to fit content; the content is removed instead" (§11.1).
 */
export interface HeldMomentProps {
  /**
   * One element, or none. A photograph at or above the evidence threshold, a
   * single statement, or nothing at all — and the union is exclusive because
   * two of them would be two elements.
   */
  photograph?: ImageToken;
  statement?: ReactNode;
  className?: string;
}

export function HeldMoment({ photograph, statement, className }: HeldMomentProps) {
  /* One element, or none. If a caller passes both, the photograph is the moment. */
  const element = photograph?.width ? "photograph" : statement ? "statement" : "none";

  return (
    <div
      /*
       * S7 is `max(100svh, 30rem)` — one viewport height, floored at 480 on a
       * small field and 560 on a wide one per §23.4. The token carries the
       * number; nothing is typed here.
       */
      className={cn("flex min-h-s7 w-full flex-col justify-center", className)}
      aria-hidden={element === "none" ? true : undefined}
    >
      {element === "photograph" && photograph && (
        <ContentImage image={photograph} sizes={imageSizes.bleed} />
      )}
      {element === "statement" && (
        <div className="mx-auto w-full max-w-field px-6 reading:px-12">
          <Statement rank="d" as="p">
            {statement}
          </Statement>
        </div>
      )}
    </div>
  );
}
