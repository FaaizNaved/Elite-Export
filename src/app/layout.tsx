import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { BackToTop } from "@/components/scroll";
import { DEFAULT_HTML_LANG } from "@/constants";
import { buildRootMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";
import { SmoothScroll } from "@/providers/smooth-scroll";
import "./globals.css";

/** Body — highly readable, professional. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Headings — editorial, timeless. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_HTML_LANG}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Organisation data is site-wide, so it belongs on every page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-toast focus:rounded-button focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>

        <BackToTop />
      </body>
    </html>
  );
}
