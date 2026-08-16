import manifest from "../../public/images/.placeholders.json";

/**
 * The generated placeholder manifest, and the one predicate that reads it.
 *
 * `scripts/generate-placeholders.mjs` writes 98 brown gradient blocks into
 * `public/images` so that every path in the content tree resolves, and records
 * what it wrote here. Photography Direction §24.5 and Brand Bible §16.1 are
 * absolute about them: *there is no such thing as a temporary image, and a
 * single one undoes the credibility of everything else.*
 *
 * Three layers read it, and it imports nothing but the manifest so any of them
 * can:
 *
 *   `ui/image`   draws the plate at that position instead of the file
 *   `lib/seo`    omits it rather than publishing it as a social preview
 *   `lib/plates` turns the reference into a plate token
 *
 * Nothing here is a mode. The predicate answers one question — *is there a real
 * photograph at this path yet* — and the three layers above each do the honest
 * thing with the answer.
 */
const generated = new Set((manifest as string[]).map((file) => file.replace(/^public/, "")));

/** Whether this site-absolute path is a file the generator wrote. */
export const isGeneratedPlaceholder = (src: string): boolean => generated.has(src);

/** How many the generator wrote. Reported, not used to decide anything. */
export const generatedPlaceholderCount = generated.size;
