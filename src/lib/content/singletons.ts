import { faqCollectionSchema, testimonialCollectionSchema } from "../../models";
import {
  homeCompanySchema,
  homeCtaSchema,
  homeHeroSchema,
  homePauseSchema,
  homeSectionSchema,
} from "../../models/home";
import type { HomeContent } from "../../models/home";
import type { Faq, FaqTopic, Testimonial } from "../../types";
import { once } from "../../utils/cache";
import { readJsonFile } from "./source";

/**
 * Content that exists exactly once: the home page document, the FAQ list and
 * the testimonial list.
 *
 * These are plain JSON under `src/content`, read and validated through the same
 * parser as everything else — one business layer, one validation path, one
 * thing to point a CMS at.
 */

/* -------------------------------------------------------------------------- */
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Which file owns which section of the home page.
 *
 * This map is the home page's table of contents: adding a section means adding
 * a file and one line here. Filenames read the way an author thinks about the
 * page; the keys are what the page renders.
 */
const HOME_SECTIONS = {
  categories: "categories",
  manufacturing: "manufacturing-preview",
  quality: "quality-preview",
  origin: "origin",
} as const satisfies Record<string, string>;

const homeFile = (name: string) => `home/${name}.json`;

/**
 * Assembles the home document from its section files.
 *
 * Reads run in parallel and the result is memoised, so splitting the content
 * into eleven files costs one `Promise.all`, not eleven sequential reads.
 */
export const getHomeContent = once(async (): Promise<HomeContent> => {
  const sectionKeys = Object.keys(HOME_SECTIONS) as Array<keyof typeof HOME_SECTIONS>;

  const [hero, intro, pause, cta, ...sectionValues] = await Promise.all([
    readJsonFile(homeFile("hero"), homeHeroSchema),
    readJsonFile(homeFile("company"), homeCompanySchema),
    readJsonFile(homeFile("pause"), homePauseSchema),
    readJsonFile(homeFile("cta"), homeCtaSchema),
    ...sectionKeys.map((key) => readJsonFile(homeFile(HOME_SECTIONS[key]), homeSectionSchema)),
  ]);

  const sections = Object.fromEntries(
    sectionKeys.map((key, index) => [key, sectionValues[index]]),
  ) as HomeContent["sections"];

  return { hero, intro, pause, sections, cta };
});

/* -------------------------------------------------------------------------- */
/* FAQs and testimonials                                                       */
/* -------------------------------------------------------------------------- */

export const getFaqs = once(async (): Promise<Faq[]> => {
  const faqs = await readJsonFile("faqs.json", faqCollectionSchema);
  return [...faqs].sort((a, b) => a.order - b.order);
});

export async function getFaqsByTopic(topic: FaqTopic): Promise<Faq[]> {
  return (await getFaqs()).filter((faq) => faq.topic === topic);
}

export const getTestimonials = once(async (): Promise<Testimonial[]> => {
  const testimonials = await readJsonFile("testimonials.json", testimonialCollectionSchema);
  return [...testimonials].sort((a, b) => a.order - b.order);
});

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  return (await getTestimonials()).filter((testimonial) => testimonial.featured).slice(0, limit);
}
