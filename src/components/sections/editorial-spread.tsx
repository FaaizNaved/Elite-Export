import type { ReactNode } from "react";
import { ContentImage } from "@/components/ui/image";
import { Typography } from "@/components/ui/typography";
import { ImageReveal, SlideUp } from "@/components/motion";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

export interface EditorialSpreadProps {
  /** Large, quiet ordinal set above the title — "01". Optional. */
  marker?: string;
  title: string;
  description: string;
  image: ImageToken;
  /**
   * Which screen edge the photograph runs to. Alternate down a sequence so the
   * page reads as facing pages rather than a stack of identical rows.
   */
  side?: "left" | "right";
  /**
   * Desktop crop. Both are portrait on a phone regardless — a 4:3 frame at
   * 375px is 281px tall, which is a thumbnail, and this page's argument is
   * carried by the photographs.
   */
  ratio?: "landscape" | "portrait";
  /** Rendered under the paragraph — usually a quiet link. */
  action?: ReactNode;
  /** Light copy for spreads sitting on the charcoal surface. */
  tone?: "light" | "dark";
  /** First spread in a sequence loads eagerly. */
  priority?: boolean;
  className?: string;
}

/**
 * One magazine spread: a photograph running to the screen edge, and a narrow
 * column of type set against it.
 *
 * This is the page's answer to the stacked-section problem. A `Container` puts
 * every section on the same left edge at the same width, which is what makes a
 * long page read as a list of components; a spread breaks the gutter on one
 * side and alternates, so the eye crosses the page instead of running down it.
 *
 * The photograph is deliberately the larger half — seven columns against four.
 * The layout must never win an argument with the image.
 */
export function EditorialSpread({
  marker,
  title,
  description,
  image,
  side = "left",
  ratio = "landscape",
  action,
  tone = "light",
  priority = false,
  className,
}: EditorialSpreadProps) {
  const imageLeft = side === "left";

  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-12 lg:gap-0",
        className,
      )}
    >
      {/* Seven of twelve columns, running past the container gutter to the
          viewport edge. On phones it is simply full width. */}
      <ImageReveal
        amount={0.15}
        className={cn(
          "lg:col-span-7",
          imageLeft ? "lg:col-start-1" : "lg:col-start-6",
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden bg-surface-sunken",
            "aspect-[4/5]",
            ratio === "landscape" ? "lg:aspect-[4/3]" : "lg:aspect-[4/5]",
          )}
        >
          <ContentImage
            image={image}
            priority={priority}
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
      </ImageReveal>

      <SlideUp
        delay={0.1}
        className={cn(
          "flex flex-col gap-6 px-6 md:px-8 lg:col-span-4 lg:px-0",
          imageLeft ? "lg:col-start-9" : "lg:col-start-2 lg:row-start-1",
        )}
      >
        {marker && (
          <div className="flex flex-col gap-3">
            <Typography
              variant="overline"
              className={tone === "dark" ? "text-primary-foreground/50" : undefined}
            >
              {marker}
            </Typography>
            <span aria-hidden className="rule-stitch" />
          </div>
        )}

        <Typography variant="h2" as="h3" className={tone === "dark" ? "text-primary-foreground" : undefined}>
          {title}
        </Typography>

        <Typography
          variant="body"
          className={cn(
            "max-w-narrow",
            tone === "dark" ? "text-primary-foreground/70" : "text-foreground-secondary",
          )}
        >
          {description}
        </Typography>

        {action}
      </SlideUp>
    </div>
  );
}
