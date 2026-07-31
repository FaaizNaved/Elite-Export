/**
 * Public API of the content engine.
 *
 * UI code imports from here only — never from `./source`, which is the single
 * filesystem-aware module and the only thing a CMS migration has to replace.
 */
export * from "./catalog";
export * from "./gallery";
export * from "./machines";
export * from "./navigation";
export * from "./pages";
export { CONTENT_ROOT, ContentError, INCLUDE_DRAFTS } from "./source";
export type { ParsedDocument } from "./source";
