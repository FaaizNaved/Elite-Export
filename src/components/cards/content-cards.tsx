import { Download, Quote } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Counter } from "@/components/motion/counter";
import { Card, CardBody, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Image as ImageToken, Testimonial } from "@/types";
import { countryName, flagEmoji } from "@/utils/country";
import { CardAction } from "./card-action";
import { CardImage } from "./card-image";

/**
 * Content cards that are not driven by the product catalog.
 *
 * Grouped in one file because each is small and they share the same
 * composition of `Card` parts — separate files would be more ceremony than code.
 */

/* ----------------------------------------------------------------- Feature */

export interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  /** Numbered steps — manufacturing process, quality stages. */
  step?: number;
  className?: string;
}

export function FeatureCard({ icon, title, description, step, className }: FeatureCardProps) {
  return (
    <Card variant="outlined" padding="lg" className={cn("gap-4", className)}>
      {icon && <Icon icon={icon} size="lg" tone="accent" />}
      {step !== undefined && (
        <Typography variant="overline" className="text-accent">
          {String(step).padStart(2, "0")}
        </Typography>
      )}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}

/* ----------------------------------------------------------------- Machine */

export interface MachineCardProps {
  name: string;
  description: string;
  image: ImageToken;
  href?: string;
  /** e.g. "1,200 pieces / shift". */
  capacity?: string;
  className?: string;
}

export function MachineCard({
  name,
  description,
  image,
  href,
  capacity,
  className,
}: MachineCardProps) {
  const body = (
    <>
      <CardImage image={image} ratio="landscape" />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {capacity && (
          <Typography variant="caption" className="mt-1">
            Capacity — {capacity}
          </Typography>
        )}
      </CardBody>
      {href && (
        <CardFooter>
          <CardAction label="Learn more" />
        </CardFooter>
      )}
    </>
  );

  return (
    <Card variant={href ? "interactive" : "default"} className={className}>
      {href ? (
        <Link href={href} className="flex flex-1 flex-col">
          {body}
        </Link>
      ) : (
        body
      )}
    </Card>
  );
}

/* ------------------------------------------------------------- Certificate */

export interface CertificateCardProps {
  title: string;
  issuer?: string;
  year?: number;
  preview?: ImageToken;
  /** Path to the PDF or image. Renders a download action when present. */
  fileUrl?: string;
  className?: string;
}

export function CertificateCard({
  title,
  issuer,
  year,
  preview,
  fileUrl,
  className,
}: CertificateCardProps) {
  return (
    <Card variant="default" className={className}>
      {preview && <CardImage image={preview} ratio="portrait" sizes="(min-width: 768px) 25vw, 50vw" />}
      <CardBody className="gap-2">
        <CardTitle className="text-body-lg">{title}</CardTitle>
        {(issuer || year) && (
          <Typography variant="caption">{[issuer, year].filter(Boolean).join(" · ")}</Typography>
        )}
      </CardBody>
      {fileUrl && (
        <CardFooter>
          <a
            href={fileUrl}
            download
            className="inline-flex items-center gap-2 font-sans text-small font-medium transition-fast hover:text-accent"
          >
            <Icon icon={Download} size="xs" />
            Download
          </a>
        </CardFooter>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------- Testimonial */

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "feature";
  className?: string;
}

export function TestimonialCard({
  testimonial,
  variant = "default",
  className,
}: TestimonialCardProps) {
  const isFeature = variant === "feature";

  return (
    <Card
      variant={isFeature ? "feature" : "outlined"}
      padding="lg"
      className={cn("gap-6", className)}
    >
      <Icon icon={Quote} size="lg" className={isFeature ? "text-accent" : "text-border-strong"} />

      <blockquote className={cn("font-display text-h4 font-medium text-pretty", isFeature && "text-h3")}>
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-auto flex flex-col gap-0.5">
        <Typography variant="small" as="span" className="font-medium">
          {testimonial.author}
        </Typography>
        <Typography
          variant="caption"
          as="span"
          className={isFeature ? "text-primary-foreground/60" : undefined}
        >
          {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
          {testimonial.country ? ` · ${testimonial.country}` : ""}
        </Typography>
      </figcaption>
    </Card>
  );
}

/* ----------------------------------------------------------------- Country */

export interface CountryCardProps {
  /** ISO 3166-1 alpha-2. The name and flag are derived from it. */
  code: string;
  /** Overrides the localised name when a specific wording is required. */
  name?: string;
  description?: string;
  className?: string;
}

export function CountryCard({ code, name, description, className }: CountryCardProps) {
  return (
    <Card variant="outlined" padding="md" className={cn("gap-2", className)}>
      <span aria-hidden className="text-2xl leading-none">
        {flagEmoji(code)}
      </span>
      <CardTitle className="text-body-lg">{name ?? countryName(code)}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </Card>
  );
}

/* -------------------------------------------------------------------- Stat */

export interface StatCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: LucideIcon;
  /** Counts up when scrolled into view. Off for static figures like years. */
  animate?: boolean;
  decimals?: number;
  className?: string;
  children?: ReactNode;
}

export function StatCard({
  value,
  label,
  prefix,
  suffix,
  icon,
  animate = true,
  decimals = 0,
  className,
}: StatCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {icon && <Icon icon={icon} size="md" tone="accent" />}

      <span className="font-display text-h1 font-medium">
        {animate ? (
          <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        ) : (
          <>
            {prefix}
            {value.toFixed(decimals)}
            {suffix}
          </>
        )}
      </span>

      <Typography variant="small" className="text-foreground-secondary">
        {label}
      </Typography>
    </div>
  );
}
