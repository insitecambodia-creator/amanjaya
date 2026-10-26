# Amanjaya Hotel — Project Instructions

## Mission
Create an elegant, original, high-performing website for Amanjaya, a longstanding boutique hotel on the Phnom Penh riverside. The immediate deliverable is a **homepage design prototype for Anne, the General Manager**. This is a redesign followed by a controlled migration away from WordPress/PHP, not a rushed WordPress conversion.

## Source of truth
- Current public site: https://www.amanjaya-suites-phnom-penh.com/
- Treat the live site as a research source only; do not connect to its admin/API or alter production.
- Verify hotel names, room categories, restaurant names, amenities, address, history, phone numbers, policies, booking URLs and languages before publishing. A date or fact mentioned in a prompt is not proof.
- Never invent reviews, awards, prices, facilities, availability, guest quotes, or factual heritage claims.
- Prefer approved, hotel-owned photography. Do not hotlink or scrape images of uncertain rights; document any missing assets.

## Creative direction: Timeless Riverside Elegance
A premium, characterful boutique hotel — relaxed, authentic Phnom Penh hospitality rather than a generic international luxury resort.
- Palette: warm ivory, teak/wood, charcoal, muted bronze; restrained use of color.
- Visual language: immersive real photography, generous negative space, refined editorial composition, subtle architectural details, thoughtful hierarchy.
- Typography: expressive but readable serif for headings, clean sans serif for interface/body; use properly licensed or open-source web fonts.
- Writing: warm, quiet, human, evocative and concise. Avoid empty superlatives and invented promises.
- Motion: restrained, purposeful, and respectful of `prefers-reduced-motion`.
- Avoid: purple gradients, glassmorphism, excessive rounded cards, stock-photo aesthetics, loud animations, repetitive AI-generated layouts, and text-over-image with weak contrast.

## Technical architecture
- Astro with TypeScript where useful; static-first architecture.
- Cloudflare Pages for eventual hosting; GitHub for version control.
- Minimal client-side JavaScript and third-party scripts. No WordPress/PHP dependency in the new site.
- Semantic accessible HTML, responsive layouts, image optimization, sensible page metadata and social previews.
- Preserve a clear configuration boundary for the external booking engine; do not invent or replace booking links.
- Plan for maintainable multilingual content based on verified existing language requirements.
- Favor simple, well-documented content files/components that can be handed over to another developer.

## Performance, accessibility and SEO
- Prioritize fast mobile experience, sensible asset sizes, responsive image delivery, lazy loading below the fold, and layout stability.
- Target WCAG 2.2 AA, keyboard navigation, visible focus, suitable contrast and descriptive alt text.
- During eventual migration: capture current URL inventory, metadata, canonical rules and structured data; map necessary 301 redirects; test bookings, forms and all languages.
- Any public design preview must be isolated from production and excluded from search indexing until launch.

## Delivery and approval rules
- **Phase 1 only:** produce a polished homepage prototype (desktop + mobile), not the entire website.
- Present a short design rationale, list source images used, mark placeholders, and give local preview commands.
- Stop for user review before expanding into room pages, multilingual architecture, data extraction, or deployment.
- Never change live DNS, production hosting, existing WordPress files/database or live booking integrations without explicit approval.
- Work in small, reviewable steps. Explain the next action in plain language rather than long task lists.
- Do not claim a task is completed unless checked locally. For visual revisions, provide screenshots when browser tools are available.
