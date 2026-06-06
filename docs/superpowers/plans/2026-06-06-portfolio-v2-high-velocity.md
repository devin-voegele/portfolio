# Portfolio v2 "High Velocity" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build the motorsport-grade, navy + electric-blue, high-energy v2 portfolio per the approved design doc.

**Architecture:** Next 16 / React 19. One scroll-truth (Lenis → gsap.ticker, velocity-aware). Each element animated by exactly one library: GSAP for reveals/skew/wipes/cursor/counters/drag, Framer/GSAP for the launch intro, one Three.js (R3F) velocity field in the hero. IT-focused content spine; motorsport is flavor + motion language. All values via CSS vars. v1 archived, not deleted.

**Tech Stack:** next@16, react@19, typescript, tailwind, gsap@3.15 (+@gsap/react, Draggable, InertiaPlugin), lenis, framer-motion, three + @react-three/fiber@9 + drei@10, geist (Sans+Mono), Anton (local), lucide-react.

**Verification gate (every task):** `npm run build` exit 0 AND `npx tsc --noEmit` exit 0 (Turbopack skips types — always run tsc). Then commit. Visual browser pass after Phase C.

**Hard principle:** IT/developer-focused first; racing is flavor. No emoji, no Inter/Roboto/Poppins, no acid-lime, no clip-art motorsport. CSS vars only. prefers-reduced-motion + mobile fallbacks on every effect. Cleanup on unmount.

**Reference:** `docs/superpowers/specs/2026-06-06-portfolio-v2-high-velocity-design.md`

---

## Phase A — Foundation

### Task 1: Archive v1, reset shell
**Files:** move `components/*` → `components/_archive_v1/`; reset `app/page.tsx`, `app/layout.tsx`; `tsconfig.json`.
- [ ] Move every file/dir under `components/` (including existing `_archive`) into `components/_archive_v1/` via `git mv`. Keep `lib/` untouched.
- [ ] Reset `app/page.tsx` to `export default function Home(){ return <main className="min-h-screen bg-[var(--bg-primary)]" /> }`.
- [ ] Strip all `@/components/...` imports from `app/layout.tsx`; keep metadata + globals.css import + `<html><body>{children}</body></html>` + existing font wiring (will be replaced in Task 2).
- [ ] Add `"components/_archive_v1"` to tsconfig `exclude` (replace the old `components/_archive` entry).
- [ ] Verify `npm run build` + `npx tsc --noEmit` exit 0. Commit `chore: archive v1, reset shell for v2`.

### Task 2: Navy tokens + Anton/Geist/Geist Mono + scanline base
**Files:** `public/fonts/Anton-Regular.woff2`, `app/fonts.ts`, `app/globals.css`, `app/layout.tsx`, `tailwind.config.ts`.
- [ ] Download Anton woff2 (Google Fonts / Fontsource `@fontsource/anton` files, or fetch from gstatic) into `public/fonts/Anton-Regular.woff2`. If download fails, report BLOCKED on the font only but still wire everything so dropping the file works.
- [ ] `app/fonts.ts`: Anton via `next/font/local` (variable `--font-display`, weight 400, display swap); `GeistSans` (`--font-geist-sans`) and `GeistMono` (`--font-geist-mono`) from `geist/font/*`.
- [ ] `app/layout.tsx`: put `${anton.variable} ${geistSans.variable} ${geistMono.variable}` on `<html>`; remove old Space_Grotesk.
- [ ] `app/globals.css`: replace `:root` with the v2 token block (design §5), set `--font-body: var(--font-geist-sans)`, `--font-mono: var(--font-geist-mono)`, `--font-display: 'Anton'`-backed via the local var. Base reset, `body` bg/text/font, `.font-display`/`.font-mono` utilities, `h1 clamp(3rem,9vw,10rem)/0.9/-0.03em`, `h2 clamp(2rem,6vw,6rem)/0.95/-0.03em`, grain `body::after` (noise.png — generate 128×128), reduced-motion media block, `overflow-x:hidden` on body.
- [ ] `tailwind.config.ts`: map `background:var(--bg-primary)`, `foreground:var(--text-primary)`, `accent:var(--accent)`, `surface:var(--bg-surface)`. Keep content globs (`./app`, `./components`).
- [ ] Verify build + tsc. Commit `feat: v2 navy tokens + Anton/Geist/Geist Mono + base`.

### Task 3: Extend lib/gsap + velocity-aware SmoothScroll
**Files:** `lib/gsap.ts`, `components/providers/SmoothScroll.tsx`, `app/layout.tsx`.
- [ ] `lib/gsap.ts`: register `ScrollTrigger, SplitText, Draggable, InertiaPlugin` (all in window guard). Export them + gsap.
- [ ] `components/providers/SmoothScroll.tsx` (`'use client'`): Lenis (duration ~1.1, slightly punchy easing) → `gsap.ticker`, `ScrollTrigger.update` on scroll; ALSO expose current velocity via a module-level ref or a custom event so VelocitySkew (Task 5) can read it — simplest: store `lenis` on a ref and dispatch `lenis.on('scroll', e => { window.__lenisVelocity = e.velocity })` (typed via a small d.ts or `(window as any)`). No-op under reduced-motion. Full cleanup.
- [ ] Wrap layout `{children}` in `<SmoothScroll>`. Verify build + tsc. Commit `feat: gsap plugins + velocity-aware lenis provider`.

---

## Phase B — Primitives & Effects

### Task 4: Core motion primitives
**Files:** `lib/motion.ts` (prefersReducedMotion helper), `components/primitives/{MagneticButton,SplitReveal,TelemetryLabel,Counter,DataRow}.tsx`.
- [ ] `lib/motion.ts`: `prefersReducedMotion()` guard (typeof window).
- [ ] **MagneticButton** (`'use client'`): props `{children, href?, variant:'solid'|'ghost', onClick?, className?}`. `<a>`/`<button>`; magnet translate ×0.3 (gsap.to dur .4 power2.out), elastic return; skip magnet on reduced-motion. solid = `bg var(--accent)` navy text; ghost = transparent + `1px solid var(--accent)` blue text; both pill, mono-ish uppercase 0.05em, hover brighten to `--accent-bright`/glow.
- [ ] **SplitReveal** (`'use client'`): props `{children:string, as, trigger:'mount'|'scroll', className?}`. useGSAP + SplitText words: from `{yPercent:120, opacity:0, filter:'blur(8px)'}` → natural, stagger 0.07, dur 0.9, power4.out (the "streak"); scroll variant adds scrollTrigger start 'top 80%'. revert on cleanup. reduced-motion → plain text.
- [ ] **TelemetryLabel** (`'use client'`): mono uppercase label (e.g. `01 — ON TRACK`) + a telemetry line (`<span>` 1px `--accent`) that draws `scaleX 0→1` (transform-origin left) on scroll enter; label chars "type in" (stagger opacity). reduced-motion → static. Props `{children, className?}`.
- [ ] **Counter** (`'use client'`): props `{to:number, suffix?:string, prefix?:string, className?}`. Tachometer count-up via gsap snap on scroll enter (start 'top 85%'); static `to` on reduced-motion. Handles `∞` by rendering the literal when `to` is non-finite/special (pass a `display` override prop for `∞`/`PwC` non-numeric cells → if not numeric, just render text, no count).
- [ ] **DataRow** (`'use client'` or server): props `{label, value, highlight?}`. Spec-sheet row: mono label left (`--text-muted`), value right (`--text-primary`, or `--accent` if highlight), `border-top:1px solid var(--navy-line)`, padding-block, flex space-between.
- [ ] Verify build + tsc. Commit `feat: v2 motion primitives`.

### Task 5: Effects — SectionWipe, VelocitySkew, ScanlineOverlay
**Files:** `components/effects/{SectionWipe,VelocitySkew,ScanlineOverlay}.tsx`.
- [ ] **ScanlineOverlay** (`'use client'` or pure CSS): fixed inset-0, pointer-none, z just under cursor (~9990). Very low-opacity repeating linear-gradient grid/scanlines (`--navy-line` lines at ~3% opacity), subtle slow vertical drift animation. Off/static on reduced-motion. Mount in layout.
- [ ] **SectionWipe** (`'use client'`): wraps a section; on enter (scrollTrigger start 'top 70%') an absolutely-positioned electric-blue bar sweeps left→right across the top edge then fades (the "gear shift"). Tightly contained (overflow hidden on the wipe wrapper) so it's the effect not a stray line. Props `{children, className?}`. reduced-motion → no wipe (render children only).
- [ ] **VelocitySkew** (`'use client'`): wraps page content; reads `window.__lenisVelocity` each rAF (or subscribes), maps to clamped `skewY` (±~6deg max) + tiny blur on fast scroll, eases back to 0 when velocity low. Use a single gsap.quickSetter on the wrapper. Off on reduced-motion + mobile (`matchMedia min-width:768px`). Clamp hard; must never nauseate. Cleanup rAF.
- [ ] Verify build + tsc. Commit `feat: v2 effects (wipe, velocity skew, scanline)`.

### Task 6: TrailCursor
**Files:** `components/cursor/TrailCursor.tsx`, `app/layout.tsx`.
- [ ] `'use client'`. Electric-blue lead dot (10px, `--accent`) via gsap.quickTo (dur .4 power3.out) + N≈5 trail dots that follow with increasing lag & fading opacity/scale (chain quickTo or lerp each toward the previous). On hovering `a,button,[data-cursor]`: lead expands to a ~36px ring (border `--accent`, transparent fill). mix-blend where it reads. Disable on `(pointer:coarse)` + reduced-motion. Cleanup listeners + rAF. Mount in layout after children.
- [ ] Verify build + tsc. Commit `feat: trailing electric-blue cursor`.

---

## Phase C — Sections (each its own commit; verify desktop 1440 + mobile 390)

> All in `components/sections/`, `'use client'` where GSAP/refs used, tokens via `[var(--…)]`, added to `app/page.tsx` in order.

### Task 7: Nav
**Files:** `components/sections/Nav.tsx`, `app/page.tsx`.
- [ ] Fixed bar. Left `D.V.` in 1px navy-line box. Center mono links `01 WORK` `02 SPEC` `03 OFF TRACK` `CONTACT` (anchors `#work/#spec/#offtrack/#contact`) with `//` separators, hover → `--accent` + letter-spacing 0→0.05em. Right pulsing `--accent` dot + mono `// SYSTEMS ONLINE`. Scroll>60px frosted (blur 12, `bg rgba(8,11,20,0.7)`, navy-line bottom border) via rAF scroll ref. Mobile: hide center links. Mount in page. Verify. Commit `feat: nav`.

### Task 8: Hero (static; WebGL container placeholder)
**Files:** `components/sections/Hero.tsx`.
- [ ] `#top` full-viewport. Mono eyebrow `WÜRENLOS, CH // 47.4373° N — 2026` (TelemetryLabel ok). Anton h1 three lines via SplitReveal mount: `DEVELOPER.`/`CREATIVE`/`TECHNOLOGIST.` Subline `Building premium web experiences at race pace.` MagneticButtons `VIEW WORK →` (solid, #work) + `GET IN TOUCH` (ghost, #contact). Mono scroll cue bottom `SCROLL // 00`. Empty `#hero-webgl` absolute container (z0) for Task 16. Static navy radial gradient + blue glow + vignette as the fallback bg now. Content z2. Mount in page. Verify (headline streak on load). Commit `feat: hero (static)`.

### Task 9: Telemetry stats bar
**Files:** `components/sections/Telemetry.tsx`.
- [ ] Dashboard strip, navy-line vertical dividers, mono labels, electric-blue values using Counter: `02+ YRS` (Counter to 2 suffix '+'), `PwC SWITZERLAND` (text), `15+ BUILDS` (Counter to 15 suffix '+'), `∞ WORLDWIDE` (display '∞'). border-top/bottom navy-line. Stagger fade-up on enter. Mobile 2×2. Mount. Verify. Commit `feat: telemetry stats bar`.

### Task 10: Marquee at speed
**Files:** `components/sections/Marquee.tsx`.
- [ ] Duplicated track, fast (~20s) linear infinite, pause on hover, `//` separators in `--accent`. Content: `NEXT.JS // THREE.JS // GSAP // TYPESCRIPT // SWISS MADE // FORMULAGOD // AVAILABLE FOR WORK // 2026 //` (×2). Anton or mono, large, `--text-muted`. CSS keyframes in globals (prefix `mq-`), off on reduced-motion. Mount. Verify. Commit `feat: marquee at speed`.

### Task 11: ProjectPlate + OnTrack
**Files:** `components/primitives/ProjectPlate.tsx`, `components/sections/OnTrack.tsx`.
- [ ] **ProjectPlate**: navy `--bg-surface` panel, 1px navy-line, radius 16, aspect ~4/3. Ghosted huge index/initial (`rgba(234,238,245,0.04)`), electric-blue thin geometry line/arc, mono name label corner. `redacted` variant: blurred content + redaction bars (`--bg-primary`) + lucide `Lock` + `CLASSIFIED` pill + mono `// ACCESS DENIED`; cursor default, intentional not broken. Props `{index, name, redacted?}`.
- [ ] **OnTrack** (`#work`): wrap in SectionWipe. TelemetryLabel `01 — ON TRACK`. Three alternating full-width rows (grid 1fr/1fr, reversed on odd; single-col mobile, plate top). Each: mono `// 0N` index, ProjectPlate + text (Anton name clamp(2rem,4vw,3.5rem); mono category+year; description `--text-secondary`; stack chips navy-line border; `VIEW PROJECT →` link only if href). Data: FormulaGod (no href), GetMoneyMap (https://getmoneymap.org), [CLASSIFIED] (redacted). Entrance stagger translateY(60)+rotateX(6deg→0) scrollTrigger. Hover: plate scale 1.05, blue accent line sweeps, `VIEW PROJECT →` slides in, image parallax (desktop, ≤ small yPercent). z-index care (no stray lines). Mount. Verify. Commit `feat: on track (selected work)`.

### Task 12: SpecSheet
**Files:** `components/sections/SpecSheet.tsx` (uses DataRow).
- [ ] `#spec`, wrap in SectionWipe. TelemetryLabel `02 — SPEC SHEET`. Setup-sheet layout: 3 service modules as grouped blocks — `WEB EXPERIENCES` (Next.js · Three.js · GSAP · Full-stack), `CREATIVE DEVELOPMENT` (Motion design · Interactive UI · WebGL), `DIGITAL STRATEGY` (Brand · Platform architecture · Performance) — each a header + DataRows or a mono module card (navy-line border, hover border→`--border-hover`, title slide-up). Below: skills as a spec readout (DataRow-style or mono chip row): Next.js · TypeScript · React · GSAP · Three.js · Framer Motion · Tailwind CSS · Docker · AWS · Python · BPMN. Rows stagger reveal, values flicker to `--accent`. Mount. Verify. Commit `feat: spec sheet (services + skills)`.

### Task 13: OffTrack (drag-scroll)
**Files:** `components/sections/OffTrack.tsx`.
- [ ] `#offtrack`, wrap in SectionWipe. TelemetryLabel `03 — OFF TRACK`. Horizontal **drag-scroll** of bold editorial interest cards with momentum via GSAP Draggable + InertiaPlugin (type 'x', bounds to track width, inertia) — native horizontal scroll/snap fallback on touch + reduced-motion. Cards: Motorsport Media · Video Editing · Sim Racing · Formula 1 · GT3 (Anton title, mono tag, navy panel, scale on hover). Big Anton statement `I build things that look as good as they work.` Short IT-credible bio paragraph (developer & creative technologist, Switzerland, platform development @ PwC). Mono rows: `CURRENTLY // Platform Development @ PwC Switzerland`, `EDUCATION // BZU Switzerland`, `BASE // Würenlos, CH (47.4373° N, 8.3614° E)`. Mount. Verify drag works + fallback. Commit `feat: off track`.

### Task 14: Contact + Footer
**Files:** `components/sections/Contact.tsx`, `components/sections/Footer.tsx`.
- [ ] **Contact** (`#contact`): full-screen, blue glow + scanline. Anton `READY TO RACE?` (SplitReveal scroll) + secondary `LET'S BUILD SOMETHING.` Email `mailto:devin.voegele@microsun.ch` heading-sized link with electric-blue underline sweep on hover. Mono `// SYSTEMS ONLINE — AVAILABLE FOR WORK`. GitHub (https://github.com/devin-voegele/) + LinkedIn (https://www.linkedin.com/in/devin-voegele-2a5989293) icons (lucide `Github`/`Linkedin`; if lucide 1.x lacks them use inline SVG), no labels, target _blank rel noopener, aria-labels.
- [ ] **Footer** (server): 1 mono row — left `© 2026 DEVIN VÖGELE`, right `BUILT WITH NEXT.JS // DESIGNED AT RACE PACE`. border-top navy-line.
- [ ] Mount both (Footer after `</main>`). Verify links resolve (no `#` dead links). Commit `feat: contact + footer`.

---

## Phase D — Signature, 3D, Polish

### Task 15: LaunchSequence
**Files:** `components/providers/LaunchSequence.tsx`, `app/layout.tsx`.
- [ ] `'use client'`. Full-screen navy overlay (z 10000). GSAP timeline: 5 horizontal lights illuminate one-by-one in `--accent` across the top; mono counter `INITIALIZING...` → `// LIGHTS OUT`; on 5th → cut → overlay launches up with speed-streak/motion-blur, unmount. ≤1.6s. `localStorage('dv_launched')` → if set, render nothing (instant); else play then set flag. reduced-motion → render nothing. Mobile → simplified/shorter. `pointer-events:none` during exit; must not block scroll/clicks after. Mount as FIRST child in `<body>`. Verify (plays once; reload → skipped; clear localStorage → plays). Commit `feat: launch-light intro sequence`.

### Task 16: VelocityField (WebGL hero)
**Files:** `components/3d/VelocityField.tsx`, `components/sections/Hero.tsx`.
- [ ] `'use client'` R3F `<Canvas alpha>` of electric-blue streak/flow particles (≈600) moving at speed along one axis (tunnel/stream feel), subtle cursor reactivity (parallax toward pointer). Circular/streak points (PointMaterial round, or stretched along motion). Colors `--accent`/`--accent-bright` range, opacity ≤0.7, additive-ish glow. `useFrame` drift; dispose on unmount (R3F auto). Returns null on mobile/reduced-motion.
- [ ] Hero: `const VelocityField = dynamic(()=>import('@/components/3d/VelocityField'),{ssr:false})`; render inside `#hero-webgl` only when `min-width:768px && !reduced-motion` (state+useEffect). Keep static gradient as fallback behind it. pointer-events none. Verify desktop renders, mobile static, no console errors. Commit `feat: hero webgl velocity field`.

### Task 17: VelocitySkew wire-up, metadata, polish, final verify
**Files:** `app/page.tsx` (wrap content in VelocitySkew), `app/layout.tsx` (metadata/viewport), `app/sitemap.ts`, browser pass.
- [ ] Wrap the page content (sections, not nav/cursor/overlays) in `<VelocitySkew>` so fast-scroll skew applies; confirm it doesn't break sticky/fixed elements (nav must stay unaffected — keep nav outside the skewed wrapper).
- [ ] Metadata: title `Devin Vögele — Developer & Creative Technologist`, description (dev/creative-technologist, Switzerland, premium web + motorsport media), openGraph, `export const viewport = { themeColor:'#080B14' }`. sitemap → `/`.
- [ ] Browser pass desktop 1440 + mobile 390: launch plays once; hero streak; counters; section wipes (no stray-line bug); on-track hover/parallax; spec sheet; off-track drag; contact links; velocity skew tasteful + clamped; reduced-motion path static; no horizontal scroll. Fix any issues found.
- [ ] `npm run build` + `npx tsc --noEmit` exit 0; `npm audit` note. Commit `feat: velocity skew wire-up, metadata, v2 polish`.
- [ ] Final code review (superpowers:requesting-code-review) → then finishing-a-development-branch.

---

## Self-Review Notes
- Spec coverage: launch §7→T15; hero+webgl→T8,16; telemetry→T9; marquee→T10; on track→T11; spec sheet→T12; off track→T13; contact/footer→T14; tokens/fonts→T2; gsap/lenis/velocity→T3,5,17; primitives→T4; effects→T5; cursor→T6; nav→T7.
- Naming consistent: SmoothScroll, LaunchSequence, TrailCursor, VelocityField, VelocitySkew, SectionWipe, ScanlineOverlay, TelemetryLabel, Counter, DataRow, ProjectPlate, MagneticButton, SplitReveal.
- Manual deps: Anton woff2 (T2), noise.png (T2).
- IT-focus principle enforced in content tasks (T8,11,12,13).
