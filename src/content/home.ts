/**
 * Homepage copy. Plain data so it can be edited without touching components.
 * Wording is rewritten in a quieter voice, but every factual statement traces back to the existing site
 * (room pages, homepage, contact page). Sources are listed in docs/CONTENT-SOURCES.md.
 * `photo` values are keys in src/data/image-manifest.json; `alt` text needs a human check once photos are in.
 */

export const hero = {
  photo: 'hero',
  alt: 'The Amanjaya Pancam hotel on the Phnom Penh riverside',
  title: 'Phnom Penh, at the water’s edge.',
  intro:
    'A boutique hotel at the corner of Sisowath Quay and Street 154, looking over the Tonle Sap and the Mekong.',
} as const;

export const welcome = {
  title: 'On the riverside since 2002.',
  paragraphs: [
    'Amanjaya Pancam stands on the corner of Sisowath Quay and Street 154, close to the National Museum. Every room has a private balcony, and Cambodian details run through the suites: local woods underfoot and raw silk at the windows.',
    'Stay for the river, and for a city that begins at the front door.',
  ],
  photos: [
    { photo: 'welcome-facade', alt: 'The hotel facade on the corner of Sisowath Quay' },
    { photo: 'welcome-lobby', alt: 'The hotel lobby' },
  ],
} as const;

export const suites = {
  title: 'Four ways to stay',
  intro: 'Every category has a private balcony, air conditioning, a working desk and room service.',
  items: [
    {
      id: 'junior',
      name: 'Junior Suite',
      size: '45 sqm',
      note: 'The hotel’s bestseller',
      text: 'A king bed and a lounge area. Local rosewood floors, black-out curtains in Cambodian raw silk, and reproductions of artefacts from the neighbouring National Museum.',
      photo: 'suite-junior',
      alt: 'A Junior Suite with a king bed and lounge area',
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      size: null,
      note: 'Canopy bed and bathtub',
      text: 'A king-size canopy bed, a bathroom with both bath and shower, and a living area with armchairs. The balcony looks over the city.',
      photo: 'suite-deluxe',
      alt: 'A Deluxe Room with a canopy bed',
    },
    {
      id: 'executive',
      name: 'Executive Suite',
      size: '90 sqm',
      note: 'Three suites, river views',
      text: 'A genuine living area with a sofa, three armchairs and a desk. Cambodian raw silk, replica artefacts and polished local cherrywood, with furniture made to order. For business or leisure.',
      photo: 'suite-executive',
      alt: 'An Executive Suite living area',
    },
    {
      id: 'panoramic',
      name: 'Panoramic Suite',
      size: '50 sqm',
      note: 'Both rivers and the pagoda',
      text: 'A wide view over the two rivers and the pagoda, a lounge area, a king bed, and windows that let the light in.',
      photo: 'suite-panoramic',
      alt: 'A Panoramic Suite with river views',
    },
  ],
} as const;

export const dining = {
  title: 'Dining and the rooftop',
  venues: [
    {
      id: 'le-moon',
      name: 'Le Moon Rooftop',
      kind: 'Rooftop bar',
      text: 'Part of the hotel since 2010. Early evening is for a sundowner before dinner; later it belongs to friends and couples, for dinner or just a drink.',
      photo: 'dining-le-moon',
      alt: 'Le Moon Rooftop bar',
      link: { label: 'Visit Le Moon Rooftop', url: 'https://www.le-moon-rooftop.com/' },
    },
    {
      id: 'sombok',
      name: 'Sombok',
      kind: 'Khmer fine dining',
      text: 'Khmer fine dining led by the Kimsan Twins, and sister restaurant to Embassy in Siem Reap.',
      photo: 'dining-sombok',
      alt: 'A table at Sombok restaurant',
      link: { label: 'Visit Sombok', url: 'https://sombok.asia/' },
    },
  ],
} as const;

export const riverside = {
  title: 'Where the two rivers meet',
  text: 'The hotel looks over the Tonle Sap and the Mekong from Sisowath Quay, a short stroll from the city’s main attractions.',
  photo: 'riverside',
  alt: 'The hotel seen from the riverside',
} as const;

export const gallery = {
  title: 'Inside and out',
  photos: [
    { photo: 'gallery-1', alt: 'A hotel corridor', ratio: '4 / 5' },
    { photo: 'gallery-2', alt: 'The hotel lobby', ratio: '3 / 2' },
    { photo: 'gallery-3', alt: 'The hotel facade', ratio: '3 / 2' },
    { photo: 'gallery-4', alt: 'Hotel interior', ratio: '4 / 5' },
    { photo: 'gallery-5', alt: 'Hotel interior', ratio: '3 / 2' },
    { photo: 'gallery-6', alt: 'Hotel interior', ratio: '3 / 2' },
    { photo: 'gallery-7', alt: 'Hotel detail', ratio: '4 / 5' },
    { photo: 'gallery-8', alt: 'Hotel detail', ratio: '3 / 2' },
  ],
} as const;
