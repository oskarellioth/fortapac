import manifest from "./image-manifest.json";

/**
 * Reads the manifest written by scripts/optimise-images.mjs so components can
 * emit a srcset and, just as importantly, width and height.
 *
 * The dimensions are what stop the page shifting as photos load: without them
 * the browser cannot reserve space, which is precisely what Cumulative Layout
 * Shift penalises.
 */

type Variant = { w: number; src: string };
type Entry = { width: number; height: number; variants: Variant[] };

const MANIFEST = manifest as Record<string, Entry>;

export type PhotoData = {
  /** Original file, used as the fallback for browsers without WebP. */
  src: string;
  /** WebP candidates, or "" when the photo has not been processed. */
  srcset: string;
  width: number | undefined;
  height: number | undefined;
};

/**
 * Returns everything needed to render one photo. Falls back to the plain
 * source when a file is missing from the manifest, which happens for a photo
 * added since the last build, so a missing entry degrades rather than breaks.
 */
export function photo(src: string): PhotoData {
  const entry = src ? MANIFEST[src] : undefined;
  if (!entry) return { src, srcset: "", width: undefined, height: undefined };

  return {
    src,
    srcset: entry.variants.map((v) => `${v.src} ${v.w}w`).join(", "),
    width: entry.width,
    height: entry.height,
  };
}

export const hasVariants = (src: string): boolean =>
  Boolean(src && MANIFEST[src]?.variants.length);
