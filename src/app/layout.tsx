import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { DEFAULT_HTML_LANG } from "@/constants";
import { buildRootMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * No web font is loaded.
 *
 * Visual Design System §8.3 specifies the two faces and marks them Calibrated:
 * neither is licensed yet (MIB §20 item 13). Until the licence exists the
 * stacks in `globals.css` fall through to a system face — shipping a
 * substitute would say something about this company that is not true, and the
 * previous pair (a 2011 display serif and a 2016 interface sans) fails §8.2
 * criteria 1 and 2 outright.
 *
 * Integration, when the files arrive: `next/font/local`, self-hosted, wired to
 * `--font-serif` and `--font-sans`. Nothing else changes.
 */
export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_HTML_LANG} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* Organisation data is site-wide, so it belongs on every page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-(--z-dialog) focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>

        {/*
          No smooth-scroll provider and no back-to-top control.

          Motion Direction M7: the frame never moves — a hijacked scroll is the
          medium announcing itself. UX Blueprint X6 and Creative Direction Book
          §22.4: nothing follows the visitor, because an element that persists
          converts every held moment on the surface into an advertisement with a
          picture behind it.
        */}
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
