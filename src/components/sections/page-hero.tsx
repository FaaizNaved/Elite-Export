import { Hero } from "@/components/hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import type { Breadcrumb as BreadcrumbItem, Image as ImageToken } from "@/types";

export interface PageHeroProps {
  title: string;
  summary?: string;
  eyebrow?: string;
  /** Full-bleed background. Without one the hero sits on the sunken surface. */
  image?: ImageToken;
  /** Pass an explicit trail, or let it build `Home → title` from `href`. */
  breadcrumbs?: readonly BreadcrumbItem[];
  href?: string;
}

/**
 * The masthead every interior page opens with.
 *
 * Wraps `Hero` so breadcrumb wiring, heading level and overlay choice are
 * decided once rather than per route.
 */
export function PageHero({
  title,
  summary,
  eyebrow,
  image,
  breadcrumbs,
  href,
}: PageHeroProps) {
  const trail = breadcrumbs ?? (href ? buildBreadcrumbs([{ label: title, href }]) : undefined);

  return (
    <Hero
      variant={image ? "image" : "page"}
      heading={title}
      eyebrow={eyebrow}
      description={summary}
      backgroundImage={image}
      overlay="strong"
      height={image ? "tall" : "content"}
      breadcrumb={trail ? <Breadcrumb items={trail} /> : undefined}
    />
  );
}
