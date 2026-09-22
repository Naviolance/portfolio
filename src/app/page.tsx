import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Contact } from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { services } from "@/data/services";

// Tells Google who this site is about, in a form it can use for rich results
// and its knowledge of the person/business, not just the page text.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  image: `${site.url}/brand/jpfw-logo-512.png`,
  email: `mailto:${site.email}`,
  telephone: site.whatsapp.display,
  address: { "@type": "PostalAddress", addressCountry: "CM" },
  worksFor: {
    "@type": "Organization",
    name: site.brand,
    url: site.url,
    logo: `${site.url}/brand/jpfw-logo-512.png`,
  },
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "WordPress",
    ...services.map((service) => service.title),
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema} />
      <Hero />
      <ProjectsSection />
      <About />
      <Services />
      <Contact />
    </>
  );
}
