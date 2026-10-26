# Typography

## 1. Heading scale (changed)

Headings are about 25% smaller at desktop widths. The change is in the type scale (`--step-2`, `--step-3`, `--step-4` in `src/styles/global.css`), not in individual overrides. Body steps (`--step--1` to `--step-1`) are untouched: every body, caption, navigation and button size measures identically before and after.

| Level | Before (360 → 1280px) | After (360 → 1280px) | Change |
|---|---|---|---|
| H1 | 40px → 78px | 30.4px → 58.8px | -24% at 360px, -25% from 1280px |
| H2 | 32px → 56px | 24.8px → 42px | -22% at 360px, -25% from 1280px |
| H3 | 25.8px → 36px | 20.8px → 27px | -19% at 360px, -25% from 1280px |

The largest sizes are exactly 75% of the old ones. The small-screen floors are cut by about 20% rather than 25%, so a phone heading is never close to body size (body is 17px; the smallest heading is 20.8px). The ramp is linear between 360px and 1280px wide.

The suite names and the footer wordmark share these steps, so they shrank with the headings. One knock-on change: the hero H1 had a `max-width: 11ch` tuned to the larger type, which made it break as "Phnom / Penh, at the". It is removed, and the heading now wraps to two balanced lines.

Screenshots: `docs/screenshots/typography/before-after-desktop-hero.jpg`, `before-after-mobile.jpg`, plus the refreshed set in `docs/screenshots/`.

## 2. What the original site's typography actually was

**Short answer: it cannot be settled from the exports.** The exports show which fonts were loaded, not which were used where. Nothing in them assigns a font to a heading or to body text.

### Verified from the exported HTML

- Fonts loaded on the homepage (identical on the other pages):
  - Five Google families, self-hosted by Elementor under `wp-content/uploads/elementor/google-fonts/`: **Roboto Slab, Roboto, Montserrat, Open Sans, Poppins**.
  - One **Adobe Fonts (Typekit) kit**, `use.typekit.net/aip0vxp.css`, added by a "custom typekit" plugin.
- The only `font-family` declaration in any of the nine exported pages is `inherit`. The CSS that sets fonts lives in files that were **not exported**: the Elementor kit and page stylesheets (`post-79.css`, `post-333.css`, `post-4962.css`, `post-1234.css`, `post-5251.css`, `post-3221.css`, `custom-frontend.min.css`), the theme stylesheets, and the Typekit kit itself. None of the embedded Elementor settings in the HTML mention typography either.
- Stack: WordPress with the **Hello Elementor** theme (3.5.1), Elementor 4.3.5 and Elementor Pro, WPML (English and French).
- Structure on the homepage: one H1, nine H2, two H3, four H4 and one H5. The header brand "amanjaya pancam PHNOM PENH" is live text in an H2 (the logo SVG is also loaded). The H1 is typed in capitals ("RIVERSIDE HOTEL PHNOM PENH"); other headings are typed in mixed case ("JUNIOR suite", "deluxe room", "FROM $81"), so any consistent capitals or lowercase on the live site would come from CSS that we cannot see.

### Loaded but not verified as used

| Font | What the evidence supports |
|---|---|
| Roboto, Roboto Slab | Loaded. I believe these are Elementor's out-of-the-box global fonts (Roboto for primary and text, Roboto Slab for secondary), in which case loading them says little about a deliberate choice. Not confirmed from the exports. |
| Montserrat, Open Sans, Poppins | Loaded. These are not Elementor defaults, so someone probably chose them somewhere in the header, footer, a popup or the page. Elementor usually requests a Google font only when a rendered document references it, which supports this. It is an inference, and nothing shows which role each plays. |
| Adobe Fonts kit `aip0vxp` | Loaded site-wide. The family names are in the kit's CSS, which is not in the exports and could not be fetched from the build environment. Unknown whether it is used for headings, the logo, or nothing. |
| Hello Elementor defaults | The theme's own heading and body rules are not exported. Not verified. |

### How to make it verified (about a minute)

Any one of these settles it:

1. Run `node scripts/audit-fonts.mjs` on a machine that can reach the live site (needs Playwright; see the header of the script). It reports, per role (body, H1 to H4, paragraphs, buttons, navigation, brand text), the font Chromium actually painted, plus size, weight and capitalisation. It is read-only: it opens the page like a visitor. I tested it on this project's own preview, where it correctly reports Newsreader and Hanken Grotesk.
2. In Chrome DevTools, select an element, open Computed and read "Rendered Fonts".
3. Save the Elementor CSS files listed above and the Typekit CSS into the repository for reference.

## 3. Comparison with the current pairing

| | Original (what can be said) | Current |
|---|---|---|
| Fonts loaded | 5 Google families plus an Adobe kit | 2 families |
| Character | Mostly neutral sans-serifs (Roboto, Open Sans, Montserrat, Poppins) plus a slab serif (Roboto Slab) | A refined text serif for headings, a clean grotesque for text |
| Identity carried by | Unknown: probably the logo, the lowercase "amanjaya pancam" brand text, and the photography | Newsreader headings, Hanken Grotesk text, the waterline |
| Licence | Google fonts are open source; the Adobe kit needs an Adobe subscription tied to that kit | Both open source (SIL OFL), self-hosted |
| Languages | None of the five Google fonts covers Khmer; French is fine | Same: French fine, Khmer needs Noto Serif / Sans Khmer later |

`docs/screenshots/typography/pairing-comparison.jpg` sets four pairings side by side with the same copy: ours, Roboto Slab + Roboto, Montserrat + Open Sans, and Poppins + Open Sans. It is illustrative only, built from the loaded fonts; it does not reproduce the live site.

## 4. Recommendation

**Retain Newsreader and Hanken Grotesk for now, and settle two things before deciding anything more.**

1. **There is no verified brand typeface to preserve.** The set of five similar sans-serifs plus a slab looks like accumulated template choices rather than a type system, and Roboto and Roboto Slab are probably just Elementor's defaults. Switching to them (or to Montserrat, Poppins or Open Sans) would not recover an identity; it would only make the site look like its template again.
2. **Continuity is better carried by the name, the logo and the photography.** The wordmark in the header is currently typeset in Newsreader. If the existing logo (`APH-logo-final.svg`) is the identity, using the real file in the header will do more for recognition than any body font. That file could not be downloaded here; it needs to come from the hotel.

Then:

- **Run the audit.** If it shows the hotel really uses one distinctive display font (from the Adobe kit, for example), that is the one font worth echoing in heading style or in the logo. Do not adopt the Adobe font itself without checking its licence for a new site.
- **Hanken Grotesk can stay.** It sits in the same neutral sans lane as Roboto and Open Sans, so body text will not feel foreign to returning guests, and it has slightly more character.
- **Newsreader is the only choice with real distance from the original** (a quiet, bookish serif against sturdy slabs and geometric sans). That is the point of the creative direction, but it is the thing to revisit if the audit shows the hotel values its slab headings.
- **Nothing to replace now.** No font family was changed in this pass.
