import { routeTo } from "../../constants/routes";
import { machineFrontmatterSchema } from "../../models";
import type { Machine, ProductionStage } from "../../types";
import { withAlt, withAltAll } from "../../utils/image";
import { assetScope, resolveImage, resolveImages } from "./assets";
import { byOrderThenTitle, defineCollection, type Collection } from "./collection";
import { CONTENT_DIR } from "./source";

/** Machinery catalogue — `src/content/machines/<slug>.mdx`. */

const machines: Collection<Machine> = defineCollection({
  dir: CONTENT_DIR.machines,
  schema: machineFrontmatterSchema,
  sort: byOrderThenTitle,
  resolve: ({ data, sourcePath, slug }): Machine => {
    const resolvedSlug = data.slug ?? slug;
    const assets = assetScope.machine(resolvedSlug);

    return {
      ...data,
      slug: resolvedSlug,
      href: routeTo.machine(resolvedSlug),
      sourcePath,
      gallery: {
        thumbnail: withAlt(resolveImage(assets, data.gallery.thumbnail), data.title),
        images: withAltAll(resolveImages(assets, data.gallery.images), data.title),
      },
    };
  },
});

export const getMachines = machines.all;
export const getMachine = machines.bySlug;

export async function getFeaturedMachines(limit = 3): Promise<Machine[]> {
  return (await getMachines()).filter((machine) => machine.featured).slice(0, limit);
}

/** Machines grouped by production stage, in line order, empty stages dropped. */
export async function getMachinesByStage(): Promise<
  Array<{ stage: ProductionStage; machines: Machine[] }>
> {
  const all = await getMachines();
  const order: readonly ProductionStage[] = [
    "cutting",
    "preparation",
    "stitching",
    "finishing",
    "quality",
    "packing",
  ];

  return order
    .map((stage) => ({ stage, machines: all.filter((machine) => machine.stage === stage) }))
    .filter((group) => group.machines.length > 0);
}

export async function getMachineRoutes(): Promise<Array<{ machine: string }>> {
  return (await getMachines()).map((machine) => ({ machine: machine.slug }));
}
