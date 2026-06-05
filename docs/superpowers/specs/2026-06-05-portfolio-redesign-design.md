# Portfolio Redesign — Design Doc

**Date:** 2026-06-05
**Owner:** Devin Vögele
**Status:** Approved for planning

---

## 1. Goal

Rebuild the personal portfolio as a single-page, corporate-dark-luxury experience —
Swiss design discipline, editorial restraint, award-level motion. The site is itself the
strongest project on display. Replaces the current "plain / larp-heavy" version, removes
dead links, and rides on an up-to-date, security-patched stack.

Reference aesthetics: linear.app (depth via blur layers), vercel.com (spacing + motion
restraint), aristidebenoist.com (developer portfolio done right).

---

## 2. Decisions Locked (from brainstorming)

| Topic | Decision |
|---|---|
| Next.js | Stay on **16.1.6**, bump **React 18 → 19** |
| Display font | **Cabinet Grotesk** (Fontshare, free, self-hosted) |
| Body font | **Geist** (free, self-hosted via `next/font` or local) |
| Existing code | **Full rebuild**; old components moved to `components/_archive/` (kept in git, excluded from build) |
| Contact email | **devin.voegele@microsun.ch** |
| Project visuals | **Designed editorial "plates"** — no photos/stock/AI; swap real screenshots later |
| GitHub | https://github.com/devin-voegele/ |
| LinkedIn | https://www.linkedin.com/in/devin-voegele-2a5989293 |
| AIChatbot / Terminal / etc. | Archived (not in new scope) |

---

## 3. Stack

**Core:** next@16.1.6 (App Router) · react@19 · typescript · tailwindcss@3 · clsx + tailwind-merge (`cn()`)
**Animation:** gsap@3.13+ · @gsap/react (`useGSAP`) · lenis
**3D:** three · @react-three/fiber · @react-three/drei · @react-three/postprocessing
**Existing, reused:** framer-motion (intro overlay + AnimatePresence), lucide-react (icons)
**To add:** gsap, @gsap/react, lenis
**To remove:** @tsparticles/* (replaced by R3F particle field), maath/simplex-noise/mini-svg-data-uri if unused after archive.

### Setup rules (hard)
- GSAP plugins registered **once** in `lib/gsap.ts` (ScrollTrigger, SplitText). Never in components.
- Three.js scene via `dynamic(() => import(...), { ssr: false })`, mobile-gated.
- Lenis in a `SmoothScroll` provider wrapping layout, integrated with `gsap.ticker`.
- `'use client'` on every GSAP/Three/browser-API component.
- Clean up GSAP, ScrollTriggers, Three renderers, Lenis on unmount.
- `useRef` only — never `document.querySelector` in render.
- `next/image` for all raster images, `sizes` + `priority` on above-fold.
- All color/spacing/easing via CSS custom properties — no hardcoded values in components.
- Respect `prefers-reduced-motion` — gate all animation.

---

## 4. Animation Architecture (the key technical decision)

Each element is animated by **exactly one** library. No element gets both a Framer transition
and a GSAP tween.

| Concern | Library |
|---|---|
| Smooth scroll (single scroll-truth) | Lenis → drives `gsap.ticker`, `ScrollTrigger.update` |
| Scroll reveals, SplitText, parallax, pin, counters | GSAP + `useGSAP` (scoped, auto-clean) |
| Page-load intro overlay | Framer Motion (`AnimatePresence`) |
| Hero particle field | Three.js (R3F), dynamic ssr:false, mobile off |
| Custom cursor + magnetic buttons | GSAP raw rAF follow |

No paid GSAP plugins: SplitText is free in 3.13. Lenis (not ScrollSmoother) handles smooth scroll.

---

## 5. File Structure

```
app/
  layout.tsx            — fonts, metadata, providers (SmoothScroll, PageIntro, CustomCursor)
  page.tsx              — assembles sections in order
  globals.css           — ALL design tokens (CSS vars) + base resets + grain/glow utilities
lib/
  gsap.ts               — registerPlugin once; export gsap, ScrollTrigger, SplitText
  utils.ts              — cn() (exists)
components/
  providers/
    SmoothScroll.tsx     — Lenis ↔ gsap.ticker
    PageIntro.tsx        — Framer overlay, "D.V." reveal
  cursor/CustomCursor.tsx
  3d/ParticleField.tsx   — circular dots, dynamic, mobile fallback null
  sections/
    Nav.tsx  Hero.tsx  Stats.tsx  Marquee.tsx  Work.tsx
    Services.tsx  About.tsx  Contact.tsx  Footer.tsx
  primitives/
    MagneticButton.tsx  SplitReveal.tsx  SectionLabel.tsx  ProjectPlate.tsx
  _archive/              — all old components (excluded from build via not-imported)
public/
  fonts/                — CabinetGrotesk-*.woff2, Geist-*.woff2
  noise.png             — grain overlay
```

---

## 6. Design Tokens (`globals.css`)

```
--bg-primary:#0A0A0B  --bg-secondary:#111114  --bg-surface:#1A1A1F
--text-primary:#F2F2F0  --text-secondary:#9A9A95  --text-muted:#5A5A58
--accent:#3D5A80  (cool slate) — final pick over ice blue for contrast on dark
--accent-subtle:rgba(61,90,128,0.14)
--border:rgba(255,255,255,0.08)  --border-hover:rgba(255,255,255,0.16)
--glass-bg:rgba(255,255,255,0.04)  --glass-border:rgba(255,255,255,0.10)  --glass-blur:12px
--ease-out-expo:cubic-bezier(0.16,1,0.3,1)
--ease-in-out:cubic-bezier(0.87,0,0.13,1)
--ease-spring:cubic-bezier(0.34,1.56,0.64,1)
--space-1..16: 8,16,24,32,48,64,96,128 (px)
```
Accent: **#3D5A80 cool slate**, used sparingly (status dot is green per spec; accent is for
hover lines, focus rings, plate geometry). Section min-gap: `--space-16` (128px).
Type: h1 `clamp(3rem,8vw,9rem)/0.95/-0.04em`, h2 `clamp(2rem,5vw,5rem)/1.0/-0.03em`.
Depth: grain overlay (`body::after`, opacity 0.04), ambient glow orbs (blurred slate radial),
vignette on hero. Max 2–3 `backdrop-filter` elements on screen at once.

---

## 7. Sections (build order)

**0. PageIntro** — Framer overlay (bg-primary) on top. "D.V." fades in center 0.4s → overlay
slides up (ease-out-expo) revealing site → hero animates. Total ≤ 1.2s. Skipped under
reduced-motion (instant reveal).

**1. Nav** (fixed) — Left: "D.V." monogram in 1px bordered box. Center: WORK · ABOUT · CONTACT
(dot separators). Right: pulsing green dot + "AVAILABLE FOR WORK" small caps. Scroll > 60px →
`backdrop-filter:blur(12px)`, `bg rgba(10,10,11,0.7)`, smooth. Links: no underline; hover
letter-spacing 0 → 0.05em (0.3s). Scroll state tracked via Lenis scroll value + ref, not querySelector.

**2. Hero** (full viewport) — Eyebrow "WÜRENLOS, SWITZERLAND — 2026". Display, left-aligned:
"DEVELOPER. / CREATIVE / TECHNOLOGIST." Subline "Building premium web experiences from
Switzerland." Buttons: "VIEW WORK" (solid white, black text, magnetic, hover scale 1.02) +
"GET IN TOUCH" (ghost border, hover border brightens). Background: ParticleField — circular
dots 1–3px, rgba(255,255,255,0.6), slow drift, off on mobile. Headline: SplitText word reveal,
clipPath inset(0 0 100% 0)→natural, stagger 0.08, dur 0.9, power4.out, on mount.

**3. Stats** — single dark line, 4 stats with thin vertical dividers: "2+ Years Experience ·
PwC Switzerland · 15+ Projects Built · Available Worldwide". Small caps, muted. Fade+slide-up
stagger 0.06 on scroll enter. (Numbers counter-animate on enter.)

**4. Marquee** — "NEXT.JS · THREE.JS · GSAP · TYPESCRIPT · SWISS MADE · AVAILABLE FOR WORK ·
2026 · FRAMER MOTION · REACT · TAILWIND ·" continuous left scroll, seamless loop (duplicated
track), pause on hover.

**5. Selected Work** — heading "SELECTED WORK." (SplitText on scroll). Full-width alternating
ProjectPlate cards: odd = visual left/text right, even = reversed. Each: name (massive),
category+year, description, stack tags, "View Project →". Hover: card lifts, plate scales 1.04,
accent line reveals on left edge. Plate image parallax ~0.8x scroll. Cards stagger
translateY(60px)/opacity0→natural 0.08.
- **FormulaGod** — WEB / MEDIA — 2024. "Motorsport media & marketing platform." Stack: Next.js,
  Framer Motion, Tailwind. (no live URL → "View Project" disabled/omitted)
- **GetMoneyMap** — WEB / FINTECH — 2025. "Personal finance visualization platform. Interactive
  data mapping and budget tracking." URL getmoneymap.org. Stack: Next.js, TypeScript, Tailwind.
- **[REDACTED]** — PLATFORM / SAAS — 2025. "This project is currently under wraps. Details
  unreleased." Stack: TypeScript, Cloud, Docker. Treatment: CLASSIFIED / COMING SOON — blurred/
  locked aesthetic, intentional, NOT broken-looking (lock icon, redaction bars, no dead link).

**6. Services** — 3 cards row. WEB EXPERIENCES (Next.js · Three.js · GSAP · Full-stack) /
CREATIVE DEVELOPMENT (Motion design · Interactive UI · WebGL) / DIGITAL STRATEGY (Brand identity
· Platform architecture · Performance). Dark border, no fill; hover: border brightens, title
slides up 4px. Slide-up translateY(40px)/opacity0 stagger 0.1.

**7. About** (split) — Left: large statement "I build things that look as good as they work."
(letter-spacing -0.04em, SplitText). Right: short bio + skills as horizontal tags (Next.js,
TypeScript, React, GSAP, Three.js, Framer Motion, Tailwind CSS, Docker, AWS, Python, BPMN).
Labeled rows w/ thin rules: Currently — Platform Development @ PwC Switzerland; Education — BZU
Switzerland; Interests — Motorsport Media · Video Editing · Creative Technology. Location chip
"Würenlos, CH" with map pin.

**8. Contact CTA** (full-width dark) — Massive "LET'S BUILD SOMETHING." Email
devin.voegele@microsun.ch as clickable mailto link styled like a heading. GitHub + LinkedIn
icons (lucide), no labels, real URLs above.

**9. Footer** (1 row) — Left: © 2026 Devin Vögele. Right: Built with Next.js · Designed with
intention.

---

## 8. Shared Motion Primitives

- **CustomCursor** — 10px dot rgba(255,255,255,0.8), GSAP follow 0.5s power3.out, expands to
  36px border-only circle on link hover, `mix-blend-mode:difference`. NOT accent color.
  Disabled on touch / reduced-motion.
- **MagneticButton** — pointer-offset translate ×0.3, elastic return. Primary CTAs only.
- **SplitReveal** — wraps SplitText word reveal for headings.
- **SectionLabel** — letter-spacing 0.3em → 0.1em as section enters (0.8s).

---

## 9. Responsive / Reduced-motion

Mobile <768px: Three.js/particles off, parallax + scroll-scrub off, custom cursor off, stagger
−50%, translateY max 20px, opacity fades only. `prefers-reduced-motion`: all animation gated to
instant states; intro overlay shows site immediately.

---

## 10. Out of Scope (YAGNI)

No blog, no bento grid, no skills progress bars, no experience timeline, no AI chatbot, no
Terminal, no emoji anywhere. No stock/AI imagery. No centered-everything layout.

---

## 11. Migration / Dependency Work (separate verified pass)

1. Bump react/react-dom 18 → 19 + @types. Verify build.
2. Add gsap, @gsap/react, lenis. Remove @tsparticles/*. Audit maath/simplex-noise/
   mini-svg-data-uri usage post-archive; remove if orphaned.
3. `npm audit` after changes; confirm `next build` clean at each step.
4. Archive old components; ensure none imported by new tree.

---

## 12. Open Items / TODO before launch

- Real project screenshots to replace designed plates (optional, later).
- Confirm Cabinet Grotesk + Geist woff2 files placed in `/public/fonts`.
- Confirm getmoneymap.org is the correct live URL for the Work CTA.
