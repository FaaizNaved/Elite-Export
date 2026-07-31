import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const skeletonVariants = cva("bg-surface-sunken", {
  variants: {
    shape: {
      text: "h-4 rounded-badge",
      title: "h-7 rounded-badge",
      rect: "rounded-card",
      circle: "aspect-square rounded-badge",
    },
  },
  defaultVariants: { shape: "text" },
});

export interface SkeletonProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof skeletonVariants> {
  /** Sweeping highlight. Disable for very large surfaces to keep paint cheap. */
  shimmer?: boolean;
}

/**
 * Loading placeholder. Hidden from assistive technology — announce loading
 * state once, on the region that owns it, rather than per placeholder.
 */
export function Skeleton({ shape, shimmer = true, className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(skeletonVariants({ shape }), shimmer && "shimmer", className)}
      {...props}
    />
  );
}

export interface SkeletonTextProps extends Omit<SkeletonProps, "shape"> {
  /** Number of lines. The last one is shortened, the way real text wraps. */
  lines?: number;
}

export function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          shape="text"
          className={index === lines - 1 ? "w-3/5" : "w-full"}
          {...props}
        />
      ))}
    </div>
  );
}
