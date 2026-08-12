import { Record, Statement } from "@/components/ui/typography";

/**
 * The confirmation and the send failure — Master Implementation Blueprint
 * §13.1.
 *
 * The confirmation states "what was received, who has it, and what happens
 * next" (UX Blueprint R41.8). It never sells, and it never promises a time
 * operations cannot keep.
 *
 * Neither is a panel: §14.1 removes the bordered callout and §36.4 removes the
 * well. What is left after removing them is the words, which were the content
 * all along.
 *
 * These lived inside the contact form until the two enquiry doors merged
 * (R25.2). They belong to the surface's states rather than to any one form.
 */

export function SuccessPanel({ message }: { message: string }) {
  return (
    <div role="status" className="flex flex-col items-start gap-s2 py-s4">
      <Statement rank="t3" as="p">
        Thank you — we have your enquiry
      </Statement>
      <Record tone="secondary">{message}</Record>
    </div>
  );
}

/**
 * UX Blueprint R47.2, the error row: what failed, whether the fault is ours,
 * and what to do next. R47.3 is the behaviour behind it — nothing the visitor
 * has written is ever lost — so the direct address is offered rather than a
 * retry that could send twice.
 */
export function FormError({
  message,
  fallbackEmail,
}: {
  message: string;
  fallbackEmail: string;
}) {
  return (
    <div role="alert">
      <Record as="p" className="text-oxide">
        {message}{" "}
        <a href={`mailto:${fallbackEmail}`} className="underline decoration-1 underline-offset-1">
          Email us directly at {fallbackEmail}
        </a>
        .
      </Record>
    </div>
  );
}
