// Puts the hotel's own category photographs into the room mosaic once they have been downloaded.
//
// Background: the mosaic needs wide photographs of the complete rooms. The originals used by the existing
// homepage cards could not be recovered from the exports (see docs/ROOM-PHOTO-CANDIDATES.md). The best evidence of
// the hotel's own category pictures is the thumbnails on its offers pages: junior14, deluxe5, executive7 and
// panoramic2 (panoramic2 is already in use).
//
// Usage, on a machine that can reach the live site:
//   npm run fetch:candidates      downloads the candidates to src/assets/candidates/
//   npm run apply:room-photos     copies the chosen ones over src/assets/photos/suite-*.jpg and updates the manifest
//
// Edit `choices` to try a different candidate. Nothing is overwritten unless the candidate exists, and the
// replaced file's size is reported so you can see the difference. Review the result with `npm run dev`.
import { copyFile, readFile, writeFile, access } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const candidatesDir = process.env.CANDIDATES_DIR ?? join(root, 'src/assets/candidates');
const photosDir = process.env.PHOTOS_DIR ?? join(root, 'src/assets/photos');
const manifestPath = process.env.MANIFEST ?? join(root, 'src/data/image-manifest.json');

/** key in the manifest and src/assets/photos  ->  [room folder in candidates, original file name] */
const choices = {
  'suite-junior': ['junior', 'Amanjaya-junior14.jpg'],
  'suite-deluxe': ['deluxe', 'Amanjaya-deluxe5.jpg'],
  'suite-executive': ['executive', 'Amanjaya-executive7.jpg'],
  // suite-panoramic already uses panoramic2, the hotel's own Panoramic picture.
};

const exists = (p) => access(p).then(() => true, () => false);
const size = async (p) => {
  const m = await sharp(p).metadata();
  return `${m.width}x${m.height}`;
};

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
let applied = 0;
for (const [key, [room, file]] of Object.entries(choices)) {
  const from = join(candidatesDir, room, file);
  const to = join(photosDir, `${key}.jpg`);
  if (!(await exists(from))) {
    console.log(`skipped  ${key}: ${room}/${file} has not been downloaded (run npm run fetch:candidates)`);
    continue;
  }
  const before = (await exists(to)) ? await size(to) : 'none';
  await copyFile(from, to);
  const entry = manifest.images.find((i) => i.key === key);
  if (entry) {
    entry.path = `2020/09/${basename(file)}`;
    entry.usedFor = `${entry.usedFor.split('.')[0]}. Now ${basename(file)}, the hotel's own category picture (offers-page thumbnail).`;
  }
  console.log(`applied  ${key}: ${room}/${file}  (${before} -> ${await size(to)})`);
  applied++;
}
if (applied) await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(applied ? `\n${applied} photo(s) replaced. Check them with npm run dev, then commit.` : '\nNothing applied.');
