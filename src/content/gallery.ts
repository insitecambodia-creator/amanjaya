/**
 * The gallery page: every hotel photograph in the repository, grouped. Only photographs that are in
 * src/assets/photos/ and supplied by the hotel team are listed (see docs/GALLERY.md for what was left out).
 * Each `alt` says only what the photograph shows; `label` is the short caption shown in the viewer.
 *
 * Room photographs that already appear on a room page reuse the text written in rooms.ts, so it cannot drift.
 * To add a photograph: put the file in src/assets/photos/ and add a line below. Nothing else changes.
 */
import { rooms, roomPath, type Room } from './rooms';

export interface GalleryItem {
  /** Key of the file in src/assets/photos/ (file name without extension). */
  key: string;
  alt: string;
  label: string;
}

export interface GalleryGroup {
  /** Sub-heading; left out where the section has a single group. */
  title?: string;
  /** Optional link to a related page, e.g. the room itself. */
  link?: { label: string; href: string };
  items: GalleryItem[];
}

export interface GallerySection {
  id: string;
  title: string;
  groups: GalleryGroup[];
}

export const galleryPage = {
  seoTitle: 'Gallery | Amanjaya Pancam, Phnom Penh',
  seoDescription:
    'Photographs of Amanjaya Pancam in Phnom Penh: the hotel, the suites, the rooftop and restaurants, and the riverside.',
  title: 'Gallery',
  intro: 'The hotel, the suites, the rooftop and the riverside. Select a photograph to see it larger.',
} as const;

/** A photograph already written up on a room page: same key, same description. */
function fromRoom(room: Room, key: string): GalleryItem {
  const p = room.photos.find((x) => x.key === key);
  if (!p) throw new Error(`gallery: ${key} is not in the ${room.name} photographs in rooms.ts`);
  return { key: p.key, alt: p.alt, label: `${room.name}: ${p.label.toLowerCase()}` };
}

const room = (id: Room['id']) => rooms.find((r) => r.id === id)!;
const roomGroup = (id: Room['id'], extras: GalleryItem[] = []): GalleryGroup => {
  const r = room(id);
  return {
    title: r.name,
    link: { label: `See the ${r.name}`, href: roomPath(r) },
    items: [...r.photos.map((p) => fromRoom(r, p.key)), ...extras],
  };
};

export const gallerySections: GallerySection[] = [
  {
    id: 'hotel',
    title: 'The hotel',
    groups: [
      {
        items: [
          {
            key: 'hero',
            label: 'The hotel in the evening light',
            alt: 'A couple walks hand in hand at sunset in front of the Amanjaya Pancam hotel',
          },
          {
            key: 'welcome-lobby',
            label: 'Hallway',
            alt: 'A hotel hallway with a Khmer line-drawing mural and a polished timber floor',
          },
          {
            key: 'gallery-reception',
            label: 'Reception',
            alt: 'The reception desk with the Amanjaya Pancam Suites Hotel sign',
          },
          {
            key: 'gallery-mural',
            label: 'Khmer mural',
            alt: 'A bright Khmer mural on a hotel wall above a terracotta floor',
          },
        ],
      },
    ],
  },
  {
    id: 'rooms',
    title: 'Rooms & suites',
    groups: [
      roomGroup('junior', [
        {
          key: 'junior-2',
          label: 'Junior Suite: living area',
          alt: 'The Junior Suite living area: a sofa and an armchair around a round marble table with a brass base, framed prints on the wall, and the bed and tall windows with a ceiling fan beyond',
        },
        {
          key: 'junior-1',
          label: 'Junior Suite: from the entrance',
          alt: 'The Junior Suite from the entrance: a king bed with a cushioned bench at its foot and a ceiling fan above, a lattice-fronted cabinet and the corridor door beyond',
        },
        {
          key: 'junior-13',
          label: 'Junior Suite: desk and balcony',
          alt: 'The Junior Suite: a desk and chair by tall windows onto the balcony, the bed with benches at its foot, and a vase of flowers on a round marble table in the foreground',
        },
        {
          key: 'junior-5',
          label: 'Junior Suite: bathtub',
          alt: 'A bathtub set into a wood-panelled surround, with pale tiled walls, a plant, and a wood lattice door at the left',
        },
      ]),
      roomGroup('deluxe'),
      roomGroup('executive', [
        {
          key: 'executive-11',
          label: 'Executive Suite: bed and lounge',
          alt: 'The Executive Suite: the bed by a tall window under a ceiling fan, with a sofa and armchairs around a round table on a rug in the foreground',
        },
        {
          key: 'executive-2',
          label: 'Executive Suite: sofa',
          alt: 'The Executive Suite: a sofa with patterned cushions and an armchair beside a round marble table with a tray of fruit, in front of a window with grey curtains and a plant',
        },
        {
          key: 'executive-10',
          label: 'Executive Suite: bathroom',
          alt: 'A wooden bathroom vanity with two basins, a framed mirror, a vase of white flowers and a wall light',
        },
      ]),
      roomGroup('panoramic', [
        {
          key: 'panoramic-8',
          label: 'Panoramic Suite: bed and sofa',
          alt: 'The Panoramic Suite: the bed with a bench at its foot and a sofa with patterned cushions beside a round marble table with white flowers, with framed pictures on the wall',
        },
        {
          key: 'panoramic-3',
          label: 'Panoramic Suite: along the room',
          alt: 'The Panoramic Suite seen past a louvred wooden door: a long room with a desk and chair, a bench at the foot of the bed and tall sheer-curtained windows',
        },
      ]),
    ],
  },
  {
    id: 'dining',
    title: 'Rooftop & Dining',
    groups: [
      {
        items: [
          {
            key: 'lemoon_rooftop',
            label: 'Le Moon rooftop at sunset',
            alt: 'The Le Moon rooftop terrace at sunset: low tables with lit lamps and cushions among palms, with the river and city towers beyond',
          },
          {
            key: 'dining-le-moon',
            label: 'The hotel at night',
            alt: 'The hotel at night with the Le Moon sign lit on the roof',
          },
          {
            key: 'dining-sombok',
            label: 'Sombok entrance',
            alt: 'Two chefs in white jackets beside the Sombok sign at the restaurant entrance',
          },
        ],
      },
    ],
  },
  {
    id: 'riverside',
    title: 'Riverside',
    groups: [
      {
        items: [
          {
            key: 'riverside',
            label: 'The riverside promenade',
            alt: 'The riverside promenade and the wide river seen from a hotel balcony',
          },
          {
            key: 'gallery-pagoda',
            label: 'The golden stupa',
            alt: 'A golden stupa and orange pagoda roofs beside the street',
          },
          {
            key: 'amanajaya-hero',
            label: 'In front of the Royal Palace',
            alt: 'A smiling couple takes a selfie in front of the Royal Palace in Phnom Penh, the man holding his phone at arm’s length and the woman in a sun hat leaning in beside him',
          },
        ],
      },
    ],
  },
  {
    id: 'moments',
    title: 'Moments',
    groups: [
      {
        items: [
          {
            key: 'welcome-balcony',
            label: 'Coffee on the balcony',
            alt: 'Two guests having coffee at a table on a private balcony, with the city behind them',
          },
          {
            key: 'gallery-breakfast',
            label: 'Breakfast in bed',
            alt: 'A couple sharing breakfast in bed in a suite',
          },
          {
            key: 'gallery-work',
            label: 'Breakfast and work',
            alt: 'Two guests working over breakfast in a suite',
          },
        ],
      },
    ],
  },
];
