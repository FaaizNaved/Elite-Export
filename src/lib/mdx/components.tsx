import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef } from "react";
import { BLUR_DATA_URL } from "../../utils/image";

/**
 * Global MDX element mappings.
 *
 * Styling here is intentionally light: Phase 3 introduces the design system and
 * these classes get replaced by its typography primitives. The mappings that
 * matter today are the behavioural ones — `img` → `next/image` and internal
 * `a` → `next/link`.
 */

function MdxImage({ src, alt, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={900}
      sizes="(min-width: 1024px) 768px, 100vw"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className="h-auto w-full rounded-3xl"
      {...props}
    />
  );
}

function MdxLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

/**
 * Long-form headings, in the house voice.
 *
 * These were `text-4xl / text-3xl / text-2xl` and `font-semibold` in the
 * default sans — raw Tailwind steps, outside the type scale, in a typeface the
 * rest of the site reserves for machinery and specifications. Every long-form
 * page (about, quality, export, manufacturing, technology, the journal, the
 * legal pages) therefore set its headings in a different family, a different
 * weight and a different, non-fluid size ramp from the homepage. That single
 * detail is most of what made the interior of the site read as a different
 * template.
 *
 * They now use `font-display` and the `h1`–`h4` tokens, which is what every
 * heading outside MDX already used. `tracking-tight` is gone because the tokens
 * carry their own letter-spacing; setting it here overrode them.
 */
export const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-12 mb-6 font-display text-h1 font-medium" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 mb-4 font-display text-h2 font-medium" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 font-display text-h3 font-medium" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 mb-2 font-display text-h4 font-medium" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mb-6 leading-relaxed" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-6 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-8 border-l-2 pl-6 italic" {...props} />
  ),
  hr: () => <hr className="my-12 border-t" />,
  // A table in a long-form page is a specification, so it takes the sans
  // voice and the same hairline the registers use — not prose styling.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-small" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border px-4 py-3 font-sans text-caption tracking-[0.1em] uppercase text-foreground-muted"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border px-4 py-3" {...props} />
  ),
  a: MdxLink,
  img: MdxImage as MDXComponents["img"],
};
