import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Refuses to build for a public domain while draft placeholders remain.
 *
 * The legal pages ship as structured drafts with the parts nobody could invent,
 * registration number, registered address, retention periods, marked inline.
 * On staging that is honest and useful. Published on the live domain it is
 * embarrassing at best, and a privacy policy reading "[COMPLETE: registered
 * company name]" is arguably worse than having none.
 *
 * "Remember to fill these in before launch" is exactly the kind of instruction
 * that gets forgotten, so this turns it into a build failure instead. Staging
 * builds only warn.
 */

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "src/content");
const MARKER = /\[(?:FYLL I|COMPLETE|TODO)[^\]]*\]/g;

// Matches the list in src/lib/site.ts. A build aimed at any of these is a
// build that could end up in front of customers and in search results.
const PUBLIC_HOSTS = ["fortapac.se", "www.fortapac.se", "fortapac.com", "www.fortapac.com"];

const siteUrl = process.env.PUBLIC_SITE_URL || "";
let isPublicBuild = false;
try {
  isPublicBuild = siteUrl ? PUBLIC_HOSTS.includes(new URL(siteUrl).hostname.toLowerCase()) : false;
} catch {
  isPublicBuild = false;
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

const files = await walk(CONTENT);
const findings = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  const hits = text.match(MARKER);
  if (hits) {
    findings.push({
      file: path.relative(ROOT, file),
      count: hits.length,
      samples: [...new Set(hits)].slice(0, 3),
    });
  }
}

if (findings.length === 0) {
  console.log("[content] no draft placeholders remain");
  process.exit(0);
}

const total = findings.reduce((n, f) => n + f.count, 0);
const heading = isPublicBuild
  ? `[content] ${total} draft placeholders still present, and this is a build for ${siteUrl}`
  : `[content] ${total} draft placeholders present (fine for staging, must be resolved before launch)`;

console[isPublicBuild ? "error" : "warn"](heading);
for (const f of findings) {
  console[isPublicBuild ? "error" : "warn"](`  ${f.file} (${f.count}): ${f.samples.join("  ")}`);
}

if (isPublicBuild) {
  console.error(
    "\nFill these in via the CMS, or set PUBLIC_SITE_URL to a staging origin if this build is not going live.",
  );
  process.exit(1);
}
