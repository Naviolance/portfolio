import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { updated } from "@/data/dates";

// Every page, in every language. Each entry also lists its translations
// (alternates.languages): the sitemap form of hreflang, telling Google the
// /en and /fr versions are the same page in two languages.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, date: updated.home },
    { path: "/faq", priority: 0.7, date: updated.faq },
    { path: "/cv", priority: 0.6, date: updated.cv },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      priority: 0.8,
      date: updated.projects[project.slug] ?? updated.home,
    })),
  ];

  return pages.flatMap(({ path, priority, date }) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      // Real content dates (data/dates.ts), not the build time.
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    }))
  );
}
