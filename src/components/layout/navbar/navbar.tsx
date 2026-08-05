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
 * Grace period before a panel closes on mouse-out. Without it, the diagonal
 * travel from a nav label down into the panel below it crosses a few pixels of
 * dead space and snaps the panel shut — the one interaction on the site that
 * consistently reads as cheap. Short enough to be invisible when the user
 * genuinely leaves.
 */
const CLOSE_DELAY = 140;

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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  /** Opening is immediate; only closing waits. Latency on the way in is felt. */
  const showPanel = (label: string | null) => {
    cancelClose();
    setOpenItem(label);
  };

  const hidePanel = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenItem(null), CLOSE_DELAY);
  };

  useEffect(() => cancelClose, []);

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
      onMouseLeave={hidePanel}
      onMouseEnter={cancelClose}
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
                    // Moving onto a plain link closes whatever was open —
                    // otherwise the products panel stayed up while the pointer
                    // sat on "About".
                    onMouseEnter={() => showPanel(hasPanel ? item.label : null)}
                    className="group/nav-item relative"
                  >
                    {hasPanel ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={expanded ? panelId : undefined}
                        onClick={() => showPanel(expanded ? null : item.label)}
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
