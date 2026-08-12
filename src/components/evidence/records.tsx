import { Record, Statement } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

/**
 * The record components — Master Implementation Blueprint §12.1, Visual Design
 * System §39.
 *
 * A record is a checkable fact, and §39.1 calls the table "the purest
 * expression of Evidence available in a layout: facts, aligned, comparable,
 * checkable". Everything here is sans, because the sans is the record voice
 * (Brand Bible §16.3), and every figure is tabular by default from the base
 * layer so a column of them aligns on the digit.
 */

/* -------------------------------------------------------------------------- */
/* Specification list — the most-used record form in this brand (§39.2)         */
/* -------------------------------------------------------------------------- */

export interface SpecificationEntry {
  label: string;
  value: string;
}

export interface SpecificationListProps {
  entries: readonly SpecificationEntry[];
  className?: string;
}

/**
 * Label-and-value pairs for a single subject — product records, machine
 * records, certification records. §39.2: "label at rank C secondary, value at
 * rank R primary, on one line, S1 between pairs."
 *
 * It disappears where the content is prose rather than fact (§12.1). Two facts
 * about one thing is a specification list; a set of facts sharing a structure
 * is a table.
 */
export function SpecificationList({ entries, className }: SpecificationListProps) {
  if (entries.length === 0) return null;

  return (
    <dl className={cn("flex flex-col gap-s1", className)}>
      {entries.map((entry) => (
        <div key={entry.label} className="flex flex-col gap-0.5">
          <Record as="dt" rank="c" tone="secondary">
            {entry.label}
          </Record>
          <Record as="dd" rank="r">
            {entry.value}
          </Record>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/* Specification table (§39.1)                                                  */
/* -------------------------------------------------------------------------- */

export interface SpecificationTableProps {
  /** Column headings. Units go here, not in every cell (§39.1). */
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  caption?: string;
  className?: string;
}

/**
 * Facts that share a structure, so they can be compared and checked.
 *
 * It disappears with one row, or where the columns are not comparable — then
 * it is a specification list (§12.1). §39.1 fixes the rest: a hairline between
 * rows and **no vertical rules, no outer border, no zebra striping**, because
 * alignment separates columns and a rule between them is a mark doing work
 * space already did. Row height 48px minimum from 14px padding on a 20px line:
 * density is permitted, crowding is not.
 *
 * On a small field the table does not become cards (§46.2). It scrolls
 * horizontally within its own field.
 */
export function SpecificationTable({
  columns,
  rows,
  caption,
  className,
}: SpecificationTableProps) {
  if (rows.length < 2) return null;

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left">
        {caption && (
          <caption className="mb-s2 text-left font-sans text-c text-ink-secondary">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-hairline px-0 py-[0.875rem] pr-s3 font-sans text-c font-medium leading-5 last:pr-0"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td
                  key={`${index}-${cell}`}
                  className={cn(
                    "border-b border-hairline px-0 py-[0.875rem] pr-s3 font-sans text-r leading-5 last:pr-0",
                    /* Text left, figures right (§39.1). */
                    index > 0 && /^[\d.,\s%+\-–—×x/]+$/.test(cell) && "text-right",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pull quote (§12.4)                                                           */
/* -------------------------------------------------------------------------- */

export interface PullQuoteProps {
  children: React.ReactNode;
  /** A name and a role. §12.4: if it cannot be attributed, it is not published. */
  attribution?: { name: string; role: string };
  className?: string;
}

/**
 * The company speaking, once, isolated — §12.4.
 *
 * Serif at T2, at most one per surface, with S5 above and below at minimum:
 * "it is isolated, or it is not a pull quote". No quotation marks, no rules, no
 * oversized glyph, no italic — every one of those is a treatment, and L14 says
 * treatment carries no meaning.
 *
 * It may never duplicate text that appears elsewhere on the same surface: a
 * quote pulled from the body has been repeated for emphasis, which reads as
 * insecurity (L10).
 */
export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <figure className={cn("my-s5 flex flex-col gap-s3", className)}>
      <blockquote>
        <Statement as="p" rank="t2">
          {children}
        </Statement>
      </blockquote>
      {attribution && (
        <figcaption>
          <Record rank="c" tone="secondary">
            {attribution.name}, {attribution.role}
          </Record>
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Limit statement (§12.1)                                                      */
/* -------------------------------------------------------------------------- */

export interface LimitStatementProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * What the company does not do, stated plainly — on Quality, About and Export.
 *
 * §12.1: it is **never collected onto a surface of its own**. It is load-bearing
 * where the capability is claimed, which is why this is a passage in place
 * rather than a component with a home (UX Blueprint E9, R13A.8).
 *
 * It is a passage, not a callout: no box, no tint, no icon. The plainness is
 * the point — a limit dressed up as a feature is not a limit.
 */
export function LimitStatement({ children, className }: LimitStatementProps) {
  return <div className={cn("flex flex-col gap-s2", className)}>{children}</div>;
}
