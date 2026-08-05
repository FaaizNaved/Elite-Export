import { z } from "zod";

/**
 * Form contracts, shared by the client form and the route handler that
 * receives it — one schema, validated on both sides.
 */

/** Rejects submissions where the hidden honeypot field was filled in. */
const honeypot = z.string().max(0, "Rejected").optional();

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid email address"),
  phone: z.string().max(40).optional(),
  country: z.string().length(2, "Please select a country"),
  reason: z.enum(["general", "products", "samples", "partnership", "careers"]),
  message: z.string().min(20, "Please give us a little more detail").max(4000),
  consent: z.literal(true, { message: "Please confirm we may contact you" }),
  website: honeypot,
});

export const buyerEnquiryFormSchema = z.object({
  companyName: z.string().min(2, "Please enter your company name").max(160),
  contactPerson: z.string().min(2, "Please enter a contact name").max(120),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a phone number").max(40),
  whatsapp: z.string().max(40).optional(),
  country: z.string().length(2, "Please select a country"),
  businessType: z.enum(["importer", "wholesaler", "retailer", "brand", "agent", "other"]),
  interestedProducts: z.string().min(3, "Tell us which products interest you").max(500),
  estimatedQuantity: z.string().min(1, "An approximate quantity helps us quote").max(120),
  message: z.string().min(20, "Please give us a little more detail").max(4000),
  consent: z.literal(true, { message: "Please confirm we may contact you" }),
  website: honeypot,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type BuyerEnquiryFormValues = z.infer<typeof buyerEnquiryFormSchema>;
