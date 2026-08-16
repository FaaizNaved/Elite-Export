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
 * Primary navigation — five destinations, and the bar carries nothing else.
 *
 * It briefly carried all eight, and the bar became a sitemap: eight tracked
 * capitals across the top of a page whose first screen is one serif sentence.
 * The header competed with the headline, which is the one thing on the surface
 * that must not be competed with.
 *
 * Five is the number the surface can hold quietly. The order is the canonical
 * chapter order rather than a ranking of importance (R37.4, X2).
 *
 * Two absences are deliberate:
 *
 * - **Home**, because it is the company name — identity, not a destination.
 * - **Enquiry**, because a bar that carries the ask offers Conversation before
 *   Confidence (X5, Brand Bible §8.2). It is reached from the record of every
 *   product, and from the index on the back cover.
 *
 * Technology, Gallery and Journal are reached from the surfaces they belong to
 * and from the complete index in the footer (R37.3, R37.9).
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
