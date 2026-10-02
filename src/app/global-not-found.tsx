import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SiteShell } from "@/components/SiteShell";
import { NotFoundContent } from "@/components/NotFoundContent";
import "./globals.css";

// The 404 for any address that matches no page, rendered on the server with
// the full site frame (nav, footer, language). Next.js sends a 404 status
// and a noindex tag. See next.config.ts (experimental.globalNotFound).

// The visitor's language: next-intl's middleware passes the URL's language
// in this header (/fr/... → fr); otherwise their browser's language.
async function notFoundLocale(): Promise<Locale> {
  const h = await headers();
  const fromUrl = h.get("x-next-intl-locale");
  if (fromUrl && (routing.locales as readonly string[]).includes(fromUrl)) return fromUrl as Locale;
  return h.get("accept-language")?.toLowerCase().startsWith("fr") ? "fr" : routing.defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await notFoundLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });
  return { title: `${t("title")} | Priestly` };
}

export default async function GlobalNotFound() {
  const locale = await notFoundLocale();
  setRequestLocale(locale);
  return (
    <SiteShell locale={locale}>
      <NotFoundContent />
    </SiteShell>
  );
}
