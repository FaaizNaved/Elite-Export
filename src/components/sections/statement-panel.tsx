import { Reveal, SlideUp } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export interface StatementPanelProps {
  /** One sentence. If it needs a comma and a conjunction, it is two sentences. */
  statement: string;
  /** The place, set as a signature — "Kanpur, India". */
  caption?: string;
  /**
   * Heading level. Defaults to `h2`; the page hero owns the `h1` and
   * `Typography`'s display variant renders an `h1` unless told otherwise.
   */
  as?: "h2" | "h3" | "p";
  className?: string;
}

/**
 * The last thing on the page: one sentence and the place it was made.
 *
 * This was a charcoal block roughly 900px tall with a gradient wash, a
 * supporting paragraph and a gold caption — a second hero at the end of the
 * page, arriving directly after the dark machinery section and directly before
 * the dark footer. Three dark blocks in a row read as a page running out of
 * ideas, and a statement shouted at that size stops being a statement.
 *
 * It is now set on the page's own ivory, in dark serif, with more air around it
 * than anything else on the site. A signature is small, it sits in white space,
 * and it is the last mark on the page rather than the loudest.
 */
export function StatementPanel({
  statement,
  caption,
  as = "h2",
  className,
}: StatementPanelProps) {
  return (
    <Section
      spacing="none"
      className={cn("bg-background py-40 md:py-56 lg:py-64", className)}
    >
      <Container size="lg">
        <div className="flex max-w-3xl flex-col">
          {/* The brass seam survives in exactly two places on the site. This is
              one of them, which is the only reason it still means anything. */}
          <span aria-hidden className="rule-stitch mb-14 md:mb-16" />

          <Reveal amount={0.4}>
            <Typography variant="display" as={as} className="text-foreground">
              {statement}
            </Typography>
          </Reveal>

          {caption && (
            <SlideUp delay={0.15} amount={0.4} className="mt-16 md:mt-20">
              <p className="font-sans text-caption tracking-[0.22em] uppercase text-foreground-muted">
                {caption}
              </p>
            </SlideUp>
          )}
        </div>
      </Container>
    </Section>
  );
}
