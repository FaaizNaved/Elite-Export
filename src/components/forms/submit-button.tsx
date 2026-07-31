"use client";

import { Button, type ButtonProps } from "@/components/ui/button";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  /** Wire to `formState.isSubmitting`. */
  submitting?: boolean;
  submittingLabel?: string;
}

/**
 * Submit control for React Hook Form.
 *
 * Thin on purpose: it exists so every form gets the same busy handling without
 * re-deriving `disabled`/`aria-busy` from `formState` at each call site.
 */
export function SubmitButton({
  submitting = false,
  submittingLabel = "Sending",
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" loading={submitting} loadingLabel={submittingLabel} {...props}>
      {children}
    </Button>
  );
}
