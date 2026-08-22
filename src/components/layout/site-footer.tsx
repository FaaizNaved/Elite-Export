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

  // A back page restates nothing: it says who made the catalogue and how to
  // reach them. The certification badges are the exception, because they are
  // the one claim on the page a buyer can independently verify.
  return (
    <Footer
      logo={<Logo label={siteConfig.name} />}
      description={company.tagline}
      companyName={siteConfig.legalName}
      contact={company.contact}
      social={company.social}
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
