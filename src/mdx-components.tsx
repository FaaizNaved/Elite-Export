import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "./mdx/components";

/**
 * Required file convention for `@next/mdx` with the App Router.
 * The actual mappings live in `src/mdx/components.tsx`.
 */
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
