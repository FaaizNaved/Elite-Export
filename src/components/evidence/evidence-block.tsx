import type { ReactNode } from "react";
import { PairedField } from "@/components/ui/field";
import { Record } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/action";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { imageSizes } from "@/utils/image";
import { EditorialImage } from "./editorial-image";

/**
 * The evidence block — Master Implementation Blueprint §12.1: "to bind one
 * claim to the proof of it: a mechanism described, with the photograph that
 * shows it and the record that dates it."
 *
 * R12.3 names its failure mode and the discipline that prevents it:
 *
 *   > Its failure mode is a claim built first and a photograph found
 *   > afterwards, which reverses D1 and produces illustration. The build order
 *   > inside it is fixed: **the photograph exists, then the claim is written to
 *   > it.**
 *
 * That order is expressed here as a signature: `photograph` is required and
 * `claim` is optional. A block with no photograph renders **nothing** — where
 * the proof does not exist, §12.1 says the claim goes with it (UX Blueprint E1,
 * X8). It is not possible to use this component to publish an unproven claim.
 *
 * The layout is the paired field (§29.2, §31.2): 5 + 3 with evidence leading,
 * which is the system's primary editorial unit and its characteristic
 * asymmetry.
 */
export interface EvidenceBlockProps {
  /** The proof. Without it there is no block. */
  photograph: ImageToken;
  /** The mechanism described. A passage, written to the photograph. */
  claim?: ReactNode;
  /** Annotation on the 3-unit column. */
  reversed?: boolean;
  priority?: boolean;
  className?: string;
}

export function EvidenceBlock({
  photograph,
  claim,
  reversed = false,
  priority,
  className,
}: EvidenceBlockProps) {
  if (!photograph.width || !photograph.height) return null;

  return (
    <PairedField reversed={reversed} className={cn("items-start", className)}>
      <EditorialImage image={photograph} sizes={imageSizes.evidence} priority={priority} />
      {claim && <div className="flex flex-col gap-s2">{claim}</div>}
    </PairedField>
  );
}

/**
 * The record row — Visual Design System §36.2, "what replaces it", where *it*
 * is the card.
 *
 *   > A full-width row: an image at or above threshold on the 5-unit column, a
 *   > specification beside it on the 3-unit column, a hairline separating one
 *   > row from the next. Rows are unequal in height because their images are
 *   > unequal in ratio.
 *
 * "The row is not a card unrolled. It is a record: one fact per line, aligned,
 * readable top to bottom, with an image that can actually be examined."
 *
 * It exists only where the content is a genuine set of equals, and it
 * disappears when the set has fewer than three members — then they are
 * passages, not a set.
 */
export interface RecordRowItem {
  href: string;
  title: string;
  summary?: string;
  image?: ImageToken;
}

export interface RecordSetProps {
  items: readonly RecordRowItem[];
  className?: string;
}

const MIN_SET = 3;

export function RecordSet({ items, className }: RecordSetProps) {
  if (items.length === 0) return null;

  /*
   * Below three members this is not a set. The members are still published —
   * withholding a real product because there are two of them would be a
   * content decision the layout has no business making — but they are laid out
   * as passages rather than as rows, which is what §36.2 asks for.
   */
  const asSet = items.length >= MIN_SET;

  /*
   * UX Blueprint X8: a surface is designed around the absence of images, never
   * around stand-ins — and an empty column reserved for a photograph that does
   * not exist is a stand-in made of space. Where no member of the set carries a
   * frame the pairing is not used at all, and the records take the field they
   * are set in (§29.2: a field type is a purpose, not a measurement).
   */
  const carriesFrames = items.some((item) => item.image);

  const row = (item: RecordRowItem) => (
    <div className="flex flex-col gap-s1">
      <Record as="h3" rank="r" weight="medium">
        {/*
         * §47.5: the minimum interactive target is 44 × 44px. A record's title
         * is how a visitor reaches it, so the link is given the target the rule
         * requires rather than the 22px its line box would otherwise be.
         */}
        <TextLink href={item.href} className="inline-flex min-h-11 items-center">
          {item.title}
        </TextLink>
      </Record>
      {item.summary && (
        <Record rank="r" tone="secondary">
          {item.summary}
        </Record>
      )}
    </div>
  );

  return (
    <ul className={cn("flex flex-col", asSet ? "gap-0" : "gap-s5", className)}>
      {items.map((item) => (
        <li
          key={item.href}
          className={cn(
            "py-s4 first:pt-0 last:pb-0",
            /* A hairline separates one row from the next — and nothing else. */
            asSet && "border-b border-hairline last:border-b-0",
          )}
        >
          {carriesFrames ? (
            <PairedField className="items-start">
              {item.image ? (
                <EditorialImage image={item.image} sizes={imageSizes.evidence} />
              ) : (
                <div />
              )}
              {row(item)}
            </PairedField>
          ) : (
            row(item)
          )}
        </li>
      ))}
    </ul>
  );
}
