import { SITE_URL } from "../../config";

/**
 * Absolute URL resolution.
 *
 * Its own module because canonical tags, Open Graph, JSON-LD and the sitemap
 * all need it, and none of them should reach for the metadata builder to get it.
 */
export function absoluteUrl(path = "/"): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
