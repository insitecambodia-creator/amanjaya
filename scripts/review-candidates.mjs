// Downloads the candidate room photographs listed in src/data/image-manifest.json ("candidates") and builds a
// contact sheet to review them side by side.
//
// Usage: npm run fetch:candidates
//   Downloads to src/assets/candidates/<room>/ (git-ignored), then writes docs/room-photo-candidates.jpg.
//   Needs normal internet access to the existing site. Files already downloaded are reused.
//   Set CANDIDATES_DIR to read from a different folder (used for testing).
//
// Nothing is hotlinked and nothing here is used by the website until a photograph is chosen and added to the manifest.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(await readFile(join(root, 'src/data/image-manifest.json'), 'utf8'));
const dir = process.env.CANDIDATES_DIR ?? join(root, 'src/assets/candidates');
const exists = (p) => access(p).then(() => true, () => false);

const groups = [
  ...Object.entries(manifest.candidates.rooms),
  ['unplaced 2560px', manifest.candidates.unplaced_2560px],
];

// 1. Download
const failures = [];
if (!process.env.CANDIDATES_DIR) {
  for (const [room, items] of groups) {
    await mkdir(join(dir, room), { recursive: true });
    for (const c of items) {
      const dest = join(dir, room, basename(c.path));
      if (await exists(dest)) continue;
      try {
        const res = await fetch(manifest.base + c.path, {
          headers: { 'user-agent': 'amanjaya-prototype-asset-fetch/0.1' },
          signal: AbortSignal.timeout(20000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        if (!(res.headers.get('content-type') ?? '').startsWith('image/')) throw new Error('not an image');
        await writeFile(dest, Buffer.from(await res.arrayBuffer()));
        console.log(`saved   ${room}/${basename(c.path)}`);
      } catch (err) {
        failures.push(`${room}/${basename(c.path)}: ${err.cause?.code ?? err.message}`);
      }
    }
  }
}

// 2. Contact sheet: one row per group, each photo shown whole (never cropped) with its name and size.
const W = 380, H = 250, GAP = 14, LABEL = 46, ROWLABEL = 34, PER_ROW = 6;
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const tiles = [];
let y = GAP;
let maxCols = 1;
for (const [room, items] of groups) {
  const found = [];
  for (const c of items) {
    const file = join(dir, room, basename(c.path));
    if (await exists(file)) found.push({ c, file });
  }
  if (!found.length) continue;
  tiles.push({ input: Buffer.from(`<svg width="360" height="${ROWLABEL}"><text x="0" y="24" font-family="sans-serif" font-size="22" font-weight="bold" fill="#5b3f2c">${esc(room)}</text></svg>`), left: GAP, top: y });
  y += ROWLABEL;
  let col = 0;
  for (const { c, file } of found) {
    const meta = await sharp(file).metadata();
    const img = await sharp(file).resize(W, H, { fit: 'contain', background: '#e4ddca' }).jpeg({ quality: 85 }).toBuffer();
    const x = GAP + col * (W + GAP);
    tiles.push({ input: img, left: x, top: y });
    const note = c.note.split('.')[0];
    tiles.push({
      input: Buffer.from(`<svg width="${W}" height="${LABEL}"><text x="0" y="16" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34332f">${esc(basename(c.path))}</text><text x="0" y="34" font-family="sans-serif" font-size="12" fill="#55625b">${meta.width}x${meta.height}  ${esc(note)}</text></svg>`),
      left: x,
      top: y + H + 4,
    });
    maxCols = Math.max(maxCols, col + 1);
    col++;
    if (col === PER_ROW) { col = 0; y += H + LABEL + GAP; }
  }
  if (col !== 0) y += H + LABEL + GAP;
}

if (!tiles.length) {
  console.log('\nNo candidate photographs found yet; nothing to build.');
} else {
  const width = GAP + maxCols * (W + GAP);
  const out = join(root, 'docs/room-photo-candidates.jpg');
  await sharp({ create: { width, height: y + GAP, channels: 3, background: '#efeadd' } })
    .composite(tiles)
    .jpeg({ quality: 85 })
    .toFile(out);
  console.log(`\nContact sheet written to docs/room-photo-candidates.jpg`);
}
if (failures.length) {
  console.warn(`\n${failures.length} download(s) failed:`);
  for (const f of failures) console.warn('  ' + f);
  process.exitCode = 1;
}
