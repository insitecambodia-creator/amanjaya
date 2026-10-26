// Reports which fonts a page ACTUALLY RENDERS for its headings, body text, buttons and navigation.
// It asks Chromium which platform fonts painted the glyphs (the same data as DevTools > Computed > Rendered Fonts),
// so it separates fonts that were really used from fonts that were merely loaded.
//
// Read-only: it opens the page like a visitor would. It changes nothing on the site.
//
// Usage:
//   node scripts/audit-fonts.mjs                      audits the live homepage
//   node scripts/audit-fonts.mjs http://localhost:4321/   audits this project's local preview
//   node scripts/audit-fonts.mjs <url> --json         machine-readable output
//
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium) and access to the site.
import { createRequire } from 'node:module';

const url = process.argv.find((a) => /^https?:/.test(a)) ?? 'https://www.amanjaya-suites-phnom-penh.com/';
const asJson = process.argv.includes('--json');

let playwright;
try {
  playwright = await import('playwright');
} catch {
  try {
    playwright = createRequire(import.meta.url)('playwright');
  } catch {
    console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }
}
const chromium = playwright.chromium ?? playwright.default?.chromium;

// What to inspect. The first match for each selector is used; roles that are not on the page are skipped.
const targets = [
  ['body', 'body'],
  ['h1', 'h1'],
  ['h2', 'h2'],
  ['h3', 'h3'],
  ['h4', 'h4'],
  ['paragraph', 'p'],
  ['text-editor paragraph', '.elementor-widget-text-editor p'],
  ['button', '.elementor-button, .btn, button'],
  ['navigation link', '.elementor-nav-menu a, nav a'],
  ['logo / brand text', '.elementor-widget-theme-site-logo, header .elementor-heading-title, .wordmark'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

const cdp = await page.context().newCDPSession(page);
await cdp.send('DOM.enable');
await cdp.send('CSS.enable');
const { root } = await cdp.send('DOM.getDocument', { depth: 0 });

const rows = [];
for (const [role, selector] of targets) {
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
  if (!nodeId) continue;
  const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
  const css = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const c = getComputedStyle(el);
    return {
      text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
      declared: c.fontFamily,
      size: c.fontSize,
      weight: c.fontWeight,
      transform: c.textTransform,
      spacing: c.letterSpacing,
    };
  }, selector);
  rows.push({
    role,
    text: css.text,
    rendered: fonts.map((f) => `${f.familyName}${f.isCustomFont ? '' : ' (system)'}`).join(', ') || '(none: no text)',
    declared: css.declared,
    size: css.size,
    weight: css.weight,
    transform: css.transform,
    spacing: css.spacing,
  });
}

// Fonts the page downloaded, whether or not anything used them.
const loaded = await page.evaluate(async () => {
  await document.fonts.ready;
  return [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/"/g, '')} ${f.weight}`))].sort();
});
await browser.close();

if (asJson) {
  console.log(JSON.stringify({ url, rows, loaded }, null, 2));
} else {
  console.log(`\nFonts rendered on ${url}\n`);
  console.table(rows.map(({ role, text, rendered, size, weight, transform }) => ({ role, text, rendered, size, weight, transform })));
  console.log('Declared font-family stacks (what the CSS asked for):');
  for (const r of rows) console.log(`  ${r.role.padEnd(24)} ${r.declared}`);
  console.log('\nFont files the page downloaded (document.fonts, status "loaded"). Downloaded does not mean used:');
  for (const l of loaded) console.log('  ' + l);
  console.log('\n"Rendered" is verified usage. A font that is loaded but never appears under "rendered" is not used for those roles.');
}
