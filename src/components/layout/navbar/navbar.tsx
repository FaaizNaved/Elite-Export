"use client";

import { AnimatePresence } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { MegaMenuPanel } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";
import type { MegaMenu as MegaMenuData, NavItem } from "@/types";

export interface NavbarProps {
  /** Brand mark. Wrap it in a link to `/` yourself so the markup stays yours. */
  logo: ReactNode;
  items: readonly NavItem[];
  /** Fills any item flagged `megaMenu: "products"`. */
  megaMenu?: MegaMenuData | null;
  /** Primary action, e.g. an enquiry button. Also shown in the mobile drawer. */
  cta?: ReactNode;
  /**
   * Sits transparently over a full-bleed hero until the user scrolls.
   * Pages without a hero should leave this false.
   */
  overlay?: boolean;
  /**
   * Routes that get the overlay treatment automatically. Lets a single header
   * instance live in the root layout and still adapt per page.
   */
  overlayRoutes?: readonly string[];
  className?: string;
}

/** Distance scrolled before the bar condenses and picks up its glass surface. */
const SCROLL_THRESHOLD = 24;

/**
 * Sticky primary navigation.
 *
 * Shrinks and gains a translucent surface on scroll. Dropdowns and the mega
 * menu open on hover for pointer users and on Enter/Space for keyboard users,
 * close on Escape, and are wired with `aria-expanded`/`aria-controls`.
 */
export function Navbar({
  logo,
  items,
  megaMenu,
  cta,
  overlay = false,
  overlayRoutes,
  className,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open panel when the route changes. Adjusting state during render
  // is React's documented alternative to a route-watching effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenItem(null);
  }

  useEffect(() => {
    if (!openItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenItem(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openItem]);

  const overlaid = overlay || (overlayRoutes?.includes(pathname) ?? false);
  const transparent = overlaid && !scrolled && !openItem;
  const activeMenu = items.find((item) => item.label === openItem);
  const activeColumns = activeMenu?.megaMenu === "products" ? megaMenu : null;

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setOpenItem(null)}
      className={cn(
        "fixed inset-x-0 top-0 z-sticky transition-base",
        transparent
          ? "bg-transparent text-primary-foreground"
          : "border-b border-border bg-surface/85 text-foreground backdrop-blur-md",
        className,
      )}
    >
      <Container size="lg">
        <div
          className={cn(
            "flex items-center justify-between gap-8 transition-base",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <div className="flex shrink-0 items-center">{logo}</div>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const hasPanel = item.megaMenu === "products" || item.children.length > 0;
                const expanded = openItem === item.label;
                const active = isActivePath(pathname, item.href);

                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => hasPanel && setOpenItem(item.label)}
                    className="relative"
                  >
                    {hasPanel ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={expanded ? panelId : undefined}
                        onClick={() => setOpenItem(expanded ? null : item.label)}
                        className={cn(navLinkClasses, active && "text-accent")}
                      >
                        {item.label}
                        <Icon
                          icon={ChevronDown}
                          size="xs"
                          className={cn("transition-fast", expanded && "rotate-180")}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(navLinkClasses, active && "text-accent")}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Active indicator sits under the label, not on it. */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left bg-accent transition-base",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />

                    {expanded && !activeColumns && item.children.length > 0 && (
                      <ul className="absolute top-full left-0 z-dropdown min-w-64 rounded-card border border-border bg-surface p-2 text-foreground shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenItem(null)}
                              className="flex flex-col gap-0.5 rounded-button px-3 py-2.5 transition-fast hover:bg-surface-sunken"
                            >
                              <span className="font-sans text-small">{child.label}</span>
                              {child.description && (
                                <span className="font-sans text-caption text-foreground-muted">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {cta && <div className="hidden lg:block">{cta}</div>}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              className="rounded-button p-2 transition-fast hover:bg-surface-sunken lg:hidden"
            >
              <Icon icon={Menu} size="md" />
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {activeColumns && (
          <MegaMenuPanel
            key="mega-menu"
            id={panelId}
            menu={activeColumns}
            onNavigate={() => setOpenItem(null)}
          />
        )}
      </AnimatePresence>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={items}
        megaMenu={megaMenu}
        cta={cta}
      />
    </header>
  );
}

const navLinkClasses =
  "inline-flex items-center gap-1.5 rounded-button px-3 py-2 font-sans text-small transition-fast hover:text-accent";
