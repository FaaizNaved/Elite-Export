import { ROUTES } from "../constants/routes";
import { homeContentSchema } from "../schemas/home";
import type { HomeContent } from "../schemas/home";

/** Validated at module load — a malformed entry fails the build, not the page. */
export const homeContent: HomeContent = homeContentSchema.parse({
  hero: {
    eyebrow: "Leather manufacturers since 1998",
    heading: "Hand-crafted leather, engineered for export",
    description:
      "Equestrian tack, bags and accessories manufactured in Kanpur for buyers in eight countries — under your label, to your specification.",
    image: {
      src: "/images/hero/home-hero.webp",
      alt: "Craftsman burnishing the edge of a leather strap",
      width: 2400,
      height: 1350,
    },
    primaryCta: { label: "Explore products", href: ROUTES.products },
    secondaryCta: { label: "Start an enquiry", href: ROUTES.buyerEnquiry },
  },
  intro: {
    eyebrow: "Who we are",
    heading: "A manufacturer, not a trading house",
    description: "Every piece that carries your label is made in our own facility, by our own staff.",
    body: "We began in 1998 with four craftsmen and a single overseas buyer. Three production lines later, the strap on a headstall is still cut, edged and burnished by a person — because that is the part a machine cannot fake, and the part your customer will notice in five years' time.",
    image: {
      src: "/images/about/workshop.webp",
      alt: "The Elite Export workshop floor",
      width: 1600,
      height: 900,
    },
    stats: [
      { value: 1998, label: "Founded", animate: false },
      { value: 250, label: "Craftspeople and staff", suffix: "+" },
      { value: 8, label: "Export markets" },
      { value: 40000, label: "Pieces per month", suffix: "+" },
    ],
  },
  sections: {
    whyUs: {
      eyebrow: "Why buyers stay",
      heading: "Consistency is the product",
      description:
        "Anyone can make one excellent piece. The four-hundredth, eleven weeks later, is what you are actually buying.",
    },
    categories: {
      eyebrow: "What we make",
      heading: "Product categories",
      description: "Equestrian tack, leather bags and accessories — our own patterns or yours.",
    },
    products: {
      eyebrow: "Selected work",
      heading: "Featured products",
      description: "A sample of the range. Every piece is available for private label production.",
    },
    manufacturing: {
      eyebrow: "Inside the factory",
      heading: "Eight stages, one standard",
      description:
        "From hide selection to export packing, with an inspection gate at the end of each stage.",
    },
    technology: {
      eyebrow: "Equipment",
      heading: "The machines behind the craft",
      description: "Hand craftsmanship sets the standard; machinery makes it repeatable at volume.",
    },
    quality: {
      eyebrow: "Quality assurance",
      heading: "Four gates, one written report",
      description: "The inspection report reaches you before the container does.",
    },
    exportCapabilities: {
      eyebrow: "Global supply",
      heading: "Built around your shipping calendar",
      description: "OEM and ODM production, in-house documentation, FOB, CIF or EXW.",
    },
    testimonials: {
      eyebrow: "In their words",
      heading: "What our buyers say",
    },
  },
  cta: {
    eyebrow: "Start a conversation",
    heading: "Tell us what you need manufactured",
    description:
      "Send drawings, a reference sample or photographs. We will confirm feasibility and indicative pricing within three working days.",
    primaryCta: { label: "Buyer enquiry", href: ROUTES.buyerEnquiry },
    secondaryCta: { label: "Contact us", href: ROUTES.contact },
    image: {
      src: "/images/hero/cta-workshop.webp",
      alt: "",
      width: 2400,
      height: 1200,
    },
  },
});
