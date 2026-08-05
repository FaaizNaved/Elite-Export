import { ROUTES } from "../constants/routes";
import { navItemSchema } from "../models";
import type { NavItem } from "../types";

/**
 * The primary navigation bar.
 *
 * The Products entry is a mega-menu slot: its contents are generated from the
 * catalog by `getProductsMegaMenu()`, so new categories never require an edit here.
 */
export const mainNav: NavItem[] = navItemSchema.array().parse([
  { label: "Home", href: ROUTES.home },
  {
    label: "Company",
    href: ROUTES.about,
    children: [
      { label: "About Us", href: ROUTES.about, description: "Our story, values and infrastructure" },
      {
        label: "Manufacturing",
        href: ROUTES.manufacturing,
        description: "From hide selection to packaging",
      },
      {
        label: "Technology & Machinery",
        href: ROUTES.technology,
        description: "The equipment behind the craft",
      },
    ],
  },
  { label: "Products", href: ROUTES.products, megaMenu: "products" },
  { label: "Quality", href: ROUTES.quality },
  { label: "Export", href: ROUTES.exportCapabilities },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact", href: ROUTES.contact },
]);

/** Grouped footer links. Product columns are appended from the catalog at render time. */
export const footerNav: Array<{ heading: string; links: NavItem[] }> = [
  {
    heading: "Company",
    links: navItemSchema.array().parse([
      { label: "About Us", href: ROUTES.about },
      { label: "Manufacturing", href: ROUTES.manufacturing },
      { label: "Technology", href: ROUTES.technology },
      { label: "Quality Assurance", href: ROUTES.quality },
    ]),
  },
  {
    heading: "Business",
    links: navItemSchema.array().parse([
      { label: "Export Capabilities", href: ROUTES.exportCapabilities },
      { label: "Buyer Enquiry", href: ROUTES.buyerEnquiry },
      { label: "Gallery", href: ROUTES.gallery },
      { label: "Journal", href: ROUTES.blog },
    ]),
  },
];
