/** "one-ear-headstall.mdx" → "one-ear-headstall" */
export function slugFromFilename(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "");
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
