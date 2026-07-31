"use client";

import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";
import type { MegaMenu as MegaMenuData, NavItem, NavLink } from "@/types";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  /** Fills the entry flagged `megaMenu: "products"` with nested categories. */
  megaMenu?: MegaMenuData | null;
  /** Rendered at the bottom of the drawer — usually the primary CTA. */
  cta?: ReactNode;
  className?: string;
}

/**
 * Slide-in navigation drawer.
 *
 * Built on the native `<dialog>` element, which supplies focus trapping,
 * Escape-to-close and background inertness. Nested levels use `<details>` so
 * expanding a section needs no state and works before hydration.
 */
export function MobileMenu({ open, onClose, items, megaMenu, cta, className }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Any navigation dismisses the drawer.
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- route change only
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Site navigation"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-0 ml-auto h-dvh max-h-none w-[min(22rem,90vw)] max-w-none bg-surface p-0 text-foreground",
        "backdrop:bg-overlay",
        // Entry only: a native dialog leaves the top layer the moment it
        // closes, so an exit animation would never be seen.
        "open:animate-[slide-in-right_var(--duration-normal)_var(--ease-entrance)]",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <Typography variant="overline">Menu</Typography>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="-mr-2 rounded-button p-2 text-foreground-muted transition-fast hover:bg-surface-sunken hover:text-foreground"
          >
            <Icon icon={X} size="sm" />
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const columns = item.megaMenu === "products" ? (megaMenu?.columns ?? []) : [];
              const hasChildren = item.children.length > 0 || columns.length > 0;

              if (!hasChildren) {
                return (
                  <li key={item.href}>
                    <DrawerLink link={item} active={isActivePath(pathname, item.href)} />
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <details className="group/section border-b border-border last:border-b-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-sans text-body-lg marker:hidden">
                      {item.label}
                      <Icon
                        icon={ChevronDown}
                        size="sm"
                        tone="muted"
                        className="transition-fast group-open/section:rotate-180"
                      />
                    </summary>

                    <ul className="flex flex-col gap-1 pb-3 pl-3">
                      <li>
                        <DrawerLink
                          link={{ ...item, label: `All ${item.label}` }}
                          active={false}
                          subdued
                        />
                      </li>

                      {item.children.map((child) => (
                        <li key={child.href}>
                          <DrawerLink
                            link={child}
                            active={isActivePath(pathname, child.href)}
                            subdued
                          />
                        </li>
                      ))}

                      {columns.map((column) => (
                        <li key={column.href}>
                          <details className="group/category">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-sans text-small text-foreground-secondary marker:hidden">
                              {column.label}
                              <Icon
                                icon={ChevronDown}
                                size="xs"
                                tone="muted"
                                className="transition-fast group-open/category:rotate-180"
                              />
                            </summary>
                            <ul className="flex flex-col gap-1 pb-2 pl-3">
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <DrawerLink
                                    link={link}
                                    active={isActivePath(pathname, link.href)}
                                    subdued
                                  />
                                </li>
                              ))}
                            </ul>
                          </details>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </nav>

        {cta && <div className="border-t border-border px-6 py-5">{cta}</div>}
      </div>
    </dialog>
  );
}

function DrawerLink({
  link,
  active,
  subdued = false,
}: {
  link: NavLink;
  active: boolean;
  subdued?: boolean;
}) {
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "block py-2 transition-fast",
        subdued ? "font-sans text-small" : "font-sans text-body-lg",
        active ? "text-accent" : "text-foreground-secondary hover:text-foreground",
      )}
    >
      {link.label}
    </Link>
  );
}
