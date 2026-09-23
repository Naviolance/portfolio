import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware replacements for next/link and next/navigation: <Link
// href="/faq"> renders /en/faq or /fr/faq depending on the current page.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
