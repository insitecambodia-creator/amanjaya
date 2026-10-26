# Photo review and hero recommendation

Reviewed with the 17 real photographs in place. Screenshots are in `docs/screenshots/` (`hero-options.jpg` compares the candidates).

## Hero

**Recommendation: keep the couple in front of the hotel, using the 2560 px original.** It is the only image that shows the hotel in daylight, the light is warm and matches the ivory, teak and bronze palette, and it crops well to every screen: on mobile the portrait crop keeps the smile, the balconies and the held hands; on desktop the ivory panel covers the least interesting part (the out-of-focus shoulder).

The file the existing site uses as its cover (`amh-homepage-cover.png`) is a 16:9 crop of this same photograph. The original is better because it is 2560 px wide and lets us choose the crop.

Alternatives, in order:

1. **Hotel at night** (`dining-le-moon`): the most architectural image and shows the Le Moon sign, but it is dark, noisy with red light trails and traffic lights, only 1319 px wide, and reads as city nightlife rather than a quiet riverside stay. Better as the Le Moon image, where it now sits.
2. **Golden pagoda** (`gallery-pagoda`): the most characterful image and a good match for the palette, but it shows the neighbour, not the hotel, and is only 1353 px wide.
3. **Quay and river** (`riverside`): right in concept, but flat grey light, busy traffic and only 1200 px wide.

Cautions on the chosen hero: it is a staged lifestyle photograph and leans toward advertising. The guidance for this project asks us to avoid a stock-photo look, so a dusk exterior of the hotel on the quay, photographed for this site, would be the ideal long-term hero. Confirm model releases and the visible licence plate.

## Composition and cropping

- Every supplied photograph is landscape, so the portrait crops in the first prototype were replaced. The welcome section now pairs a 4:3 hallway with a small portrait crop of the balcony photo, centred on the couple.
- Each photo has a focal point (`position` in `src/content/home.ts`) so the crop keeps the subject. The suites use 3:2 frames and the gallery uses the photographs' own proportions in justified rows, so nothing is cropped there.
- Dining: the night exterior sits well on the teak band. The Sombok chefs photo is warm and human and its teal sign echoes the awning in the hero.
- Gallery: five photographs in two rows, with the pagoda and the Khmer mural leading. Mixed in-room lifestyle shots (breakfast in bed, a working breakfast) are fine but lean stock-like.

## Quality notes

| Photo | Issue |
|---|---|
| suite-deluxe (674x449) | Soft on large or high-density screens. Ask for a larger original. |
| riverside (1200 px), gallery-pagoda, gallery-mural, gallery-reception, welcome-lobby, suite-* (about 1360 px) | Fine at normal sizes, slightly soft at 2x on the largest layouts. |
| dining-sombok (960x640) | Acceptable at its size. |
| suite-junior, suite-executive, suite-deluxe | Details (a cabinet, a headboard) rather than the whole room. Consider a wider lead image per category. |

The 2024 photographs are 2560 px and clearly sharper. Where possible, prefer them.

## Left out on purpose

- The yoga photograph (`unused/yoga.jpg`): it would imply a wellness offer that has not been confirmed.
- The reception photograph shows the sign "Amanjaya Pancam Suites Hotel", which is evidence for the hotel's official name. Worth settling before launch.

## Technical

- Images are processed to WebP in responsive sets by Astro. The largest hero variant is about 150 KB; the page downloads far less on a phone.
- Only the hero loads eagerly (high priority). Everything else is lazy-loaded with fixed aspect ratios, so there is no layout shift.
