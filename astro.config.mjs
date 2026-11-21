import { defineConfig } from 'astro/config';

// Static output. Hosting target (Cloudflare Pages) is decided later; nothing is deployed from this repo yet.
export default defineConfig({
  output: 'static',
  // The hotel's existing domain: the new site keeps the same paths, so canonical and social URLs already point where
  // they will live after launch. The preview itself stays noindex (Base.astro, public/robots.txt, public/_headers).
  site: 'https://www.amanjaya-suites-phnom-penh.com',
  image: { layout: 'constrained' },
});
