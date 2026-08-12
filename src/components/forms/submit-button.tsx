import type { ComponentPropsWithoutRef } from "react";
import { actionClassName } from "@/components/ui/action";
import { cn } from "@/lib/cn";

export interface SubmitButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Wire to `formState.isSubmitting`. */
  submitting?: boolean;
  submittingLabel?: string;
}

/**
 * The Enquiry surface's submit control.
 *
 * It wears `actionClassName` because it *is* the site's one action performed —
 * UX Blueprint R39.3: on Enquiry, "it is the surface". Everywhere else the
 * action is `Action`, which leads here and takes no label.
 *
 * Visual Design System §38.4, the waiting row: **the state is stated in words,
 * never disguised by a spinner or a skeleton** (Motion Direction M11). So the
 * control says what it is doing; it does not animate while it does it.
 *
 * It is `disabled` while a send is in flight, which is not the dimmed control
 * §38.5 removes but the guard UX Blueprint R47.2 requires: a retry that
 * resubmits an enquiry twice is forbidden.
 */
export function SubmitButton({
  submitting = false,
  submittingLabel = "Sending",
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={submitting}
      aria-busy={submitting || undefined}
      className={cn(actionClassName, className)}
      {...props}
    >
      {submitting ? submittingLabel : children}
    </button>
  );
}
