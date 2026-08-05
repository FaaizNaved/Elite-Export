/**
 * Public API of the content engine.
 *
 * `contentRegistry` is the recommended entry point — one object, the same three
 * methods for every content type. The individual loaders stay exported for the
 * cases that need them (static params, filtered product queries).
 *
 * UI code imports from here only — never from `./source`, which is the single
 * filesystem-aware module and the only thing a CMS migration has to replace.
 *
 * Layering: registry (`./registry`) → declarations (`./collection`) →
 * parser (`./source`) → resolvers (`./catalog`, `./pages`, `./machines`,
 * `./gallery`, `./singletons`) → renderer (`src/lib/mdx`).
 */
export { contentRegistry } from "./registry";
export type { ContentCollection, ContentRegistry, ContentSingleton } from "./registry";
export { assetScope, resolveAsset, resolveImage, resolveImages } from "./assets";
export * from "./catalog";
export * from "./gallery";
export * from "./machines";
export * from "./navigation";
export * from "./pages";
export * from "./singletons";
export { CONTENT_ROOT, ContentError, INCLUDE_DRAFTS } from "./source";
export type { ParsedDocument } from "./source";
export type { Collection, CollectionDocument } from "./collection";
