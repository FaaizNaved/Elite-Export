import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Navbar } from "@/components/layout/navbar";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { company, mainNav, siteConfig } from "@/config";
import { getProductsMegaMenu } from "@/lib/content";

/** Routes whose hero runs under the header. */
const OVERLAY_ROUTES = [ROUTES.home] as const;

/**
 * Server wrapper that resolves the mega menu from the catalog and hands it to
 * the client `Navbar`. Reading content here is what keeps the filesystem
 * content layer out of the browser bundle.
 */
export async function SiteHeader() {
  const megaMenu = await getProductsMegaMenu();

  return (
    <Navbar
      logo={<Logo label={siteConfig.name} />}
      items={mainNav}
      megaMenu={megaMenu}
      overlayRoutes={OVERLAY_ROUTES}
      // Two, and labels only. A navigation panel that explains itself is
      // making the visitor read instead of letting them move.
      megaMenuUtilities={[
        { label: "All products", href: ROUTES.products },
        { label: "Request samples", href: ROUTES.buyerEnquiry },
      ]}
      contact={
        <a
          href={`tel:${company.contact.phone.replace(/s+/g, "")}`}
          className="font-sans text-caption text-current/70 transition-fast hover:text-accent"
        >
          {company.contact.phone}
        </a>
      }
      cta={
        <Link href={ROUTES.buyerEnquiry} className={buttonVariants({ size: "sm" })}>
          Buyer enquiry
        </Link>
      }
    />
  );
}
