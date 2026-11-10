# bolgerru.github.io

Russell Bolger's personal site. Static HTML, CSS and JS, no build step. GitHub Pages deploys from `main`.

- `index.html`: the single page. `assets/style.css`: all styling, tokens at top. `assets/main.js`: progressive enhancements. `assets/img/`: each image as WebP + JPEG.
- Run: `python -m http.server 4173` in the root, open http://localhost:4173.
- Never push or merge to `main` without asking Russell. It is the live site.
- Real content and facts only. No invented projects, quotes, stats or experience.
- Must keep: OG/meta tags, no-flash theme script in `<head>`, reduced-motion handling, full content without JS.
- Bump the `?v=` query on the CSS and JS links when those files change.
- Design language is an Admiralty chart. Magenta means navigation only (links, course line, waypoints). Switzer for headings and reading, Newsreader italic only for figures and dates. Light is Day, dark is Night, stored under `localStorage.theme` as `light`/`dark`.
- RaceFlow totals: `[data-stat]` elements are updated from `https://teamracing.xyz/api/public-stats` (route in the `sailing-event` repo). The numbers in the HTML are the fallback.
- Course lines are inline SVG `.leg` elements. Never put `clip-path` on an element watched by the reveal observer: clip its child instead.
- Design work: design-director skill. `ddr` is `python /c/Users/russe/design-director/tools/ddr.py`; set `PYTHONIOENCODING=utf-8` on Windows. Project memory is in `.design/`.
- `ddr shots` captures during the boot and without scrolling, so its full-page images look empty. Review from a run that waits for the boot and scrolls.
- See `HANDOFF.md` for current state.
