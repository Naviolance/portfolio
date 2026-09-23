import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Sends "/" and any URL without a language to /en/... or /fr/..., based on
// the visitor's browser language (or their last choice in the FR/EN switch).
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, Vercel Analytics (/_vercel) and any file with an
  // extension (icon.png, sitemap.xml, robots.txt, images).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
