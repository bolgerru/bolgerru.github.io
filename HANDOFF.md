# Handoff: full UI redesign of bolgerru.github.io

Last updated 2026-11-10. Branch: `redesign/site-2026` (local only, nothing committed yet).

## Goal
Redesign the whole site with the design-director workflow, keeping all real content and facts.
Rules from Russell: new git branch, small commits, never push or merge to `main` (the Pages
branch) without asking. Stay static (HTML/CSS/JS, no build step). Keep OG/meta tags, the no-flash
theme setup, reduced-motion handling and a working no-JS fallback. Update this file and CLAUDE.md at the end.

## Done
- Read all source; full checklist of what must survive is in `.design/brief/INVENTORY.md`.
- `ddr init` run here (`.design/` exists).
- `ddr domain match` gave 70/100 but only by keyword ("sail", "rac" to sailing-racing-games).
  Real confidence for this brief was 0. Created domain `personal-portfolios`, related to sailing-racing-games.
- Baseline screenshot of the current site viewed.

## In progress
24-site `ddr teardown --into personal-portfolios` (portfolios, sailing/motorsport brands, outside refs, template counter-examples).

## Next steps
1. Open the teardown images; `ddr domain ref add` each one honestly (at least 4 counter-examples, 2 outside).
2. Write the dossier (`ddr domain path personal-portfolios`), `ddr domain audit`, `ddr domain status`; target 70 (high stakes). `--walk` on the best 3 if the score needs it.
3. `ddr taste brief --surface landing`, then present THREE directions. WAIT for Russell's pick before building.
   The SPECS block in the request was left as unfilled placeholders: ask about mood, must-keeps, audience, avoids alongside the directions.
4. Build across the whole site, commit in small steps on this branch.
5. Gate: `ddr lint`, `ddr shots` at desktop, phone and 320px, design-review skill. Fix, show final screenshots.
6. Update CLAUDE.md and this file. Ask before any push.

## Decisions and gotchas
- `ddr` is not on PATH: use `python /c/Users/russe/design-director/tools/ddr.py <command>`.
- `ddr init --help` does NOT print help, it runs init in the cwd. (It did so once in ~/design-director; removed.)
- Domain language to draw on: Admiralty chart magenta, instrument-style tabular figures, no age-of-sail pastiche, no graphite SaaS.
- Current look (Geist on near-black, one orange, bento cells, terminal boot) is what the redesign replaces; the boot and theme toggle stay unless Russell says otherwise.
- Sailing results are in prestige order (2023, 2026, 2025); assumed intentional.

## Files touched
`.design/` (new), `.design/brief/INVENTORY.md` (new), `HANDOFF.md`, `CLAUDE.md`. `.claude/` is git-excluded locally.

## Run and test
`python -m http.server 4173` in the repo root, then open http://localhost:4173.
