import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef } from "react";

/**
 * Global MDX element mappings — the reading passage, element by element.
 *
 * Every value here is a rank from Visual Design System §9.2 or a space rank
 * from §4.2, so a prose body is set by the same source as everything else.
 * Three rules do most of the work:
 *
 * - **§8.4** — headings inside a passage are the company speaking, so they are
 *   serif; body, lists and tables are the record, so they are sans. There is no
 *   shared territory.
 * - **§22.2** — the space above a heading is at least twice the space below it,
 *   and at T1 three times. Every heading below expresses its ratio.
 * - **§10.3** — paragraphs are separated by space, never by indent: 24px at
 *   body size. No first-line indent, no drop cap, no first-paragraph case.
 *
 * Two things a markdown renderer normally provides are absent by rule: the
 * blockquote's left rule and italic (§12.4 — no rules, no italic; a quote is a
 * `PullQuote` placed by the surface, attributed or not published), and the
 * horizontal rule (§23.5 names it as an impermissible chapter opening, and
 * §16.4 has no mark for it).
 */

/**
 * Prose carries no photographs.
 *
 * A photograph in this system is evidence, and evidence arrives with a record:
 * a caption that is a specification (Documentary Storyboard §13.6), provenance
 * (Photography Direction §24.4), an evidence rank (§5) and a size that clears
 * the threshold (VDS §30.2). Markdown can express none of those — an inline
 * `![]()` is a src and a string.
 *
 * So an image placed in prose is not published. Photography is placed by the
 * surface, from the content model, where its record travels with it. The
 * images currently sitting in company MDX are named by the Threshold gate at
 * `npm run check:publication` and move into the model as records.
 */
function MdxImage() {
  return null;
}

function MdxLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-ink underline decoration-1 underline-offset-1 motion-mark hover:decoration-2"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink underline decoration-1 underline-offset-1 motion-mark hover:decoration-2"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  /*
   * A passage carries no `h1`: the surface's own title is its one `h1`, and a
   * second is a second surface (UX Blueprint's one-h1 rule). An `h1` written in
   * a body is therefore rendered at its true level.
   */
  h1: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-s5 mb-s3 font-serif text-t2 text-balance" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-s5 mb-s3 font-serif text-t2 text-balance" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-s4 mb-s2 font-serif text-t2 text-balance reading:text-t3" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-s4 mb-s2 font-sans text-r font-medium" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mb-6 text-pretty" {...props} />,
  /*
   * §39.2: a set is "unnumbered, marked by a single 4px Ink square at the
   * x-height, hanging". Not a disc, and never an icon or a checkmark — §43.2
   * and Creative Direction Book §6.2: show the mechanism, not the symbol.
   */
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mb-6 flex list-none flex-col gap-s1 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.55em] [&>li]:before:left-0 [&>li]:before:size-1 [&>li]:before:bg-ink"
      {...props}
    />
  ),
  /* A sequence is numbered, and the order is the fact (§39.2). */
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-6 flex list-decimal flex-col gap-s1 pl-6" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-s5 font-serif text-t2 text-balance" {...props} />
  ),
  hr: () => null,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-s4 overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-r" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-hairline py-[0.875rem] pr-s3 font-sans text-c font-medium leading-5 last:pr-0"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-hairline py-[0.875rem] pr-s3 leading-5 last:pr-0" {...props} />
  ),
  a: MdxLink,
  img: MdxImage as MDXComponents["img"],
};
