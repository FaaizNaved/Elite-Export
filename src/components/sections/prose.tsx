import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

export interface ProseProps {
  children: ReactNode;
  /** Wrap in a `Section` + `Container`. Off when already inside one. */
  standalone?: boolean;
  className?: string;
}

/**
 * Reading column for rendered MDX bodies.
 *
 * Element styling comes from the global MDX mappings; this only sets the
 * measure. Long-form copy is capped at the narrow container because line
 * length, not viewport width, is what makes editorial text readable.
 */
export function Prose({ children, standalone = true, className }: ProseProps) {
  const body = <div className={cn("max-w-narrow", className)}>{children}</div>;

  if (!standalone) return body;

  return (
    <Section spacing="lg">
      <Container size="lg">{body}</Container>
    </Section>
  );
}
