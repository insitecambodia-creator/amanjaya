/**
 * Accommodation pages: the structured content the shared room template renders.
 *
 * Every fact here comes from the hotel's own page export (see docs/ROOM-TEMPLATE.md for the source of each item).
 * Do not add amenities, sizes or photographs that the export does not show. To add a room, add an entry below,
 * set `published: true`, and the page appears at /4-types-of-rooms/<slug>/ with no other code.
 *
 * Prices are NOT stored here: they come from src/data/pricing.ts (one place to edit), keyed by `id`.
 * The booking link comes from src/config/site.ts.
 */
import type { RoomId } from '../data/pricing';

/** Where the original WordPress pages live, so the new paths match the existing URLs. */
export const roomsBasePath = '/4-types-of-rooms/';

export interface RoomPhoto {
  /** Key of the file in src/assets/photos/ (file name without extension). */
  key: string;
  /** Describes what is in the photograph. Only written for photographs someone has actually looked at. */
  alt: string;
  /** Focal point for cropping, as CSS object-position. */
  position?: string;
  /** Where the original lives on the existing site (relative to /wp-content/uploads/), for re-downloading. */
  source: string;
}

export interface Room {
  id: RoomId;
  /** Only published rooms get a page. */
  published: boolean;
  /** Last segment of the URL, as on the existing site. */
  slug: string;
  name: string;
  /** Page title and meta description. */
  seoTitle: string;
  seoDescription: string;
  /** Room size in square metres, as published. */
  sizeSqm: number;
  /** Bed, as published. */
  bed: string;
  /** Description, one string per paragraph. */
  description: string[];
  amenitiesIntro: string;
  amenities: string[];
  /** In the order the existing page shows them. The first one that is available becomes the large photograph. */
  photos: RoomPhoto[];
}

export const rooms: Room[] = [
  {
    id: 'junior',
    published: true,
    slug: 'junior-suite-phnom-penh',
    name: 'Junior Suite',
    seoTitle: 'Junior Suite | Amanjaya Pancam, Phnom Penh',
    seoDescription:
      'The Junior Suite at Amanjaya Pancam in Phnom Penh: 45 sqm of living space with a king size bed, a lounge area, a private balcony and a floor fitted from local rosewood.',
    sizeSqm: 45,
    bed: 'King size bed',
    // Source: "With 45 sqm of living space..." on the existing Junior Suite page. Lightly edited for grammar
    // ("they are expansive and relaying" read as a slip) and "famous" dropped; the facts are unchanged.
    description: [
      'With 45 sqm of living space, the suite is expansive, and it gives a deep feeling of comfort with its king size bed and lounge area.',
      'To make your stay a real Cambodian experience, we have handpicked details: the floor is fitted from local rosewood, and the black-out curtains are made from Cambodian raw silk. Each suite is decorated with modern reproductions of artefacts from the neighbouring National Museum.',
    ],
    // Source: the "Luxurious amenities" block of the existing page. It says every suite has the same standard items.
    amenitiesIntro:
      'Every suite has a wide range of standard amenities, whichever room you choose: the items we feel make a stay a little more comfortable.',
    amenities: [
      'Private balcony',
      'High-speed Wi-Fi',
      'Malongo espresso',
      'Air conditioning',
      'Electronic safe',
      'Working desk',
      'Mini bar',
      'Slippers & robe',
      'Flat-screen TV',
      'Hair dryer',
      'Room service',
    ],
    // The four photographs on the existing page's carousel (originals under /wp-content/uploads/). The team chose
    // junior-8 to lead (the bed and the room's wood detailing); on the existing page it is the fourth slide.
    // Each description says only what the photograph shows.
    photos: [
      {
        key: 'junior-8',
        alt: 'The bed in the Junior Suite against a headboard wall of warm wood with lattice panels, a square textile panel and brass reading lights, with a sheer curtain, a small sofa with patterned cushions and framed prints to the left',
        // On phones the 4:3 crop keeps the whole headboard and bed and trims the framed prints on the left.
        position: '75% 50%',
        source: '2020/09/Amanjaya-junior8.jpg',
      },
      {
        key: 'junior-14',
        alt: 'The work corner of the Junior Suite: a wooden desk with a brass and white lamp and an upholstered chair, large plants, a bench at the foot of the bed, and tall windows with sheer curtains onto the balcony',
        position: '42% 50%',
        source: '2020/09/Amanjaya-junior14.jpg',
      },
      {
        key: 'suite-junior',
        alt: 'A corner of the Junior Suite: two armchairs and a dark wood cabinet with a lattice front around a round marble table with white flowers, framed prints on the wall and the edge of the bed',
        position: '60% 50%',
        source: '2020/09/Amanjaya-junior12.jpg',
      },
      {
        key: 'junior-6',
        alt: 'The bathroom of the Junior Suite: a wooden vanity with a basin and round wall lights, a wood lattice door, and a bathtub with pale tiled walls',
        position: '52% 50%',
        source: '2020/09/Amanjaya-junior6.jpg',
      },
    ],
  },
];

export const publishedRooms = rooms.filter((r) => r.published);

/** Path of a room page, e.g. "/4-types-of-rooms/junior-suite-phnom-penh/". */
export const roomPath = (r: Pick<Room, 'slug'>) => `${roomsBasePath}${r.slug}/`;
