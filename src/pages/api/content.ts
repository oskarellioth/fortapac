import type { APIRoute } from "astro";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

export const prerender = false;

/**
 * Reads and writes the Keystatic content files for the translation screen.
 *
 * Writes go straight to disk, so this works when the site is running locally
 * and not on Vercel, whose filesystem is read-only. That matches Keystatic's
 * current "local" storage mode: when the CMS moves to GitHub storage, both
 * this and Keystatic start committing instead, and both become usable from
 * anywhere.
 */

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");

/** Refuse anything that resolves outside src/content, whatever the input. */
function resolveSafe(relative: string): string | null {
  const target = path.resolve(CONTENT_DIR, relative);
  const root = CONTENT_DIR + path.sep;
  if (target !== CONTENT_DIR && !target.startsWith(root)) return null;
  if (!target.endsWith(".json")) return null;
  return target;
}

async function listContentFiles(): Promise<string[]> {
  const out: string[] = [];
  async function walk(dir: string, prefix: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(path.join(dir, entry.name), rel);
      else if (entry.name.endsWith(".json")) out.push(rel);
    }
  }
  await walk(CONTENT_DIR, "");
  return out.sort();
}

/**
 * Walk a content file and collect every {sv, en} pair, recording where each
 * one sits so an accepted translation can be written back to exactly that
 * spot. Paths use dots for keys and [n] for array indices.
 */
export type Pair = { file: string; path: string; en: string; sv: string };

function collectPairs(node: unknown, file: string, trail: string, into: Pair[]) {
  if (node === null || typeof node !== "object") return;

  if (!Array.isArray(node)) {
    const obj = node as Record<string, unknown>;
    const isPair =
      typeof obj.sv === "string" &&
      typeof obj.en === "string" &&
      Object.keys(obj).length === 2;

    if (isPair) {
      into.push({ file, path: trail, en: obj.en as string, sv: obj.sv as string });
      return;
    }
    for (const [k, v] of Object.entries(obj)) {
      collectPairs(v, file, trail ? `${trail}.${k}` : k, into);
    }
    return;
  }

  node.forEach((v, i) => collectPairs(v, file, `${trail}[${i}]`, into));
}

function setAtPath(root: unknown, dotted: string, value: string): boolean {
  const steps = dotted.match(/[^.[\]]+/g);
  if (!steps) return false;
  let cur: any = root;
  for (const step of steps) {
    if (cur === null || typeof cur !== "object") return false;
    cur = cur[step];
  }
  if (cur === null || typeof cur !== "object") return false;
  cur.sv = value;
  return true;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export const GET: APIRoute = async () => {
  try {
    const files = await listContentFiles();
    const pairs: Pair[] = [];
    for (const file of files) {
      const full = resolveSafe(file);
      if (!full) continue;
      const data = JSON.parse(await readFile(full, "utf8"));
      collectPairs(data, file, "", pairs);
    }
    return json({ pairs });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Read failed." }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  let body: { updates?: Array<{ file: string; path: string; sv: string }> };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Body was not valid JSON." }, 400);
  }

  const updates = body.updates;
  if (!Array.isArray(updates) || updates.length === 0) {
    return json({ error: "Expected { updates: [{file, path, sv}] }." }, 400);
  }

  // Group so each file is read, patched and written exactly once.
  const byFile = new Map<string, Array<{ path: string; sv: string }>>();
  for (const u of updates) {
    if (typeof u?.file !== "string" || typeof u?.path !== "string" || typeof u?.sv !== "string") {
      return json({ error: "Each update needs file, path and sv as strings." }, 400);
    }
    if (!byFile.has(u.file)) byFile.set(u.file, []);
    byFile.get(u.file)!.push({ path: u.path, sv: u.sv });
  }

  let written = 0;
  try {
    for (const [file, items] of byFile) {
      const full = resolveSafe(file);
      if (!full) return json({ error: `Refused path outside content: ${file}` }, 400);

      const data = JSON.parse(await readFile(full, "utf8"));
      for (const item of items) {
        if (setAtPath(data, item.path, item.sv)) written++;
      }
      await writeFile(full, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    return json({ written });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Write failed." }, 500);
  }
};
