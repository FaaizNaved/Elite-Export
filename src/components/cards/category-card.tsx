import Link from "next/link";
import { Card, CardBody, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { Category, Subcategory } from "@/types";
import { formatCount } from "@/utils/format";
import { CardAction } from "./card-action";
import { CardImage } from "./card-image";

export interface CategoryCardProps {
  category: Category;
  /** `overlay` puts the copy on the image — used for the home page grid. */
  variant?: "default" | "overlay";
  priority?: boolean;
  className?: string;
}

export function CategoryCard({
  category,
  variant = "default",
  priority = false,
  className,
}: CategoryCardProps) {
  const image = category.hero ?? category.thumbnail;
  const count = formatCount(category.productCount, "Product");

  if (variant === "overlay") {
    return (
      <Card variant="image" className={cn("min-h-80", className)}>
        <Link href={category.href} className="flex flex-1 flex-col justify-end">
          <CardImage
            image={image}
            ratio="portrait"
            priority={priority}
            className="absolute inset-0"
          />
          {/* Gradient keeps the copy legible over any crop. */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />

          <div className="relative flex flex-col gap-1 p-6">
            <CardTitle className="text-h3 text-primary-foreground">{category.name}</CardTitle>
            <Typography variant="caption" className="text-primary-foreground/70">
              {count}
            </Typography>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card variant="interactive" className={className}>
      <Link href={category.href} className="flex flex-1 flex-col">
        <CardImage image={image} ratio="landscape" priority={priority} />

        <CardBody>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>{category.shortDescription}</CardDescription>
          <Typography variant="caption" className="mt-1">
            {count}
          </Typography>
        </CardBody>

        <CardFooter>
          <CardAction label="Explore category" />
        </CardFooter>
      </Link>
    </Card>
  );
}

export interface SubcategoryCardProps {
  subcategory: Subcategory;
  className?: string;
}

/** Lighter sibling of `CategoryCard` for the second level of the hierarchy. */
export function SubcategoryCard({ subcategory, className }: SubcategoryCardProps) {
  return (
    <Card variant="interactive" className={className}>
      <Link href={subcategory.href} className="flex flex-1 flex-col">
        <CardImage image={subcategory.thumbnail} ratio="square" sizes="(min-width: 768px) 25vw, 50vw" />
        <CardBody className="gap-2 p-5">
          <CardTitle className="text-body-lg">{subcategory.name}</CardTitle>
          <CardDescription>{subcategory.shortDescription}</CardDescription>
        </CardBody>
      </Link>
    </Card>
  );
}
