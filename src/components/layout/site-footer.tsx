import { Logo } from "@/components/common/logo";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation/main-nav";
import { getCategories, getLegalPages } from "@/lib/content";

/**
 * Server wrapper that fills the footer from the catalog and site config.
 * Product columns and legal links come from content, so they stay current
 * without anyone editing navigation data.
 */
export async function SiteFooter() {
  const [categories, legalPages] = await Promise.all([getCategories(), getLegalPages()]);

  return (
    <Footer
      logo={<Logo label={siteConfig.name} />}
      description={siteConfig.description}
      companyName={siteConfig.legalName}
      contact={siteConfig.company.contact}
      social={siteConfig.company.social}
      columns={[
        ...footerNav.map((group) => ({ heading: group.heading, links: group.links })),
        {
          heading: "Products",
          links: categories.map((category) => ({
            label: category.name,
            href: category.href,
            external: false,
          })),
        },
      ]}
      legalLinks={legalPages.map((page) => ({
        label: page.title,
        href: page.href,
        external: false,
      }))}
    />
  );
}
