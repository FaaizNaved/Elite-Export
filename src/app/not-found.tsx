import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <Section spacing="hero">
      <Container size="md" className="flex flex-col items-center gap-6 text-center">
        <Typography variant="overline">404</Typography>
        <Typography variant="h1">This page could not be found</Typography>
        <Typography variant="lead" className="max-w-xl">
          The link may be out of date, or the page may have moved. The product catalogue is a
          good place to pick the trail back up.
        </Typography>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link href={ROUTES.products} className={buttonVariants({ size: "lg" })}>
            Browse products
          </Link>
          <Link
            href={ROUTES.contact}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Contact us
          </Link>
        </div>
      </Container>
    </Section>
  );
}
