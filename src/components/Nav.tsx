import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type NavLink = { id: string; label: string; href: { pathname: "/" | "/faq"; hash?: string } };

// Homepage section anchors, then the FAQ page.
const SECTIONS = ["work", "about", "experience", "services", "pricing"] as const;

export function Nav() {
  const t = useTranslations("nav");
  const links: NavLink[] = [
    ...SECTIONS.map((id) => ({ id, label: t(id), href: { pathname: "/" as const, hash: id } })),
    { id: "faq", label: t("faq"), href: { pathname: "/faq" } },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/mark.webp"
            alt=""
            width={32}
            height={32}
            unoptimized
            className="rounded-sm"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Priestly
            </span>
            <span className="mt-1 hidden font-mono text-[10px] uppercase tracking-widest text-label sm:block">
              JPFW Web Services
            </span>
          </span>
        </Link>
        {/* lg, not md: 5 links + CTA + language switch don't fit at tablet width. */}
        <nav className="hidden items-center gap-7 text-sm text-ink-soft lg:flex">
          {links.map((link) => (
            <Link key={link.id} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={{ pathname: "/", hash: "contact" }}
            className="hidden border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent hover:text-paper sm:inline-block"
          >
            {t("cta")}
          </Link>
          <LanguageSwitcher />
          <MobileMenu links={links} ctaLabel={t("cta")} />
        </div>
      </div>
    </header>
  );
}
