"use client";

import Link from "next/link";
import { ErrorState } from "@/components/feedback";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section spacing="hero">
      <Container size="md">
        <ErrorState
          onRetry={reset}
          detail={error.message}
          action={
            <Link href={ROUTES.home} className={buttonVariants({ variant: "outline" })}>
              Back to home
            </Link>
          }
        />
      </Container>
    </Section>
  );
}
