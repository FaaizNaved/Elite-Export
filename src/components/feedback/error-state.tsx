"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  /** Wire to the `reset` argument of a Next.js `error.tsx` boundary. */
  onRetry?: () => void;
  retryLabel?: string;
  /** Extra actions, e.g. a link back to the home page. */
  action?: ReactNode;
  /** Shown in development only — never leak stack traces to buyers. */
  detail?: string;
  className?: string;
}

/**
 * Failure state for route error boundaries and failed data fetches.
 *
 * The message stays generic and the technical detail is gated to development,
 * so a production visitor sees a calm recovery path rather than an error dump.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "The page could not be loaded. Please try again — if the problem continues, get in touch and we will help.",
  onRetry,
  retryLabel = "Try again",
  action,
  detail,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-5 rounded-card border border-border bg-surface px-6 py-16 text-center",
        className,
      )}
    >
      <span className="inline-flex size-12 items-center justify-center rounded-badge bg-error-subtle">
        <Icon icon={AlertTriangle} size="md" className="text-error" />
      </span>

      <div className="flex flex-col gap-2">
        <Typography variant="h4" as="p">
          {title}
        </Typography>
        <Typography variant="muted" className="max-w-md">
          {description}
        </Typography>
      </div>

      {detail && process.env.NODE_ENV !== "production" && (
        <pre className="max-w-full overflow-x-auto rounded-input bg-surface-sunken p-4 text-left font-mono text-caption text-foreground-secondary">
          {detail}
        </pre>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {onRetry && (
          <Button onClick={onRetry} leftIcon={<Icon icon={RotateCcw} size="sm" />}>
            {retryLabel}
          </Button>
        )}
        {action}
      </div>
    </div>
  );
}
