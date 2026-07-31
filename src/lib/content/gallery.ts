import { ROUTES } from "../../constants/routes";
import { galleryAlbumSchema } from "../../schemas";
import type { GalleryAlbum, Image } from "../../types";
import { once } from "../../utils/cache";
import { withAlt, withAltAll } from "../../utils/image";
import { joinPath } from "../../utils/slug";
import { CONTENT_DIR, isPublished, listDirectories, readJsonFile } from "./source";

/** Photo albums — `src/content/gallery/<album>/album.json`. */

export const getGalleryAlbums = once(async (): Promise<GalleryAlbum[]> => {
  const slugs = await listDirectories(CONTENT_DIR.gallery);

  const albums = await Promise.all(
    slugs.map(async (slug): Promise<GalleryAlbum> => {
      const sourcePath = `${CONTENT_DIR.gallery}/${slug}/album.json`;
      const meta = await readJsonFile(sourcePath, galleryAlbumSchema);

      return {
        ...meta,
        cover: withAlt(meta.cover, meta.name),
        images: withAltAll(meta.images, meta.name),
        slug,
        // Albums are filters on one page rather than routes of their own.
        href: `${joinPath(ROUTES.gallery)}#${slug}`,
        sourcePath,
      };
    }),
  );

  return albums
    .filter(isPublished)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
});

export async function getGalleryAlbum(slug: string): Promise<GalleryAlbum | null> {
  return (await getGalleryAlbums()).find((album) => album.slug === slug) ?? null;
}

/** Every image across every album — the "All" tab of the gallery. */
export async function getAllGalleryImages(): Promise<Image[]> {
  return (await getGalleryAlbums()).flatMap((album) => album.images);
}
