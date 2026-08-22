import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";
import { CardImage } from "./card-image";

export type ProductCardVariant = "grid" | "featured" | "compact" | "minimal";

export interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  /** Above-the-fold cards should preload their image. */
  priority?: boolean;
  className?: string;
}

/**
 * One product card, four densities.
 *
 * - `grid`     — the default catalogue tile
 * - `featured` — taller image, larger type, for home and category highlights
 * - `compact`  — horizontal, for related products and sidebars
 * - `minimal`  — image and title only, for carousels and mega menus
 *
 * The whole card is a single link, so there is one tab stop and one target.
 */
export function ProductCard({
  product,
  variant = "grid",
  priority = false,
  className,
}: ProductCardProps) {
  const label = `${product.title}, item code ${product.itemCode}`;

  if (variant === "compact") {
    return (
      <Card variant="interactive" className={cn("flex-row items-stretch", className)}>
        <Link href={product.href} aria-label={label} className="flex flex-1 items-stretch gap-4">
          <CardImage
            image={product.gallery.thumbnail}
            ratio="square"
            sizes="120px"
            className="w-28 shrink-0"
          />
          <div className="flex flex-col justify-center gap-1 py-4 pr-4">
            <Typography variant="caption">{product.subcategoryName}</Typography>
            <CardTitle className="text-body-lg">{product.title}</CardTitle>
            <Typography variant="caption">{product.itemCode}</Typography>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === "minimal") {
    return (
      <Card variant="interactive" className={cn("border-0 bg-transparent", className)}>
        <Link href={product.href} aria-label={label} className="flex flex-col gap-3">
          <CardImage
            image={product.gallery.thumbnail}
            ratio="product"
            priority={priority}
            className="rounded-image"
          />
          <CardTitle className="text-body-lg">{product.title}</CardTitle>
        </Link>
      </Card>
    );
  }

  const featured = variant === "featured";

  /**
   * Not a card.
   *
   * This was a bordered surface carrying two badges, an item code, a
   * two-line description and a "View product →" footer — six pieces of chrome
   * around one photograph, repeated across a grid. In a showroom the object is
   * the whole proposition; the label next to it is small and says what it is.
   *
   * The photograph now sits in a plain frame with no border, the name has
   * display weight, and the only supporting text is the subcategory. The
   * item code moves to the product page, where a buyer who needs it is
   * actually looking for it.
   */
  return (
    <div className={cn("group", className)}>
      <Link href={product.href} aria-label={label} className="flex h-full flex-col gap-5">
        <div className="relative overflow-hidden bg-surface-sunken">
          <CardImage
            image={product.gallery.thumbnail}
            ratio={featured ? "portrait" : "product"}
            priority={priority}
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Typography variant="caption" as="span" className="text-foreground-muted">
            {product.subcategoryName}
          </Typography>
          <Typography
            variant="h4"
            as="h3"
            className={cn(
              "font-display font-medium transition-base group-hover:text-accent-strong",
              featured && "text-h3",
            )}
          >
            {product.title}
          </Typography>
        </div>
      </Link>
    </div>
  );
}
