/** Turns arbitrary text into a URL-safe slug: "One Ear Headstall" → "one-ear-headstall". */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "") // "créme" → "creme", not "cre-me"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "one-ear-headstall.mdx" → "one-ear-headstall" */
export function slugFromFilename(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "");
}

/** "one-ear-headstall" → "One Ear Headstall". Fallback only — prefer authored names. */
export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Joins path segments into a clean, leading-slash route. Empty segments are dropped. */
export function joinPath(...segments: Array<string | undefined | null>): string {
  const path = segments
    .filter((segment): segment is string => Boolean(segment))
    .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");

  return `/${path}`;
}
