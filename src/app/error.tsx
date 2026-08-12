"use client";

import { StateNotice } from "@/components/system";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";

/**
 * Error — UX Blueprint R47.2: "what failed, whether the fault is ours, and what
 * to do next." Forbidden: blame, jargon, an error code alone, a comic apology.
 *
 * `error.message` is not shown. It is jargon by definition — a stack-trace
 * fragment addressed to us, not to a buyer — and R47.1 says a state is stated
 * plainly, not decorated with the system's own vocabulary.
 *
 * R47.5: every state has a route to a person, and `StateNotice` carries it.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section>
      <Field type="reading">
        <StateNotice state="error" destinations={[{ href: ROUTES.home, label: "Home" }]}>
          Something on our side failed to load. Nothing you sent has been lost.
        </StateNotice>
        <button
          type="button"
          onClick={reset}
          className="font-sans text-r text-ink underline decoration-1 underline-offset-1 motion-mark hover:decoration-2"
        >
          Try again
        </button>
      </Field>
    </Section>
  );
}
