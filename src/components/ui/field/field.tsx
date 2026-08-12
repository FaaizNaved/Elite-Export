import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * The four field types — Visual Design System §29.2, and the set is complete.
 * "Every surface in this brand is built from these and nothing else."
 *
 * This replaces the container that offered `sm` / `md` / `lg` / `full`. §27.2
 * is explicit that no such set exists: "there is no 'narrow', 'medium', 'wide'
 * set of arbitrary widths — every one of these is the output of a
 * measurement." A caller choosing a t-shirt size is choosing a width; a caller
 * choosing a field is choosing what the field is for, and the width follows.
 *
 * Margins are §24.1 and are not a per-field decision: 24 below 720px, 48 from
 * 720 to 1535, and above 1536 the 1440px field is centred and the surplus
 * becomes margin. On a very wide screen this system does not stretch — it
 * gains silence (Brand Bible §16.2).
 */
const fieldVariants = cva("mx-auto w-full px-6 reading:px-12", {
  variants: {
    type: {
      /**
       * The reading field — reading column, annotation column right.
       * Argument, process, any continuous passage.
       */
      reading: "max-w-field",
      /**
       * The paired field — 5 + 3 or 3 + 5, evidence leading. The primary
       * editorial unit. The columns themselves are `PairedField` below.
       */
      paired: "max-w-field",
      /** The full field — 8 units. For full bleed, use `bleed`. */
      full: "max-w-field",
      /**
       * The record field — single column on Recessed. §36.3: the one permitted
       * container in the system, with no border and no radius. It exists to
       * bind a specification into one object.
       */
      record: "max-w-field",
      /**
       * Edge to edge of the viewport, including below 720px. §27.3: a
       * photograph is never inset by the page margin on a small field.
       */
      bleed: "max-w-none px-0 reading:px-0",
    },
  },
  defaultVariants: { type: "full" },
});

export interface FieldProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof fieldVariants> {
  as?: ElementType;
}

export function Field({ as: Component = "div", type, className, ...props }: FieldProps) {
  return <Component className={cn(fieldVariants({ type }), className)} {...props} />;
}

/**
 * The reading column — 640px, the 66-character measure at 18px (§10.1). Every
 * other number in the grid follows from this one, including the breakpoints.
 */
export function ReadingColumn({ as: Component = "div", className, ...props }: FieldProps) {
  return <Component className={cn("w-full max-w-reading", className)} {...props} />;
}

/**
 * The paired field — §29.2, §31.2. Evidence leading at 5 + 3, the annotation
 * beside it at the 3-unit column. This is the system's primary editorial unit
 * and its characteristic asymmetry.
 *
 * Below 1024px there is no second column (§27.1: 1024 is the first width at
 * which one is possible), so the pair stacks and the annotation follows its
 * evidence. Gutter is §24.2: 32px at and above 1024, 24 below.
 */
export interface PairedFieldProps extends ComponentPropsWithoutRef<"div"> {
  /** Put the annotation on the left. Evidence still leads in size. */
  reversed?: boolean;
}

export function PairedField({ reversed = false, className, ...props }: PairedFieldProps) {
  return (
    <div
      className={cn(
        "grid gap-6 paired:gap-8",
        reversed
          ? "paired:grid-cols-[3fr_5fr] paired:[&>*:first-child]:order-last"
          : "paired:grid-cols-[5fr_3fr]",
        className,
      )}
      {...props}
    />
  );
}
