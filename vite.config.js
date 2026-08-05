import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// The site is styled by the Sumeet Group design system (src/styles) — plain
// CSS on custom properties, so Tailwind is out of the pipeline and its
// preflight can't fight the token layer.
//
// `base: '/'` (not './') because the router reads real pathnames; relative
// asset URLs would break on any route deeper than the root.
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [react()],
})
