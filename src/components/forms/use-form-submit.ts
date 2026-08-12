"use client";

import { useState } from "react";

export type SubmitState = "idle" | "success" | "error";

interface SubmitResult {
  state: SubmitState;
  error: string | null;
  /** Resolves true only when the payload was received (UX R47.3). */
  submit: (endpoint: string, values: unknown) => Promise<boolean>;
  reset: () => void;
}

/**
 * Posts a validated form payload and tracks the outcome.
 *
 * Shared by the contact and buyer enquiry forms so the fetch, the error
 * surfacing and the success state are defined once. React Hook Form owns
 * `isSubmitting`; this owns what happened after.
 */
export function useFormSubmit(): SubmitResult {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (endpoint: string, values: unknown): Promise<boolean> => {
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body: unknown = await response.json().catch(() => null);
        const message =
          body && typeof body === "object" && "error" in body && typeof body.error === "string"
            ? body.error
            : "Something went wrong. Please try again.";
        setError(message);
        setState("error");
        return false;
      }

      setState("success");
      return true;
    } catch {
      setError("We could not reach the server. Please check your connection and try again.");
      setState("error");
      return false;
    }
  };

  return { state, error, submit, reset: () => setState("idle") };
}
