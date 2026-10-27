# Typography

> **Current typography (section 7): light Montserrat headings, 14px Helvetica body in dark grey.** Before it, the direction was (experiment 3): Montserrat Regular headings and interface + Helvetica system stack for body paragraphs (section 6).** Experiment 2 was Montserrat + Open Sans. Section 5 describes it. Sections 1 to 4 record the earlier Newsreader / Hanken Grotesk direction and the research on the original site, which still stands. The Newsreader version is preserved in git at commit `15a7fa7`.

## 1. Heading scale (earlier Newsreader pass, superseded by section 5)

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

## 4. Recommendation (earlier; the team has since chosen to move closer to the original, see section 5)

**Retain Newsreader and Hanken Grotesk for now, and settle two things before deciding anything more.**

1. **There is no verified brand typeface to preserve.** The set of five similar sans-serifs plus a slab looks like accumulated template choices rather than a type system, and Roboto and Roboto Slab are probably just Elementor's defaults. Switching to them (or to Montserrat, Poppins or Open Sans) would not recover an identity; it would only make the site look like its template again.
2. **Continuity is better carried by the name, the logo and the photography.** The wordmark in the header is currently typeset in Newsreader. If the existing logo (`APH-logo-final.svg`) is the identity, using the real file in the header will do more for recognition than any body font. That file could not be downloaded here; it needs to come from the hotel.

Then:

- **Run the audit.** If it shows the hotel really uses one distinctive display font (from the Adobe kit, for example), that is the one font worth echoing in heading style or in the logo. Do not adopt the Adobe font itself without checking its licence for a new site.
- **Hanken Grotesk can stay.** It sits in the same neutral sans lane as Roboto and Open Sans, so body text will not feel foreign to returning guests, and it has slightly more character.
- **Newsreader is the only choice with real distance from the original** (a quiet, bookish serif against sturdy slabs and geometric sans). That is the point of the creative direction, but it is the thing to revisit if the audit shows the hotel values its slab headings.
- **Nothing to replace now.** No font family was changed in this pass.

## 5. Typography experiment 2: Montserrat + Open Sans

**Direction from the team:** Newsreader read as too large and dominant, so move closer to the original site's typography with quieter, more contemporary type. Layout, imagery, colours, the waterline and the structure are unchanged.

### Which combination

Montserrat Regular for headings and Open Sans Regular for text, as proposed. The original site's CSS is not in the exports (see section 2), so there is no evidence for a *more* faithful pairing, and no evidence against this one: both families were loaded by the original site. Which roles they play there is still unverified; `npm run audit:fonts` on the live site would show it. If it reveals something different, the swap is two lines in `src/styles/global.css` (`--font-heading`, `--font-body`) and two imports in `src/layouts/Base.astro`.

### Sizes (fluid from 360px to 1280px wide, then fixed)

| Role | Phone (360px) | Desktop (1280px and up) | Brief |
|---|---|---|---|
| H1 | 28px | 46px | 44 to 48px max |
| H2 | 24px | 32px | 30 to 34px |
| H3 (also suite names, footer name) | 19px | 23px | 22 to 24px |
| Body | 16px | 17px | 16 to 17px |
| Lead text (welcome paragraphs), small headings | 17px | 18px | |
| Small UI text (nav, buttons, captions) | 14px | 15px | unchanged |

Compared with the Newsreader version, the desktop H1 drops from 58.8px to 46px, H2 from 42px to 32px, H3 from 27px to 23px. Body drops from 17 to 19px to 16 to 17px, and the welcome paragraphs from 20 to 24px (they were set in the serif) to 17 to 18px.

### Weight, spacing and detail

- Headings are Montserrat 400 (Regular), sentence case, with slight negative tracking on H1 and H2 and a line height of 1.15 to 1.3. Text is Open Sans 400 with a line height of 1.65. Buttons are Open Sans 600, navigation 500.
- The header wordmark and footer name are now Montserrat Regular. The wordmark is set in type, not the real logo file, which still needs to come from the hotel.
- Chromium's font inspector labels the variable Montserrat file "Thin": that is only the default instance name of the variable font. The rendered weight is 400, as the screenshots show.
- Accessibility: with the smaller type, the unselected suite names would have dropped below 4.5:1 contrast (62% opacity gave 3.6:1). They are now 75% opacity, about 5.2:1. All other text and background colours are unchanged and still pass.

### Measured

`npm run audit:fonts` against the preview reports Montserrat for H1 to H3 and the brand text, and Open Sans for body, paragraphs, buttons and navigation. Computed sizes at 360, 390, 768, 1100, 1440 and 1920px match the table above.

### Cost and caveats

- Same number of families as before (two). Both are open source (SIL OFL) and self-hosted from the build. Neither covers Khmer; Noto Sans Khmer remains the plan for that.
- Montserrat is a wide face, so it reads larger than its pixel size suggests. That is why the maxima sit at the low end of the briefed ranges.
- Compared with the Newsreader direction, this is more neutral and closer to a typical hotel template. It gains familiarity with the original site and loses the editorial character. Whether that trade is right is the point of this experiment.

Screenshots: `docs/screenshots/` (desktop and mobile, refreshed), and `docs/screenshots/typography/newsreader-vs-montserrat-desktop.jpg` and `-mobile.jpg` compare the two directions directly.

## 6. Typography experiment 3: Helvetica body copy

The hotel verified the original site's body text in Elementor: Helvetica, 1.1em (17.6px at a 16px parent), weight 400, line height 1.7, letter spacing 0.4px, justified. The main body paragraphs now use exactly that (`.copy` in `src/styles/global.css`).

- **Font:** `'Helvetica Neue', Helvetica, Arial, sans-serif`. No Helvetica files are downloaded or bundled, so every device shows its own: Helvetica Neue on Apple devices, Arial on Windows, the system sans on Android and Linux. Montserrat stays for headings and for the interface (nav, buttons). Open Sans is removed, which also saves a font download.
- **Which paragraphs:** the hero intro, the Welcome text, the Suites intro, the two Rooftop & Dining descriptions and the Riverside text. Small labels, prices, notes and the footer stay at the body default, in the same Helvetica stack.
- **Justification:** the original is justified, but justified text needs a long line. Measured as the widest word gap against a normal space, in the 310 to 470px side-by-side columns (56rem and up) lines stretched to 2 to 5 times normal ("A   fine   dining   restaurant   for   Khmer"), and phone columns (350px) are narrower still. So those are left-aligned. Justification is on where the sections stack into one wide column, 40rem to 56rem (about 640 to 895px), where the worst gap is about 1.3 to 2 times normal. The Rooftop & Dining descriptions stay left-aligned at every width because their 38ch column is narrow.
- **To justify everywhere:** in `global.css`, remove `and (max-width: 55.99rem)` and the `min-width` condition from the `.copy` media query, and delete `text-align: left` from `.venue__desc` in `Dining.astro`. The side-by-side columns would then show the wide gaps described above; the cure is a wider column (a layout change) or hyphenation (`hyphens: auto` helps in most browsers but could not be tested here).
- **Header:** Montserrat is wider than Open Sans, so the nav needed a slightly tighter gap and a non-wrapping wordmark to stay on one line from 896px up.
- **Screenshots:** `docs/screenshots/typography/body-copy-*.jpg`. This environment has no Helvetica, so it renders the stack with Liberation Sans (metric-compatible with Arial and close to Helvetica); on real devices the letterforms will differ slightly and the line breaks may shift by a word.

## 7. Current typography: light Montserrat headings, 14px Helvetica body

Two directions were tried in this round and one was dropped: **Instrument Serif headings were tried and reverted at the hotel's request; the site uses Montserrat for every heading, and no serif font is loaded.** What stayed: lighter headings and the body-text values from the design file.

Typography only: no layout, photography, room information, background colours or booking behaviour changed.

| | Before this round | Now |
|---|---|---|
| Section headings (h2) | Montserrat 400, 24 to 32px | **Montserrat Light (300), 30 to 34px** (34px from about 1000px wide) |
| Room titles (room-page h1) | Montserrat 400, 28 to 46px | **Montserrat Light (300), 36 to 40px** |
| Sub-headings (h3: venue names, the room names on the photo mosaic) | Montserrat 400, 19 to 23px | Montserrat Regular (400), 19 to 23px (unchanged) |
| Price figure on room pages | Montserrat 400, 24 to 32px | Montserrat Light (300), 24 to 32px |
| Homepage hero | Montserrat 500 headline, 400 supporting line | unchanged |
| Navigation, buttons, footer headings, wordmark | Montserrat | unchanged |
| **Body text** | Helvetica 17.6px, `#333333`, line height 1.7, letter spacing 0.4px | **Helvetica Regular 14px, `#5F5F5F`, line height 28px (2.0), character spacing 20 (0.02em)** |

**Weights, and why.** The large headings (30 to 40px) are Light: at that size the thin strokes stay clear and the headings sit quietly instead of dominating the page. The sub-headings are Regular: they are small (19 to 23px) and the mosaic names sit white over photographs, where Light would lose strength. The price figure is Light to match the headings beside it. The hero is Medium because it is white text over a photograph. Letter spacing on the large headings is slightly negative (-0.01 to -0.015em), as before.

**Body text values come from the design file (an Adobe XD text panel): Helvetica Regular, size 14, character spacing 20, line height 28, fill `#5F5F5F`.** XD's character spacing is in thousandths of an em, so 20 is 0.02em (0.28px at 14px); its sizes are CSS pixels. They are the tokens `--text-size`, `--text-leading`, `--text-tracking` and `--ink` at the top of `global.css`, and `.copy` (paragraphs) uses them with a measure of 52 characters.

- **Colour:** body `#5F5F5F` on white is 6.4:1 (AA needs 4.5:1). The secondary grey is the same value, so all body-style text is one grey. The room names over the homepage photographs (white, Montserrat Regular) measure 5.1:1 or better against the brightest pixels behind them.
- **Small notes and labels** (price note, "From", venue type, the back link, the footer note) are 13px so they stay a step below the body; the spec line and the venue links are 14px. **Interface elements keep their original line height** (buttons and navigation 1.65, the photo-mosaic overlay, the footer's lists and addresses 1.6 to 1.7): the 28px line height is for paragraphs, and applying it everywhere would have made buttons and panels taller. A layout comparison against the previous build showed every photograph, panel and grid at identical size.
- **Mobile:** 14px at 28px leading reads comfortably at 6.4:1, but 14px is on the small side for phones. If it feels small in review, 15px is the first thing to try (`--text-size`).
- **Sizes:** the heading sizes are `--heading-2` (30 to 34px) and `--heading-1` (36 to 40px) in `global.css`; the sub-headings use `--step-2`.
- **Evidence:** `docs/screenshots/typography-experiment/`: `compare-welcome-*`, `compare-junior-description-*` and `compare-dining-*` (desktop and mobile, the original typography above the current), plus the individual `before-*` and `after-*` images (including the Riverside section, the Suites intro and the Amenities). The git history holds the serif attempt if it is ever wanted again.
