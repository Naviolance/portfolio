import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { updated } from "@/data/dates";
import { services } from "@/data/services";
import { PROCESS_PATH } from "@/data/page-paths";

// Every page, in every language. Each entry also lists its translations
// (alternates.languages): the sitemap form of hreflang, telling Google the
// /en and /fr versions are the same page in two languages.
export default function sitemap(): MetadataRoute.Sitemap {
  // `path` is the same in every language, except for pages whose address
  // is translated (service pages, "How I work"): one path per language.
  const pages: { path: string | Record<Locale, string>; priority: number; date: string }[] = [
    { path: "", priority: 1, date: updated.home },
    { path: "/faq", priority: 0.7, date: updated.faq },
    { path: "/cv", priority: 0.6, date: updated.cv },
    { path: PROCESS_PATH, priority: 0.7, date: updated.process },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      priority: 0.8,
      date: updated.projects[project.slug] ?? updated.home,
    })),
    ...services.map((service) => ({
      path: { en: `/services/${service.slug.en}`, fr: `/services/${service.slug.fr}` },
      priority: 0.9,
      date: updated.services,
    })),
  ];

  return pages.flatMap(({ path, priority, date }) => {
    const pathFor = (l: Locale) => (typeof path === "string" ? path : path[l]);
    return routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${pathFor(locale)}`,
      // Real content dates (data/dates.ts), not the build time.
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${pathFor(l)}`])),
      },
    }));
  });
}
