# Portfolio v2 Addendum — Volumetric Clouds, Preloader, Perf Pass, Enduro MTB

> Extends `2026-06-06-portfolio-v2-high-velocity.md`. Same branch `v2`. Same verification gate (build + tsc, then browser screenshot verify; commit per task).

**Context:** v2 is built and looks strong. User requests: (1) feature Enduro MTB, (2) a mind-blowing scroll-through volumetric cloud transition near the hero / between sections, (3) a preloader, (4) address perceived lag. User chose the heaviest cloud option + a preloader + perf pass — so clouds go cinematic but are perf-gated and degrade gracefully.

**Design constraints:**
- Clouds must be DARK navy with electric-blue rim/light — NOT white/bright (white washes out like the earlier additive-bloom bug and clashes with the navy luxury palette).
- Everything heavy is desktop-only, lazy (`ssr:false`), and FPS-gated. Mobile/reduced-motion/weak-GPU get clean fallbacks (no clouds, fewer particles, no skew).
- IT-focused content spine unchanged. Clouds are atmosphere/transition, not content.

---

### Task A1: Enduro MTB (DONE)
Added `{ title: 'Enduro MTB', sub: 'Trail & Descent' }` to OffTrack INTERESTS. Commit with the rest.

### Task A2: Perf foundation — `usePerfMode` hook
**File:** `lib/usePerfMode.ts` (or `components/providers/PerfProvider.tsx`).
- A hook/provider that returns a perf tier: `'full' | 'reduced' | 'off'`.
- Determine from: `prefers-reduced-motion` (→ off), `matchMedia('(min-width:768px)')` (mobile → reduced/off for WebGL), `navigator.hardwareConcurrency` (low cores → reduced), and a runtime FPS sample over the first ~1s (rAF frame-time average; if avg FPS < ~45 → downshift one tier).
- Expose via React context so VelocityField, CloudTransition, VelocitySkew read it. Default SSR-safe ('full' assumed, corrected after mount to avoid hydration mismatch — gate WebGL mounts on a mounted flag).
- Verify build + tsc. Commit `feat: perf-mode detector (fps/device aware)`.

### Task A3: Preloader (upgrade LaunchSequence → readiness gate)
**File:** `components/providers/LaunchSequence.tsx` (modify).
- Keep the F1 5-light intro. Make it a real readiness gate: do not fire "LIGHTS OUT"/reveal until BOTH (a) `document.fonts.ready` resolves AND (b) a minimum show time (~900ms) has passed AND (c) one rAF after mount (lets first paint/WebGL warm). Cap total wait (~3.5s safety timeout) so it never hangs.
- Add a subtle mono progress readout (e.g. `INITIALIZING // NN%` driven by a tween from 0→100, or tie the 5 lights to load milestones). Keep ≤ ~2s in the common case.
- Keep localStorage `dv_launched` skip for repeat visits (instant), and reduced-motion → instant. Keep pointer-events none + full unmount.
- Verify build + tsc + browser (first visit shows loader then reveals; reload skips). Commit `feat: readiness-gated preloader (launch intro)`.

### Task A4: Volumetric cloud transition (the showpiece)
**Files:** `components/3d/CloudTransition.tsx` (new), `app/page.tsx` (place between Hero and OnTrack), maybe `components/sections/CloudGate.tsx` wrapper for the pinned scroll section.
- A scroll-pinned full-viewport section between Hero and On Track. R3F `<Canvas>` (ssr:false, lazy) with drei `<Clouds>` + several `<Cloud>` instances forming a volume the camera flies through.
- Clouds: dark navy base (`color` ~ `#0C1120`/`#111A2E`) with electric-blue light (a `directionalLight`/`pointLight` in `#2E6BFF`/`#5B9DFF` giving blue rim). Moody, NOT white. Opacity/segments tuned so it reads as atmospheric fog, never a bright wash.
- Scroll drives camera Z through the cloud volume (GSAP ScrollTrigger pinned over ~150–200% scroll, scrub): hero side → into the cloud (densest) → out the other side revealing On Track. A mono caption can fade through (e.g. `// ENTERING SECTOR 02`).
- Gated by `usePerfMode`: `off`/mobile → render a lightweight CSS fallback (a navy gradient + soft mist band, no WebGL) so the section transition still feels intentional; `reduced` → fewer cloud segments.
- Cleanup: R3F auto-disposes; kill the ScrollTrigger on unmount.
- VERIFY VISUALLY (screenshots at multiple scroll positions) and TUNE color/density/camera so it's cinematic and dark, not washed out. Iterate.
- Commit `feat: scroll-through volumetric cloud transition`.

### Task A5: Perf pass wiring
- VelocityField: read `usePerfMode` — `full`=600 particles, `reduced`=300, `off`=not mounted (Hero already gates desktop/reduced-motion; add tier).
- VelocitySkew: disable when tier !== 'full'.
- CloudTransition: per A4 gating.
- Optionally lower drei Cloud `segments` on `reduced`.
- Verify build + tsc + a scroll-through screenshot pass. Commit `perf: gate heavy effects by perf tier`.

### Task A6: Verify + final review + finish
- Full browser pass desktop 1440 (launch→hero→clouds→work→…→contact) + mobile 390 (no WebGL, clean fallbacks, no edge bands). Fix issues.
- `npm run build` + `npx tsc --noEmit` exit 0; `npm audit` note.
- Final code review (superpowers:requesting-code-review). Then finishing-a-development-branch (merge/PR options).
