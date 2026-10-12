# Wedding Invitation, ocean & teal (invitation5)

Mobile-first wedding invitation website recreated from a reference screenshot: sunrise-ocean hero with the couple, ivory paper sections, ice-blue event details, an ocean countdown with scalloped tiles, a mosaic gallery and a deep-teal footer.

React 18 · Vite · TypeScript · Tailwind CSS · Motion for React (`motion`) · Lucide icons. No backend required.

> **All names, dates and venue details are SAMPLE content** (Pooja & Rahul, The Ocean Palace, Mumbai). Replace them in `src/data/invitation.ts`.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve dist/ locally
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). On Vercel the framework preset is **Vite**.

## Opening cover

Guests first see a "Tap to open" cover with the couple's photo, names, date and a teal monogram seal. Tapping it (or pressing Enter) bursts petals, shrinks the cover into the seal and reveals the invitation. `?guest=Aunt%20Sara` on the link adds "Dear Aunt Sara". If `musicSrc` is set and `musicOnOpen` is true, music starts on that tap; the floating button pauses it.

## Reuse for another couple

Edit **only** `src/data/invitation.ts`:

| Field | What it controls |
| --- | --- |
| `couple` | Names, monogram initials, hashtag |
| `event.start` / `end` / `timezone` | Weekday, day, month, year, time and the countdown are all **calculated** from these |
| `hero`, `about`, `story`, `gallery` | Texts and photos of each section |
| `venue` | Name, address lines, Google Maps search text, venue photo and map image |
| `rsvp.whatsappNumber` | Where RSVP replies go when no endpoint is set (digits, with country code) |
| `footer`, `cover`, `nav` | Social links, cover text, menu links |
| `musicSrc` / `musicOnOpen` | Background music file in `public/`; whether the cover tap starts it |

## Structure

```
src/
├─ App.tsx                    page composition + cover flow
├─ data/invitation.ts         ← all content
├─ types.ts
├─ components/
│  ├─ sections/               OpeningCover, MenuButton, Hero, About, EventDetails, Countdown,
│  │                          OurStory, Gallery (+ lightbox), Location, Rsvp, Footer
│  └─ ui/                     Reveal, Decor (florals, lantern, ornament, section title), Icons, MusicPlayer
├─ hooks/useCountdown.ts
├─ lib/                       dates.ts, image.ts (Cloudinary), rsvp.ts (integration point), guest.ts
├─ assets/                    photos/, floral artwork, ocean backdrop
└─ styles/index.css
```

## Assets (placeholders to replace)

| File | Replace with | Size |
| --- | --- | --- |
| `src/assets/photos/hero.webp` | Couple portrait, sky/sea behind them (faded into the page on its left and top) | 1000×1400 |
| `src/assets/photos/rings.webp` | About photo | 900×630 |
| `src/assets/photos/gallery-1…6.webp` | Gallery; 1 is the large tile | 1200 px long edge |
| `src/assets/photos/map.webp` | Map image (or a screenshot of Google Maps) | 960×620 |
| `src/assets/photos/venue.webp` | Wide venue photo | 1500×480 |
| `src/assets/ocean.jpg` | Countdown backdrop (sea and sky) | 1500×500 |
| `src/assets/floral-corner.png`, `floral-side.png`, `floral-footer.png`, `lantern.png` | Decorations | transparent PNG |
| `public/og-image.jpg` | Link preview | 1200×630 |

The sample photos were cut from the low-resolution reference screenshot, so they look soft. Florals, lanterns and the ocean backdrop are generated placeholders.

## RSVP: how replies are handled

`src/lib/rsvp.ts` never pretends to save data:

1. `VITE_RSVP_ENDPOINT` set → the reply is POSTed as JSON (Google Apps Script web app, Supabase edge function, your API).
2. Otherwise, with a WhatsApp number → a pre-filled WhatsApp message to the family opens, and the success text says exactly that.
3. Otherwise nothing is sent, and the page says so.

## Cloudinary (optional)

Give photos a `cloudinaryId` in `invitation.ts` and set `VITE_CLOUDINARY_CLOUD` in `.env`; photos are then served as `f_auto,q_auto,w_<size>`.

## Animation and accessibility

- Motion for React handles the cover, entrances, scroll reveals, lightbox, menu and countdown; lantern swing, floral sway and shimmer are CSS keyframes (transform/opacity only). GSAP was not needed.
- `prefers-reduced-motion` is respected (`MotionConfig reducedMotion="user"` plus a CSS override).
- Images below the fold are lazy-loaded and carry width/height to avoid layout shift.
- Music never autoplays on its own; menu, gallery and form are keyboard-usable (Esc closes overlays, arrows move through photos).
