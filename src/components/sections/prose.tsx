import type { ReactNode } from "react";
import { Field, ReadingColumn } from "@/components/ui/field";
import { Section } from "@/components/ui/section";

export interface ProseProps {
  children: ReactNode;
  /** Wrap in a `Section` + `Field`. Off when already inside one. */
  standalone?: boolean;
  className?: string;
}

/**
 * The reading passage — Master Implementation Blueprint §11.1: "to carry the
 * argument in continuous prose at the measure. Wherever a surface must explain
 * rather than show."
 *
 * When it disappears: **after eight consecutive paragraphs — an element must
 * intervene** (VDS §10.5). Beyond that "the surface has become a document, and
 * a document somebody must read to reach the evidence has reversed D1". That
 * is a content obligation rather than a render-time one; it is checkable
 * against an MDX body and is recorded as debt rather than guessed at here.
 *
 * The measure is the reading column — 640px, 66 characters at 18px (§10.1) —
 * and every other number in the grid follows from it.
 */
export function Prose({ children, standalone = true, className }: ProseProps) {
  const body = <ReadingColumn className={className}>{children}</ReadingColumn>;

  if (!standalone) return body;

  return (
    <Section>
      <Field type="reading">{body}</Field>
    </Section>
  );
}
