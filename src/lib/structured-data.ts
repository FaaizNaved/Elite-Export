import { siteConfig } from "../config/site";
import type { Breadcrumb, Faq, Product } from "../types";
import { absoluteUrl } from "./seo";

/**
 * JSON-LD builders. Phase 9 renders these through a `<script type="application/ld+json">`
 * component; they live here so the shapes stay next to the rest of the SEO model.
 */

export type JsonLd = Record<string, unknown>;

const withContext = (node: JsonLd): JsonLd => ({ "@context": "https://schema.org", ...node });

export function organizationJsonLd(): JsonLd {
  const { company } = siteConfig;

  return withContext({
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.tradingName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logos/logo.png"),
    description: siteConfig.description,
    foundingDate: String(company.foundedYear),
    email: company.contact.email,
    telephone: company.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.contact.address.street,
      addressLocality: company.contact.address.city,
      addressRegion: company.contact.address.state,
      postalCode: company.contact.address.postalCode,
      addressCountry: company.contact.address.countryCode,
    },
    sameAs: company.social.map((link) => link.href),
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
