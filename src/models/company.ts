import { z } from "zod";
import { pageBlocksSchema } from "./blocks";
import { imageSchema, orderSchema, publishStatusSchema } from "./primitives";
import { seoSchema } from "./seo";

export const contactSchema = z.object({
  email: z.email(),
  /** Secondary inbox for buyer enquiries; falls back to `email` when absent. */
  salesEmail: z.email().optional(),
  phone: z.string().min(1),
  whatsapp: z.string().optional(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().min(1),
    countryCode: z.string().length(2),
  }),
  /** e.g. "Mon – Sat, 9:00 – 18:00 IST" */
  businessHours: z.string().optional(),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["linkedin", "instagram", "facebook", "youtube", "x", "pinterest"]),
  label: z.string().min(1),
  href: z.url(),
});

export const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().optional(),
  year: z.int().optional(),
  image: imageSchema.optional(),
  /** Downloadable copy of the certificate, if the client supplies one. */
  fileUrl: z.string().optional(),
});

/** Stable facts about the business. Rendered in the footer, about page and JSON-LD. */
export const companyProfileSchema = z.object({
  legalName: z.string().min(1),
  tradingName: z.string().min(1),
  tagline: z.string().min(1),
  foundedYear: z.int(),
  employees: z.string().optional(),
  contact: contactSchema,
  social: z.array(socialLinkSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  /** ISO 3166-1 alpha-2 codes of export destinations. */
  exportMarkets: z.array(z.string().length(2)).default([]),
});

/**
 * Frontmatter for editorial company pages (about, manufacturing, quality, export…).
 *
 * Structured sections come from `pageBlocksSchema`, so a page declares the
 * blocks it needs and the route renders them — no per-page components.
 */
export const companyPageFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  summary: z.string().min(1),
  hero: imageSchema.optional(),
  /** Short label above the page title. */
  eyebrow: z.string().optional(),
  order: orderSchema,
  status: publishStatusSchema,
  seo: seoSchema.optional(),
  ...pageBlocksSchema.shape,
});

export type Contact = z.infer<typeof contactSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type CompanyProfile = z.infer<typeof companyProfileSchema>;
export type CompanyPageFrontmatter = z.infer<typeof companyPageFrontmatterSchema>;
