/**
 * Promotion popups. THIS IS THE ONLY FILE TO EDIT to announce, schedule or remove a promotion.
 * The full step-by-step is in docs/PROMOTIONS.md (written for someone who has never seen this project).
 *
 * How it works, in one paragraph: every entry below is built into the page. In the visitor's browser the popup
 * compares today's date (Cambodia time) with each entry's `start` and `end`, and shows the one that is running, once
 * per visitor, a few seconds after the page opens. So a promotion can be added weeks ahead, and it switches itself
 * on and off. Nothing here needs touching on the day.
 *
 * To add one: copy the commented example at the bottom, uncomment it, fill it in. Use a new `id` every time.
 * The build STOPS with a clear message if something is wrong (a bad date, a missing image, no image description),
 * so a mistake cannot reach the live website.
 *
 * Never write a price, discount or condition that the hotel has not approved. Always give an end date.
 */
import { booking } from '../config/site';

export interface Promotion {
  /** A short unique name made of lowercase letters, numbers and hyphens, e.g. "pchum-ben-2026". Never reuse one. */
  id: string;
  /** First day it is shown, as YYYY-MM-DD (Cambodia time, from midnight). */
  start: string;
  /** Last day it is shown, as YYYY-MM-DD (Cambodia time, until the end of that day). */
  end: string;
  /** Headline. Keep it to about six words. */
  title: string;
  /** One or two short sentences, up to about 160 characters. Plain text. */
  text: string;
  /** Optional photograph: the file name in src/assets/promotions/, e.g. "pchum-ben.jpg". Landscape, 1600px wide or more. */
  image?: {
    file: string;
    /** Say what the photograph shows (for people who cannot see it). Required with an image. */
    alt: string;
  };
  /** The button. Leave out `url` to use the hotel's booking link (set once in src/config/site.ts). */
  button?: { label?: string; url?: string };
  /** Optional small print under the button, e.g. the conditions. */
  terms?: string;
  /** Where it appears: the homepage only (default) or every page. */
  showOn?: 'home' | 'all';
}

export const promotions: Promotion[] = [
  // Nothing is scheduled. Example (remove the two slashes at the start of each line to use it):
  //
  // {
  //   id: 'example-2026-11',
  //   start: '2026-11-01',
  //   end: '2026-11-30',
  //   title: 'A short, clear headline',
  //   text: 'One or two sentences about the offer, written exactly as the hotel has approved it.',
  //   image: { file: 'example.jpg', alt: 'The Le Moon rooftop terrace at sunset' },
  //   button: { label: 'Book Your Stay' },
  //   terms: 'Valid for stays until 31 December 2026. Subject to availability.',
  // },
];

/** What the popup falls back to when a promotion leaves the button out. */
export const defaultButton = { label: booking.label, url: booking.url };
