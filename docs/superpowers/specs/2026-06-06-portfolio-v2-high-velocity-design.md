# Portfolio v2 — "High Velocity" Design Doc

**Date:** 2026-06-06
**Owner:** Devin Vögele
**Status:** Approved for planning
**Supersedes (visually):** v1 corporate-dark-luxury (kept on `redesign` branch)

---

## 1. Goal

Rebuild the portfolio as a motorsport-grade, cinematic, high-energy single-page experience —
an F1 driver's digital home crossed with an elite developer portfolio. Navy world, electric-blue
speed. Bold oversized type, telemetry/data motifs, velocity-driven motion, a launch-light intro.
A "special, unique web experience with many tweaks and animations" (Lando-Norris-grade energy).

**Hard principle — IT-focused first.** The site reads primarily as a serious **developer / IT
professional** portfolio (Platform Development @ PwC; real builds; real stack). Motorsport is the
*flavor and motion language*, never the substance. Racing lives mostly in OFF TRACK + the motion
vocabulary; the spine (Hero, ON TRACK, SPEC SHEET, Contact) is dev-credible.

References (study motion, build original): F1 driver brand sites (OFF+BRAND) for speed/WebGL/bold-
on-dark; lusion.co / active-theory for cinematic WebGL momentum; linear.app for underlying
precision so it stays premium not gimmicky.

---

## 2. Decisions Locked (brainstorming)

| Topic | Decision |
|---|---|
| Approach | Fresh visual rebuild on new **`v2`** branch (off `redesign`); reuse toolchain/config/deps; archive v1 sections to `components/_archive_v1/` |
| Display font | **Anton** (free, self-hosted woff2) — ultra-bold condensed racing-header impact |
| Body font | **Geist** (geist npm package) |
| Mono font | **Geist Mono** (geist/font/mono) — telemetry readouts, labels, garage numbers |
| Accent | Electric blue `#2E6BFF` on deep navy `#080B14` |
| Email | devin.voegele@microsun.ch |
| Off Track interests | All accurate: Motorsport Media · Video Editing · Sim Racing · Formula 1 · GT3 |
| GitHub / LinkedIn | https://github.com/devin-voegele/ · https://www.linkedin.com/in/devin-voegele-2a5989293 |
| Project visuals | Designed editorial "plates" (no stock/AI); swap real FormulaGod/GetMoneyMap shots later |

---

## 3. Stack

Reuse the installed toolchain: next@16 (App Router) · react@19 · typescript · tailwindcss@3 ·
clsx + tailwind-merge · gsap@3.15 (+@gsap/react) · lenis · framer-motion · three ·
@react-three/fiber@9 · @react-three/drei@10 · lucide-react.

**To add:** `gsap` Draggable + InertiaPlugin usage (already in gsap@3.13+, free — register in lib/gsap.ts).
Geist Mono via the existing `geist` package (`geist/font/mono`).

Setup rules (unchanged from v1, enforced): plugins registered once in `lib/gsap.ts`; Three via
`dynamic(ssr:false)`; Lenis provider on GSAP ticker; `'use client'` on motion/3D/browser components;
full cleanup on unmount; `useRef` not `querySelector`; `next/image` with sizes+priority; all
color/spacing/easing via CSS vars; `prefers-reduced-motion` gates every effect.

---

## 4. Performance Strategy (user's machine compiles slowly)

- Exactly **one** WebGL surface on the page (the hero velocity field); `dynamic(ssr:false)`,
  desktop-only, lazy.
- All Three/drei imports isolated to `components/3d/*` so section compiles stay light.
- Heavy GSAP plugins (Draggable/Inertia) imported only where used.
- WebGL field has a clean **static navy-gradient fallback** (mobile, reduced-motion, and a
  manual perf escape hatch).
- No second canvas, no per-section WebGL.

---

## 5. Design Tokens (`globals.css`)

```
--bg-primary:#080B14; --bg-secondary:#0C1120; --bg-surface:#111A2E; --navy-line:#1B2740;
--text-primary:#EAEEF5; --text-secondary:#8A95AD; --text-muted:#4C5878;
--accent:#2E6BFF; --accent-bright:#5B9DFF; --accent-subtle:rgba(46,107,255,0.14);
--accent-glow:rgba(46,107,255,0.45);
--border:rgba(234,238,245,0.08); --border-hover:rgba(91,157,255,0.40);
--ease-out-expo:cubic-bezier(0.16,1,0.3,1);
--ease-in-out:cubic-bezier(0.87,0,0.13,1);
--ease-spring:cubic-bezier(0.34,1.56,0.64,1);
--space-1..16: 8,16,24,32,48,64,96,128 (px);
--font-display:Anton; --font-body:Geist; --font-mono:Geist Mono;
```
Usage law: navy is the world; electric blue is the pop (accent lines, data readouts, hover, cursor,
glows, active nav, launch sequence). **Pure white (`--text-primary`) reserved for the biggest type
only.** Never let navy-on-navy go dull — blue must pop. Type: display tight tracking (-0.03em),
mono labels wide (0.2em, uppercase). `clamp()` all heading sizes.

Depth/screen-tech: faint animated **scanline/grid overlay** (very low opacity, fixed, pointer-none),
navy-line grid dividers, electric-blue glow behind key elements. Max 2–3 backdrop-filter elements.

---

## 6. File Structure

```
app/ layout.tsx · page.tsx · globals.css · fonts.ts
lib/ gsap.ts (register ScrollTrigger, SplitText, Draggable, InertiaPlugin) · motion.ts · utils.ts
components/
  providers/ SmoothScroll.tsx (velocity-aware) · LaunchSequence.tsx
  cursor/ TrailCursor.tsx
  3d/ VelocityField.tsx (dynamic, desktop-only)
  primitives/ MagneticButton.tsx · SplitReveal.tsx · TelemetryLabel.tsx · SectionWipe.tsx ·
              Counter.tsx · ProjectPlate.tsx · DataRow.tsx
  sections/ Nav.tsx · Hero.tsx · Telemetry.tsx · Marquee.tsx · OnTrack.tsx · SpecSheet.tsx ·
            OffTrack.tsx · Contact.tsx · Footer.tsx
  effects/ ScanlineOverlay.tsx · VelocitySkew.tsx
  _archive_v1/  (v1 sections/primitives, excluded from build)
public/ fonts/Anton-Regular.woff2 · noise.png
```

---

## 7. Sections (build order + content)

**00 — LaunchSequence** (`components/providers/LaunchSequence.tsx`)
Full-screen navy overlay (z-top). Five horizontal lights illuminate one-by-one in electric blue
across the top (F1 start-light sequence); Geist Mono counter ticks `INITIALIZING...` →
`// LIGHTS OUT`. On the 5th light → all cut → screen "launches": content rushes up with
motion-blur/speed-streak, hero reveals. **≤1.6s.** GSAP timeline. `localStorage` "launched" flag →
plays once; instant-skip (no overlay) on return visits. reduced-motion → instant reveal, no
sequence. Mobile → simplified (shorter, no heavy blur). Must not block scroll after exit.

**Nav** (fixed) — Left: `D.V.` monogram in 1px navy-line box. Center: mono links
`01 WORK // 02 SPEC // 03 OFF TRACK // CONTACT` (dot/slash separators), active = electric blue.
Right: pulsing electric-blue dot + mono `// SYSTEMS ONLINE`. Scroll>60px → frosted
(`backdrop-filter blur(12px)`, `bg rgba(8,11,20,0.7)`, navy-line bottom border). Link hover:
letter-spacing 0→0.05em + blue. Scroll tracked via ref/rAF, no querySelector.

**Hero** (`#top`, full viewport) — Mono eyebrow `WÜRENLOS, CH // 47.4373° N — 2026`. Massive Anton
display, three lines: `DEVELOPER.` / `CREATIVE` / `TECHNOLOGIST.` (SplitReveal, words streak up
w/ slight motion-blur + clipPath, stagger 0.07, power4.out, on mount after launch). Subline
`Building premium web experiences at race pace.` Buttons: `VIEW WORK →` (solid electric blue,
navy text, magnetic) + `GET IN TOUCH` (ghost blue border, magnetic). Mono scroll cue bottom
`SCROLL // 00`. Background: **VelocityField** WebGL (electric-blue streak/flow particles moving at
speed, reacting to cursor) behind content (z0); desktop-only, lazy; mobile → static navy radial
gradient. Vignette + blue glow.

**Telemetry stats bar** — horizontal dashboard strip, navy-line vertical dividers, mono labels,
electric-blue numbers that **count/spin up like a tachometer** on enter: `02+ YRS` · `PwC
SWITZERLAND` · `15+ BUILDS` · `∞ WORLDWIDE`. Counter primitive; static on reduced-motion. Mobile
→ 2×2.

**Marquee — at speed** — `NEXT.JS // THREE.JS // GSAP // TYPESCRIPT // SWISS MADE // FORMULAGOD //
AVAILABLE FOR WORK // 2026 //` fast continuous left scroll, seamless (duplicated track), pause on
hover, electric-blue `//` separators. CSS animation; off on reduced-motion.

**01 — ON TRACK** (`#work`) — Section label `01 — ON TRACK` (mono) with a **telemetry line that
draws in** (scaleX 0→1) + label types in (TelemetryLabel + SectionWipe gear-shift on enter).
Full-width alternating cinematic project cards; each shows mono index `// 01/02/03`:
- **FormulaGod** — WEB / MEDIA — 2024 — "Motorsport media & marketing platform." Stack: Next.js,
  Framer Motion, Tailwind. (no live URL → no "View Project" link)
- **GetMoneyMap** — WEB / FINTECH — 2025 — "Personal finance visualization platform. Interactive
  data mapping and budget tracking." https://getmoneymap.org. Stack: Next.js, TypeScript, Tailwind.
- **[CLASSIFIED]** — PLATFORM / SAAS — 2025 — "Under wraps. Details unreleased." Stack: TypeScript,
  Cloud, Docker. Redacted/locked aesthetic, intentional, NOT broken (lock + CLASSIFIED tag +
  redaction bars, mono `// ACCESS DENIED`).
Card entrance: stagger translateY(60) + slight rotateX for depth (scrollTrigger). Hover: plate
scales 1.05, electric-blue accent line **sweeps** across, mono `VIEW PROJECT →` slides in, subtle
image parallax (desktop). Redacted card: lifts but no click affordance.

**02 — SPEC SHEET** (`#spec`) — Label `02 — SPEC SHEET`. Styled like a car setup/spec sheet:
left-column mono labels, right-column values, thin navy-line rows, electric-blue value highlights
(flicker to blue on reveal). Services as 3 modules: `WEB EXPERIENCES` (Next.js · Three.js · GSAP ·
Full-stack) / `CREATIVE DEVELOPMENT` (Motion design · Interactive UI · WebGL) / `DIGITAL STRATEGY`
(Brand · Platform architecture · Performance). Skills setup-readout below: Next.js · TypeScript ·
React · GSAP · Three.js · Framer Motion · Tailwind CSS · Docker · AWS · Python · BPMN. Rows stagger
reveal. (DataRow primitive.)

**03 — OFF TRACK** (`#offtrack`) — Label `03 — OFF TRACK`. The personality/motorsport-soul section
(kept distinct from the IT spine). Interests as a **horizontal drag-scroll** of bold editorial
cards with momentum (GSAP Draggable + Inertia; native scroll fallback on touch), scale on hover:
Motorsport Media · Video Editing · Sim Racing · Formula 1 · GT3. A strong statement in big Anton:
`I build things that look as good as they work.` Short bio paragraph (dev/creative-technologist,
Switzerland, PwC platform development — IT-credible). Mono rows: `CURRENTLY // Platform Development
@ PwC Switzerland`, `EDUCATION // BZU Switzerland`, `BASE // Würenlos, CH (47.4373° N, 8.3614° E)`.

**Contact / CTA** (`#contact`, full-screen) — Massive Anton `READY TO RACE?` with secondary line
`LET'S BUILD SOMETHING.` Email `devin.voegele@microsun.ch` as heading-sized `mailto` link, electric-
blue underline **sweep** on hover. Mono `// SYSTEMS ONLINE — AVAILABLE FOR WORK`. GitHub + LinkedIn
lucide icons (inline-SVG fallback if lucide 1.x lacks brand icons), no labels, real URLs, aria-labels.
Blue glow + scanline.

**Footer** (1 row, mono) — Left `© 2026 DEVIN VÖGELE`. Right `BUILT WITH NEXT.JS // DESIGNED AT
RACE PACE`.

---

## 8. Shared Mechanics / Primitives

- **TrailCursor** — electric-blue lead dot (GSAP quickTo) + a few fading trail dots; expands to a
  ring on links; mix-blend where it reads. Optional mono coordinate readout following cursor on
  hero. Off on coarse-pointer / reduced-motion.
- **VelocitySkew** (`effects/`) — Lenis `velocity` → clamped GSAP `skewY` + slight blur (~≤6°) on a
  content wrapper on fast scroll; eases back to 0. Off on reduced-motion + mobile. Clamp hard to
  avoid nausea.
- **SectionWipe** — controlled electric-blue bar sweeping across on section-enter (the "gear shift";
  intentional bright line, tightly scoped so it's the effect not the bug). Off on reduced-motion.
- **SplitReveal** — words streak up, clipPath inset, motion-blur tint, stagger 0.07, power4.out;
  mount or scroll trigger; plain text on reduced-motion.
- **TelemetryLabel** — mono section label that "types in" + a telemetry line draws (scaleX 0→1).
- **Counter** — tachometer count-up (snap), static on reduced-motion.
- **MagneticButton** — pointer-offset translate ×0.3, elastic return; solid + ghost variants.
- **ProjectPlate** — designed navy panel, ghosted index, electric-blue geometry, redacted variant.
- **DataRow** — spec-sheet label/value row with navy-line rule + blue value highlight.
- **ScanlineOverlay** — fixed, very-low-opacity animated grid/scanline; pointer-none.

---

## 9. Animations — bold but governed

Launch sequence (signature) · hero streak reveal · velocity skew/blur (clamped) · gear-shift
section wipes · tachometer counters · telemetry line draws · project stagger+rotateX + accent
sweep + parallax · spec-row stagger w/ blue flicker · off-track drag-scroll w/ inertia · fast
marquee · trail cursor · magnetic buttons · animated scanline.
**Reduced-motion:** kill launch, skew, blur, trail, wipes → simple fades, static counters.
**Mobile <768px:** no WebGL (static gradient), no skew/blur/trail, reduced stagger, simplified
launch, native drag-scroll.

---

## 10. Out of Scope (YAGNI)

No blog, no bento grid, no skill progress bars, no sparse timeline, no AI chatbot/terminal, no
emoji, no Inter/Roboto/Poppins, no acid-lime/yellow-green (another brand's signature), no
checkered-flag/race-car clip-art, no second WebGL canvas, no stock/AI imagery, no launch replay
that annoys on every visit (localStorage skip).

---

## 11. Migration / Build Hygiene

1. Branch `v2` off `redesign` (done). Archive v1 sections/primitives to `components/_archive_v1/`;
   exclude from tsconfig + ensure not imported.
2. Add Anton woff2 to `public/fonts`; wire Geist + Geist Mono via geist package.
3. Register Draggable + InertiaPlugin in lib/gsap.ts.
4. `next build` + `tsc --noEmit` clean at each task (Turbopack skips types → always run tsc too).
5. Browser screenshot verification (desktop 1440 + mobile 390) after sections exist.

---

## 12. Open / TODO before launch

- Real FormulaGod + GetMoneyMap screenshots to replace designed plates (later, optional).
- Confirm getmoneymap.org is the live URL for the Work CTA.
- Anton woff2 placed in /public/fonts (downloaded during build).
