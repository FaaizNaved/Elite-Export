import Image from "next/image";
import { AspectRatio, type AspectRatioName } from "@/components/ui/aspect-ratio";
import { CardMedia } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Image as ImageToken } from "@/types";
import { BLUR_DATA_URL } from "@/utils/image";

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
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </AspectRatio>
    </CardMedia>
  );
}
