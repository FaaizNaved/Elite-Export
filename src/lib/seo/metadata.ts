import type { Metadata } from "next";
import { absoluteUrl } from "./url";
import { company, SITE_URL, siteConfig } from "../../config";
import { DEFAULT_HTML_LANG, DEFAULT_OG_LOCALE } from "../../constants/locale";
import type {
  BlogPost,
  Category,
  CompanyPage,
  Image,
  LegalPage,
  Machine,
  OpenGraphType,
  Product,
  Seo,
  Subcategory,
} from "../../types";

/**
 * One metadata builder for the whole site.
 *
 * Page-level `seo` frontmatter wins, then the entity's own copy, then the
 * site defaults — so content authors can override anything without touching code.
 */


export interface MetadataInput {
  /** Page title without the brand suffix — the root layout's template adds it. */
  title: string;
  description: string;
  /** Site-relative route, used for the canonical URL. */
  path: string;
  seo?: Seo;
  image?: Image;
  type?: OpenGraphType;
  publishedTime?: Date;
  modifiedTime?: Date;
}

export function buildMetadata(input: MetadataInput): Metadata {
  const { seo } = input;
  const title = seo?.title ?? input.title;
  const description = seo?.description ?? input.description;
  const image = seo?.image ?? input.image ?? siteConfig.ogImage;
  const canonical = absoluteUrl(seo?.canonical ?? input.path);
  const keywords = [...(seo?.keywords ?? []), ...siteConfig.keywords];

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: input.type === "article" ? "article" : "website",
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: DEFAULT_OG_LOCALE,
      images: [
        {
          url: absoluteUrl(image.src),
          alt: image.alt,
          width: image.width,
          height: image.height,
        },
      ],
      ...(input.type === "article" && {
        publishedTime: input.publishedTime?.toISOString(),
        modifiedTime: input.modifiedTime?.toISOString(),
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image.src)],
      creator: siteConfig.twitterHandle,
    },
  };
}

/** Metadata for the root layout. Owns `metadataBase` and the title template. */
export function buildRootMetadata(): Metadata {
  const base = buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  });

  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteConfig.name} — ${company.tagline}`,
      template: `%s ${siteConfig.titleSeparator} ${siteConfig.name}`,
    },
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName, url: SITE_URL }],
    formatDetection: { telephone: false },
    other: { "content-language": DEFAULT_HTML_LANG },
  };
}

/* -------------------------------------------------------------------------- */
/* Entity adapters                                                             */
/*                                                                             */
/* One per content type. They exist so a page never has to know which field of  */
/* a document is its description or its share image — `generateMetadata` is a   */
/* single call. Pages with no content entity behind them (Contact, Gallery)     */
/* call `buildMetadata` directly, which is the same builder.                    */
/* -------------------------------------------------------------------------- */

export function productMetadata(product: Product): Metadata {
  return buildMetadata({
    title: product.title,
    description: product.shortDescription,
    path: product.href,
    seo: product.seo,
    image: product.gallery.thumbnail,
    modifiedTime: product.updatedAt,
  });
}

export function machineMetadata(machine: Machine): Metadata {
  return buildMetadata({
    title: machine.title,
    description: machine.shortDescription,
    path: machine.href,
    seo: machine.seo,
    image: machine.gallery.thumbnail,
    modifiedTime: machine.updatedAt,
  });
}

export function categoryMetadata(category: Category | Subcategory): Metadata {
  return buildMetadata({
    title: category.name,
    description: category.shortDescription,
    path: category.href,
    seo: category.seo,
    image: category.hero ?? category.thumbnail,
  });
}

export function blogPostMetadata(post: BlogPost): Metadata {
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: post.href,
    seo: post.seo,
    image: post.cover,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export function companyPageMetadata(page: CompanyPage): Metadata {
  return buildMetadata({
    title: page.title,
    description: page.summary,
    path: page.href,
    seo: page.seo,
    image: page.hero,
  });
}

export function legalPageMetadata(page: LegalPage): Metadata {
  return buildMetadata({
    title: page.title,
    description: page.summary ?? `${page.title} — ${siteConfig.name}`,
    path: page.href,
    seo: page.seo,
  });
}
