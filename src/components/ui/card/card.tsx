import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * The base card for the whole application.
 *
 * Every card in the product follows the same rhythm — media, title,
 * description, action — which is what keeps grids of different content types
 * looking like one system. Compose it from the parts below rather than
 * building bespoke card markup.
 */
export const cardVariants = cva("group relative flex flex-col overflow-hidden rounded-card", {
  variants: {
    variant: {
      default: "border border-border bg-surface",
      elevated: "bg-surface shadow-md",
      outlined: "border border-border-strong bg-transparent",
      /** Lifts on hover — use when the whole card is a link. */
      interactive:
        "border border-border bg-surface transition-premium hover:-translate-y-1 hover:border-border-strong hover:shadow-lg motion-reduce:hover:translate-y-0",
      /** Editorial highlight — dark, for feature blocks on ivory backgrounds. */
      feature: "bg-primary text-primary-foreground",
      /** Media-led: the image is the card, content overlays it. */
      image: "bg-primary text-primary-foreground",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: { variant: "default", padding: "none" },
});

export interface CardProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {
  as?: ElementType;
}

export function Card({ as: Component = "div", variant, padding, className, ...props }: CardProps) {
  return <Component className={cn(cardVariants({ variant, padding }), className)} {...props} />;
}

/**
 * Media slot. Pass `next/image` (or any element) as a child — it is stretched
 * to fill, and zooms slightly when an `interactive` card is hovered.
 */
export function CardMedia({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-sunken", className)} {...props}>
      <div className="size-full transition-premium group-hover:scale-[1.02] motion-reduce:group-hover:scale-100 [&>*]:size-full [&>img]:object-cover">
        {children}
      </div>
    </div>
  );
}

export function CardBody({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-1 flex-col gap-3 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return <h3 className={cn("font-display text-h4 font-medium text-balance", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("font-sans text-small text-foreground-secondary text-pretty", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-auto flex items-center gap-3 px-6 pb-6", className)} {...props} />;
}
