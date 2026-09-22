import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <About />
      <Services />
      <Contact />
    </>
  );
}
