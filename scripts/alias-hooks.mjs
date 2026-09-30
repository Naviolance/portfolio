// Node module hook: resolves the app's "@/..." imports (tsconfig paths) to
// src/, so plain Node scripts can import the same data files as the site.
const SRC = new URL("../src/", import.meta.url);

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const base = new URL(specifier.slice(2), SRC).href;
    for (const candidate of [base, `${base}.ts`, `${base}.tsx`]) {
      try {
        return await nextResolve(candidate, context);
      } catch {
        // try the next extension
      }
    }
  }
  return nextResolve(specifier, context);
}
