# voegele.dev

Personal site of **Devin Vögele** — developer & creative technologist, Würenlos CH. Platform development at PwC Switzerland; motorsport flavor on top.

**Live:** [voegele.dev](https://voegele.dev)

## What it is

A dark, liquid-glass portfolio with one rule that everything obeys: **nothing animates while nothing is happening.** Every effect is interaction- or scroll-driven and goes fully to sleep when idle — no perpetual loops, no battery tax for reading a page.

- **Signal grid hero** — a canvas dot-field that ripples away from the cursor and bursts on click; its rAF loop cancels itself once the field settles
- **Liquid glass cards** — translucent surfaces with a gradient specular rim and a pointer-tracked shine that slides across card groups (`GlareField`)
- **Signal Pit** (`/lab`, also embedded on the homepage) — a Three.js × Rapier physics sandbox: ~130 instanced rigid bodies, cursor as force field, click shockwaves, flippable gravity. Sleeps when every body sleeps
- **Writing** (`/blog`) — engineering notes with `BlogPosting` JSON-LD
- **Case studies** (`/work/*`) — FormulaGod, GetMoneyMap

## Performance model

`PerfProvider` benchmarks the machine on load (frame-rate sample + core count) and assigns a tier — `full` / `reduced` / `off` — mirrored to `<html data-perf>`:

- `full` → backdrop-filter glass (applied inline via JS — Lightning CSS strips the declaration from stylesheets), denser canvas effects, shadows in the pit
- `reduced` (mobile / weak hardware) → solid glassy fallbacks, sparser effects, the homepage pit becomes a CSS teaser linking to `/lab`
- `off` (reduced motion) → static renders, content always visible

The heavy three + rapier chunk (~1.5 MB) is dynamically imported inside the pit component, so it loads only on `/lab` or when the homepage embed actually approaches the viewport.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis · Framer Motion · Three.js · Rapier (`@dimforge/rapier3d-compat`) · simplex-noise

Fonts: Geist Sans / Geist Mono · Anton (display) · Caveat (signature)

## Structure

```
app/
├── page.tsx               # Home: hero → marquee → sections → playground → contact
├── lab/                   # Signal Pit (Experiment 01)
├── blog/                  # Writing index + posts (static routes per post)
├── work/                  # Case studies (formulagod, getmoneymap)
├── layout.tsx             # Metadata, Person/WebSite JSON-LD graph, providers
└── sitemap.ts / globals.css

components/
├── sections/              # Hero, About, Skills, CloudDevOps, Homelab,
│                          # Projects, LabSection, Hobbies, Contact, Nav, Footer
├── effects/               # SignalGrid, Aurora, MountainBackdrop…
├── primitives/            # GlareField, LiveTerminal, Magnetic, FadeIn…
├── lab/                   # SignalPit (three + rapier, self-contained)
├── blog/ · work/          # PostLayout, CaseStudy shells
└── providers/             # PerfProvider (tiering), SmoothScroll (Lenis)

lib/                       # gsap registration, posts registry
```

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static)
```

Deployed on Vercel from `main`.

---

Personal site — content is mine; code is MIT if any of it is useful to you.
