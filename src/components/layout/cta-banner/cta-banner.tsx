import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section, type SectionProps } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";

export interface CtaBannerProps {
  heading: string;
  description?: string;
  /** Small label above the heading. */
  eyebrow?: string;
  /** Pass `Button` elements — the banner does not decide what the action is. */
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  /** Darkened behind the copy when supplied. */
  backgroundImage?: ImageToken;
  /**
   * Second column, set opposite the copy — the enquiry timeline on the home
   * page (blueprint §9). Turns the banner into a two-column commitment block
   * without a second component.
   */
  aside?: ReactNode;
  /** Short reassurance lines under the primary action. Three at most. */
  reassurances?: readonly string[];
  /** Material identity for the section (blueprint §13). */
  texture?: SectionProps["texture"];
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}

/**
 * Full-width call to action. Reused for buyer enquiry, contact and download
 * prompts — the copy and buttons are always the caller's.
 */
export function CtaBanner({
  heading,
  description,
  eyebrow,
  primaryAction,
  secondaryAction,
  backgroundImage,
  aside,
  reassurances = [],
  texture,
  tone = "dark",
  align = "center",
  className,
}: CtaBannerProps) {
  const onDark = tone === "dark" || Boolean(backgroundImage);

  return (
    <Section
      spacing="lg"
      texture={texture}
      className={cn(
        "overflow-hidden",
        onDark ? "bg-primary text-primary-foreground" : "bg-surface-sunken text-foreground",
        className,
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage.src}
            alt=""
            fill
            aria-hidden
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          {/* Keeps text contrast above photography at any crop. */}
          <div aria-hidden className="absolute inset-0 bg-primary/75" />
        </>
      )}

      {/* A left-aligned banner shares the page's own left margin. Dropping to
          the narrower container would step its copy 200px inward from every
          section above it, and the last thing a closing section should do is
          announce that it is a different component. */}
      <Container size={aside || align === "left" ? "lg" : "md"} className="relative">
        <div className={cn(aside && "grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20")}>
        <div
          className={cn(
            "flex flex-col gap-6",
            align === "center" ? "items-center text-center" : "items-start text-left",
          )}
        >
          {/* The stitched seam, as under every section heading, so the closing
              section reads as the last chapter rather than a banner. Eyebrow and
              seam are one unit and spaced as one. */}
          {eyebrow && (
            <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
              <Typography
                variant="overline"
                className={onDark ? "text-accent" : "text-foreground-muted"}
              >
                {eyebrow}
              </Typography>
              <span aria-hidden className="rule-stitch" />
            </div>
          )}

          {/* Visually the largest heading on the page, but structurally a
              section heading — the page's own `h1` belongs to its hero. */}
          <Typography variant="h1" as="h2" className="max-w-2xl text-balance">
            {heading}
          </Typography>

          {description && (
            <Typography
              variant="lead"
              className={cn("max-w-xl", onDark && "text-primary-foreground/75")}
            >
              {description}
            </Typography>
          )}

          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center",
                align === "center" && "sm:justify-center",
              )}
            >
              {primaryAction}
              {secondaryAction}
            </div>
          )}

          {reassurances.length > 0 && (
            <ul
              className={cn(
                "mt-2 flex flex-col gap-1.5",
                align === "center" && !aside && "items-center",
              )}
            >
              {reassurances.map((line) => (
                <li
                  key={line}
                  className={cn(
                    "font-sans text-caption",
                    onDark ? "text-primary-foreground/60" : "text-foreground-muted",
                  )}
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>

          {aside}
        </div>
      </Container>
    </Section>
  );
}
