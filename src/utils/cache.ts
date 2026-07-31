/**
 * Runs an async factory at most once per process and reuses the result.
 *
 * Content is static per build, so a module-level memo is enough — and unlike
 * React's `cache()` it also works in plain Node scripts (see
 * `npm run check:content`).
 */
export function once<T>(factory: () => Promise<T>): () => Promise<T> {
  let pending: Promise<T> | undefined;

  return () => {
    pending ??= factory().catch((error: unknown) => {
      pending = undefined; // don't cache failures — the next call retries
      throw error;
    });
    return pending;
  };
}
