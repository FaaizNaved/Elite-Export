import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { VideoPlayer } from "@/components/video";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";

export type HeroVariant = "default" | "split" | "centered" | "image" | "video" | "page";

export interface HeroProps {
  variant?: HeroVariant;
  heading: string;
  /** Small label above the heading. */
  eyebrow?: string;
  description?: string;
  /** A `Badge`, rendered above the eyebrow. */
  badge?: ReactNode;
  /** A `Breadcrumb`, rendered at the top. Typical for `page` heroes. */
  breadcrumb?: ReactNode;
  /** `Button` elements. */
  actions?: ReactNode;
  backgroundImage?: ImageToken;
  /** Right-hand column of the `split` variant — an image, card or anything. */
  media?: ReactNode;
  /** Local path or YouTube URL, used by the `video` variant. */
  videoSrc?: string;
  videoTitle?: string;
  poster?: ImageToken;
  overlay?: "none" | "soft" | "strong";
  /** Animated cue that there is more below. Decorative. */
  scrollIndicator?: boolean;
  height?: "content" | "tall" | "full";
  className?: string;
}

const overlayClasses = {
  none: "",
  soft: "bg-primary/45",
  strong: "bg-primary/70",
} as const;

const heightClasses = {
  content: "min-h-0",
  tall: "min-h-[70vh]",
  full: "min-h-dvh",
} as const;

/**
 * One hero, six layouts.
 *
 * Media-backed variants (`image`, `video`, `default`) render light text over a
 * darkened backdrop; `split`, `centered` and `page` sit on the site background.
 * All content comes from props — no variant knows what page it is on.
 */
export function Hero({
  variant = "default",
  heading,
  eyebrow,
  description,
  badge,
  breadcrumb,
  actions,
  backgroundImage,
  media,
  videoSrc,
  videoTitle = "Background video",
  poster,
  overlay = "soft",
  scrollIndicator = false,
  height,
  className,
}: HeroProps) {
  const hasBackdrop = variant === "image" || variant === "video" || Boolean(backgroundImage);
  const resolvedHeight = height ?? (variant === "page" ? "content" : hasBackdrop ? "tall" : "content");
  const centered = variant === "centered" || (hasBackdrop && variant !== "split");

  const copy = (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "items-start text-left",
      )}
    >
      {breadcrumb}
      {badge}

      {eyebrow && (
        <Typography variant="overline" className={hasBackdrop ? "text-accent" : undefined}>
          {eyebrow}
        </Typography>
      )}

      <Typography
        variant={variant === "page" ? "h1" : "display"}
        className={cn("max-w-4xl", centered && "mx-auto")}
      >
        {heading}
      </Typography>

      {description && (
        <Typography
          variant="lead"
          className={cn("max-w-2xl", hasBackdrop && "text-primary-foreground/75")}
        >
          {description}
        </Typography>
      )}

      {actions && (
        <div
          className={cn(
            "mt-2 flex flex-col gap-3 sm:flex-row sm:items-center",
            centered && "sm:justify-center",
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );

  return (
    <section
      className={cn(
        "relative isolate flex w-full flex-col justify-center overflow-hidden",
        heightClasses[resolvedHeight],
        // Full-bleed heroes sit under the fixed navbar, so they carry the
        // clearance themselves.
        hasBackdrop ? "pt-32 pb-20 text-primary-foreground md:pt-40 md:pb-28" : "pt-32 pb-16 md:pt-40 md:pb-24",
        variant === "page" && "bg-surface-sunken",
        className,
      )}
    >
      {variant === "video" && videoSrc && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <VideoPlayer src={videoSrc} title={videoTitle} poster={poster} variant="background" />
        </div>
      )}

      {backgroundImage && variant !== "video" && (
        <Image
          src={backgroundImage.src}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="-z-10 object-cover"
        />
      )}

      {hasBackdrop && overlay !== "none" && (
        <div aria-hidden className={cn("absolute inset-0 -z-10", overlayClasses[overlay])} />
      )}

      <Container size={variant === "split" ? "lg" : "md"}>
        {variant === "split" ? (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {copy}
            {media && <div className="order-first lg:order-last">{media}</div>}
          </div>
        ) : (
          copy
        )}
      </Container>

      {scrollIndicator && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-8 flex justify-center motion-safe:animate-bounce"
        >
          <Icon icon={ChevronDown} size="md" className="opacity-60" />
        </div>
      )}
    </section>
  );
}
