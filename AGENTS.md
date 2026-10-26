# AGENTS.md — Weddings Planner Morocco (Luxury Weddings & Events, Marrakech)

Briefing for AI coding agents and developers. Read fully before editing.

---

## 1. What this project is

A **single-page marketing / lead-generation website** for **Weddings Planner Morocco**,
a wedding and event planner (not a venue) creating bespoke destination weddings and
private celebrations in Marrakech: garden ceremonies, candlelit receptions, poolside
cocktails, private garden parties, engagement parties and birthdays.

The site converts visitors into **event enquiries** through:
1. A "Start Planning" form in the **hero** and a "Start Planning Your Event" form in the
   **final section** (both share state).
2. **WhatsApp** buttons (navbar, mobile menu, footer, sticky button).

It is **not** a booking engine and has **no backend** (see §6).

> History: this project was previously "Riad Azahar", "Nelia Marrakech", "O'Atlas
> Marrakech" and "Jnane Tamsna". All were fully replaced — do not reintroduce their
> content, colours, logos or structure unless explicitly asked.

### Tone
Refined, Parisian-restrained luxury with Moroccan warmth. Copy is client-supplied —
keep it verbatim unless asked to edit. Eyebrows and headings come straight from the brief.

---

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript 5.9 (strict; `noUnusedLocals`/`noUnusedParameters` → unused imports FAIL type-check) |
| Bundler | Vite 7 + `vite-plugin-singlefile` → one inlined `dist/index.html` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), CSS-first `@theme` in `src/index.css` (no `tailwind.config.js`) |
| Animation | `framer-motion` (quiet reveals, parallax, modals; respects reduced motion) |
| Icons | `lucide-react` (no brand icons — use `MessageCircle` for WhatsApp) |
| Utility | `cn()` in `src/utils/cn.ts` (`clsx` + `tailwind-merge`) |
| Fonts | Google Fonts: **Montserrat** (body/UI), **Playfair Display** (hero display), **Libre Baskerville** (section headings, statements), **Anton** (fallback for Impact buttons) |

```bash
npm run dev
npm run build      # -> dist/index.html
npx tsc --noEmit   # always run together with build
```
Rules: never hand-edit `package.json` or `vite.config.ts` (use `npm install`). Entry is `src/App.tsx`.

### CSS gotchas (both have caused real bugs)
1. **Custom component classes must live inside `@layer components { }`.** Unlayered CSS
   beats Tailwind utilities, so e.g. `.btn { display:inline-flex }` overrode `hidden`
   and pushed the mobile menu button off-screen.
2. **Don't add `@theme` spacing tokens named `xs/sm/md/lg/xl/2xl…`** — they override
   Tailwind's `max-w-*` size scale and collapse text columns.

---

## 3. File map

```
index.html                       Title, meta description, "W"-in-arch favicon, Google Fonts
src/
  App.tsx                        Page composition, shared inquiry state, sticky WhatsApp, back-to-top
  index.css                      Tokens (@theme), typography + button + field classes (@layer components)
  data/site.ts                   ★ ALL content: photo map, brand, nav, sections, form options, WhatsApp config
  components/
    Logo.tsx                     LogoMark (sage arch + serif "W") and Wordmark ("Weddings Planner" / "MOROCCO")
    Navbar.tsx                   Fixed 87px header: transparent over hero → white + soft shadow on scroll; mobile overlay menu
    Hero.tsx                     01 — headline, tagline, intro line, CTA (left) + InquiryForm "hero" (right)
    Intro.tsx                    01 — introduction band: serif statement + approach paragraph + framed palm photo
    InquiryForm.tsx              ★ Shared form (variant "hero" | "contact"), validation, success summary
    Celebrations.tsx             02 — 3 category cards; image/title opens CelebrationGallery
    CelebrationGallery.tsx       Per-category popup gallery: arrows, thumbnails, swipe, focus trap, image fallback
    EventPromise.tsx             03 — Our Event Promise over full-width photo, 3 numbered pillars
    SignatureExperiences.tsx     04 — 5 experiences (2 wide + 3), single-image PhotoLightbox
    PhotoLightbox.tsx            ZoomableImage + single-photo lightbox (portal, Esc/backdrop close)
    Contact.tsx                  05 — final copy, tagline, photo + InquiryForm "contact" (sticky on desktop)
    Footer.tsx                   Near-black footer: wordmark, tagline, explore links, enquiries
    Ornament.tsx                 Eyebrow (label flanked by sage hairlines; tone "dark" | "light")
    Reveal.tsx                   Quiet fade/rise scroll reveal
```

---

## 4. Page structure

| # | Component | Anchor | Background | Content |
|---|---|---|---|---|
| – | Navbar | — | transparent → white | Links: What we create · Our promise · Experiences · Contact. WhatsApp (outline) + Plan your celebration |
| 01 | Hero | `#top` (form `#inquiry`) | photo + gradients | Eyebrow "LUXURY WEDDINGS & EVENTS IN MARRAKECH" / **Extraordinary Moments, Beautifully Planned** / tagline / CTA; form "Start Planning" |
| 01 | Intro | — | white → canvas gradient | "Imagine exchanging vows…" statement + "Our approach…" paragraph |
| 02 | Celebrations | `#celebrations` | white | "WHAT WE CREATE" / **Every Occasion, Beautifully Celebrated** — 3 galleries |
| 03 | EventPromise | `#promise` | photo + `rgba(19,21,22,.8)` | "THE WEDDINGS PLANNER MOROCCO EXPERIENCE" / **Our Event Promise** — 3 pillars |
| 04 | SignatureExperiences | `#experiences` | canvas `#F2F3F5` | "INSPIRED BY MARRAKECH" / **Unforgettable Ways to Celebrate** — 5 experiences |
| 05 | Contact | `#contact` | white → canvas gradient | "YOUR CELEBRATION BEGINS HERE" / **Let's Create Your Dream Celebration in Marrakech** + form |
| – | Footer | — | primary `#131516` | wordmark, links |

---

## 5. Content & galleries (`src/data/site.ts`)

- `photos` — named **temporary Pexels placeholders** (all verified reachable). Replace with
  real event photography in `public/images/` by changing `src` only.
- `celebrations` — 3 categories `{title, description, photo, gallery: Photo[]}`; each gallery
  has 5 photos (first = card image). Clicking the card image or title opens the gallery.
- `promises` — 3 pillars `{title, description}`.
- `signatureExperiences` — 5 items with photos (click-to-zoom).
- `eventTypeOptions`, `currencyOptions`, `defaultEventInquiry`, `formatEventDate`.
- `brand`, `navLinks`, `whatsappBusinessNumber`, `whatsappLink`, `defaultWhatsappMessage`.

---

## 6. Form & state

`App.tsx` owns `inquiry` (shared → both forms stay in sync) and `inquiryReference`
(non-null → both show the success summary; format `WPM-XXXXXX`).

`EventInquiry`: `name, email, phone, eventType` (default **Wedding**), `eventDate,
guestCount, budget, currency` (EUR/MAD/USD/GBP, default EUR), `message`.

- **Hero form** ("Start Planning"): all fields incl. **Preferred currency**; message
  placeholder "Tell us about your dream celebration...".
- **Contact form** ("Start Planning Your Event"): same fields **without currency** (per the
  brief); budget spans full width; placeholder "Tell us about your celebration".
- Validation: name ≥ 2 chars, valid email, event type, guests 1–2000, budget ≥ 0. On error,
  focus moves to the first invalid field; errors are linked via `aria-describedby`.

⚠️ **No backend.** Wire `submitInquiry` in `App.tsx` to the reservation/email system.
**WhatsApp:** `whatsappBusinessNumber` is empty — set it (international, digits only).

---

## 7. Design system (measured from thebeautifulmarrakech.com)

### Palette
| Token | Hex | Role |
|---|---|---|
| `primary` | `#131516` | Near-black: CTAs, headings/body on light, footer, overlays |
| `canvas` | `#F2F3F5` | Soft cool-gray page / alternate band |
| `surface` | `#FFFFFF` | Cards, form panel, text on dark |
| `hairline` | `#6E8458` | Sage — 1px borders, dividers, outlines, decorative numerals |
| `hairline-ink` | `#586B46` | Deeper sage for **small text** (sage itself is 4.1:1 on white, below AA) |
| `muted` | `#5A5C5E` | Secondary text on white/canvas (AA) |
| `accent-1/2` | `#212934` / `#212326` | Decorative darks |

Gradients: `linear-gradient(to top, rgba(0,0,0,.6), transparent)` on photos;
white↔canvas section gradients. Single soft shadow `0 0 6px rgba(20,22,23,.09)` (`shadow-soft`).

### Typography
- Hero H1 `.type-display-xl`: Playfair Display 400, up to 78px, lh 1.2, tracking -1.17px.
- Section H2 `.type-display-sm`: Libre Baskerville 400, up to 40px, tracking -0.6px.
- Statement `.type-statement`: Libre Baskerville ~30px.
- Card titles `.type-heading-lg` / `.type-heading-md`: Montserrat 400, 24 / 20px.
- Eyebrow `.type-eyebrow`: Montserrat 700 uppercase, flanked by sage hairlines.
- Body `.type-body-lg` (16px), `.type-body-md` (14px), `.type-caption` (12px): Montserrat, lh 1.72, tracking .27px.
- Buttons `.btn`: Impact/Anton 16px uppercase, tracking 1px, padding 13px 29px, min-height 47px.

### Buttons
`.btn-solid` (near-black, light bg), `.btn-outline` (sage border, light bg),
`.btn-light` (white, on dark/photo), `.btn-outline-light` (sage border, white text, on dark).
Hover = opacity / fill shift.

### Shape & layout
- **0px radius everywhere** (buttons, fields, cards, modals, sticky buttons).
- Max content width 1380px; horizontal padding 24px mobile / 40px desktop; sections `py-20 sm:py-28`.
- Category images **square** and clickable (client preference); galleries as popups;
  signature images click-to-zoom.
- Deliberate deviation: the measured site never collapses navigation, but this site has a
  hamburger below 1024px because the header also carries WhatsApp + CTA buttons.

---

## 8. Conventions
- Edit content in `src/data/site.ts`, not in components.
- Modals portal to `document.body`, lock scroll, close on Esc/backdrop; the gallery traps
  focus and makes `#root` inert.
- Wrap blocks in `<Reveal delay>`; keep motion subtle.
- Sections use `scroll-mt-20` so anchors clear the fixed header.
- Keep AA contrast: use `hairline-ink` / `muted` for small text, never raw sage.

## 9. Known gaps / TODO
1. Forms not connected to a reservation/email system.
2. WhatsApp number empty.
3. All photography is temporary stock (see §5).
4. No address, phone/email, map, legal pages, analytics, SEO schema or i18n (French suits the market).
5. Impact is a system font; on devices without it, Anton is used.
