// Downloads the original hotel photographs listed in src/data/image-manifest.json into src/assets/photos/.
// Usage: npm run fetch:images        (skips files that already exist; add --force to re-download)
// These are the hotel's own images, referenced by its existing site. They are saved locally and never hotlinked.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(await readFile(join(root, 'src/data/image-manifest.json'), 'utf8'));
const outDir = join(root, 'src/assets/photos');
const force = process.argv.includes('--force');
await mkdir(join(outDir, 'unused'), { recursive: true });

const exists = (p) => access(p).then(() => true, () => false);
let saved = 0;
let skipped = 0;
const failed = [];

const targets = [
  ...manifest.images.map((img) => ({ key: img.key, path: img.path, dest: join(outDir, img.key + extname(img.path).toLowerCase()) })),
  ...(manifest.unused ?? []).map((u) => ({ key: u.file, path: u.path, dest: join(outDir, u.file) })),
];

for (const img of targets) {
  const url = manifest.base + img.path;
  const dest = img.dest;
  if (!force && (await exists(dest))) {
    skipped++;
    continue;
  }
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'amanjaya-prototype-asset-fetch/0.1' },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get('content-type') ?? '';
    if (!type.startsWith('image/')) throw new Error(`unexpected content-type "${type}"`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    saved++;
    console.log(`saved   ${img.key}${extname(dest)}`);
  } catch (err) {
    const reason = err.cause?.code ?? err.message;
    failed.push({ key: img.key, url, reason });
    console.warn(`FAILED  ${img.key}: ${reason}`);
  }
}

console.log(`\n${saved} downloaded, ${skipped} already present, ${failed.length} failed.`);
for (const m of manifest.missing ?? []) console.log(`not in export: ${m.key} (${m.reason})`);
if (failed.length) process.exitCode = 1;
