import { Fragment } from "react";
import type { Metadata } from "next";
import { Chapter, Coda, HeldMoment, Overture } from "@/components/structure";
import { Range } from "@/components/sections";
import { Reveal } from "@/components/system";
import { Continuation } from "@/components/ui/action";
import { Passage, Statement } from "@/components/ui/typography";
import { company, homeTelling, siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { sceneRefusal, type Scene } from "@/components/structure";
import { getCategories, getCompanyPage, getHomeContent } from "@/lib/content";
import { chapterFrames, framed, RECORD_ROW_SHAPE } from "@/lib/demo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: ROUTES.home,
});

/**
 * Home.
 *
 *   overture   paper      one screen, the statement and the board
 *   C1         paper      the place, at bleed, then the object beside the words
 *   silence    ink        one sentence, one viewport
 *   C3         paper      the decision
 *   range      recessed   the catalogue
 *   coda       paper      a sentence and a door — never an ask
 */
export default async function HomePage() {
  const [categories, manufacturing, home] = await Promise.all([
    getCategories(),
    getCompanyPage("manufacturing"),
    getHomeContent(),
  ]);

  const { hero, intro, sections } = home;
  const origin = sections.origin;

  const place = chapterFrames("C1");
  const decision = chapterFrames("C3");
  const mechanism = manufacturing?.steps.find((step) => step.title === "Cutting");

  const placeScenes: Scene[] = [
    {
      frames: place,
      relationship: "establish-and-examine",
      annotation: (
        <>
          <Statement rank="t1" as="h2">
            {intro.description}
          </Statement>
          <Passage className="mt-s3">{intro.body}</Passage>
        </>
      ),
      release: <Continuation href={ROUTES.about}>Who is in the building</Continuation>,
    },
  ];

  const decisionScenes: Scene[] = mechanism
    ? [
        {
          frames: decision,
          annotation: (
            <>
              <Statement rank="d" as="h2" className="reading:max-w-none">
                {mechanism.title}
              </Statement>
              <Passage className="mt-s4">{mechanism.description}</Passage>
            </>
          ),
          release: (
            <Continuation href={ROUTES.manufacturing}>
              The whole process, stage by stage
            </Continuation>
          ),
        },
      ]
    : [];

  const holds =
    !sceneRefusal(placeScenes) || !sceneRefusal(decisionScenes, { isRecognition: true });

  const overtureRecord = [
    { label: "Established", value: String(company.foundedYear) },
    { label: "Manufacture", value: `Own facility, ${company.contact.address.city}` },
    { label: "Capability", value: "OEM and ODM" },
    {
      label: "Audited by",
      value: company.certifications
        .map((certification) => certification.name.replace("Leather Working Group", "LWG"))
        .join(" · "),
    },
  ];

  return (
    <>
      <Reveal />

      <Overture
        title={hero.heading}
        eyebrow={hero.eyebrow}
        summary={hero.description}
        photograph={framed(hero.image, "E5", [1000, 1500])}
        record={overtureRecord}
        className="atmosphere-light"
      />

      {homeTelling.map(({ chapter, role }) => {
        if (role === "hands") return null;

        if (chapter === "C1") {
          return (
            <Chapter
              key={chapter}
              id="C1"
              opening="photograph"
              priority
              opensTheTelling
              scenes={placeScenes}
              className="atmosphere-stitch"
            />
          );
        }

        return (
          <Fragment key={chapter}>
            {holds && (
              <HeldMoment
                statement={intro.heading}
                mark={`${company.contact.address.city}, ${company.contact.address.country}`}
                className="bg-ink text-paper"
              />
            )}

            <Chapter
              id="C3"
              opening="held"
              isRecognition
              scenes={decisionScenes}
              className="atmosphere-emboss"
            />
          </Fragment>
        );
      })}

      <Range
        eyebrow={sections.categories?.eyebrow}
        heading={sections.categories?.heading ?? "What we make"}
        description={sections.categories?.description}
        items={categories.map((category) => ({
          href: category.href,
          name: category.name,
          summary: category.shortDescription,
          image: category.thumbnail
            ? framed(category.thumbnail, "E6", RECORD_ROW_SHAPE)
            : undefined,
        }))}
        continuation={<Continuation href={ROUTES.products}>Every product we make</Continuation>}
        className="atmosphere-light"
      />

      {/* No ask. A sentence, and a door further into the work. */}
      <Coda
        statement={origin?.heading ?? intro.heading}
        mark={`Est. ${company.foundedYear} · ${company.contact.address.city}`}
        continuation={
          <Continuation href={ROUTES.manufacturing}>How a piece is made</Continuation>
        }
        className="atmosphere-linen"
      />
    </>
  );
}
