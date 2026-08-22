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
import type { MegaMenuUtility } from "@/components/layout/mega-menu";
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
   * Quiet contact affordance set left of the CTA (blueprint §14). Shown from
   * 1280px only — below that the bar has no room for it, and the footer and
   * contact page carry the same detail.
   */
  contact?: ReactNode;
  /** Actions shown in the mega menu instead of a promoted product. */
  megaMenuUtilities?: readonly MegaMenuUtility[];
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
 * Shrinks and gains a translucent surface on scroll. Panels open on click or
 * Enter/Space — never on hover — and close on Escape, on a click outside the
 * header, or on a route change. Wired with `aria-expanded`/`aria-controls`.
 */
export function Navbar({
  logo,
  items,
  megaMenu,
  cta,
  contact,
  megaMenuUtilities,
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

  /**
   * Panels open on click and on Enter/Space, never on hover.
   *
   * Hovering used to open the products panel, which meant a pointer crossing
   * the bar on its way anywhere dropped a full-width drawer over the page
   * unasked. Opening a catalogue should be a decision. Hover still lights the
   * trigger; it no longer commits the visitor to anything.
   */
  const showPanel = (label: string | null) => setOpenItem(label);

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
    // A click-opened panel has to be dismissable by clicking away from it —
    // there is no pointer-out to close it now that hover does not open it.
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenItem(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openItem]);

  const overlaid = overlay || (overlayRoutes?.includes(pathname) ?? false);
  const transparent = overlaid && !scrolled && !openItem;
  /**
   * The bar is charcoal over a hero and ivory everywhere else, so the gold that
   * marks the current section has to change with it. `--color-accent` reads
   * cleanly on the dark bar and measures 3.06:1 on the ivory one, which is
   * under the floor for a 13px label — the active nav item was the least
   * legible word in the header on every page except home.
   */
  const activeClass = transparent ? "text-accent" : "text-accent-strong";
  const activeMenu = items.find((item) => item.label === openItem);
  const activeColumns = activeMenu?.megaMenu === "products" ? megaMenu : null;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-sticky transition-base",
        transparent
          ? "bg-transparent text-primary-foreground"
          : "border-b border-border bg-surface/92 text-foreground backdrop-blur-glass",
        className,
      )}
    >
      {/* Over a hero the bar has no surface of its own, so a soft scrim keeps
          the light text legible whatever the photograph is doing underneath. */}
      {transparent && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/45 to-transparent"
        />
      )}

      <Container size="lg" className="relative">
        {/* Three tracks, so the navigation is optically centred in the bar
            rather than pushed around by the width of the logo and the CTA. */}
        <div
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-8 transition-base",
            scrolled ? "h-header-condensed" : "h-header",
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center origin-left transition-base",
              // The wordmark condenses with the bar instead of staying put.
              scrolled && "scale-90",
            )}
          >
            {logo}
          </div>

          <nav aria-label="Primary" className="hidden justify-self-center lg:block">
            <ul className="flex items-center">
              {items.map((item) => {
                const hasPanel = item.megaMenu === "products" || item.children.length > 0;
                const expanded = openItem === item.label;
                const active = isActivePath(pathname, item.href);

                return (
                  <li
                    key={item.href}
                    className="group/nav-item relative"
                  >
                    {hasPanel ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={expanded ? panelId : undefined}
                        onClick={() => showPanel(expanded ? null : item.label)}
                        className={cn(navLinkClasses, active && activeClass)}
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
                        className={cn(navLinkClasses, active && activeClass)}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* A hairline under the label: full and gold when the
                        section is active, faint on hover. It grows from the
                        centre, which reads as deliberate rather than sliding. */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-4 bottom-1.5 h-px origin-center bg-accent transition-base",
                        active
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover/nav-item:scale-x-100 group-hover/nav-item:opacity-40",
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

          <div className="flex items-center gap-5 justify-self-end">
            {contact && <div className="hidden xl:block">{contact}</div>}
            {cta && <div className="hidden lg:block">{cta}</div>}

            {/* Bordered rather than bare, so the trigger carries the same
                weight as the CTA it sits beside instead of floating. */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-button border transition-fast lg:hidden",
                transparent
                  ? "border-primary-foreground/25 hover:border-primary-foreground/50"
                  : "border-border hover:border-border-strong hover:bg-surface-sunken",
              )}
            >
              <Icon icon={Menu} size="sm" />
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
            utilities={megaMenuUtilities}
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

/**
 * Nav labels are set in small caps with a little tracking — the typographic
 * register of a printed masthead rather than an application menu. Generous
 * horizontal padding gives each item its own space without widening the bar.
 */
const navLinkClasses = [
  "inline-flex cursor-pointer items-center gap-1.5 rounded-button px-4 py-2.5",
  "font-sans text-caption font-medium tracking-[0.08em] uppercase",
  // Same clock as the hairline beneath it: label and underline are one gesture,
  // and at 150ms against 250ms they arrived separately.
  "transition-base hover:text-accent",
].join(" ");
