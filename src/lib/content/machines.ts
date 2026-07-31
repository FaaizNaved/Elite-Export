import { routeTo } from "../../constants/routes";
import { machineFrontmatterSchema } from "../../schemas";
import type { Machine, ProductionStage } from "../../types";
import { once } from "../../utils/cache";
import { withAlt, withAltAll } from "../../utils/image";
import { slugFromFilename } from "../../utils/slug";
import { CONTENT_DIR, isPublished, listMdxFiles, readMdxFile } from "./source";

/** Machinery catalogue — `src/content/machines/<slug>.mdx`. */

export const getMachines = once(async (): Promise<Machine[]> => {
  const files = await listMdxFiles(CONTENT_DIR.machines);

  const machines = await Promise.all(
    files.map(async (fileName): Promise<Machine> => {
      const { data, sourcePath } = await readMdxFile(
        `${CONTENT_DIR.machines}/${fileName}`,
        machineFrontmatterSchema,
      );
      const slug = data.slug ?? slugFromFilename(fileName);

      return {
        ...data,
        slug,
        href: routeTo.machine(slug),
        sourcePath,
        gallery: {
          thumbnail: withAlt(data.gallery.thumbnail, data.title),
          images: withAltAll(data.gallery.images, data.title),
        },
      };
    }),
  );

  return machines
    .filter(isPublished)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});

export async function getMachine(slug: string): Promise<Machine | null> {
  return (await getMachines()).find((machine) => machine.slug === slug) ?? null;
}

export async function getFeaturedMachines(limit = 3): Promise<Machine[]> {
  return (await getMachines()).filter((machine) => machine.featured).slice(0, limit);
}

/** Machines grouped by production stage, in line order, empty stages dropped. */
export async function getMachinesByStage(): Promise<
  Array<{ stage: ProductionStage; machines: Machine[] }>
> {
  const machines = await getMachines();
  const order: ProductionStage[] = [
    "cutting",
    "preparation",
    "stitching",
    "finishing",
    "quality",
    "packing",
  ];

  return order
    .map((stage) => ({ stage, machines: machines.filter((machine) => machine.stage === stage) }))
    .filter((group) => group.machines.length > 0);
}

export async function getMachineRoutes(): Promise<Array<{ machine: string }>> {
  return (await getMachines()).map((machine) => ({ machine: machine.slug }));
}
