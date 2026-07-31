import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";

/**
 * Loads the *body* of an MDX document as a React component.
 *
 * Frontmatter is read separately, from disk, by `src/lib/content` — this module
 * only handles the compiled JSX. The template-literal imports are deliberate:
 * the bundler turns each static prefix into a context of every MDX file beneath
 * it, which is what lets a new `.mdx` file render with no code change.
 */

export type MdxContent = ComponentType<{ components?: MDXComponents }>;

type MdxModule = { default: MdxContent };

export async function loadProductContent(
  categorySlug: string,
  subcategorySlug: string,
  slug: string,
): Promise<MdxContent> {
  const mod = (await import(
    `../content/products/${categorySlug}/${subcategorySlug}/${slug}.mdx`
  )) as MdxModule;
  return mod.default;
}

export async function loadCompanyContent(slug: string): Promise<MdxContent> {
  const mod = (await import(`../content/company/${slug}.mdx`)) as MdxModule;
  return mod.default;
}

export async function loadMachineContent(slug: string): Promise<MdxContent> {
  const mod = (await import(`../content/machines/${slug}.mdx`)) as MdxModule;
  return mod.default;
}

export async function loadBlogContent(slug: string): Promise<MdxContent> {
  const mod = (await import(`../content/blog/${slug}.mdx`)) as MdxModule;
  return mod.default;
}

export async function loadLegalContent(slug: string): Promise<MdxContent> {
  const mod = (await import(`../content/legal/${slug}.mdx`)) as MdxModule;
  return mod.default;
}
