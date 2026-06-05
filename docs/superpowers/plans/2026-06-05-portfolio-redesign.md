# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a single-page corporate-dark-luxury experience per the approved design doc, on an updated/patched stack.

**Architecture:** Next.js 16 App Router + React 19. One scroll-truth (Lenis → gsap.ticker). Each element animated by exactly one library: GSAP for scroll reveals/SplitText/parallax/cursor, Framer Motion for the load intro, Three.js (R3F) for the hero particle field. All design values are CSS custom properties. Old components archived, not deleted.

**Tech Stack:** next@16.1.6, react@19, typescript, tailwindcss@3, gsap@3.13+ (+@gsap/react), lenis, three + @react-three/fiber + @react-three/drei, framer-motion, lucide-react.

**Verification gate (every task):** `npm run build` exits 0, AND `npm run dev` renders the touched section without console errors at the stated viewport. Then commit. No unit tests — this is visual/animation code.

**Reference:** `docs/superpowers/specs/2026-06-05-portfolio-redesign-design.md`

---

## Phase A — Stack & Foundation

### Task 1: Dependency migration (React 19, add GSAP/Lenis)

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Bump React + add libs**

```bash
npm install react@19 react-dom@19 gsap@latest @gsap/react@latest lenis@latest geist
npm install -D @types/react@19 @types/react-dom@19
```

- [ ] **Step 2: Remove now-unused particle libs** (ParticleField replaces them)

```bash
npm uninstall @tsparticles/engine @tsparticles/react @tsparticles/slim
```

- [ ] **Step 3: Verify build + audit**

Run: `npm run build`
Expected: exits 0. If React 19 type errors surface in old components, that is fine — they will be archived in Task 2; if build is blocked, temporarily comment their imports from `app/page.tsx` and proceed.
Run: `npm audit` — note remaining advisories (informational).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: React 19 + add gsap/lenis/geist, drop tsparticles"
```

### Task 2: Archive old components

**Files:**
- Move: all current `components/*` and `components/ui/*` (except `lib/`) into `components/_archive/`
- Modify: `app/page.tsx`, `app/layout.tsx` (strip old imports)

- [ ] **Step 1: Create archive and move**

```bash
mkdir -p components/_archive
git mv components/*.tsx components/_archive/ 2>$null
git mv components/ui components/_archive/ui
git mv components/api 2>$null # ignore if absent
```
(Keep `app/api/chat/route.ts` in place for now — it is unused by the new tree but harmless; remove only if you confirm no env dependency.)

- [ ] **Step 2: Blank out page/layout to a minimal shell**

`app/page.tsx`:
```tsx
export default function Home() {
  return <main className="min-h-screen bg-[var(--bg-primary)]" />
}
```
`app/layout.tsx`: strip imports of archived components; keep `<html><body>{children}</body></html>` and metadata.

- [ ] **Step 3: Verify + commit**

Run: `npm run build` → exits 0.
```bash
git add -A
git commit -m "chore: archive old component layer, reset page shell"
```

### Task 3: Fonts (Cabinet Grotesk + Geist) + design tokens

**Files:**
- Create: `public/fonts/CabinetGrotesk-*.woff2` (download from Fontshare), `app/fonts.ts`
- Modify: `app/globals.css`, `app/layout.tsx`, `tailwind.config.ts`

- [ ] **Step 1: Fonts.** Geist via `geist/font`; Cabinet Grotesk via `next/font/local`.

`app/fonts.ts`:
```ts
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'

export const cabinet = localFont({
  src: [
    { path: '../public/fonts/CabinetGrotesk-Medium.woff2', weight: '500' },
    { path: '../public/fonts/CabinetGrotesk-Bold.woff2', weight: '700' },
    { path: '../public/fonts/CabinetGrotesk-Extrabold.woff2', weight: '800' },
  ],
  variable: '--font-display',
  display: 'swap',
})
export const geist = GeistSans // exposes .variable = --font-geist-sans
```
Download Cabinet Grotesk woff2 files from https://www.fontshare.com/fonts/cabinet-grotesk into `public/fonts/`.

- [ ] **Step 2: Wire in layout.** Add `className={`${cabinet.variable} ${geist.variable}`}` to `<html>`. Set `--font-body: var(--font-geist-sans)`.

- [ ] **Step 3: Tokens.** Paste the full token block from spec §6 into `app/globals.css` `:root`. Add base resets, `body` background/text, grain `body::after` (opacity 0.04, needs `public/noise.png` — generate a 128×128 noise PNG or use a tiny inline SVG turbulence data-uri), `.glow-orb` util, `h1/h2` clamp rules. Map Tailwind theme colors to vars in `tailwind.config.ts` (`background`, `foreground`, `accent`).

- [ ] **Step 4: Verify + commit.** `npm run build` → 0; dev shows correct bg + fonts loaded (check Network for woff2).
```bash
git add -A && git commit -m "feat: design tokens, Cabinet Grotesk + Geist fonts, grain overlay"
```

### Task 4: GSAP singleton + Lenis SmoothScroll provider

**Files:**
- Create: `lib/gsap.ts`, `components/providers/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: `lib/gsap.ts`**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, SplitText)
export { gsap, ScrollTrigger, SplitText }
```

- [ ] **Step 2: `SmoothScroll.tsx`** (`'use client'`)

```tsx
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])
  return <>{children}</>
}
```

- [ ] **Step 3: Wrap layout** body children in `<SmoothScroll>`.
- [ ] **Step 4: Verify + commit.** Build 0; scrolling feels smooth in dev.
```bash
git add -A && git commit -m "feat: gsap singleton + lenis smooth scroll provider"
```

---

## Phase B — Shared Primitives

### Task 5: CustomCursor

**Files:** Create `components/cursor/CustomCursor.tsx`; modify `app/layout.tsx`.

- [ ] **Step 1: Component** (`'use client'`). 10px dot rgba(255,255,255,0.8), `mix-blend-mode:difference`, `z-index:9999`, `pointer-events:none`. GSAP follow 0.5s power3.out via rAF-free `gsap.to` on mousemove (use `useRef`, quickTo for perf). On hovering any `a, button, [data-cursor]`: expand to 36px border-only (scale + bg transparent + border). Disable when `matchMedia('(pointer: coarse)')` or reduced-motion. Clean up listeners on unmount.

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = dot.current!
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY) }
    const over = (e: MouseEvent) => {
      const t = e.target as Element
      const on = t.closest('a, button, [data-cursor]')
      gsap.to(el, { scale: on ? 3.6 : 1, backgroundColor: on ? 'transparent' : 'rgba(255,255,255,0.8)', borderWidth: on ? 1 : 0, duration: 0.3 })
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return <div ref={dot} aria-hidden style={{ position: 'fixed', top: 0, left: 0, width: 10, height: 10, marginTop: -5, marginLeft: -5, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', border: '0 solid rgba(255,255,255,0.8)', mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 9999 }} />
}
```

- [ ] **Step 2:** Mount in layout (after children). Verify desktop only, build 0. Commit `feat: custom cursor`.

### Task 6: MagneticButton + SectionLabel + SplitReveal primitives

**Files:** Create `components/primitives/MagneticButton.tsx`, `SectionLabel.tsx`, `SplitReveal.tsx`.

- [ ] **Step 1: MagneticButton** — `'use client'`, props `{ children, href?, variant: 'solid'|'ghost', onClick? }`. Pointer move → `gsap.to(ref,{x:dx*0.3,y:dy*0.3,...})`, leave → elastic return. Renders `<a>` or `<button>`. Solid = white bg/black text, hover scale 1.02; ghost = border only, hover border brightens. Gate magnet under reduced-motion.

- [ ] **Step 2: SplitReveal** — `'use client'`, props `{ as, children, trigger?: 'mount'|'scroll' }`. Uses `useGSAP` + `SplitText` on the element, words from `y:'100%'`/`clipPath:inset(0 0 100% 0)`/opacity 0 → natural, stagger 0.08, dur 0.9, power4.out. `scroll` adds `scrollTrigger:{start:'top 80%'}`. Reduced-motion → render plain text, skip split.

- [ ] **Step 3: SectionLabel** — small-caps eyebrow; `useGSAP` animates letter-spacing 0.3em→0.1em on scroll enter (0.8s).

- [ ] **Step 4:** Build 0; commit `feat: motion primitives (magnetic button, split reveal, section label)`.

---

## Phase C — Sections (each its own commit)

> All section components live in `components/sections/`, are `'use client'` where they use GSAP/refs, use tokens via Tailwind arbitrary values `[var(--…)]` or CSS modules, and are added to `app/page.tsx` in order. Verify each at desktop (1440) + mobile (390) before commit.

### Task 7: Nav

**Files:** Create `components/sections/Nav.tsx`; modify `app/page.tsx`.

- [ ] **Step 1:** Fixed top bar. Left "D.V." in 1px bordered box. Center links WORK · ABOUT · CONTACT (anchor to `#work/#about/#contact`) with dot separators; hover letter-spacing 0→0.05em (0.3s, CSS). Right: pulsing green dot (CSS keyframe) + "AVAILABLE FOR WORK" small caps. Scroll>60px → add frosted state (`backdrop-filter:blur(12px)`, `bg rgba(10,10,11,0.7)`), tracked via a `scroll` listener on Lenis OR `window` scrollY in a ref + state, throttled. No querySelector.
- [ ] **Step 2:** Add `<Nav/>` to page. Build 0; verify frosted toggle past 60px, links hover. Commit `feat: nav`.

### Task 8: Hero (without particles)

**Files:** Create `components/sections/Hero.tsx`.

- [ ] **Step 1:** Full-viewport section `#top`. Eyebrow via SectionLabel "WÜRENLOS, SWITZERLAND — 2026". h1 three lines DEVELOPER. / CREATIVE / TECHNOLOGIST. wrapped in SplitReveal trigger=mount. Subline. Two MagneticButtons: VIEW WORK (solid, href `#work`) + GET IN TOUCH (ghost, href `#contact`). Ambient glow-orb (slate) behind, vignette overlay. Reserve absolute-positioned container for particles (Task 14).
- [ ] **Step 2:** Add to page. Build 0; verify headline reveal on load, buttons magnetic. Commit `feat: hero (static)`.

### Task 9: Stats row

**Files:** Create `components/sections/Stats.tsx`.

- [ ] **Step 1:** Single line, 4 items with thin vertical dividers (`border-l var(--border)`): "2+ Years Experience", "PwC Switzerland", "15+ Projects Built", "Available Worldwide". Small caps, `--text-secondary`. `useGSAP` fade+slide-up stagger 0.06 on scroll enter (start top 85%). Numeric stats counter-animate (snap) on enter. Reduced-motion → static.
- [ ] **Step 2:** Add to page; build 0; verify. Commit `feat: stats row`.

### Task 10: Marquee

**Files:** Create `components/sections/Marquee.tsx`.

- [ ] **Step 1:** Duplicated track for seamless loop, CSS `@keyframes marquee` translateX 0→-50%, ~28s linear infinite, `:hover{animation-play-state:paused}`. Content: "NEXT.JS · THREE.JS · GSAP · TYPESCRIPT · SWISS MADE · AVAILABLE FOR WORK · 2026 · FRAMER MOTION · REACT · TAILWIND · " (render twice). Large muted type, `overflow:hidden; white-space:nowrap`.
- [ ] **Step 2:** Add to page; build 0; verify seamless + pause. Commit `feat: marquee ticker`.

### Task 11: ProjectPlate primitive + Selected Work

**Files:** Create `components/primitives/ProjectPlate.tsx`, `components/sections/Work.tsx`.

- [ ] **Step 1: ProjectPlate** — designed editorial visual (no photo): dark `--bg-surface` panel, big ghosted project initial/number, slate accent geometry lines, stack tags chip row. Props `{ name, category, year, description, stack[], href?, redacted? }`. `redacted` variant: blurred content + lock icon (lucide `Lock`) + "CLASSIFIED" tag + redaction bars; NO link, cursor default — must look intentional, not broken.
- [ ] **Step 2: Work** — `id="work"`, heading SplitReveal trigger=scroll "SELECTED WORK." Three rows, alternating: row index even = plate left/text right, odd = reversed (CSS order). Each row: ProjectPlate + text block (name massive, category+year small-caps, description, stack tags, "View Project →" if href). Hover: row lifts (translateY -4), plate scales 1.04, accent left-edge line reveals (width 0→100% or scaleY). Cards stagger entrance translateY(60)/opacity0, 0.08, scrollTrigger. Plate image parallax 0.8x (`yPercent` scrub) — desktop only.
  Data: FormulaGod (no href), GetMoneyMap (https://getmoneymap.org), [REDACTED] (redacted=true).
- [ ] **Step 3:** Add to page; build 0; verify alternation, hover, redacted looks intentional, parallax. Commit `feat: selected work + project plates`.

### Task 12: Services

**Files:** Create `components/sections/Services.tsx`.

- [ ] **Step 1:** 3 cards row (grid, equal but content-led). Dark border no fill. Titles WEB EXPERIENCES / CREATIVE DEVELOPMENT / DIGITAL STRATEGY with their sub-lists (· separated). Hover: border brightens (`--border-hover`), title slides up 4px. Entrance slide-up translateY(40)/opacity0 stagger 0.1 on scroll. Mobile: stack, reduced motion.
- [ ] **Step 2:** Add to page; build 0; verify. Commit `feat: services`.

### Task 13: About + Contact + Footer

**Files:** Create `components/sections/About.tsx`, `Contact.tsx`, `Footer.tsx`.

- [ ] **Step 1: About** `id="about"` — split layout. Left: statement "I build things that look as good as they work." (large, -0.04em, SplitReveal scroll). Right: bio paragraph + skills as horizontal tags (Next.js, TypeScript, React, GSAP, Three.js, Framer Motion, Tailwind CSS, Docker, AWS, Python, BPMN). Labeled rows w/ thin `border-t` rules: Currently — Platform Development @ PwC Switzerland; Education — BZU Switzerland; Interests — Motorsport Media · Video Editing · Creative Technology. Location chip "Würenlos, CH" + lucide `MapPin`.
- [ ] **Step 2: Contact** `id="contact"` — full-width dark. Massive "LET'S BUILD SOMETHING." (SplitReveal). Email `devin.voegele@microsun.ch` as `mailto:` styled like a heading (hover underline reveal). lucide `Github`/`Linkedin` icons (no labels) → https://github.com/devin-voegele/ , https://www.linkedin.com/in/devin-voegele-2a5989293 (target _blank, rel noopener).
- [ ] **Step 3: Footer** — 1 row. Left "© 2026 Devin Vögele". Right "Built with Next.js · Designed with intention".
- [ ] **Step 4:** Add all to page; build 0; verify links work (no dead links). Commit `feat: about, contact, footer`.

---

## Phase D — 3D, Intro, Polish

### Task 14: ParticleField (Three.js, hero)

**Files:** Create `components/3d/ParticleField.tsx`; modify `components/sections/Hero.tsx`.

- [ ] **Step 1:** R3F `<Canvas>` with a `<Points>` of ~600 circular dots (use a circle texture or `gl_PointSize` + round alpha in a tiny shader / drei `PointMaterial` with `sizeAttenuation`), color rgba(255,255,255,0.6), size 1–3px, slow drift via `useFrame` rotating/raf offset. `alpha:true`, `position:absolute inset-0`, `pointer-events:none`. Mobile/reduced-motion → component returns null.
- [ ] **Step 2:** In Hero, lazy mount: `const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false })`, behind a `useMediaQuery('(min-width:768px)')`-style guard. Ensure cleanup (R3F handles renderer dispose on unmount).
- [ ] **Step 3:** Build 0; verify dots drift desktop, absent mobile, no console errors. Commit `feat: hero particle field`.

### Task 15: PageIntro overlay (Framer Motion)

**Files:** Create `components/providers/PageIntro.tsx`; modify `app/layout.tsx`.

- [ ] **Step 1:** `'use client'`, `AnimatePresence`. Fixed overlay `--bg-primary`, z above all. "D.V." opacity 0→1 (0.4s), then overlay `y:0→-100%` (ease-out-expo), unmount at ≤1.2s total via `setTimeout`+state. Under reduced-motion: render nothing (instant site). Must not block scroll after exit (`pointer-events:none` during exit).
- [ ] **Step 2:** Wrap/mount in layout above content. Ensure hero mount animation starts after overlay begins exit (acceptable if slightly overlapping). Build 0; verify intro plays once, ≤1.2s, site interactive after. Commit `feat: page-load intro overlay`.

### Task 16: Metadata, SEO, sitemap, final polish

**Files:** Modify `app/layout.tsx` (metadata), `app/sitemap.ts`, `public/robots.txt`; review `app/api/chat/route.ts`.

- [ ] **Step 1:** Update `metadata` (title "Devin Vögele — Developer & Creative Technologist", description, openGraph, themeColor #0A0A0B, canonical). Ensure `app/sitemap.ts` reflects single-page `/`. Remove AIChatbot-related JsonLd if archived.
- [ ] **Step 2:** Decide on `app/api/chat/route.ts`: if no longer referenced and no needed env, `git rm` it and its `.env.local.example` chat keys; else leave with a note. (No dead UI references either way.)
- [ ] **Step 3:** Full-page pass at 1440 + 390: check no horizontal-line z-index bugs on scroll reveals, no double-animation, reduced-motion path (toggle OS setting / emulate) shows static site, all links resolve. `npm run build` 0.
- [ ] **Step 4:** Commit `feat: metadata/seo + cleanup, final polish`.

### Task 17: Verification & handoff

- [ ] **Step 1:** `npm run build` 0; `npm run start` smoke test. `npm audit` — record advisory state.
- [ ] **Step 2:** Confirm spec §7 sections all present, DO-NOT list respected (no emoji, no banned fonts, accent slate not blue, no dead links, redacted not broken-looking, circular particles only).
- [ ] **Step 3:** Use `superpowers:requesting-code-review` before merge. Then `superpowers:finishing-a-development-branch`.

---

## Self-Review Notes

- Spec coverage: §7 sections 0–9 → Tasks 7–15; tokens §6 → Task 3; animation arch §4 → Tasks 4–6,14–15; migration §11 → Tasks 1–2,16; primitives §8 → Tasks 5–6,11.
- Naming consistency: `SplitReveal`, `MagneticButton`, `SectionLabel`, `ProjectPlate`, `SmoothScroll`, `CustomCursor`, `PageIntro`, `ParticleField` used identically across tasks.
- Known dependency: Cabinet Grotesk woff2 must be downloaded manually (Task 3 Step 1); `noise.png` generated in Task 3 Step 3.
- Open: FormulaGod has no live URL → no "View Project" link (intentional, avoids dead link).
