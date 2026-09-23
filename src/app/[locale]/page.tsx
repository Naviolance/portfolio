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
import { site } from "@/data/site";
import { services } from "@/data/services";

// Tells Google who this site is about, in a form it can use for rich results
// and its knowledge of the person/business, not just the page text.
function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.name,
    jobTitle: site.role[locale],
    description: site.description[locale],
    url: `${site.url}/${locale}`,
    image: `${site.url}/brand/jpfw-logo-512.png`,
    email: `mailto:${site.email}`,
    telephone: site.whatsapp.display,
    address: { "@type": "PostalAddress", addressLocality: "Douala", addressCountry: "CM" },
    worksFor: {
      "@type": "Organization",
      name: site.brand,
      url: site.url,
      logo: `${site.url}/brand/jpfw-logo-512.png`,
    },
    sameAs: [site.linkedin, site.github],
    knowsLanguage: ["en", "fr"],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "WordPress",
      ...services.map((service) => service.title[locale]),
    ],
  };
}

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
