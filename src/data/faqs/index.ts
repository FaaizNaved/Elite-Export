import { faqCollectionSchema } from "../../schemas";
import type { Faq, FaqTopic } from "../../types";

/** Validated at module load — a malformed entry fails the build, not the page. */
export const faqs: Faq[] = faqCollectionSchema.parse([
  {
    id: "minimum-order-quantity",
    question: "What is your minimum order quantity?",
    answer:
      "MOQ depends on the product and customisation involved. For most equestrian tack it starts at 50 pieces per style; bags and accessories start at 100 pieces. Sampling orders are accepted separately.",
    topic: "ordering",
    order: 1,
  },
  {
    id: "oem-odm",
    question: "Do you manufacture to our own designs?",
    answer:
      "Yes. We work as both OEM and ODM. Send technical drawings, reference samples or photographs and our pattern team will produce a prototype for approval before bulk production begins.",
    topic: "manufacturing",
    order: 2,
  },
  {
    id: "leather-grades",
    question: "Which leathers do you work with?",
    answer:
      "Full-grain and top-grain cowhide, buffalo, and vegetable-tanned harness leather, sourced from Leather Working Group certified tanneries. Custom finishes and colours are available on request.",
    topic: "products",
    order: 3,
  },
  {
    id: "lead-time",
    question: "What are your typical lead times?",
    answer:
      "Samples ship within 10–15 working days. Bulk production runs 30–45 days from approval, depending on order size and finishing requirements.",
    topic: "ordering",
    order: 4,
  },
  {
    id: "shipping-terms",
    question: "Which shipping terms do you support?",
    answer:
      "We regularly ship on FOB, CIF and EXW terms by sea and air, and handle all export documentation in-house.",
    topic: "shipping",
    order: 5,
  },
  {
    id: "quality-inspection",
    question: "How is quality controlled?",
    answer:
      "Every batch passes a four-stage inspection — raw material, in-process, pre-finishing and final AQL inspection — with a written report supplied before dispatch.",
    topic: "quality",
    order: 6,
  },
]);

export function getFaqsByTopic(topic: FaqTopic): Faq[] {
  return faqs.filter((faq) => faq.topic === topic);
}
