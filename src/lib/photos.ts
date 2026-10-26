import type { ImageMetadata } from 'astro';

/** Every photograph committed under src/assets/photos/ (the unused/ folder is deliberately not matched). */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

/** Looks a photograph up by key (its file name without extension). Returns undefined if the file is not there. */
export function findPhoto(name: string): ImageMetadata | undefined {
  const entry = Object.entries(files).find(([path]) => path.split('/').pop()!.replace(/\.[^.]+$/, '') === name);
  return entry?.[1].default;
}
