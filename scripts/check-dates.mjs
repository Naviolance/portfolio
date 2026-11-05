// Fails when a change edits page content but not src/data/dates.ts.
//
// The sitemap's lastmod, the structured data's dateModified and the footer's
// "Updated" date all come from dates.ts, and search engines use them to
// decide what to re-read. Those dates went stale once already because
// remembering to update them is a manual step; this check makes CI remember.
//
// Content = the text and pictures pages are built from. Code and styling
// changes don't count. A content change that genuinely needs no new date (a
// typo, a refactor that moves text without changing it) can say so with a
// "Dates-unchanged: <reason>" line in one of its commit messages.
//
//   node scripts/check-dates.mjs            compares with origin/master
//   BASE=origin/x node scripts/check-dates.mjs
import { execFileSync } from "node:child_process";

const base = process.env.BASE ?? `origin/${process.env.GITHUB_BASE_REF || "master"}`;
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

const changed = git("diff", "--name-only", `${base}...HEAD`).split("\n").filter(Boolean);
const NOT_CONTENT = ["src/data/dates.ts", "src/data/domains.ts", "src/data/page-paths.ts", "src/data/service-slugs.ts"];
const content = changed.filter(
  (file) =>
    !NOT_CONTENT.includes(file) &&
    (/^messages\/.*\.json$/.test(file) || file.startsWith("src/data/") || file.startsWith("src/assets/") || file.startsWith("public/cv/"))
);

if (content.length === 0 || changed.includes("src/data/dates.ts")) {
  console.log(content.length ? "Content changed and src/data/dates.ts was updated." : "No content changes.");
  process.exit(0);
}

const reason = git("log", "--format=%B", `${base}..HEAD`).match(/^Dates-unchanged:\s*(.+)$/m);
if (reason) {
  console.log(`Content changed, dates kept on purpose: ${reason[1]}`);
  process.exit(0);
}

console.error(
  [
    "Content changed but src/data/dates.ts didn't:",
    ...content.map((file) => `  ${file}`),
    "",
    "Set the changed pages' dates to today in src/data/dates.ts, or, if no date",
    'should move, add a "Dates-unchanged: <reason>" line to a commit message.',
  ].join("\n")
);
process.exit(1);
