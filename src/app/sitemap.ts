import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

// Every page, in every language. Each entry also lists its translations
// (alternates.languages): the sitemap form of hreflang, telling Google the
// /en and /fr versions are the same page in two languages.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    ...projects.map((project) => ({ path: `/projects/${project.slug}`, priority: 0.8 })),
  ];

  return pages.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    }))
  );
}
