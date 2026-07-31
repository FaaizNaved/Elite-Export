import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const containerVariants = cva("mx-auto w-full px-6 md:px-8", {
  variants: {
    size: {
      /** Long-form reading width — legal pages, blog bodies. */
      sm: "max-w-narrow",
      /** Standard page content. */
      md: "max-w-content",
      /** Editorial and grid-heavy sections. */
      lg: "max-w-wide",
      /** Edge-to-edge, gutters only. */
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "lg" },
});

export interface ContainerProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof containerVariants> {
  as?: ElementType;
}

export function Container({ as: Component = "div", size, className, ...props }: ContainerProps) {
  return <Component className={cn(containerVariants({ size }), className)} {...props} />;
}
