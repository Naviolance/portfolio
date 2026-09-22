import Link from "next/link";
import { projects } from "@/data/projects";
import { ScreenshotGallery } from "./ScreenshotGallery";

export function ProjectsSection() {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-ink">
          Featured work
        </h2>
        <div className="mt-10 flex flex-col gap-14">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-6 border border-line md:grid-cols-[1.1fr_1.4fr]"
            >
              <div className="flex items-center border-b border-line md:border-b-0 md:border-r">
                <ScreenshotGallery
                  projectTitle={project.title}
                  screenshots={project.screenshots}
                  variant="cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <p className="font-mono text-xs text-label">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-accent-ink"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-3 text-ink-soft">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech.layer}
                      className="border border-line px-2 py-1 font-mono text-[11px] text-ink-soft"
                    >
                      {tech.choice}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent hover:text-accent-ink"
                  >
                    How I built it
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-soft underline decoration-line underline-offset-4 hover:decoration-accent hover:text-accent-ink"
                  >
                    Live demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-soft underline decoration-line underline-offset-4 hover:decoration-accent hover:text-accent-ink"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
