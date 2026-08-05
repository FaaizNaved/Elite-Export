import { resolveIcon } from "@/components/icons";
import { FeatureCard, StatCard } from "@/components/cards";
import { SlideUp, Stagger, StaggerItem } from "@/components/motion";
import { Timeline } from "@/components/timeline";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/image";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { FeatureBlock, MilestoneBlock, PageBlocks as PageBlocksData, StatBlock } from "@/types";
import { SectionHeader } from "./section-header";

/**
 * Renderers for the structured blocks an editorial page declares in its
 * frontmatter. Every company page composes from these, so adding a stats band
 * or a process sequence to a page is a content edit, not a code change.
 */

export interface StatsBandProps {
  stats: readonly StatBlock[];
  /** Dark band, for breaking up a long ivory page. */
  tone?: "default" | "dark";
  className?: string;
}

export function StatsBand({ stats, tone = "default", className }: StatsBandProps) {
  if (stats.length === 0) return null;

  return (
    <Section
      spacing="md"
      className={cn(tone === "dark" && "bg-primary text-primary-foreground", className)}
    >
      <Container size="lg">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard
                value={stat.value}
                label={stat.label}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                animate={stat.animate}
                icon={resolveIcon(stat.icon)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

export interface FeatureGridProps {
  features: readonly FeatureBlock[];
  heading?: string;
  eyebrow?: string;
  description?: string;
  columns?: 2 | 3;
  className?: string;
}

export function FeatureGrid({
  features,
  heading,
  eyebrow,
  description,
  columns = 3,
  className,
}: FeatureGridProps) {
  if (features.length === 0) return null;

  return (
    <Section spacing="lg" className={className}>
      <Container size="lg" className="flex flex-col gap-12">
        {heading && <SectionHeader heading={heading} eyebrow={eyebrow} description={description} />}

        <Stagger
          className={cn(
            "grid gap-6",
            columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title} className="h-full">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={resolveIcon(feature.icon)}
                className="h-full"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

export interface ProcessStepsProps {
  steps: readonly PageBlocksData["steps"][number][];
  heading?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}

/**
 * Numbered sequence — manufacturing stages, quality gates, the enquiry process.
 *
 * Steps with images render as alternating editorial rows; steps without render
 * as a compact numbered list, so the same content block serves both.
 */
export function ProcessSteps({
  steps,
  heading,
  eyebrow,
  description,
  className,
}: ProcessStepsProps) {
  if (steps.length === 0) return null;

  const hasImages = steps.some((step) => step.image);

  return (
    <Section spacing="lg" className={className}>
      <Container size="lg" className="flex flex-col gap-16">
        {heading && <SectionHeader heading={heading} eyebrow={eyebrow} description={description} />}

        {hasImages ? (
          <ol className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => (
              <li key={step.title}>
                <SlideUp
                  className={cn(
                    "grid items-center gap-8 md:grid-cols-2 md:gap-12",
                    index % 2 === 1 && "md:[&>figure]:order-last",
                  )}
                >
                  {step.image && (
                    <figure className="relative aspect-[4/3] overflow-hidden rounded-image bg-surface-sunken">
                      <ContentImage image={step.image} sizes="(min-width: 768px) 50vw, 100vw" />
                    </figure>
                  )}

                  <div className="flex flex-col gap-3">
                    <Typography variant="overline" className="text-accent">
                      Stage {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h3" as="h3">
                      {step.title}
                    </Typography>
                    <Typography variant="body">{step.description}</Typography>
                  </div>
                </SlideUp>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="grid gap-px overflow-hidden rounded-card bg-border md:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 bg-surface p-8">
                <Typography variant="overline" className="text-accent">
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Typography variant="h4" as="h3">
                  {step.title}
                </Typography>
                <Typography variant="body" className="text-foreground-secondary">
                  {step.description}
                </Typography>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </Section>
  );
}

export interface MilestonesProps {
  milestones: readonly MilestoneBlock[];
  heading?: string;
  eyebrow?: string;
  className?: string;
}

export function Milestones({ milestones, heading, eyebrow, className }: MilestonesProps) {
  if (milestones.length === 0) return null;

  return (
    <Section spacing="lg" className={className}>
      <Container size="lg" className="flex flex-col gap-12">
        {heading && <SectionHeader heading={heading} eyebrow={eyebrow} />}
        <Timeline
          variant="alternating"
          entries={milestones.map((milestone) => ({
            marker: milestone.marker,
            title: milestone.title,
            description: milestone.description,
          }))}
        />
      </Container>
    </Section>
  );
}

export interface PageBlocksProps {
  blocks: PageBlocksData;
  /** Headings for the blocks that get their own section header. */
  headings?: Partial<Record<"features" | "steps" | "milestones", string>>;
}

/**
 * Renders whichever blocks a page declared, in a consistent order.
 * A page that needs a different order composes the pieces above directly.
 */
export function PageBlocks({ blocks, headings }: PageBlocksProps) {
  return (
    <>
      <StatsBand stats={blocks.stats} tone="dark" />
      <FeatureGrid features={blocks.features} heading={headings?.features} />
      {blocks.features.length > 0 && blocks.steps.length > 0 && (
        <Container size="lg">
          <Divider decorative />
        </Container>
      )}
      <ProcessSteps steps={blocks.steps} heading={headings?.steps} />
      <Milestones milestones={blocks.milestones} heading={headings?.milestones} />
    </>
  );
}
