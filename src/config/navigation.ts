import { ROUTES } from "../constants/routes";

/**
 * The site's navigation architecture.
 *
 * Two structures, and they are not variants of each other: the bar states
 * *where you are and what else exists* (UX Blueprint R37.1), the index is the
 * company's own record of every surface it has (R37.9).
 */

export interface NavDestination {
  readonly label: string;
  readonly href: string;
}

/**
 * Primary navigation — UX Blueprint R37.2 assigns these five and no others.
 *
 * The order is the canonical chapter order, not a ranking of importance
 * (R37.4, X2). Home is reached by the company name, which is identity rather
 * than a destination; Enquiry is absent deliberately, because putting the ask
 * in the bar offers Conversation before Confidence (X5, Brand Bible §8.2).
 *
 * A sixth entry is not a design decision. VDS §37.1: a structure that needs
 * six is a structure that needs an index, and the index is the footer.
 */
export const primaryNav: readonly NavDestination[] = [
  { label: "Manufacturing", href: ROUTES.manufacturing },
  { label: "Products", href: ROUTES.products },
  { label: "Quality", href: ROUTES.quality },
  { label: "Export", href: ROUTES.exportCapabilities },
  { label: "About", href: ROUTES.about },
] as const;

/**
 * The footer index — UX Blueprint R37.9.
 *
 * Every surface, including the ones the bar does not carry: Technology,
 * Gallery and Journal are reached from the surfaces they belong to and from
 * here (R37.3). A flat list rather than marketing groupings, because this is a
 * record and a record is complete rather than arranged.
 *
 * Legal surfaces are appended at render time from the content layer, so a new
 * one appears here without an edit (MIB R7.1).
 */
export const surfaceIndex: readonly NavDestination[] = [
  { label: "Manufacturing", href: ROUTES.manufacturing },
  { label: "Technology", href: ROUTES.technology },
  { label: "Products", href: ROUTES.products },
  { label: "Quality", href: ROUTES.quality },
  { label: "Export", href: ROUTES.exportCapabilities },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Journal", href: ROUTES.journal },
  { label: "About", href: ROUTES.about },
  { label: "Enquiry", href: ROUTES.enquiry },
  { label: "Legal", href: ROUTES.legal },
] as const;
