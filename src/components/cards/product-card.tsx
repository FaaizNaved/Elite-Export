import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";
import { CardAction } from "./card-action";
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

  return (
    <Card variant="interactive" className={className}>
      <Link href={product.href} aria-label={label} className="flex flex-1 flex-col">
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

        <CardBody>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">{product.categoryName}</Badge>
            {product.featured && !featured && <Badge variant="secondary">Featured</Badge>}
          </div>

          <CardTitle className={featured ? "text-h3" : undefined}>{product.title}</CardTitle>
          <CardDescription>{product.shortDescription}</CardDescription>
          <Typography variant="caption" className="mt-1">
            Item code {product.itemCode}
          </Typography>
        </CardBody>

        <CardFooter>
          <CardAction label="View product" />
        </CardFooter>
      </Link>
    </Card>
  );
}
