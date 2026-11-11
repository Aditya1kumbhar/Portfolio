# Aditya Kumbhar, Portfolio

**Live: [adityakumbhar.vercel.app](https://adityakumbhar.vercel.app)**

My personal portfolio: an editorial, light-mode, single-page site presenting my live products (ORCA / Tarang, VitalGuard C3, SevaCare, RateIT), experience, achievements and research.

## Build notes

- Next.js (App Router) + TypeScript, fully static export. No backend, no database, no server functions.
- Motion: GSAP + ScrollTrigger + Lenis smooth scrolling, plus a lightweight 2D canvas wave in the hero.
- Strict security headers via vercel.json: Content Security Policy, HSTS preload, X-Frame-Options DENY, Permissions-Policy all off, nosniff, strict referrer policy.
- All copy lives in one file: src/data/content.ts.
- Fonts: Archivo, Inter, JetBrains Mono.

## Develop

npm install
npm run dev

Production build is a static export (output: 'export'), deployed on Vercel from the main branch.
