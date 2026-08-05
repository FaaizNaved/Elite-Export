import { Logo } from "@/components/common/logo";
import { Footer } from "@/components/layout/footer";
import { company, siteConfig } from "@/config";
import { footerNav } from "@/config";
import { getCategories, getLegalPages } from "@/lib/content";

/**
 * Server wrapper that fills the footer from the catalog and site config.
 * Product columns and legal links come from content, so they stay current
 * without anyone editing navigation data.
 */
export async function SiteFooter() {
  const [categories, legalPages] = await Promise.all([getCategories(), getLegalPages()]);

  // Proof points, derived from the company record so they never go stale.
  const trust = [
    { value: `${new Date().getFullYear() - company.foundedYear}`, label: "Years manufacturing" },
    { value: `${company.exportMarkets.length}`, label: "Export markets" },
    { value: company.employees ?? "", label: "Craftspeople and staff" },
    { value: `${company.certifications.length}`, label: "Certifications held" },
  ].filter((item) => item.value.length > 0);

  return (
    <Footer
      logo={<Logo label={siteConfig.name} />}
      description={siteConfig.description}
      companyName={siteConfig.legalName}
      contact={company.contact}
      social={company.social}
      trust={trust}
      certifications={company.certifications.map((certification) => certification.name)}
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
