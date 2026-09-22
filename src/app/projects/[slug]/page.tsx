import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-bold text-ink">{label}</h2>
      <div className="mt-4 max-w-2xl text-ink-soft">{children}</div>
    </div>
  );
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <Link href="/#work" className="text-sm text-ink-soft hover:text-rust-ink">
        ← Back to work
      </Link>

      <header className="mt-6 border-b border-line pb-10">
        <p className="font-mono text-xs text-steel">{project.category}</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink px-4 py-2 font-medium text-ink transition-colors hover:border-rust hover:bg-rust hover:text-paper"
          >
            Live demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-4 py-2 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            GitHub repository
          </a>
        </div>
      </header>

      <Field label="Overview">
        <p>{project.summary}</p>
      </Field>

      <Field label="Problem">
        <p>{project.problem}</p>
      </Field>

      <Field label="Solution">
        <p>{project.solution}</p>
      </Field>

      <Field label="Key features">
        <ul className="list-disc space-y-2 pl-5">
          {project.keyFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Field>

      <div className="border-t border-line py-8">
        <h2 className="font-display text-xl font-bold text-ink">
          Technical implementation
        </h2>
        <div className="mt-4 max-w-2xl overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-ink-soft">
                <th className="py-2 pr-4 font-medium">Layer</th>
                <th className="py-2 pr-4 font-medium">Choice</th>
                <th className="py-2 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {project.techStack.map((entry) => (
                <tr key={entry.layer} className="border-b border-line align-top">
                  <td className="py-3 pr-4 font-mono text-xs text-steel">
                    {entry.layer}
                  </td>
                  <td className="py-3 pr-4 font-medium text-ink">
                    {entry.choice}
                  </td>
                  <td className="py-3 text-ink-soft">{entry.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Field label="Challenges">
        <ul className="list-disc space-y-2 pl-5">
          {project.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>
      </Field>

      <Field label="Outcome">
        <p>{project.outcome}</p>
      </Field>

      <div className="border-t border-line py-8">
        <h2 className="font-display text-xl font-bold text-ink">Screenshots</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((shot) => (
            <ScreenshotPlaceholder key={shot.key} label={shot.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
