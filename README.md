# Sumeet Group

Marketing site for Sumeet Group — a premium commercial development at Pachpedi Naka Chowk, Raipur, Chhattisgarh.

Built with React 18, Vite 5 and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment (Netlify)

`netlify.toml` holds the full configuration — no dashboard setup needed beyond
connecting the repository.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 20 |

## Project structure

```
public/Assets/     renders, logo and brochure — copied verbatim into dist/
src/components/    one file per page section
src/data/site.js   brand strings, nav items, contact details
src/index.css      all styling (design tokens + section styles)
```

### Assets

Everything under `public/Assets/` is served at `/Assets/...` and referenced from
components by that path. Vite copies `public/` into the build untouched, so new
renders only need to be dropped into the right folder — no import required.

### Editing content

- **Brand name, address, phone, email, nav items** — `src/data/site.js`
- **Hero slides** (image, heading, copy, 3s timing) — `src/components/Hero.jsx`
- **Layout width on large monitors** — `--stc-shell-scale` in `src/index.css`
- **Display / UI typefaces** — `--font-display` and `--font-ui` in `src/index.css`

## Before going live

The enquiry phone number and email address in `src/data/site.js` are
placeholders (`+91 00000 00000`, `info@sumeetgroup.in`) and must be replaced
with the real details.
