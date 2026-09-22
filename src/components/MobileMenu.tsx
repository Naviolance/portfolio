"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  links: { href: string; label: string }[];
};

// Below `sm` the inline nav links are hidden, so this is the only way to
// reach the page sections on a phone.
export function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center border border-line text-ink"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          {open ? (
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" />
          )}
        </svg>
      </button>

      <nav
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-paper"
      >
        <ul className="mx-auto flex max-w-5xl flex-col px-5 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
