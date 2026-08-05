# Sumeet Group

Marketing site for **Sumeet Group** (Sumeet Infracon Pvt. Ltd.), Raipur — a group
site covering the two projects currently selling:

| Project | Type | Location | Status |
| --- | --- | --- | --- |
| Sumeet Urban Nest | Residential, 2 & 3 BHK | Khamardih (Shankar Nagar) | New launch |
| Sumeet Trade Centre | Commercial, office & retail | Pachpedi Naka Chowk | Under construction |

Built with React 18 and Vite 5, styled by the approved **Sumeet Group design
system** (v1.0) — no CSS framework.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Design system

The brand is the design system, ported verbatim into `src/styles/`:

| File | Contents |
| --- | --- |
| `tokens.css` | Colour scales, type scale, 4px spacing grid, radii, shadows, motion, facet motif |
| `base.css` | Resets, layout primitives (`.wrap`, `.section`), brand type utilities, reveal motion |
| `components.css` | The `sg-*` primitives — Button, Badge, Tag, Eyebrow, Stat, Card, Input, Select, ProjectCard |
| `site.css` | Page-level patterns — header, footer, hero, gallery, plans, spec tables |

Rules worth keeping:

- **Colour** — cool charcoal ink on warm sand paper, gold as the decorative
  accent. The logo's vermilion `#FF2E17` lives **only inside the logo**; UI
  actions use the tempered brick scale (`--color-action`).
- **Type** — Newsreader (display serif), Hanken Grotesk (UI/body), DM Mono
  (every figure, spec and eyebrow). One italic gold word per headline is the
  only allowed flourish; write it as `<em>`.
- **Motion** — fades and short translates, 120–360ms, no bounce, nothing loops.
- **Figures** — always mono, always concrete. `1.76 acres`, `13.7 km`, `140`.

## Structure

```
public/Assets/            served at /Assets/… , copied into dist untouched
  Brand/                  Sumeet Group lockups (primary, reversed, mark)
  Sumeet Urban Nest (SUN)/renders/   renders + plans extracted from the brochure
  3D Images/              Sumeet Trade Centre renders
src/styles/               the design system (see above)
src/components/ui/        design system primitives
src/components/           Header, Footer, ProjectCard, Gallery, PlanViewer, EnquiryForm
src/pages/                Home, Projects, ProjectDetail, About, Contact, NotFound
src/data/site.js          brand strings, contact details, nav
src/data/projects.js      both projects — the single source of page content
src/lib/router.jsx        ~60-line history router
source-assets/            print-resolution masters (git-ignored, see below)
```

### Editing content

Almost everything visible is data, not markup:

- **Brand strings, contact details, nav** — `src/data/site.js`
- **Anything about a project** — `src/data/projects.js`. A project object drives
  its whole detail page; optional keys (`concept`, `specification`, `plans`,
  `partners`, `brochure`) simply omit their section when absent.
- **Adding a third project** — append to `PROJECTS`; the listing, filters,
  footer, enquiry dropdown and "more from Sumeet Group" all pick it up.

### Assets

`public/` is published wholesale, so only web-sized derivatives belong there.
The print masters live in `source-assets/`, which is git-ignored:

- `Sumeet Urban Nest Brochure_ 15.05.2026.pdf` — **414 MB**, past GitHub's 100 MB
  file limit. Keep it in cloud storage.
- `Sumeet Urban Nest_Top Plan View updated.jpeg` — 18 MB master.
- `Area Comaprison.pdf` — internal competitor area analysis. **Must never sit
  under `public/`**, which would publish it.

The Urban Nest renders in `public/Assets/Sumeet Urban Nest (SUN)/renders/` were
extracted from the brochure and resized to 1800px / q80.

## Deployment (Netlify)

`netlify.toml` holds the full configuration. The router uses real paths, so the
SPA fallback (`/* → /index.html`) is required — it is already configured.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 20 |

## Before going live

1. **Prices.** Neither brochure quotes one, so both projects read
   "Price on request". Replace `price` / `priceUnit` in `src/data/projects.js`
   when sales confirm figures.
2. **The enquiry form has no backend.** It validates and shows a confirmation,
   but nothing is sent. Wire `EnquiryForm`'s `onSubmit` to Netlify Forms or the
   CRM before launch.
3. **Sumeet Trade Centre's RERA number** is not in the brochure — `rera.number`
   is `null` and the line is hidden until it's filled in.
4. **Group statistics.** `GROUP_STATS` only carries figures countable from the
   portfolio. The founding year and total sq ft delivered were placeholders in
   the design system's sample data and were deliberately left out — add them
   once confirmed.
5. **Urban Nest brochure download.** Disabled (`brochure: null`) until a
   web-sized PDF exists; the 414 MB master cannot be served.
