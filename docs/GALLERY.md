# Gallery page

`/image-gallery-amanjaya/`, the same path the existing WordPress site uses, so the URL carries over.

## How it fits together

| Piece | Where |
|---|---|
| Page | `src/pages/image-gallery-amanjaya/index.astro` |
| Photographs, groups, descriptions (alt text) and captions | `src/content/gallery.ts` |
| Full-size viewer | `src/components/gallery/Lightbox.astro` and `src/scripts/lightbox.ts` |
| Links to it | the header's "Gallery" (every page) and "View all photographs" under the homepage gallery |

To add a photograph: put the file in `src/assets/photos/` and add one entry (key, description, short caption) to a group in `gallery.ts`. The room groups reuse the descriptions already written in `rooms.ts`, so they cannot drift.

## Design

- White page, Montserrat headings, a row of anchor links to the sections (The hotel, Rooms & suites, Rooftop & Dining, Riverside, Moments).
- **Justified rows**, like the existing site's gallery: every photograph in a row has the same height and keeps its own proportions, so nothing is cropped. A short last row is left short rather than stretched. About 13.5rem tall rows on desktop, 11rem on tablets, 6rem (two or three across) on phones. Plain rectangles, no borders, shadows or rounded corners.
- Each room has its own sub-group with a "See the ... " link to its page.
- The photographs are responsive WebP (320 to 960px wide for the tiles), lazy-loaded except the first four.
- Fade-in-up on headings, as elsewhere; nothing hidden without JavaScript or under reduced motion.

## Viewer

- Each tile is an ordinary link to a 2048px-wide version of the photograph (or its own width if smaller), so **without JavaScript** it simply opens the image. With JavaScript it opens a full-screen viewer built on a native `<dialog>`.
- Previous and next buttons, Left and Right arrow keys, a horizontal swipe on touch screens, and a "7 / 38" counter. It wraps from the last photograph to the first. Close with the button, Escape, or a click on the dark area; focus returns to the photograph you opened.
- The caption under the photograph is announced to screen readers as it changes; the photograph itself carries its full description as alt text.
- The neighbouring photographs are fetched in advance. No animation (so nothing to switch off for reduced motion). No library.

## What is in it: 38 photographs

The hotel (4), Junior Suite (8), Deluxe Room (4), Executive Suite (7), Panoramic Suite (6), Rooftop & Dining (3), Riverside (3), Moments (3). Everything in the repository that the hotel team supplied, except:

- `deluxe-1` (only 674px wide, and the same bed as `deluxe-5`),
- the duplicates `suite-junior`/`junior-12`, `suite-executive`/`executive-12`, `suite-panoramic`/`panoramic-2` (each appears once),
- `unused/yoga.jpg` (it would imply a wellness offer nobody has confirmed).

## Not in the repository yet

The existing gallery page shows 54 photographs; these 34 are not in the repository, so they are not on the new page. Most are from the 2024 photo shoot (`P12204xx`, `A74240503_...`) and the 2020 shoot. If the hotel supplies them, add them as above.

- `2024/08/IMG_9714-scaled.jpg`
- `2020/09/Amanjaya-lobby2.jpg`
- `2020/09/Amanjaya-lobby3.jpg`
- `2024/08/P1220402-scaled.jpg`
- `2024/08/P1220476-scaled.jpg`
- `2024/08/P1220487-scaled.jpg`
- `2024/08/P1220499-scaled.jpg`
- `2024/08/P1220537-scaled.jpg`
- `2024/08/P1220573-scaled.jpg`
- `2024/08/P1220623-scaled.jpg`
- `2020/09/Amanjaya-executive5.jpg`
- `2020/09/Amanjaya-junior3.jpg`
- `2024/08/018_A74240503_1128-scaled.jpg`
- `2024/08/023_A74240503_2053-scaled.jpg`
- `2024/08/003_A74240503_306-scaled.jpg`
- `2024/08/010_A74240503_637-scaled.jpg`
- `2024/08/029_A74240503_2496-scaled.jpg`
- `2024/08/028_A74240503_2289-scaled.jpg`
- `2024/08/034_A74240504_788-scaled.jpg`
- `2024/08/032_A74240504_146-scaled.jpg`
- `2020/10/IMG_3372-scaled.jpg`
- `2020/10/IMG_3472-scaled.jpg`
- `2020/10/IMG_3442-scaled.jpg`
- `2020/10/IMG_3918-scaled.jpg`
- `2020/10/IMG_3921-scaled.jpg`
- `2020/10/IMG_3939-scaled.jpg`
- `2020/10/IMG_3942-scaled.jpg`
- `2020/09/Amanjaya-corridor1.jpg`
- `2024/08/P1220289-scaled.jpg`
- `2024/08/P1220280-1-scaled.jpg`
- `2024/08/P1220270-1-scaled.jpg`
- `2020/09/Amanjaya-facade3.jpg`
- `2020/09/Amanjaya-facade1.jpg`
- `2020/09/Amanjaya-facade2.jpg`

(`IMG_3918` is the meditation photograph; it is deliberately left out pending confirmation of a wellness offer. Room photographs `executive5` and `junior3` are on the existing gallery but were not among the uploads.)

## To check with the hotel

- The rights to every photograph, in particular the ones uploaded without a source (`lemoon_rooftop`, and the hero images).
- That "Le Moon rooftop at sunset" is right: the description is taken from the file name and what the photograph shows.
- Whether the guests photographs (breakfast, balcony, work, the couple at the Royal Palace) should stay under "Moments" or go.
