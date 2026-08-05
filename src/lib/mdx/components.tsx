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

export const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-12 mb-6 text-4xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 mb-4 text-3xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 mb-2 text-xl font-semibold" {...props} />
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
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b px-4 py-3 font-semibold" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => <td className="border-b px-4 py-3" {...props} />,
  a: MdxLink,
  img: MdxImage as MDXComponents["img"],
};
