# Ideas

Parked work to pick up later. Each entry is enough context to resume cold.

---

## 1. Add more illustrations to pages

Copy a folder of new SVGs into `src/assets/svgs/drawings/` and integrate them into pages in the same format as the existing illustrations.

**Not straightforward** — the existing SVGs required hand tweaking (both the SVG markup itself and the surrounding styling) to render correctly on the site. Expect to do similar per-illustration tweaking on the new batch.

**Where to look for the existing pattern:**
- `src/assets/svgs/drawings/` — current illustration SVGs
- `src/assets/svgMap.js` — central import/registry for SVGs
- `gatsby-plugin-react-svg` is the loader (see `gatsby-config.js`)
- Grep usages of existing drawings to see how they're placed and styled on each page

**To resume:** drop the new SVG folder somewhere accessible, point Claude at it, and ask to integrate them following the existing pattern — flagging that per-SVG markup/style adjustments will be needed.

---

## 2. Fix the Decap CMS preview pane

The preview pane in `/admin` currently uses default browser styles, so editors can't see how content will actually look on the site.

Two implementation tiers were researched (full notes in auto-memory `project_decap_preview_styling.md`):

- **Tier 1 — CSS-only (low effort):** Copy fonts to `static/fonts/`, then call `CMS.registerPreviewStyle(cssString, { raw: true })` in `src/cms/cms.js` with `@font-face` rules + basic typography. Quick win, won't be pixel-perfect.
- **Tier 2 — Custom preview templates (more effort, pixel-perfect):** Build a `registerPreviewTemplate` per collection, wrapping each in styled-components' `StyleSheetManager` with `target={document.head}` so styles inject into the preview iframe. Maintain one template per collection.

**To resume:** decide Tier 1 vs Tier 2 and ask Claude to implement; the memory file has the working code sketch and gotchas (hashed font names, silent style injection failure without `StyleSheetManager`, no GraphQL in CMS context, no hot reload).
