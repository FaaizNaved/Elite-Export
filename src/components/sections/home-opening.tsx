import Link from "next/link";
import { Reveal, SlideUp } from "@/components/motion";
import { ContentImage } from "@/components/ui/image";
import { Container } from "@/components/ui/container";
import { Typography } from "@/components/ui/typography";
import type { Image as ImageToken } from "@/types";

export interface HomeOpeningProps {
  eyebrow?: string;
  heading: string;
  /** One line. Anything longer belongs further down the page. */
  description?: string;
  image: ImageToken;
  action: { label: string; href: string };
  /** Third-party certifications — the only credential a buyer can verify. */
  credentials?: readonly string[];
}

/**
 * The opening frame.
 *
 * Bespoke rather than another `Hero` variant, because this is the one screen
 * where the composition matters more than the reuse. The generic hero stacked
 * eyebrow, headline, paragraph, two competing actions and a four-item credential
 * rail into the middle of a photograph — six things asking for attention, which
 * is a marketing page. This holds one photograph, one sentence and one action,
 * anchored to the bottom-left so the frame reads as a photograph that happens to
 * carry a title rather than a poster.
 */
export function HomeOpening({
  eyebrow,
  heading,
  description,
  image,
  action,
  credentials = [],
}: HomeOpeningProps) {
  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-end overflow-hidden bg-primary text-primary-foreground">
      <ContentImage
        image={image}
        sizes="100vw"
        // `preload`, not the deprecated `priority`. This is the one image on
        // the page that is unambiguously the LCP element, which is exactly the
        // case the docs reserve `preload` for.
        preload
        quality={90}
        className="absolute inset-0 -z-10 object-cover"
      />

      {/* Two scrims, not one wash. The top gradient exists only to carry the
          navigation; the bottom one is dense enough to hold display type at
          any exposure the real photograph turns out to have. A single flat
          overlay dims the whole picture to protect text that only sits in the
          lower third. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-primary/45 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent"
      />

      <Container size="lg" className="relative pb-24 md:pb-28">
        <div className="flex max-w-4xl flex-col gap-7">
          {eyebrow && (
            <SlideUp trigger="mount" className="flex flex-col gap-4">
              <span aria-hidden className="rule-stitch" />
              <Typography
                variant="overline"
                className="text-primary-foreground/70"
              >
                {eyebrow}
              </Typography>
            </SlideUp>
          )}

          <Reveal trigger="mount" delay={0.1}>
            <Typography variant="display" className="text-primary-foreground">
              {heading}
            </Typography>
          </Reveal>

          {description && (
            <SlideUp trigger="mount" delay={0.3}>
              <Typography variant="lead" className="max-w-xl text-primary-foreground/75">
                {description}
              </Typography>
            </SlideUp>
          )}

          <SlideUp trigger="mount" delay={0.42} className="mt-3">
            {/* One action, and it is a link with a rule under it rather than a
                filled button. A solid rectangle is the most UI-looking object
                that can sit on a photograph. */}
            <Link
              href={action.href}
              className="group inline-flex items-center gap-3 border-b border-primary-foreground/35 pb-2 font-sans text-button font-medium tracking-[0.06em] uppercase text-primary-foreground transition-base hover:border-accent hover:text-accent"
            >
              {action.label}
              <span
                aria-hidden
                className="transition-base group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              >
                &rarr;
              </span>
            </Link>
          </SlideUp>
        </div>
      </Container>

      {credentials.length > 0 && (
        <SlideUp
          trigger="mount"
          delay={0.55}
          className="relative border-t border-primary-foreground/12"
        >
          <Container size="lg">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5 font-sans text-caption tracking-[0.14em] uppercase text-primary-foreground/55">
              {credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </Container>
        </SlideUp>
      )}
    </section>
  );
}
