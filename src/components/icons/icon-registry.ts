import {
  Award,
  BadgeCheck,
  Boxes,
  Clock,
  Container,
  Factory,
  FileCheck,
  Gem,
  Globe,
  Handshake,
  Layers,
  Leaf,
  Microscope,
  Package,
  PenTool,
  Recycle,
  Ruler,
  Scissors,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons the content layer is allowed to name.
 *
 * Content files reference an icon by string (`icon: shield-check`); this is the
 * only place that string becomes a component. Keeping it a fixed registry means
 * the bundle contains exactly these icons instead of all of lucide, and an
 * unknown name degrades to no icon rather than crashing the page.
 */
export const ICON_REGISTRY = {
  award: Award,
  "badge-check": BadgeCheck,
  boxes: Boxes,
  clock: Clock,
  container: Container,
  factory: Factory,
  "file-check": FileCheck,
  gem: Gem,
  globe: Globe,
  handshake: Handshake,
  layers: Layers,
  leaf: Leaf,
  microscope: Microscope,
  package: Package,
  "pen-tool": PenTool,
  recycle: Recycle,
  ruler: Ruler,
  scissors: Scissors,
  "shield-check": ShieldCheck,
  ship: Ship,
  sparkles: Sparkles,
  truck: Truck,
  users: Users,
  wrench: Wrench,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_REGISTRY;

export function resolveIcon(name?: string): LucideIcon | undefined {
  if (!name) return undefined;
  return ICON_REGISTRY[name as IconName];
}
