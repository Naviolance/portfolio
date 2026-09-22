import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-ink"
        >
          Priestly
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-ink-soft sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-rust hover:bg-rust hover:text-paper"
        >
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
}
