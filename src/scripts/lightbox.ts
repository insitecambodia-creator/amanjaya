/**
 * The gallery viewer. Photographs on the gallery page are ordinary links to the larger image (so the page works
 * without JavaScript); this opens them in a <dialog> instead. A native modal dialog gives focus trapping, Escape to
 * close and the return of focus for free. Arrow keys, the buttons and a horizontal swipe move between photographs;
 * the neighbours are fetched in advance. No library, no animation (nothing to switch off for reduced motion).
 */
const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]'));

if (dialog && links.length > 0 && typeof dialog.showModal === 'function') {
  const img = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]')!;
  const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]')!;
  let current = 0;

  const preload = (i: number) => {
    const link = links[(i + links.length) % links.length];
    new Image().src = link.href;
  };

  const show = (i: number) => {
    current = (i + links.length) % links.length;
    const link = links[current];
    img.src = link.href;
    img.alt = link.dataset.alt ?? '';
    caption.textContent = link.dataset.label ?? '';
    count.textContent = `${current + 1} / ${links.length}`;
    preload(current + 1);
    preload(current - 1);
  };

  const open = (i: number) => {
    show(i);
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
  };

  links.forEach((link, i) =>
    link.addEventListener('click', (e) => {
      // Let the browser handle modified clicks (open in a new tab and so on).
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      open(i);
    }),
  );

  dialog.querySelector('[data-lightbox-close]')!.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]')!.addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-lightbox-next]')!.addEventListener('click', () => show(current + 1));

  // A click on the dark area around the photograph closes the viewer.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || (e.target as HTMLElement).classList.contains('lightbox__figure')) dialog.close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      show(current - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      show(current + 1);
    }
  });

  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
  });

  // Swipe: a mostly horizontal drag of 50px or more.
  let startX = 0;
  let startY = 0;
  img.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  img.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  });
}

export {};
