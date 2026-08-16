import { company, siteConfig } from "../../config";
import { isGeneratedPlaceholder } from "../placeholders";
import type { Breadcrumb, Faq, Product } from "../../types";
import { absoluteUrl } from "./url";

/**
 * JSON-LD builders. Phase 9 renders these through a `<script type="application/ld+json">`
 * component; they live here so the shapes stay next to the rest of the SEO model.
 */

export type JsonLd = Record<string, unknown>;

const withContext = (node: JsonLd): JsonLd => ({ "@context": "https://schema.org", ...node });

/** Where the logotype will live. Not published while it is a generated file. */
const ORGANISATION_LOGO = "/images/logos/logo.png";

export function organizationJsonLd(): JsonLd {
  return withContext({
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.tradingName,
    url: absoluteUrl("/"),
    /*
     * The logotype is one of the 98 generated files, and it is also MIB §20
     * dependency 2 — the mark cannot be drawn until the company name is
     * confirmed. `logo` in Organization data is what a search engine puts in a
     * knowledge panel, so publishing a placeholder there is publishing the
     * company's identity as a brown block. Omitted until there is a logotype.
     */
    ...(isGeneratedPlaceholder(ORGANISATION_LOGO)
      ? {}
      : { logo: absoluteUrl(ORGANISATION_LOGO) }),
    description: siteConfig.description,
    foundingDate: String(company.foundedYear),
    email: company.contact.email,
    /*
     * Only fields that hold something. `telephone: undefined` and an empty
     * `sameAs: []` are not neutral in structured data — they are a claim,
     * published to every search engine, that this company has no accounts and
     * that the number below is its number. `withContext` drops undefined keys;
     * `sameAs` is omitted rather than emitted empty.
     */
    ...(company.contact.phone ? { telephone: company.contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.contact.address.street,
      addressLocality: company.contact.address.city,
      addressRegion: company.contact.address.state,
      postalCode: company.contact.address.postalCode,
      addressCountry: company.contact.address.countryCode,
    },
    ...(company.social.length > 0
      ? { sameAs: company.social.map((link) => link.href) }
      : {}),
  });
}

export function breadcrumbJsonLd(breadcrumbs: readonly Breadcrumb[]): JsonLd {
  return withContext({
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  });
}

/** No `offers` — this is a B2B catalogue, not a store. */
export function productJsonLd(product: Product): JsonLd {
  return withContext({
    "@type": "Product",
    name: product.title,
    sku: product.itemCode,
    description: product.shortDescription,
    url: absoluteUrl(product.href),
    category: `${product.categoryName} / ${product.subcategoryName}`,
    material: product.material,
    image: [product.gallery.thumbnail, ...product.gallery.images].map((image) =>
      absoluteUrl(image.src),
    ),
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@type": "Organization", name: siteConfig.legalName },
  });
}

export function faqJsonLd(faqs: readonly Faq[]): JsonLd {
  return withContext({
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}
