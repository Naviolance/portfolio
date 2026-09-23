import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const locale = useLocale() as Locale;
  const tw = useTranslations("whatsapp");

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 pt-10 pb-24 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.fullName} · {site.role[locale]} · {site.location[locale]}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            Email
          </a>
          <a
            href={whatsappLink(tw("default"))}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            WhatsApp
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
