# Patsy Yoga — Web Components Starter (No Build)
A tiny, throwaway-friendly site built with plain HTML, CSS, and a few Web Components.

## What you get
- `<py-header>` and `<py-footer>` for shared layout (no copy‑paste)
- `<py-card>` and `<py-grid>` for quick sections and cards
- Mobile‑first, dark‑mode aware styles
- Zero build tools; deploy to Cloudflare Pages, Netlify, Vercel, or any static host

## Develop
Just open `index.html` in your browser. No tooling required.

## Deploy (Cloudflare Pages)
1. Push this folder to a GitHub repo (e.g., `patsy-yoga-site`).
2. In Cloudflare → **Pages** → **Create project** → **Connect to Git** → select repo.
3. Framework preset: **None**
   - Build command: *(leave empty)*
   - Output directory: `/`
4. Deploy. Add your custom domain in **Custom Domains** (optional).

## Usage
Example card:
```html
<py-card title="Alento (Pré‑Parto)" href="/cursos/alento/">
  6–12 sessões. Respiração e mobilidade pélvica.
</py-card>
```

Change the nav by editing the links inside `<py-header>...</py-header>` on each page.

## Notes
- Components use light DOM (no Shadow DOM) so you can style them with your global CSS.
- Accessibility: semantic landmarks (`header`, `main`, `footer`), labeled nav, focusable buttons/links.
- You can add more components in `assets/components.js` as needed.
