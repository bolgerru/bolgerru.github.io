# Site inventory (taken from `main` at e50b85a, 2026-11-10)

Everything below must survive the redesign unless Russell says otherwise. Copy is verbatim in
`index.html` on `main`; treat that file as the source of truth for every word and number.

## Files
- `index.html`, `assets/style.css`, `assets/main.js`, `.nojekyll`, `README.md`
- `Russell_Bolger_CV.pdf` (linked from nav and contact)
- `assets/og.jpg`, `assets/favicon.png`, `assets/apple-touch-icon.png`
- `assets/img/`: russell (800/1400), rf-schedule (800/1400), rf-picker (800/1400),
  rf-phone-schedule (720), rf-phone-picker (720), fnl-team-race (900/1600). Each WebP + JPEG.

## Head and meta
- `lang="en"`, `data-theme="dark"` default, title "Russell Bolger", description
- `color-scheme`, `theme-color` (updated by JS on toggle)
- OG: type, title, description, image (absolute URL to `assets/og.jpg`), url; `twitter:card` large image
- Favicon and apple-touch-icon
- Preload of hero image; `?v=` cache-busting on CSS and JS

## Inline head script (runs before first paint)
- No-flash theme: reads `localStorage.theme`, sets `data-theme`, wrapped in try/catch
- Adds `html.js`; failsafe removes it after 2.5s if `window.__rbReady` is unset
- Adds `html.boot-on` unless reduced motion; failsafe removes it after 3s if `window.__rbBoot` is unset

## Page structure, in order
1. Boot overlay (`aria-hidden`), log + skip button
2. Skip link to `#main`
3. Sticky nav: wordmark to `#top`; Work, Experience, Sailing (hidden on phones); CV (PDF, new tab); Contact; theme toggle
4. Hero `#top`: name line with scramble + caret, H1, lede, View work, GitHub, photo with alt text
5. Stats (4, RaceFlow): 19 regattas, 1,550 races, 9,300 finishes, 1,884 sailors
6. RaceFlow `#work`: lede; main cell (schedule shot, phone-specific crop, tech tags); picker cell (shot, teamracing.xyz link); two notes (Swiss pairing and knockouts; results on every phone)
7. First Not Last `#first-not-last`: lede; feature (game shot, Real sailors real rules, stack, firstnotlast.site); three notes (Six places to play; A leaderboard every night; Seven lessons)
8. Other projects `#projects`: Trinity Sailing Video Library; Movie Match (link); Rule of the Day
9. Experience `#experience`: Work timeline (4); Education (2); Toolbox (Code, Web, Tools, Spoken)
10. Sailing `#sailing`: 3 headline results (2023, 2026, 2025); 4 further results; Coaching (Nantucket Yacht Club)
11. Royal St George `#leadership`: lede; 4 figures (24, 456, ~90, 100); Senior Instructor card (4 duties, 5 qualifications)
12. Contact `#contact`: lede; email + Copy button; CV, LinkedIn, GitHub
13. Footer: name + year (`data-year`), "Best viewed downwind."
14. `aria-live` region `#live` for copy confirmation

## Interactions
- Theme toggle: dark default, persisted, icon + aria-label + theme-color update
- Boot sequence: typed prompt, 5 status lines ticking to ok, "ready.", wipe up on accent line. About 4.2s. Skippable by click, key, wheel, touch or the skip button. 9s hard cap. Locks scroll while on. Never for reduced motion.
- Name decode (scramble) after boot
- Count-up on `data-count` when revealed
- Scroll reveals by IntersectionObserver with 60ms stagger, delayed until boot leaves
- Copy email: Copied state, 2s reset, aria-live announcement, fallback text on failure
- Hover: link arrows nudge, screenshots lift, email underline grows, nav and buttons
- Footer year set by JS, static fallback in HTML

## Guarantees
- Complete without JS (content is all in HTML; `.reveal` only hides under `html.js`)
- `prefers-reduced-motion`: no boot, no scramble, no count, no reveal, transitions off, finished state
- `:focus-visible` outlines; skip link; `sr-only` live region
- Screenshots never clipped by CSS; phone gets dedicated crops via `<picture media>`
- Reserved image space through width and height attributes
- Scrollbar gutter stable so the boot unlock does not jump the layout

## Known issues on the current site
- Phosphor icon font and Geist load from a third-party CDN; if it fails, icons vanish.
- Boot `scroll` lock means about 4s before any content for every visit, every time.
- `.boot-skip` has `tabindex="-1"` and the overlay is `aria-hidden`; keyboard users skip via keydown only.
- Fixed `theme-color` values live in JS as well as CSS.
- Sailing results are in prestige order, not date order (2023, 2026, 2025). Assumed intentional; kept.
