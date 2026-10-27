# Rooftop & Dining: photographs we have and what we need

The "Rooftop & Dining" section works best with two large, atmospheric photographs. Neither of the current images is ideal, so they are **temporary**. No stock photography has been used.

## On the page now

| Venue | Photograph now | Why it is only temporary |
|---|---|---|
| Le Moon Rooftop | **Now `lemoon_rooftop`** (uploaded by the hotel team): the rooftop terrace at sunset with lit lamps, palms, the river and the city skyline (1080 x 1080, so it is shown cropped to 3:2; a larger landscape original would be better). Previously `dining-le-moon`: the hotel at night with the Le Moon sign lit on the roof (1319 px wide), still used on the gallery page | It shows the building, not the rooftop experience: no guests, no view, no sunset. It is at least authentic and identifies the venue. |
| Sombok | `dining-sombok`: two chefs in front of the Sombok sign (960x640) | A formal portrait, not the food or the dining room. It is also small. |

## What the existing sources reference (checked, not yet viewed)

The build environment cannot reach the live site, so these could not be downloaded or seen.

- **Le Moon: probable originals exist.** The blog post "our lifestyle photo session for our branding campaign" lists 15 Le Moon images (`2020/10/LMN-menu-image-web-1` to `-15`, except 8). They may show drinks, guests or the rooftop; that is exactly what needs checking. The "things to do in Phnom Penh" page also uses `2020/03/LeMoon-180.jpg`. All are now in the manifest as Le Moon candidates.
- **Sombok: nothing further.** The exports reference only the portrait already in use. The restaurant's own website (sombok.asia) will have food and interior photographs, but they belong to the restaurant: they must not be copied without written permission.

## To review the Le Moon candidates (a minute, on a machine that can reach the live site)

```sh
npm run fetch:candidates
```

This downloads the candidates and writes a labelled contact sheet to `docs/room-photo-candidates.jpg`, including a "le-moon" row. If one is right, add it to `images` in `src/data/image-manifest.json` with the key `dining-le-moon`, run `npm run fetch:images`, and replace `src/assets/photos/dining-le-moon.jpg`; the section picks it up by name. Prefer a landscape image at least 1600 px wide.

## What we need

**Le Moon Rooftop** (one large landscape photograph, at least 2000 px wide, ideally with the focal point left of centre or in the middle):
- guests on the rooftop at sunset or in the early evening, or the view over the river from the bar;
- or the bar and rooftop terrace in evening light.
Not wanted: the building facade again, or night traffic.

**Sombok** (one large landscape photograph, at least 2000 px wide):
- a plated Khmer dish, or the dining room set for service.
- Not wanted: formal portraits.

**For both:** confirmation of who owns the image and that usage on the website is cleared, and model releases if identifiable people appear. Sombok's photographs should come from, or be approved in writing by, the restaurant.

## Wording rule: where is Sombok?

The existing homepage lists Sombok as a restaurant "in Phnom Penh" linked to its own website. It does **not** say it is inside the hotel, so the section does not say that either: Sombok is described as a restaurant in Phnom Penh, and its link goes to the restaurant's own site. If it turns out to be in the hotel building, the description can say so, but only once verified.
