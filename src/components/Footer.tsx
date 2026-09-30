import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { updated } from "@/data/dates";
import { whatsappLink } from "@/lib/whatsapp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatDate } from "@/lib/format";

const link = "text-sm text-ink-soft transition-colors hover:text-ink";

// A real footer: the business details written the same way on every page
// (and the same way as on the Google Business Profile: search engines and
// AI tools trust a business whose name, city and phone match everywhere),
// then links to every page, which also helps crawlers find them all.
export function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("footer");
  const tw = useTranslations("whatsapp");

  const lastUpdate = formatDate(updated.home, locale);

  return (
    <footer className="border-t border-line print:hidden">
      {/* Extra bottom space on phones and tablets for the floating WhatsApp button. */}
      <div className="mx-auto max-w-5xl px-5 pt-14 pb-28 lg:pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <address className="text-sm not-italic leading-relaxed text-ink-soft">
            <p className="font-display text-lg font-bold text-ink">{site.brand}</p>
            <p className="mt-2">
              {site.name} · {site.headline[locale]}
            </p>
            <p>
              {site.location[locale]} · {t("remote")}
            </p>
            <p className="mt-2">
              <a href={whatsappLink(tw("default"))} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {site.whatsapp.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] hover:text-ink">
                {site.email}
              </a>
            </p>
          </address>

          <nav aria-label={t("work")}>
            <Eyebrow>{t("work")}</Eyebrow>
            <ul className="mt-3 space-y-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={link}>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("services")}>
            <Eyebrow>{t("services")}</Eyebrow>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.title.en}>
                  <Link href={{ pathname: "/", hash: "services" }} className={link}>
                    {service.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("more")}>
            <Eyebrow>{t("more")}</Eyebrow>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href={{ pathname: "/", hash: "pricing" }} className={link}>
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className={link}>
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/cv" className={link}>
                  {t("cv")}
                </Link>
              </li>
              <li className="flex flex-wrap gap-x-3 gap-y-2">
                <a href={site.upwork} target="_blank" rel="noopener noreferrer" className={link}>
                  Upwork
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                  LinkedIn
                </a>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-5 font-mono text-xs text-ink-soft sm:flex-row sm:justify-between">
          <p>
            © {updated.home.slice(0, 4)} {site.brand}
          </p>
          <p>{t("updated", { date: lastUpdate })}</p>
        </div>
      </div>
    </footer>
  );
}
