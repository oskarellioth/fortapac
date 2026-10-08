import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Generates responsive WebP variants for the photographs, plus a manifest of
 * intrinsic dimensions.
 *
 * Two problems this solves. Every photo was served at one size, so a phone
 * downloaded the full desktop image, which is the largest single drag on LCP.
 * And no <img> carried width and height, so the browser could not reserve space
 * and the page shifted as images arrived, which is exactly what Cumulative
 * Layout Shift measures.
 *
 * This runs as a prebuild step rather than a one-off, because photos arrive
 * through the CMS. A hero uploaded in Keystatic must get the same treatment
 * without anyone remembering to run a script.
 *
 * Source images stay untouched in public/. Variants are written to
 * public/_img/, which is generated and gitignored.
 */

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/_img");
const MANIFEST = path.join(ROOT, "src/lib/image-manifest.json");

// Widths per role. The hero spans the viewport so it needs large sizes; the
// menu showcase photos never render wider than about 600px.
const GROUPS = [
  { dir: "public/hero", widths: [640, 1024, 1600, 2400] },
  { dir: "public/products/focus", widths: [480, 800, 1200] },
  { dir: "public/industries/focus", widths: [480, 800, 1200] },
  // Product page photography: a square hero at roughly half the viewport, four
  // range cards at about a quarter, and one half-width application shot.
  { dir: "public/products/fibc", widths: [400, 800, 1200, 1600] },
  // Contact backdrop: fills roughly half the viewport on a wide screen.
  { dir: "public/contact", widths: [600, 900, 1300] },
];

// WebP is accepted as a source, not just an output, because cut-outs are
// delivered that way and flattening them to JPEG would destroy the alpha.
// sharp carries alpha through resize and webp encoding on its own.
const PHOTO = /\.(jpe?g|png|webp)$/i;

async function listPhotos(dir) {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const entries = await readdir(abs, { withFileTypes: true });
  return entries.filter((e) => e.isFile() && PHOTO.test(e.name)).map((e) => e.name);
}

/** Skip work when the variant is already newer than its source. */
async function isFresh(src, out) {
  if (!existsSync(out)) return false;
  const [a, b] = await Promise.all([stat(src), stat(out)]);
  return b.mtimeMs >= a.mtimeMs;
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest = {};
  let generated = 0;
  let skipped = 0;

  for (const group of GROUPS) {
    const files = await listPhotos(group.dir);

    for (const file of files) {
      const src = path.join(ROOT, group.dir, file);
      const publicPath = "/" + path.join(group.dir.replace(/^public\//, ""), file);
      const base = file.replace(PHOTO, "");
      const meta = await sharp(src).metadata();

      // Never upscale: a 1200px source gets no 1600px variant.
      const widths = group.widths.filter((w) => w <= (meta.width ?? 0));
      if (widths.length === 0 && meta.width) widths.push(meta.width);

      const variants = [];
      for (const w of widths) {
        const name = `${base}-${w}.webp`;
        const out = path.join(OUT_DIR, name);
        if (await isFresh(src, out)) {
          skipped++;
        } else {
          await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(out);
          generated++;
        }
        variants.push({ w, src: `/_img/${name}` });
      }

      manifest[publicPath] = {
        width: meta.width,
        height: meta.height,
        variants,
      };
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  const count = Object.keys(manifest).length;
  console.log(
    `[images] ${count} source photos, ${generated} variants generated, ${skipped} already current`,
  );
}

run().catch((err) => {
  console.error("[images] failed:", err.message);
  process.exit(1);
});
