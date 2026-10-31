# Promotion popups

How the hotel announces an offer in a popup, and how to add, schedule or remove one. Written for someone who has never seen this project. About 10 minutes per promotion.

## The idea

- **One file** holds every promotion: `src/content/promotions.ts`. Nothing else needs editing.
- Each promotion has a **start and end date**. The popup works out in the visitor's browser which one is running today (Cambodia time), so a promotion switches itself on and off. You can add next month's promotion today; you do not have to touch the site on the day.
- Each visitor sees a promotion **once** (it is remembered in their browser). A new promotion has a new `id`, so it shows again.
- With no promotion running, nothing is shown and no extra code is loaded.
- The build **stops with a plain message** if something is wrong (a bad date, a missing image, no image description). A mistake cannot go live.

## What the visitor sees

- **Desktop and tablets:** about 5 seconds after the page opens, a centred card with the page dimmed behind it.
- **Phones:** a card along the foot of the screen; the page behind stays usable.
- It closes with the × button, the Escape key, or a click on the dimmed area. It is reachable by keyboard and screen reader and does not animate for visitors who ask for reduced motion.
- Only on the **homepage** by default. Set `showOn: 'all'` to show it on every page.
- It never opens on top of the photo viewer on the gallery page.

## Step by step

1. **Get the brief from the hotel** (use `docs/PROMOTION-BRIEF.md`; send it to them as is). Nothing is published without the hotel's wording, dates and image.
2. **Save the image** in `src/assets/promotions/` (see "The image" below).
3. **Open `src/content/promotions.ts`.** Copy the commented example at the bottom of the file, remove the `//` at the start of each line, and fill in:

   | Field | What to put |
   |---|---|
   | `id` | A short unique name, lowercase with hyphens, e.g. `pchum-ben-2026`. Never reuse one. |
   | `start`, `end` | `YYYY-MM-DD`. The whole of both days counts (Cambodia time). |
   | `title` | About six words. |
   | `text` | One or two short sentences (about 160 characters). Plain text only. |
   | `image` | Optional: `{ file: 'pchum-ben.jpg', alt: 'what the photograph shows' }`. The description is required. |
   | `button` | Optional. Leave it out to use "Book Your Stay" and the booking link in `src/config/site.ts`. Or `{ label: 'See the rooms', url: '/#suites' }`. |
   | `terms` | Optional small print, e.g. the conditions and the last day to stay. |
   | `showOn` | Optional: `'home'` (default) or `'all'`. |

4. **Check it locally:** `npm run dev`, then open `http://localhost:4321/?promo-preview=<the id>`. The popup opens at once, whatever the dates. The same works on a Cloudflare preview address (`*.pages.dev`), but deliberately **not** on the live domain.
5. **Check on a phone-sized window too** (the browser's responsive mode): the card should sit at the foot of the screen and the button should be easy to tap.
6. **Commit and push to a branch**, open the Cloudflare preview, check it with `?promo-preview=<id>`, get the hotel's OK, then merge to the branch that deploys the live site.
7. **After the end date** the popup stops by itself. Tidy up when convenient: delete that entry and its image (promotions that ended more than a day ago are not sent to visitors anyway).

To **remove a promotion early**: delete its entry (or set its `end` to yesterday) and publish.

## The image

- Landscape, at least 1600 px wide, JPG or WebP, under about 500 KB. The popup crops it to 3:2 (2:1 on phones) around the centre, so keep the subject in the middle.
- Use a photograph the hotel owns or has the right to use. No text inside the image (the headline is real text, so it is readable and translatable).
- Describe what is in it for the `alt`, e.g. "The Le Moon rooftop terrace at sunset", not "promotion".

## Rules of thumb

- **Wording, prices and conditions come from the hotel, never from us.** No invented discounts, no "best price" claims, always an end date.
- **One promotion at a time.** If two overlap, the one that started later is shown.
- Scheduled promotions are part of the page source, so anyone who views the source can read them before they start. Do not schedule anything confidential more than a few days ahead.
- A visitor who closed the popup will not see it again for that promotion. That is intended. To bring it back for everyone, change the `id`.
- Frequency: about one a month is right. More often and visitors start to ignore it.

## If something does not work

| Symptom | Check |
|---|---|
| The build fails with `Promotion "..." (src/content/promotions.ts): ...` | The message says what to fix. |
| Nothing appears | Is today between `start` and `end`? Have you already seen and closed it in this browser (use `?promo-preview=<id>` or a private window)? Is `showOn` right for this page? Did you wait 5 seconds? |
| It shows on the wrong day | Dates are Cambodia time (UTC+7): a promotion starting `2026-11-01` begins at 00:00 on 1 November in Phnom Penh. |
| The image looks cut off | Keep the subject central; the card shows a 3:2 crop. |

## How it is built (for the next developer)

- `src/content/promotions.ts`: the data and its documentation.
- `src/components/promo/PromoPopup.astro`: build-time checks, image processing and the dialog markup (a native `<dialog>`). Included once from `src/layouts/Base.astro`.
- `src/scripts/promo.ts`: chooses the running promotion by date, remembers dismissal in `localStorage` (key `amanjaya:promo:<id>`), opens it after a delay.
- No third-party script, no cookie, no server call. The popup text is inserted as plain text, never as HTML.

## If the hotel's staff should edit this themselves later

The current process has the web team make the change, because the staff have no accounts here. Two options if that becomes a burden (not built):

1. **A form at `/admin` (Decap CMS)** that writes this same file. It still needs a login for each editor and a one-time authentication setup on Cloudflare.
2. **A Google Sheet** the staff already know how to edit, read by the page. It adds a Google dependency on every page load and removes the preview step; best only if promotions become weekly.
