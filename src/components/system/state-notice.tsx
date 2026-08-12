import type { ReactNode } from "react";
import { Record, Statement } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/action";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/constants";

/**
 * The state notice — Master Implementation Blueprint §13.1, UX Blueprint §47.
 *
 * §13.1: "to state the system's own condition in words. For each of the ten
 * states. **It is never a skeleton, a spinner, or a disguised wait.**"
 *
 * R47.1 is the principle that governs all ten:
 *
 *   > A state is a fact about the system, and facts are stated plainly. No
 *   > state is disguised, softened, apologised for at length, or used as an
 *   > opportunity to sell.
 *
 * Three rules shape the component rather than the copy:
 *
 * - **R47.4 — no state carries the site's action** except Success, which
 *   carries what happens next rather than a new ask. There is therefore no way
 *   to pass an `Action` into this component; the only outbound route it offers
 *   is the direct one to a person.
 * - **R47.5 — every state has a route to a person.** Where a system fails, the
 *   direct route is the answer, and offering it is the clearest possible
 *   demonstration that a human being is behind this. It is on by default.
 * - **R47.3 — nothing the visitor has written is ever lost, in any state.**
 *   That is the form's obligation, not this component's, and it is the single
 *   most important behaviour in Part XII.
 *
 * `permission` is in the union because R47.2 lists it: it does not occur.
 * Nothing in this system is permissioned (E7), so if it is ever rendered it is
 * a defect — and a defect that names itself is better than one that does not.
 */
export type SystemState =
  | "loading"
  | "empty"
  | "error"
  | "offline"
  | "maintenance"
  | "notFound"
  | "permission"
  | "noResults"
  | "timeout"
  | "success";

export interface StateNoticeProps {
  state: SystemState;
  /**
   * What the visitor is told, in words. Copy is Brand Bible §12 and not the
   * build's to write (MIB R6.4), so every notice states its own condition and
   * this component states none of them.
   */
  children: ReactNode;
  /**
   * The two most likely destinations — required by R26.2 for 404 and R46.4 for
   * no-results, and available to any state.
   */
  destinations?: readonly { href: string; label: string }[];
  /** R47.5. Off only where the surrounding surface already carries the route. */
  route?: boolean;
  className?: string;
}

/**
 * `alert` where the system has failed the visitor, `status` where it is simply
 * reporting. Both are live regions, because a state that changes silently has
 * been disguised — which is the thing R47.1 forbids.
 */
const ASSERTIVE: readonly SystemState[] = ["error", "offline", "timeout", "permission"];

export function StateNotice({
  state,
  children,
  destinations,
  route = true,
  className,
}: StateNoticeProps) {
  return (
    <div
      role={ASSERTIVE.includes(state) ? "alert" : "status"}
      /*
       * No box. §14.1 removes the bordered callout and the well, and §36.4
       * removes the panel — what is left after removing them is the words,
       * which were the content all along (§39.3, applied to a state).
       */
      className={cn("flex flex-col gap-s3 py-s5", className)}
    >
      <Statement rank="t2" as="p">
        {children}
      </Statement>

      {destinations && destinations.length > 0 && (
        <ul className="flex flex-col gap-s1">
          {destinations.map((destination) => (
            <li key={destination.href}>
              <Record rank="r">
                <TextLink href={destination.href}>{destination.label}</TextLink>
              </Record>
            </li>
          ))}
        </ul>
      )}

      {route && (
        <Record rank="r" tone="secondary">
          <TextLink href={ROUTES.enquiry}>Write to a person</TextLink>
        </Record>
      )}
    </div>
  );
}
