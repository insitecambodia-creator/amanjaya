import { defineConfig } from 'astro/config';

// Static output. Hosting target (Cloudflare Pages) is decided later; nothing is deployed from this repo yet.
export default defineConfig({
  output: 'static',
  site: 'https://preview.invalid', // placeholder: replace with the real preview/production origin at launch
  image: { layout: 'constrained' },
});
