import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
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
  tone = "dark",
  align = "center",
  className,
}: CtaBannerProps) {
  const onDark = tone === "dark" || Boolean(backgroundImage);

  return (
    <Section
      spacing="lg"
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

      <Container size="md" className="relative">
        <div
          className={cn(
            "flex flex-col gap-6",
            align === "center" ? "items-center text-center" : "items-start text-left",
          )}
        >
          {eyebrow && (
            <Typography
              variant="overline"
              className={onDark ? "text-accent" : "text-foreground-muted"}
            >
              {eyebrow}
            </Typography>
          )}

          {/* Visually the largest heading on the page, but structurally a
              section heading — the page's own `h1` belongs to its hero. */}
          <Typography variant="h1" as="h2" className="max-w-3xl">
            {heading}
          </Typography>

          {description && (
            <Typography
              variant="lead"
              className={cn("max-w-2xl", onDark && "text-primary-foreground/70")}
            >
              {description}
            </Typography>
          )}

          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "mt-2 flex flex-col gap-3 sm:flex-row sm:items-center",
                align === "center" && "sm:justify-center",
              )}
            >
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
