import type { Locale } from "@/i18n/routing";

// French puts a space before : ; ? ! % and » and after «. A normal space
// there lets the browser wrap the sign onto the next line on its own
// (": vitrine, ..." starting a line). These swap it for a non-breaking one.
//
// Applied once, where the text is defined, so nobody has to remember it:
// every data file wraps its exports in withFrenchSpacing(), and
// i18n/request.ts runs the French messages through it. Write French with
// normal spaces; tests/pages.spec.ts fails if a breakable one reaches a page.
const NBSP = " ";

function fixFrench(text: string) {
  return text.replace(/ ([:;?!%»])/g, `${NBSP}$1`).replace(/« /g, `«${NBSP}`);
}

export function frenchSpacing(text: string, locale: Locale) {
  return locale === "fr" ? fixFrench(text) : text;
}

// Returns a copy of `data` with every string under a `fr` key fixed (or
// every string, when `allFrench`: the French messages file). Images,
// functions and other non-plain objects are passed through untouched.
export function withFrenchSpacing<T>(data: T, allFrench = false): T {
  return walk(data, allFrench) as T;
}

function walk(value: unknown, french: boolean): unknown {
  if (typeof value === "string") return french ? fixFrench(value) : value;
  if (Array.isArray(value)) return value.map((item) => walk(item, french));
  if (value !== null && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, walk(item, french || key === "fr")]));
  }
  return value;
}
