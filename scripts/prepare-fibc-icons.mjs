import sharp from "sharp";
import path from "node:path";

/**
 * Prepares the supplied FIBC artwork for use on the site.
 *
 * Two problems with the delivered files, both fixed here rather than by hand so
 * the step is reproducible and the originals stay untouched in "Fibc product
 * page/".
 *
 * 1. Three icons were exported with a flat white background instead of
 *    transparency, so they render as white rectangles on anything but a white
 *    surface. Near-white pixels become transparent.
 *
 * 2. The navy "Direct from manufacturing" band needs light icons, and the
 *    artwork is navy with orange accents, which is close to invisible on navy.
 *    For that band only, navy is remapped to white and the orange accents are
 *    kept, which is what the mockup shows.
 *
 * Replace any output with a properly exported file and this step becomes a
 * no-op for it.
 */

const SRC = "Fibc product page";
const ICONS = "public/icons/fibc";
const PHOTOS = "public/products/fibc";

const NEAR_WHITE = 238; // above this on all channels is background, not artwork
const isNavy = (r, g, b) => b > r && b > g && r < 130 && g < 130;

/** Drops a flat white background, and optionally lifts navy to white. */
async function clean(src, out, { navyToWhite = false } = {}) {
  const img = sharp(src).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += info.channels) {
    const [r, g, b] = [px[i], px[i + 1], px[i + 2]];
    if (r >= NEAR_WHITE && g >= NEAR_WHITE && b >= NEAR_WHITE) {
      px[i + 3] = 0;
    } else if (navyToWhite && isNavy(r, g, b)) {
      px[i] = px[i + 1] = px[i + 2] = 255;
    }
  }
  // Trimming matters as much as the alpha: the artwork sits inside a lot of
  // empty canvas, so an untrimmed icon renders as a small glyph floating in a
  // large box. Trimming lets object-fit fill the slot it is given.
  await sharp(px, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9 })
    .trim({ threshold: 1 })
    .toFile(out);
  return out;
}

/**
 * Photos that sit inside a white card are flattened onto white: a JPEG is
 * smaller than a WebP with an alpha channel, and the card hides the edge.
 */
async function photo(src, out) {
  await sharp(src).resize({ width: 1400, withoutEnlargement: true }).flatten({ background: "#ffffff" })
    .jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  return out;
}

/**
 * A cut-out that sits directly on the page background keeps its alpha, so it
 * has to stay WebP. Flattening it onto white would put a white square on the
 * warm paper background, which is the visible box this avoids.
 */
async function cutout(src, out) {
  await sharp(src).resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 86 }).toFile(out);
  return out;
}

const icons = [
  ["Industrial Bulk Bag Icon with Orange Stitching.png", "swl.png"],
  ["Two-Tone Shield Check Icon.png", "safety.png"],
  ["Diagonal Navy and Orange Ruler Icon.png", "sizes.png"],
  ["Isometric Cube Outline Icon.png", "construction.png"],
  ["Navy Bulk Bag Filling Icon.png", "filling.png"],
  ["Industrial Bulk Bag Discharge Icon.png", "discharge.png"],
  ["Woven Fabric and Liner Roll.png", "fabric.png"],
  ["Crane Lifting Bulk Bag Icon.png", "lifting.png"],
];

// Anything that sits on a navy surface: the spec strip under the hero and the
// "Direct from manufacturing" band. Navy is lifted to white so the line work
// reads, and the orange accents carry through unchanged.
const lightIcons = [
  ["Modern Factory Icon with Orange Accents.png", "manufacturing-light.png"],
  ["Two-Person Team Icon.png", "team-light.png"],
  ["Industrial Bulk Bag Icon with Orange Stitching.png", "swl-light.png"],
  ["Two-Tone Shield Check Icon.png", "safety-light.png"],
  ["Diagonal Navy and Orange Ruler Icon.png", "sizes-light.png"],
];

// Already in public/icons, but exported with a white background, which shows
// as a white square on the navy spec strip.
const siteIcons = [["public/icons/print.png", "printed-light.png"]];

// Contact page benefit icons. Already drawn inside their own pale circle, so
// they only need the trim; no background to strip and no recolouring.
const CONTACT_ICONS = "public/icons/contact";
const contactIcons = [
  ["Person with Gear Icon.webp", "advice.png"],
  ["Pencil and Ruler Icon.webp", "specification.png"],
  ["Clock with Motion Lines Icon.webp", "response.png"],
];

// Contact page backdrop. Its own file now: it is framed taller than the
// product hero so it can fill the column beside the form card.
const CONTACT_PHOTOS = "public/contact";
const contactPhotos = [["Contact Backdrop Bag.webp", "backdrop.webp"]];

const photos = [
  ["FIBC Top Detail with Four Lifting Loops.webp", "hero.webp"],
  ["Standard Four Loop Bulk Bag.webp", "standard.jpg"],
  ["Bulk Bag with Fill and Discharge Spouts.webp", "filling-discharge.jpg"],
  ["Single Loop Bulk Bag with Orange Handle.webp", "single-loop.jpg"],
  ["Conductive Bulk Bag with Spouts and Orange Stitching.webp", "specialist.jpg"],
  ["Forklift Lifting White Bulk Bag.png", "application.jpg"],
];

for (const [src, out] of icons) await clean(path.join(SRC, src), path.join(ICONS, out));
for (const [src, out] of lightIcons)
  await clean(path.join(SRC, src), path.join(ICONS, out), { navyToWhite: true });
for (const [src, out] of siteIcons) await clean(src, path.join(ICONS, out));
for (const [src, out] of contactIcons) await clean(path.join(SRC, src), path.join(CONTACT_ICONS, out));
for (const [src, out] of contactPhotos) await cutout(path.join(SRC, src), path.join(CONTACT_PHOTOS, out));
for (const [src, out] of photos) {
  const write = out.endsWith(".webp") ? cutout : photo;
  await write(path.join(SRC, src), path.join(PHOTOS, out));
}

console.log(`[fibc] ${icons.length + lightIcons.length + siteIcons.length + contactIcons.length} icons, ${photos.length + contactPhotos.length} photos prepared`);
