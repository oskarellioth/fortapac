import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Builds one document containing every Swedish string on the site, with the
 * English alongside it, for a native speaker to review in a single pass.
 *
 * The alternative is asking a reviewer to click through the CMS page by page,
 * which is slow, easy to lose track of, and gives them no way to leave a
 * comment next to a string they are unsure about. This produces something they
 * can read start to finish and write corrections into.
 *
 * It also carries the locked glossary, because the most likely failure mode is
 * a reviewer "correcting" a deliberate term: storsack is the trade word, and a
 * well-meaning native speaker who has not sold bulk bags will change it.
 *
 * Re-run with `npm run review:sv` after content changes.
 */

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "src/content");
const OUT = path.join(ROOT, "review/swedish-review.md");

/** Human labels, so the reviewer sees "Home page" rather than a file path. */
const SECTIONS = [
  { match: "home.json", label: "Home page" },
  { match: "about.json", label: "About us page" },
  { match: "navigation.json", label: "Navigation and mega menus" },
  { match: "site.json", label: "Site-wide settings" },
  { match: "products/", label: "Products" },
  { match: "industries/", label: "Industries" },
  { match: "legal/", label: "Legal pages" },
];

const sectionFor = (rel) =>
  SECTIONS.find((s) => rel.includes(s.match))?.label ?? "Other";

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

const isBilingual = (v) =>
  v && typeof v === "object" && !Array.isArray(v) && typeof v.sv === "string" && typeof v.en === "string";

/** Field names whose values are filenames, URLs or numbers, never prose. */
const NOT_COPY = /^(icon|photo|heroImage|heroImageMobile|shareImage|order|email|phone|linkedin|vatNumber|orgNumber|legalEntityName)$/;

/**
 * Shared values appear in both languages, so a number formatted the English
 * way is wrong on half the site. Swedish uses a space as the thousands
 * separator and a comma as the decimal point.
 */
function sharedValueWarnings(value) {
  const notes = [];
  if (/\d,\d{3}/.test(value)) {
    notes.push("English thousands separator (`1,000`); Swedish writes `1 000`");
  }
  if (/\d\s*-\s*\d/.test(value)) {
    notes.push("hyphen between numbers; a range takes an en dash (`500–2 000`)");
  }
  return notes;
}

/** Walks a content object, collecting copy and flagging shared values. */
function collect(node, trail, pairs, shared) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => collect(item, [...trail, `${i + 1}`], pairs, shared));
    return;
  }
  if (!node || typeof node !== "object") return;

  for (const [key, value] of Object.entries(node)) {
    const next = [...trail, key];
    if (isBilingual(value)) {
      pairs.push({ field: next.join(" › "), en: value.en, sv: value.sv });
    } else if (typeof value === "string") {
      if (NOT_COPY.test(key)) continue;
      const notes = sharedValueWarnings(value);
      if (notes.length) shared.push({ field: next.join(" › "), value, notes });
    } else if (typeof value === "object") {
      collect(value, next, pairs, shared);
    }
  }
}

/**
 * Lifts the glossary out of the TypeScript source. Importing it would mean
 * compiling TS from a plain node script; the shape here is stable and
 * hand-written, and a zero-term result throws rather than quietly shipping a
 * document with no glossary in it.
 */
async function glossary() {
  const src = await readFile(path.join(ROOT, "src/lib/glossary.ts"), "utf8");
  const body = src.slice(src.indexOf("export const GLOSSARY"), src.indexOf("export const KEEP_IN_ENGLISH"));
  const terms = [...body.matchAll(/\{\s*en:\s*"([^"]+)",\s*sv:\s*"([^"]+)"(?:,\s*note:\s*"([^"]+)")?\s*\}/g)].map(
    (m) => ({ en: m[1], sv: m[2], note: m[3] }),
  );
  if (terms.length === 0) throw new Error("glossary.ts parsed to zero terms; the generator needs updating");

  const keepBlock = src.slice(src.indexOf("export const KEEP_IN_ENGLISH"), src.indexOf("export const STYLE_RULES"));
  const keep = [...keepBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return { terms, keep };
}

const files = (await walk(CONTENT)).sort();
const grouped = new Map();
const sharedAll = [];
let total = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const data = JSON.parse(await readFile(file, "utf8"));
  const pairs = [];
  const shared = [];
  collect(data, [], pairs, shared);
  if (pairs.length === 0 && shared.length === 0) continue;

  const section = sectionFor(rel);
  if (!grouped.has(section)) grouped.set(section, []);
  grouped.get(section).push({ rel, name: path.basename(file, ".json"), pairs });
  sharedAll.push(...shared.map((s) => ({ ...s, rel })));
  total += pairs.length;
}

const { terms, keep } = await glossary();
const today = new Date().toISOString().slice(0, 10);

const lines = [];
const w = (s = "") => lines.push(s);

w("# Fortapac, Swedish copy review");
w();
w(`Generated ${today}. ${total} Swedish strings across ${files.length} content files.`);
w();
w("## How to use this");
w();
w("Read the Swedish line, with the English next to it for intent. Where the Swedish is wrong, unnatural, or reads like a translation rather than something a Swedish supplier would write, put your version on the **Correction** line. Leave it blank where the Swedish is fine.");
w();
w("Two things worth knowing before you start:");
w();
w("1. **The locked terms below are deliberate.** They are trade vocabulary, chosen over the more common everyday word. Please do not change them without telling us why, since they are also what buyers type into Google.");
w("2. **Tone is specification-forward on purpose.** The brand sells load ratings and certifications, not adjectives. Copy that reads a bit dry is usually correct. Flag anything that reads as *clumsy* rather than merely plain.");
w();
w("No em dashes anywhere, in either language. Commas, semicolons or a new sentence instead. En dashes in numeric ranges (`500–2 000 kg`) are correct and should stay.");
w();

w("## Locked terms, please keep");
w();
w("| English | Swedish | Why |");
w("|---|---|---|");
for (const t of terms) w(`| ${t.en} | **${t.sv}** | ${t.note ?? ""} |`);
w();
if (keep.length) {
  w("Left in English on purpose: " + keep.map((k) => `\`${k}\``).join(", ") + ".");
  w();
}

if (sharedAll.length) {
  w("## Number formatting to fix");
  w();
  w("These values are shown in **both** languages, so they are not a translation question, but they are formatted the English way and appear on the Swedish pages as-is.");
  w();
  for (const s of sharedAll) {
    w(`- \`${s.value}\` in *${s.field}* (${s.rel})`);
    for (const n of s.notes) w(`  - ${n}`);
  }
  w();
}

w("## The copy");
w();

for (const [section, entries] of grouped) {
  w(`### ${section}`);
  w();
  for (const entry of entries) {
    if (entries.length > 1) {
      w(`#### ${entry.name}`);
      w();
    }
    for (const p of entry.pairs) {
      w(`**${p.field}**`);
      w();
      w(`- EN: ${p.en}`);
      w(`- SV: ${p.sv}`);
      w("- Correction:");
      w();
    }
  }
}

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, lines.join("\n"), "utf8");

console.log(`[review] ${path.relative(ROOT, OUT)}: ${total} strings, ${terms.length} locked terms`);
if (sharedAll.length) console.log(`[review] ${sharedAll.length} shared values with English number formatting`);
