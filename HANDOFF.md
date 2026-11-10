# Handoff: full UI redesign of bolgerru.github.io

Last updated 2026-11-10. Branch: `redesign/site-2026` (local only, not pushed). `main` is untouched and still live.

## Goal
Redesign the whole site in the design-director workflow, keeping all real content. Rules from Russell: never push or merge to `main` without asking; static HTML/CSS/JS; keep OG/meta tags, no-flash theme, reduced motion, no-JS fallback.

## Done
- Direction A, Chart, chosen by Russell and built across the whole page. See CLAUDE.md for the language.
- Boot re-skinned as the course being plotted, about 2s plus the wipe. Default theme is now Day (was dark). Russell did not answer the SPECS questions; recruiters-first was assumed.
- Live RaceFlow totals: site fetches `https://teamracing.xyz/api/public-stats`, HTML figures are the fallback.
- `sailing-event` repo: local branch `feat/public-stats` (commit 3897445a8, based on `main`, not pushed) adds `app/api/public-stats/route.ts`. Tested on a local dev server: correct JSON, CORS header limited to https://bolgerru.github.io, type-checks.
- Gate: lint 0, claims 0, fidelity 0. Render fails only on the CORS console error, because the route is not deployed. Contract and brand steps skipped (none exist).
- 17 behaviour checks pass: boot, skip, theme, no flash, copy, reduced motion, no JS, main.js blocked, fonts blocked, keyboard, count-up, live totals, three bad-response fallbacks.
- Design review recorded: fix-then-ship (load 3, one must-fix, self-review only).

## Next steps, in order
1. Russell: deploy `feat/public-stats` in `sailing-event` to teamracing.xyz. Until then the page shows its static figures and logs a CORS error.
2. Russell's go-ahead, then merge `redesign/site-2026` to `main` and push. Confirm live numbers at https://bolgerru.github.io after deploy. Then `ddr taste shipped` and `ddr domain log personal-portfolios shipped`.
3. Optional: retake the RaceFlow event-picker screenshot (`assets/img/rf-picker-*`, `rf-phone-picker-*`), which shows older totals than the live figures; its alt text quotes those totals too.

## Gotchas
- Live totals never work from localhost, because CORS only allows the production origin. Test with a stubbed response.
- `ddr init --help` does not print help; it runs init in the cwd.
- Switzer loads from Fontshare's embed and Newsreader from jsDelivr, on purpose: Switzer's ITF licence is not open, so its files are not in this public repo. Fallback stacks are in `:root`.
- `.design/directions/` holds the three original comps. They are not linked from the site.
- Production totals on 2026-11-10: 1,826 races, 10,956 finishes, 2,352 sailors, against 1,550 / 9,300 / 1,884 in the HTML fallback.

## Not checked
Real phones, Safari and Firefox, slow networks, the production endpoint itself. No independent design review.

## Run and test
`python -m http.server 4173` in the repo root, then http://localhost:4173.
