# Portfolio v3 — "Blend" Design Doc

**Date:** 2026-06-07
**Owner:** Devin Vögele
**Status:** Approved direction; IT-content pending from user
**Branch:** `v3` (off `v2`; v2 stays recoverable)

---

## 1. Goal

Rework v2 into a **fast, buttery** portfolio that **blends** the v2 motorsport identity with the
`portfolio_temp` (hadi) dev-portfolio: navy base + a richer blue/green/purple accent system,
lightweight CSS-driven motion (no per-frame WebGL), and deeper **IT substance** (homelab,
automation, daily-driver/OS, DevOps) alongside the existing work + hobbies.

Driving problem: v2 is **laggy** on the user's machine due to heavy per-frame WebGL and transforms.
v3 removes those and rebuilds the "wow" with cheap, smooth CSS effects.

---

## 2. Decisions (from brainstorming)

| Topic | Decision |
|---|---|
| Performance | Strip ALL heavy WebGL + per-frame JS; rebuild motion with lightweight CSS/GSAP. Target smooth 60fps. |
| Visual identity | **Blend palettes**: navy base + blue/green/purple accents + glitch/terminal dev touches, keeping motorsport/telemetry motifs. |
| Content | **Keep current** (FormulaGod, GetMoneyMap, skills, motorsport/MTB) **AND add IT-depth** sections (Daily Driver/OS, Homelab, Automation/DevOps) — populated with the user's REAL details (pending). |
| Branch | `v3` off `v2`. |

---

## 3. Performance Rework (the core fix)

**Remove (lag sources):**
- `components/3d/VelocityField.tsx` (hero WebGL particle field) + its dynamic mount in Hero.
- `components/effects/VelocitySkew.tsx` + its wrapping of page content.
- `components/sections/MountainParallax.tsx` (the failed/meh GSAP parallax) + CloudGate/CloudScene (already deleted).
- The `TrailCursor` 6-node rAF trail → replace with a single lightweight CSS/GSAP dot OR drop entirely (decide during build; lean: keep a single cheap dot, no per-frame trail).
- Dependencies: uninstall `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (if present), `@types/three`. This removes the heaviest compile + runtime cost and speeds Turbopack builds.

**Keep (cheap):**
- `ScanlineOverlay` (pure CSS).
- Preloader / launch intro (one-time, gated; keep but ensure it never blocks and is skippable).
- Marquee (pure CSS).
- Lenis smooth scroll (cheap; keep) — but DROP the velocity readout/skew usage.

**Motion budget:** GSAP only for scroll-reveals (ScrollTrigger batch) and small hovers. Prefer
`IntersectionObserver` + CSS classes (`fade-in-section`) for section entrances (very cheap). No
element animated every frame. Respect `prefers-reduced-motion`.

---

## 4. Blended Palette (`globals.css`)

Keep v2 navy base; add the portfolio_temp accent system as tri-accent.
```
--bg-primary:#080B14; --bg-secondary:#0C1120; --bg-surface:#111A2E; --navy-line:#1B2740;
--text-primary:#EAEEF5; --text-secondary:#8A95AD; --text-muted:#4C5878;
--accent:#2E6BFF;        /* primary — electric blue (links, telemetry, primary CTA) */
--accent-bright:#5B9DFF;
--accent-2:#10B981;      /* secondary — green (terminal text, secondary CTA, success) */
--accent-3:#8B5CF6;      /* tertiary — purple (gradient stops, tertiary accents) */
--accent-subtle:rgba(46,107,255,0.14);
--accent-glow:rgba(46,107,255,0.40);
--border:rgba(234,238,245,0.08); --border-hover:rgba(91,157,255,0.40);
--glass-bg:rgba(26,33,52,0.35); --glass-border:rgba(255,255,255,0.08); --glass-blur:10px;
```
Usage: blue = primary identity; green = terminal/secondary; purple = accents/gradients.
Gradient text: blue→green or blue→purple. Pure white reserved for the biggest type.
Fonts unchanged: Anton (display) + Geist (body) + Geist Mono (mono/terminal).

---

## 5. Lightweight Effect Set (replaces WebGL)

CSS-first primitives (port the good bits of portfolio_temp into v3's identity):
- **GlitchText** — RGB-split glitch on the hero name (CSS `::before/::after` + keyframes; accent = blue/green channels). Cheap.
- **TypingRoles** — terminal-style typing/deleting cycle of roles in mono green (`Developer`,
  `Creative Technologist`, `Platform Developer @ PwC`, …). setTimeout-driven, cheap.
- **GlassCard** — `--glass-bg` + backdrop-blur + border; used for IT-depth cards (limit blur count).
- **BlobGlows** — 2–3 fixed, blurred radial blobs (blue/green/purple) drifting slowly via CSS
  keyframes (`animate-blob`), low opacity, behind content. Atmospheric, near-free.
- **GradientText** — blue→green/purple clip-text for select words.
- **FadeInOnScroll** — IntersectionObserver adds `.is-visible`; CSS transitions opacity/translateY.
- **TelemetryLabel / mono motifs** — keep from v2 (cheap).
- **Marquee, ScanlineOverlay** — keep.

---

## 6. Section Plan

Spine (restyled + lightened, blended palette):
1. **Nav** — keep; blue active, mono links; add green/purple subtle hovers.
2. **Hero** — restyle: badge pill, glitch name "DEVIN VÖGELE", **typing roles** in green mono,
   subline, two CTAs (blue solid + ghost), social icons, scroll cue. Background = blob glows +
   radial + scanline (NO WebGL).
3. **Telemetry stats** — keep (cheap count-up).
4. **Marquee** — keep.
5. **01 — ON TRACK (Work)** — keep FormulaGod / GetMoneyMap / [CLASSIFIED]; restyle cards as glass,
   blended accents.
6. **02 — SPEC SHEET (Skills + Services)** — keep; add tri-accent.
7. **NEW — IT DEPTH** (pending real content):
   - **Daily Driver / Setup** (OS + tools) — alternating image/text + feature list (portfolio_temp pattern).
   - **Homelab / Self-hosting** (if user runs one) — glass cards of services/hardware.
   - **Automation / DevOps** — Docker/AWS/Python/BPMN/CI — terminal-styled.
   (Exact sections depend on user's answers; only build what's true.)
8. **03 — OFF TRACK (Hobbies)** — keep (Motorsport Media, Video Editing, Sim Racing, F1, GT3,
   Enduro MTB); lighten the drag-scroll (keep, it's cheap) or simple grid.
9. **Contact** — keep; email + socials; blended accents.
10. **Footer** — keep.

---

## 7. Stack After Rework

next@16 · react@19 · tailwind@3 · gsap (+@gsap/react, ScrollTrigger; drop Draggable/Inertia if
Off Track goes grid) · lenis · framer-motion (page/intro only) · geist · lucide-react.
**Removed:** three, @react-three/fiber, @react-three/drei, @types/three.

---

## 8. Pending (blocks IT-depth sections only)

User to provide real details for: Daily Driver/OS, Homelab/self-hosting (or none), Automation/DevOps,
extra IT facts + links. Foundation + spine rework proceed without it.

---

## 9. Verification

Per task: `npm run build` + `npx tsc --noEmit` clean. Then a browser perf/visual pass (desktop +
mobile), explicitly checking scroll smoothness (no per-frame WebGL), reduced-motion, no edge-band
bugs. Final code review → finish branch.
