import Link from "next/link";
import { Logo } from "@/components/common/logo";
import { Navbar } from "@/components/layout/navbar";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants";
import { mainNav } from "@/data/navigation/main-nav";
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
      cta={
        <Link href={ROUTES.buyerEnquiry} className={buttonVariants({ size: "sm" })}>
          Buyer enquiry
        </Link>
      }
    />
  );
}
