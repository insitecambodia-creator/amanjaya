/**
 * Line icons for the amenities, and which icon each amenity uses.
 *
 * The artwork is from Lucide (https://lucide.dev, ISC licence: free to use and copy, keep the notice). Only the icons
 * used here are included, as plain SVG paths on a 24 x 24 grid, so there is no icon library and no JavaScript.
 * The shared RoomAmenities component draws them (stroke only, in the grey of the text, aria-hidden: the label is the
 * accessible name).
 *
 * To give a new amenity an icon: add a Lucide icon's markup to `icons` (copy the shapes from lucide.dev/icons) and
 * add the amenity's name, in lower case, to `byAmenity`. Unknown amenities get a quiet tick, so a page never breaks.
 */
const icons = {
  'door-open': '<path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3" /><path d="M13 20h9" /><path d="M10 12v.01" /><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />',
  wifi: '<path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.859a10 10 0 0 1 14 0" /><path d="M8.5 16.429a5 5 0 0 1 7 0" />',
  coffee: '<path d="M10 2v2" /><path d="M14 2v2" /><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" /><path d="M6 2v2" />',
  'air-vent': '<path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 8h12" /><path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" /><path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />',
  vault: '<rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /><path d="m7.9 7.9 2.7 2.7" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /><path d="m13.4 10.6 2.7-2.7" /><circle cx="7.5" cy="16.5" r=".5" fill="currentColor" /><path d="m7.9 16.1 2.7-2.7" /><circle cx="16.5" cy="16.5" r=".5" fill="currentColor" /><path d="m13.4 13.4 2.7 2.7" /><circle cx="12" cy="12" r="2" />',
  'lamp-desk': '<path d="m14 5-3 3 2 7 8-8-7-2Z" /><path d="m14 5-3 3-3-3 3-3 3 3Z" /><path d="M9.5 6.5 4 12l3 6" /><path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z" />',
  wine: '<path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 15v7" /><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />',
  shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />',
  tv: '<rect width="20" height="15" x="2" y="7" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" />',
  wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" />',
  'concierge-bell': '<path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" /><path d="M20 16a8 8 0 1 0-16 0" /><path d="M12 4v4" /><path d="M10 4h4" />',
  check: '<path d="M20 6 9 17l-5-5" />',
} as const;

export type AmenityIconName = keyof typeof icons;

/** Amenity name (lower case) to icon. Aliases cover the spellings used on the existing site. */
const byAmenity: Record<string, AmenityIconName> = {
  'private balcony': 'door-open',
  'high-speed wi-fi': 'wifi',
  'high speed wifi': 'wifi',
  'hi speed wifi': 'wifi',
  'malongo espresso': 'coffee',
  'air conditioning': 'air-vent',
  'electronic safe': 'vault',
  'working desk': 'lamp-desk',
  'mini bar': 'wine',
  'slippers & robe': 'shirt',
  'flat-screen tv': 'tv',
  'flat screen tv': 'tv',
  'hair dryer': 'wind',
  'room service': 'concierge-bell',
};

/** The icon markup (the inside of a 24 x 24 SVG) for an amenity. */
export function amenityIcon(label: string): string {
  const name = byAmenity[label.trim().toLowerCase().replace(/\s+/g, ' ')] ?? 'check';
  return icons[name];
}
