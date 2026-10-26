# Motion: scroll reveals

A gentle "fade in up" as sections scroll into view. It is an enhancement only: layout, colours and type are unchanged.

## What it does

- Opacity 0 to 1 and a rise of 18px, over 0.6s with a soft ease-out (`cubic-bezier(0.22, 0.61, 0.36, 1)`). Nothing bounces, scales or drifts.
- Elements that enter together are staggered by 100ms, up to three steps, in reading order (for example the four room panels). An element entering alone has no delay.
- Each element animates once, then is no longer observed.
- Only opacity and transform change, so there is no layout shift (measured CLS 0.0001 on desktop, 0 on mobile).

## Where it is used (selectively, 21 elements)

Welcome text and its two photographs; the Suites heading block and the four room panels; the Rooftop & Dining heading and each venue's photograph and text; the Riverside photograph and text; the Gallery heading and each gallery photograph. Not animated: the hero (it has its own load moment), the header, the footer, and individual paragraphs.

## Safe by default

- The hidden state exists only under the class `reveal-ready`, which `src/scripts/reveal.ts` adds after confirming `IntersectionObserver` is available and reduced motion is off. With JavaScript off, a script failure, or `prefers-reduced-motion: reduce`, nothing is ever hidden.
- Anything already in view at load, or scrolled past by an anchor jump, is shown immediately without animation, so there is no flash and no blank area when scrolling back.
- A large batch (more than six at once, such as a very tall viewport or a full-page capture) is shown instantly rather than animating many things at once.
- Print always shows everything.

## How to use it

Add `data-reveal` to an element. That is all. To change timing or distance, edit the block at the end of `src/styles/global.css`; stagger step and thresholds are constants at the top of `src/scripts/reveal.ts`.

## Cost

No library. The script is about 40 lines, inlined by Astro into the page (no extra request).

## Checked (Chromium)

Hidden below the fold at load; revealed on scroll; each element receives the reveal exactly once across repeated scrolling up and down; stagger delays 100/200/300ms; reduced-motion emulation and JavaScript-disabled both leave all 21 elements visible; no horizontal overflow at 1440px and 390px. Firefox and Safari are not installed in this environment, so they are untested; the APIs used are long established in both.
