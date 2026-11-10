# Handoff: full UI redesign of bolgerru.github.io

Last updated 2026-11-10. Branch: `redesign/site-2026` (local only, not pushed, last commit dae6246 or later). `main` is untouched and still live.

## Goal
Redesign the whole site in the design-director workflow, keeping all real content. Rules from Russell: never push or merge to `main` without asking; static HTML/CSS/JS; keep OG/meta tags, no-flash theme, reduced motion, no-JS fallback.

## Done
- Direction A, Chart, chosen by Russell and built across the whole page. See CLAUDE.md for the language.
- Boot re-skinned as the course being plotted, about 2s plus the wipe. Default theme is now Day (was dark). Russell did not answer the SPECS questions; recruiters-first was assumed.
- Live RaceFlow totals: site fetches `https://teamracing.xyz/api/public-stats`, HTML figures are the fallback.
- `sailing-event` repo: `app/api/public-stats/route.ts` pushed to `main` and deployed (ssh raceflow: pull, build, pm2 restart 0). Responds with the CORS header limited to https://bolgerru.github.io.
- Gate: lint 0, claims 0, fidelity 0. Render failed only on the CORS console error from localhost, which the deployed route does not allow by design. Contract and brand steps skipped (none exist).
- 17 behaviour checks pass: boot, skip, theme, no flash, copy, reduced motion, no JS, main.js blocked, fonts blocked, keyboard, count-up, live totals, three bad-response fallbacks.
- Design review recorded: fix-then-ship (load 3, one must-fix, self-review only).

## In progress
Russell is reviewing the build locally. Royal St George now sits above Sailing. Waiting on: (a) go-ahead to push the site to `main`; (b) the `C:\sailing-game` session changing the game UI to finish, then replace `assets/img/fnl-team-race-{900,1600}.{jpg,webp}` with a new First Not Last screenshot (1600x900, same names, update the alt text if the scene changes).
The Browser pane caches `/` hard: append `?fresh=<anything>` or hard-reload, or it can show an old design.

## Next steps, in order
1. Done 2026-11-10: `/api/public-stats` is deployed on teamracing.xyz (`sailing-event` main at 3897445a8) and returns live totals to https://bolgerru.github.io.
2. On Russell's go-ahead only: merge `redesign/site-2026` to `main` and push. Confirm live numbers at https://bolgerru.github.io after deploy. Then `ddr taste shipped` and `ddr domain log personal-portfolios shipped`.
3. Optional: retake the RaceFlow event-picker screenshot (`assets/img/rf-picker-*`, `rf-phone-picker-*`), which shows older totals than the live figures; its alt text quotes those totals too.

## Decisions and gotchas
- Live totals never work from localhost, because CORS only allows the production origin. Test with a stubbed response.
- `ddr init --help` does not print help; it runs init in the cwd.
- Switzer loads from Fontshare's embed and Newsreader from jsDelivr, on purpose: Switzer's ITF licence is not open, so its files are not in this public repo.
- Production totals on 2026-11-10: 1,826 races, 10,956 finishes, 2,352 sailors, against 1,550 / 9,300 / 1,884 in the HTML fallback.
- Not checked: real phones, Safari and Firefox, slow networks, the site reading the route from its real origin (only possible once pushed). No independent design review.

## Files touched
`index.html`, `assets/style.css`, `assets/main.js`, `CLAUDE.md`, `HANDOFF.md`, `.design/` (inventory, comps in `directions/`, claims, copy, review, taste ledger). In `sailing-event`: `app/api/public-stats/route.ts` on its own branch.

## Run and test
`python -m http.server 4173` in the repo root, then http://localhost:4173.
