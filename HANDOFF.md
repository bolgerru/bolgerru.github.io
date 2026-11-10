# Handoff: full UI redesign of bolgerru.github.io

Last updated 2026-11-10. Branch: `redesign/site-2026` (local only, not pushed). `main` is untouched.

## Goal
Redesign the whole site with the design-director workflow, keeping all real content and facts.
Rules from Russell: new git branch, small commits, never push or merge to `main` (the Pages
branch) without asking. Stay static (HTML/CSS/JS, no build step). Keep OG/meta tags, the no-flash
theme setup, reduced-motion handling and a working no-JS fallback. Update this file and CLAUDE.md at the end.

## Done
- Full checklist of what must survive: `.design/brief/INVENTORY.md`.
- `ddr init` run. Domain `personal-portfolios` created and researched: 15 exemplars, 6 counters, dossier, audit clean, confidence 72 (target 70).
- Three comps in `.design/directions/` (a-chart, b-instrument, c-spinnaker), rendered at desktop and phone, real copy and images. Comps cover the hero and one or two sections only.

## In progress: WAITING for Russell
Do not build until Russell picks a direction. Also awaiting the SPECS, left as placeholders in the request: must-keeps, audience, things to avoid.
Open question: boot sequence kept as is, re-skinned and shortened, or removed.

## Directions
- A Chart (recommended): Admiralty chart language. Chart paper, chart-magenta for all links, day and night palettes as chart displays have, dashed course line between sections, figures as italic soundings. Switzer + Newsreader italic. Risk: quietest; the course line must be excellent.
- B Instrument: race-instrument language. Pale LCD ground, Archivo condensed figures at full width, leaderboard with inverted top row, signal red. Risk: closest to generic big-condensed-type sports look.
- C Spinnaker: colour taken from his own yellow sail, a colour world per project, diagonal cloth seams. Cabinet Grotesk + Switzer. Risk: evenly loud.

## Next steps
1. On Russell's pick: `ddr palette check --strict` per theme, self-host fonts in `assets/fonts/` (no third-party CDN dependency; replace the Phosphor icon font with inline SVG).
2. Rebuild `index.html`, `assets/style.css`, `assets/main.js` against INVENTORY.md, commit in small steps, bump `?v=`. Regenerate `og.jpg` only if the direction needs it, keep absolute OG URL.
3. Gate: `ddr lint`, `ddr shots http://localhost:4173 --full` at desktop, phone, 320px, design-review skill. Fix; show final screenshots.
4. `ddr taste shipped`, `ddr domain log`, update CLAUDE.md and this file. Ask before any push.

## Gotchas
- `ddr` is not on PATH: `python /c/Users/russe/design-director/tools/ddr.py <command>`.
- `ddr init --help` does NOT print help, it runs init in the cwd. It did so once in ~/design-director; cleaned up.
- `ddr domain match` scored this brief 70 only by keyword against sailing-racing-games; ignore that figure.
- Comps use the Fontshare and Google CDNs; the real build must not.
- Sailing results are in prestige order (2023, 2026, 2025); assumed intentional.

## Run and test
`python -m http.server 4173` in the repo root, then http://localhost:4173. Comps at `/.design/directions/a-chart.html` etc.; add `#night` for the dark palette.
