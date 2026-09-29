import { test, expect } from "@playwright/test";
import en from "../messages/en.json";
import fr from "../messages/fr.json";

// The data files are type-checked for both languages, but the message files
// aren't: a key added to one language only would show a raw key name.
function keys(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
}

test("English and French have the same message keys", () => {
  const enKeys = new Set(keys(en));
  const frKeys = new Set(keys(fr));
  expect([...enKeys].filter((k) => !frKeys.has(k)), "missing in fr.json").toEqual([]);
  expect([...frKeys].filter((k) => !enKeys.has(k)), "missing in en.json").toEqual([]);
});
