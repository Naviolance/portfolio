import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { FaqTeaser } from "@/components/faq/FaqTeaser";
import { JsonLd } from "@/components/JsonLd";
import { personSchema } from "@/lib/person-schema";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={personSchema(locale)} />
      <Hero />
      <ProjectsSection />
      <About />
      <Experience />
      <Services />
      <Pricing />
      <FaqTeaser />
      <Contact />
    </>
  );
}
