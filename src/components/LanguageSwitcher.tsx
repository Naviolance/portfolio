"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

// Links to the SAME page in the other language (/en/faq <-> /fr/faq).
// A real link, not a button, so crawlers can follow it too. Choosing a
// language here is also remembered for the visitor's next visit to "/".
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "fr" : "en";

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      aria-label={`${t("language")}: ${t("switchTo")}`}
      className={`inline-flex h-10 min-w-10 items-center justify-center border border-line px-2 font-mono text-xs font-medium text-ink transition-colors hover:border-ink ${className}`}
    >
      {t("switchToShort")}
    </Link>
  );
}
