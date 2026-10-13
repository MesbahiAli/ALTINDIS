# ALTINDIS Website Starter

A clean Next.js / TypeScript website prepared from the ALTINDIS presentation and the design direction supplied in the conversation.

## Pages

- `/` — Home
- `/recrutement` — Recruitment
- `/formation` — Training
- `/accompagnement` — Consulting / support
- `/contact` — Contact details

## Run locally

The header includes a FR / EN language switch. French remains the default; English pages are available at `/en`, `/en/recruitment`, `/en/training`, `/en/consulting`, `/en/contact`, and `/en/submit-cv`. Switching languages opens the matching page and preserves the current section anchor.

French routes live in `src/app/(french)` and English routes in `src/app/(english)/en`. Both versions share the same stylesheet and images. English UI components live in `src/components/en`; keep their copy in sync when changing the French version.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## What is already included

- Responsive navigation and mobile menu
- ALTINDIS logo extracted from the presentation
- ALTINDIS brand-inspired purple / blue / green palette
- Content based on the presentation: Recruitment, Training, Accompagnement, values and contact information
- Client/reference logos present in the presentation
- SEO metadata
- Responsive desktop / tablet / mobile styling

## Before production

1. Confirm the current phone numbers, email and address.
2. Confirm which reference/client logos may be shown publicly.
3. Replace or remove any copy that the client wants to update.
4. Add privacy/legal pages if required.
5. Connect a real contact form provider or backend if you want form submissions.
6. Add analytics only after consent/privacy requirements are decided.

## Main brand variables

Edit `src/app/globals.css`:

```css
--brand: #2a2aa8;
--violet: #7e31e3;
--green: #2ada68;
```

## Important

This is a fresh source-code starter. It is not the original company repository and it does not depend on the compiled `_next` files that were supplied as design reference.
