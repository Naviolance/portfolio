import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";

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
          How it&apos;s built
        </h2>
        {/* Stacked on phones (a 3-column table is unreadable at 360px);
            a label / choice / why grid from sm up. */}
        <div className="mt-4 max-w-3xl border-t border-line text-sm">
          <div className="hidden grid-cols-[130px_170px_1fr] gap-4 border-b border-line py-2 text-left font-medium text-ink-soft sm:grid">
            <span>Layer</span>
            <span>Choice</span>
            <span>Why</span>
          </div>
          <dl>
            {project.techStack.map((entry) => (
              <div
                key={entry.layer}
                className="grid gap-1 border-b border-line py-3 sm:grid-cols-[130px_170px_1fr] sm:gap-4"
              >
                <dt className="font-mono text-xs text-steel sm:pt-0.5">{entry.layer}</dt>
                <dd className="font-medium text-ink">{entry.choice}</dd>
                <dd className="text-ink-soft">{entry.why}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Field label="Challenges">
        <ul className="list-disc space-y-2 pl-5">
          {project.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>
      </Field>

      <Field label="Result">
        <p>{project.outcome}</p>
      </Field>

      <div className="border-t border-line py-8">
        <h2 className="font-display text-xl font-bold text-ink">Screenshots</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Tap a screenshot to open it. Swipe to see the next one, and pinch or double-tap to zoom.
        </p>
        <div className="mt-4">
          <ScreenshotGallery
            projectTitle={project.title}
            screenshots={project.screenshots}
            variant="grid"
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 45vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
