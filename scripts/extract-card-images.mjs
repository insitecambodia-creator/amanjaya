// Finds the photographs behind the four room cards on the ORIGINAL homepage.
//
// Those photos are not in the exported HTML. The cards are Elementor containers, and Elementor writes their
// background images into the page's own stylesheet, wp-content/uploads/elementor/css/post-333.css
// (333 is the homepage's page id, from the export's <body> class). That file was not part of the export.
//
// Usage (read-only; only reads the CSS):
//   node scripts/extract-card-images.mjs path/to/post-333.css
//   node scripts/extract-card-images.mjs https://www.amanjaya-suites-phnom-penh.com/wp-content/uploads/elementor/css/post-333.css
//
// Prints, per room, the background image URL(s) set on its card container, including any tablet or mobile variants.
// Add the ones you want to src/data/image-manifest.json (images) and run `npm run fetch:images`.
import { readFile } from 'node:fs/promises';

/** Card containers on the homepage, from data-id values in the export. The card itself is the middle one. */
const cards = [
  { room: 'Junior Suite', ids: ['45c4fbf', '6547f68', '89c7a29'] },
  { room: 'Deluxe Room', ids: ['2737823', '6547f68', '0f31b49'] },
  { room: 'Executive Suite', ids: ['661050b', '4af4033', '55f3e63'] },
  { room: 'Panoramic Suite', ids: ['1789dd1', '4af4033', 'b12cb4a'] },
];

const source = process.argv[2];
if (!source) {
  console.error('Give a path or URL to post-333.css (see the comment at the top of this script).');
  process.exit(1);
}

const css = /^https?:/.test(source)
  ? await fetch(source, { signal: AbortSignal.timeout(20000) }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })
  : await readFile(source, 'utf8');

/** Splits CSS into [{ media, selector, body }], tracking the enclosing @media query. */
function rules(text) {
  const out = [];
  const re = /@media[^{]+\{|\}|([^{}]+)\{([^{}]*)\}/g;
  const mediaStack = [];
  let m;
  let depth = 0;
  while ((m = re.exec(text))) {
    if (m[0].startsWith('@media')) {
      mediaStack.push(m[0].slice(6, -1).trim());
      depth++;
    } else if (m[0] === '}') {
      if (depth > 0) {
        depth--;
        mediaStack.pop();
      }
    } else {
      out.push({ media: mediaStack.join(' and ') || 'all screens', selector: m[1].trim(), body: m[2] });
    }
  }
  return out;
}

const all = rules(css);
let found = 0;
for (const card of cards) {
  console.log(`\n${card.room}`);
  const hits = [];
  for (const id of card.ids) {
    for (const r of all) {
      if (!new RegExp(`elementor-element-${id}\\b`).test(r.selector)) continue;
      for (const u of r.body.matchAll(/url\(\s*["']?([^"')]+\.(?:jpe?g|png|webp|avif))["']?\s*\)/gi)) {
        hits.push({ id, media: r.media, url: u[1] });
      }
    }
  }
  const unique = [...new Map(hits.map((h) => [`${h.id}|${h.media}|${h.url}`, h])).values()];
  if (!unique.length) console.log('  no background image found for these containers');
  for (const h of unique) {
    found++;
    const rel = h.url.split('/wp-content/uploads/')[1] ?? h.url;
    console.log(`  container ${h.id}  [${h.media}]  ${rel}`);
  }
}
console.log(found ? `\n${found} image reference(s) found.` : '\nNo images found. Check that this is the homepage CSS (post-333.css).');
