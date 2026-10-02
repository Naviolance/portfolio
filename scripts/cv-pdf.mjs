// Generates the one-page CV PDFs (English and French) from src/data/cv.ts,
// so the PDFs, the /cv page and the homepage never disagree.
//
//   npm run cv:pdf
//
// Writes public/cv/*.pdf (paths from CV_PDF). Commit them. Prints a warning
// if a CV no longer fits on one page.
//
// How: builds a plain HTML page per language and prints it to PDF with the
// Chromium that Playwright uses for the tests (a real text PDF that
// applicant-tracking systems can read). On a machine without Playwright's
// browser: npx playwright install chromium, or set PW_CHROMIUM_PATH.

import { register } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

register("./alias-hooks.mjs", import.meta.url);
// Links in the PDF point at the live site, not localhost.
process.env.SITE_URL ??= "https://jpfw-webservices.vercel.app";

const { CV_PDF, cvProjects, education, experience, profile, skills } = await import("../src/data/cv.ts");
const { site } = await import("../src/data/site.ts");

// Embedded as data: URLs: a page made with setContent can't load local files.
const font = (file) =>
  `data:font/woff2;base64,${readFileSync(new URL(`../node_modules/@fontsource/lato/files/${file}`, import.meta.url)).toString("base64")}`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const link = (href, text) => `<a href="${href}">${esc(text)}</a>`;
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/-\d+$/, "");

function html(locale) {
  const t = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8")).cv;
  const colon = locale === "fr" ? " :" : ":";
  const home = `${site.url}/${locale}`;

  const projects = cvProjects
    .map((p) => {
      const links = [
        p.liveUrl && link(p.liveUrl, t.liveDemo),
        p.codeUrl && link(p.codeUrl, t.code),
        p.slug && link(`${home}/projects/${p.slug}`, t.caseStudy),
        p.liveUrl && !p.codeUrl && esc(t.privateCode),
      ].filter(Boolean);
      return `<div class="item">
        <div class="row"><b>${esc(p.title[locale])}</b><span>${p.year}</span></div>
        ${p.stack ? `<p class="sub">${esc(p.stack)}${links.length ? ` <span class="sep">|</span> ${links.join(" · ")}` : ""}</p>` : ""}
        <ul>${p.points.map((x) => `<li>${esc(x[locale])}</li>`).join("")}</ul></div>`;
    })
    .join("");

  const jobs = experience
    .map(
      (j) => `<div class="item">
        <div class="row"><b>${esc(j.role[locale])}, ${esc(j.company)}</b><span>${esc(j.period[locale])}</span></div>
        <p class="sub">${esc(j.place[locale])}${j.note ? ` <span class="sep">|</span> ${esc(j.note[locale])}` : ""}</p>
        <ul>${j.points.map((x) => `<li>${esc(x[locale])}</li>`).join("")}</ul></div>`
    )
    .join("");

  const schools = education
    .map((e) => `<div class="row"><b>${esc(e.title[locale])}, ${esc(e.place[locale])}</b><span>${esc(e.period)}</span></div>`)
    .join("");

  const skillRows = skills
    .map((g) => `<p><b>${esc(g.label[locale])}${colon}</b> ${esc(g.items.join(", "))}</p>`)
    .join("");

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8">
<title>${esc(site.fullName)}: CV</title>
<style>
@font-face{font-family:Lato;font-weight:400;src:url(${font("lato-latin-400-normal.woff2")})}
@font-face{font-family:Lato;font-weight:400;font-style:italic;src:url(${font("lato-latin-400-italic.woff2")})}
@font-face{font-family:Lato;font-weight:700;src:url(${font("lato-latin-700-normal.woff2")})}
@page{size:A4;margin:10mm 12mm}
*{margin:0;padding:0;box-sizing:border-box}
body{font:9.3pt/1.27 Lato,sans-serif;color:#1f2328}
a{color:#2448d8;text-decoration:none}
header{text-align:center}
h1{font-size:17pt;letter-spacing:.3px;text-transform:uppercase;color:#1f2328}
.role{color:#2448d8;font-size:11.5pt;font-weight:700;margin-top:2pt}
.contact{color:#555;margin-top:3pt}.contact .sep,.sub .sep{color:#aaa;margin:0 3pt}
h2{color:#2448d8;font-size:10.5pt;text-transform:uppercase;border-bottom:1.2pt solid #2448d8;padding-bottom:1.5pt;margin:7pt 0 3pt}
.row{display:flex;justify-content:space-between;gap:12pt}.row span{white-space:nowrap}
.item{margin-top:3pt;break-inside:avoid}
.sub{font-style:italic;color:#555}
ul{padding-left:13pt;margin-top:1pt}li{margin-top:.6pt}
.skills p{margin-top:.8pt}
</style></head><body>
<header>
  <h1>${esc(site.fullName)}</h1>
  <p class="role">${esc(site.role[locale])}</p>
  <p class="contact">${[esc(site.location[locale]), esc(site.whatsapp.display), link(`mailto:${site.email}`, site.email), esc(t.openToRemote)].join('<span class="sep">|</span>')}</p>
  <p class="contact">${[`${esc(t.portfolio)}${colon} ${link(home, bare(site.url))}`, link(site.linkedin, bare(site.linkedin)), link(site.github, bare(site.github))].join('<span class="sep">|</span>')}</p>
</header>
<h2>${esc(t.profile)}</h2><p>${esc(profile[locale])}</p>
<h2>${esc(t.technicalSkills)}</h2><div class="skills">${skillRows}</div>
<h2>${esc(t.projects)}</h2>${projects}
<h2>${esc(t.experience)}</h2>${jobs}
<h2>${esc(t.education)}</h2>${schools}
</body></html>`;
}

const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {}
);
for (const locale of ["en", "fr"]) {
  const page = await browser.newPage();
  await page.setContent(html(locale), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const out = fileURLToPath(new URL(`../public${CV_PDF[locale]}`, import.meta.url));
  // Shrink the print scale in small steps until the CV fits on one page,
  // but never below 90%: past that, the text itself must get shorter.
  let scale = 1;
  let pages = 0;
  for (; scale >= 0.9; scale = Math.round((scale - 0.02) * 100) / 100) {
    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, scale });
    pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    if (pages === 1) break;
  }
  scale = Math.max(scale, 0.9);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, scale });
  console.log(`${locale}: ${CV_PDF[locale]} (${pages} page${pages === 1 ? "" : "s"}, scale ${Math.round(scale * 100)}%)`);
  if (pages !== 1) console.warn(`  ⚠ ${locale} CV is ${pages} pages even at 90%: shorten the text in src/data/cv.ts.`);
  await page.close();
}
await browser.close();
