import { AspectRatio, type AspectRatioName } from "@/components/ui/aspect-ratio";
import { CardMedia } from "@/components/ui/card";
import { ContentImage } from "@/components/ui/image";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";

export interface CardImageProps {
  image: ImageToken;
  ratio?: AspectRatioName;
  /** Responsive size hint. Defaults to a three-up grid on desktop. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * The image slot shared by every card type.
 *
 * Exists so ratio, blur placeholder, object-fit and the hover zoom are defined
 * once rather than repeated in ten card components.
 */
export function CardImage({
  image,
  ratio = "landscape",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
}: CardImageProps) {
  return (
    <CardMedia className={cn(className)}>
      <AspectRatio ratio={ratio}>
        {/* Eager, not preloaded. `preload` injects a <link> in the head and
            the docs reserve it for a single LCP element; a grid has several
            candidates depending on viewport. All `priority` means here is
            "above the fold — do not lazy-load this one". */}
        <ContentImage
          image={image}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
        />
      </AspectRatio>
    </CardMedia>
  );
}
