import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Docs bodies, keyed by slug (see lib/docs.ts for the nav/order).
 * Rendered inside a .prose-dv wrapper, so these are plain semantic blocks.
 */

const Overview = (
  <>
    <p>
      This is the engineering documentation for <strong>voegele.dev</strong> — the site you are
      reading from, and the projects behind it. It is written from the inside: how things are
      actually built, why the decisions were made, and where the interesting trade-offs live.
    </p>
    <p>It is split into two parts:</p>
    <ul>
      <li>
        <strong>The Site</strong> — a handbook for this portfolio as an engineering artifact:
        architecture, the performance model, the liquid-glass system, the interactive canvas
        pieces, motion, and SEO.
      </li>
      <li>
        <strong>Projects</strong> — reference notes on the things I have built: FormulaGod,
        GetMoneyMap, and the planned homelab.
      </li>
    </ul>

    <h2>The one principle</h2>
    <p>
      Everything here obeys a single rule: <strong>nothing animates while nothing is happening</strong>.
      Every effect on this site is interaction- or scroll-driven, and the expensive ones physically
      stop — they cancel their own animation frame — the moment they settle. No perpetual loops, no
      battery tax for reading a page. If you take one idea away from these docs, that is the one.
    </p>

    <h2>Narrative vs reference</h2>
    <p>
      These docs are reference material. The story-shaped version — debugging tales, build write-ups —
      lives in <Link href="/blog">Writing</Link>. Where a post goes deeper on something here, it is
      linked inline.
    </p>
  </>
)

const Architecture = (
  <>
    <p>
      voegele.dev is a single <strong>Next.js 16</strong> application (App Router, Turbopack) on{' '}
      <strong>React 19</strong> and <strong>TypeScript</strong>, styled with Tailwind plus a layer of
      hand-written CSS variables. It deploys statically to Vercel from <code>main</code>.
    </p>

    <h2>Routes</h2>
    <ul>
      <li><code>/</code> — the home page: hero, then the content sections, the playground, and contact</li>
      <li><code>/lab</code> — Signal Pit, the physics sandbox (Experiment 01)</li>
      <li><code>/blog</code> and <code>/blog/[post]</code> — writing, one static route per post</li>
      <li><code>/work/[project]</code> — project case studies</li>
      <li><code>/docs</code> — this documentation, also served at docs.voegele.dev</li>
    </ul>

    <h2>Rendering</h2>
    <p>
      Almost everything is statically prerendered — the home page, blog, case studies and lab are
      all static HTML. The docs are the one exception: they read the request host to serve clean URLs
      on the subdomain and set per-host canonicals, which makes them dynamic. That is a deliberate,
      contained trade-off; see <em>SEO &amp; Metadata</em>.
    </p>

    <h2>Layout of the code</h2>
    <pre><code>{`components/
├── sections/     # Home page sections: Hero, About, Skills,
│                 # CloudDevOps, Homelab, Projects, LabSection,
│                 # Hobbies, Contact, Nav, Footer
├── effects/      # SignalGrid, Aurora, MountainBackdrop, ScrollProgress
├── primitives/   # GlareField, LiveTerminal, Magnetic, FadeIn…
├── lab/          # SignalPit (three + rapier, fully self-contained)
├── blog/ work/   # PostLayout, CaseStudy shells
├── docs/         # this section's shell + content
└── providers/    # PerfProvider (tiering), SmoothScroll (Lenis)

lib/              # gsap registration, posts + docs registries`}</code></pre>
    <p>
      The two providers wrap the whole app in <code>app/layout.tsx</code>:{' '}
      <strong>PerfProvider</strong> decides how much the machine can handle, and{' '}
      <strong>SmoothScroll</strong> wires up Lenis. Both are covered in their own pages.
    </p>
  </>
)

const Performance = (
  <>
    <p>
      Performance is a hard constraint on this site, not an afterthought — it has to feel instant on a
      modest Windows laptop. Two mechanisms enforce that: a hardware <strong>tiering</strong> system,
      and a <strong>sleep-when-idle</strong> discipline that every animated surface follows.
    </p>

    <h2>Tiering: PerfProvider</h2>
    <p>
      On load, <code>PerfProvider</code> benchmarks the machine — a short frame-rate sample plus a
      core-count check — and assigns one of three tiers, which it mirrors onto the document element so
      CSS can react to it:
    </p>
    <pre><code>{`type PerfTier = 'full' | 'reduced' | 'off'

// prefers-reduced-motion        → 'off'
// coarse pointer / < 768px       → 'reduced'
// low FPS sample or ≤ 4 cores    → 'reduced'
// otherwise                      → 'full'

document.documentElement.dataset.perf = tier  // <html data-perf="full">`}</code></pre>
    <p>What each tier buys:</p>
    <ul>
      <li><strong>full</strong> — real backdrop-filter glass, denser canvas effects, shadows in the physics pit</li>
      <li><strong>reduced</strong> — solid glassy fallbacks, fewer particles/bodies, the homepage pit becomes a static teaser</li>
      <li><strong>off</strong> — static renders, content always visible, no autoplay motion at all</li>
    </ul>

    <h2>Sleeping</h2>
    <p>
      The expensive pieces — the hero <em>Signal Grid</em> and the <em>Signal Pit</em> — run a
      requestAnimationFrame loop only while something is moving. When the field settles and the
      pointer goes idle, the loop does not schedule another frame; it returns:
    </p>
    <pre><code>{`if (settled && pointerIdle) {
  running = false
  return            // no rAF scheduled — back to 0% CPU
}
raf = requestAnimationFrame(loop)`}</code></pre>
    <p>
      Any pointer movement or interaction calls <code>wake()</code> to start it again. The same idea
      hard-pauses on tab-hide and when a canvas scrolls out of view. The result: the page is visually
      rich but does no work when you are just reading it.
    </p>
  </>
)

const LiquidGlass = (
  <>
    <p>
      The card surfaces across the site are real translucent glass: a tinted background, a gradient{' '}
      <strong>specular rim</strong>, and a shine that tracks the cursor. The system is three pieces —
      a CSS class, a tier-gated blur, and a shared pointer tracker.
    </p>

    <h2>The .lq surface</h2>
    <p>
      <code>.lq</code> sets the translucent background and an inset highlight; a masked{' '}
      <code>::before</code> paints the 1px gradient rim that gives the edge its lit-from-above look:
    </p>
    <pre><code>{`.lq::before {
  content: '';
  position: absolute; inset: 0;
  padding: 1px; border-radius: inherit;
  background: linear-gradient(160deg,
    rgba(255,255,255,0.26), rgba(118,160,255,0.10), rgba(255,255,255,0.12));
  -webkit-mask: linear-gradient(#000 0 0) content-box,
                linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;          /* show only the 1px frame */
  pointer-events: none;
}`}</code></pre>

    <h2>The blur is applied in JS, on purpose</h2>
    <p>
      The actual <code>backdrop-filter</code> blur ships only on <code>data-perf="full"</code> — but
      it is set as an inline style from <code>PerfProvider</code>, not in the stylesheet. That is
      because Turbopack&apos;s CSS pipeline (Lightning CSS) was stripping the declaration out of the
      compiled stylesheet entirely. Inline styles cannot be stripped, and gating in JS means weak
      machines skip the cost. The full debugging story is in{' '}
      <Link href="/blog/turbopack-ate-my-backdrop-filter">this post</Link>.
    </p>

    <h2>GlareField</h2>
    <p>
      <code>GlareField</code> wraps a group of cards and attaches a single <code>pointermove</code>{' '}
      listener. It writes the pointer position into CSS custom properties on every{' '}
      <code>.lq-glare</code> child, so one light source slides across a whole group of cards as if they
      were a single sheet of glass:
    </p>
    <pre><code>{`// per card, in local coordinates:
el.style.setProperty('--gx', px - rect.left + 'px')
el.style.setProperty('--gy', py - rect.top + 'px')
el.style.setProperty('--glow', '1')   // 0 on pointer-leave`}</code></pre>
    <p>
      Card rectangles are re-collected on scroll so the shine stays aligned, and the whole thing is
      inert until the pointer enters — no idle cost, fine pointers only.
    </p>
  </>
)

const SignalGrid = (
  <>
    <p>
      The hero sits on a field of dots rendered to a 2D canvas. The dots behave like a liquid surface:
      the cursor pushes them aside and lights them up, a click sends a shockwave through the field,
      and an intro ripple fires as the page settles in.
    </p>

    <h2>How it moves</h2>
    <p>
      Each dot has a rest position, an offset, a velocity and an energy value, all held in flat typed
      arrays. Every frame applies forces, then a spring pulls each dot back toward rest while its light
      energy decays:
    </p>
    <ul>
      <li><strong>Pointer</strong> — dots within a radius get a radial push and a brightness boost</li>
      <li><strong>Bursts</strong> — a click (or the intro) spawns an expanding ring that hits dots as it passes</li>
      <li><strong>Spring + decay</strong> — offsets ease back to zero, energy fades, colour ramps blue → cyan → violet</li>
    </ul>

    <h2>And how it stops</h2>
    <p>
      The loop accumulates total activity each frame. Once that falls below a threshold with no recent
      pointer and no live bursts, it snaps everything to rest, paints one clean frame, and cancels
      itself. It is perf-tiered (dot spacing and pixel ratio scale with the tier) and renders a single
      static constellation under reduced motion — no listeners, no loop.
    </p>
  </>
)

const SignalPit = (
  <>
    <p>
      <Link href="/lab">Signal Pit</Link> is the hero&apos;s dot-field taken into 3D and given mass:
      around 130 instanced spheres and cubes in a caged arena, with real rigid-body physics. The
      cursor is a force field, a click is a shockwave, and gravity is a button.
    </p>

    <h2>Stack</h2>
    <p>
      <strong>Three.js</strong> renders, <strong>Rapier</strong> (a Rust physics engine compiled to
      WASM) simulates. Both are imported dynamically inside the component, so the ~1.5 MB chunk loads
      only on <code>/lab</code> or when the homepage embed nears the viewport — never up front.
    </p>

    <h2>Two draw calls</h2>
    <p>
      All the bodies are drawn with two <code>InstancedMesh</code>es (one sphere, one cube). Each
      frame copies every body&apos;s transform from Rapier into the instance matrix, so 130 bodies cost
      two draw calls, not 130.
    </p>

    <h2>It sleeps</h2>
    <p>
      Rapier sleeps individual bodies when they stop; the pit extends that to the whole system. When
      every body reports <code>isSleeping()</code> and the pointer is idle, the render loop cancels
      itself and a HUD chip flips from <code>LIVE</code> to <code>IDLE</code>. It also hard-pauses
      off-screen and on tab-hide.
    </p>

    <h2>Mobile</h2>
    <p>
      Two fixes made it phone-friendly: the camera fits itself to the viewport aspect so portrait
      screens see the whole arena, and <code>touch-action: pan-y</code> lets vertical swipes scroll the
      page while horizontal drags and taps drive the physics. The homepage embed only mounts the live
      pit on capable machines; everyone else gets a CSS teaser linking here. Full write-up in{' '}
      <Link href="/blog/signal-pit">the post</Link>.
    </p>
  </>
)

const Motion = (
  <>
    <p>
      Motion on the site is driven by <strong>GSAP</strong> (with ScrollTrigger and SplitText) and{' '}
      <strong>Lenis</strong> for smooth scrolling, registered once in <code>lib/gsap.ts</code>.
    </p>

    <h2>One ticker</h2>
    <p>
      The <code>SmoothScroll</code> provider runs Lenis off GSAP&apos;s ticker and feeds scroll
      position straight into ScrollTrigger, so smooth scroll and scroll-driven animation never fight:
    </p>
    <pre><code>{`lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)`}</code></pre>

    <h2>Scrubbed, not looping</h2>
    <p>
      The scroll effects — the hero drifting away as you leave it, the mountain backdrop parallax — are
      all <em>scrubbed</em> to scroll position. They move only while you scroll and cost nothing when
      the page is still, which keeps them in line with the performance model.
    </p>

    <h2>Reveals and nav</h2>
    <ul>
      <li>Sections fade in via an IntersectionObserver toggling a CSS class — no per-frame work</li>
      <li>Project cards take a pointer-driven 3D tilt that springs back on leave</li>
      <li>The nav bounces in once you scroll past the hero and highlights the section currently in view</li>
      <li>Under reduced motion, anchor clicks fall back to native scrolling and animations are disabled</li>
    </ul>
  </>
)

const Seo = (
  <>
    <p>
      The site&apos;s canonical home is <strong>voegele.dev</strong>. SEO here is mostly about feeding
      Google a clean, consistent identity — partly to correct a knowledge panel that mislabels me.
    </p>

    <h2>Entity graph</h2>
    <p>
      <code>app/layout.tsx</code> ships a JSON-LD <code>@graph</code> with three linked nodes — a{' '}
      <strong>Person</strong> (stable <code>@id</code>, job title, employer, and <code>sameAs</code>{' '}
      links to GitHub and LinkedIn), a <strong>WebSite</strong>, and a <strong>ProfilePage</strong>.
      Content pages add their own typed schema that points back at the same Person:
    </p>
    <ul>
      <li><strong>BlogPosting</strong> on each post, authored by the Person node</li>
      <li><strong>CreativeWork</strong> on each case study</li>
    </ul>

    <h2>Sitemaps &amp; robots</h2>
    <p>
      The apex sitemap (<code>app/sitemap.ts</code>) lists the home page, blog, posts, case studies and
      lab. The docs subdomain serves its own separate sitemap and robots, since Google treats it as a
      distinct host.
    </p>

    <h2>Principles</h2>
    <ul>
      <li>Consistency over volume — same name, title and links everywhere the entity appears</li>
      <li>No personal data in schema — work-based signals only, by deliberate choice</li>
      <li>&quot;Motorsport&quot;, never a direct &quot;Formula 1&quot; association</li>
    </ul>
  </>
)

const FormulaGod = (
  <>
    <p>
      A motorsport media &amp; marketing platform — content, branding and reach for the racing world,
      designed and built end to end.
    </p>
    <h2>At a glance</h2>
    <ul>
      <li><strong>Stack:</strong> Next.js, Framer Motion, Tailwind CSS</li>
      <li><strong>Role:</strong> solo design and development — brand, UI and code</li>
      <li><strong>Status:</strong> private / in development</li>
    </ul>
    <p>
      Motorsport media lives on feel — pace, contrast, drama — so the interface leans into a dark,
      high-contrast look with deliberate, motion-driven editorial layout. The full case study is on the
      main site: <Link href="/work/formulagod">/work/formulagod</Link>.
    </p>
  </>
)

const GetMoneyMap = (
  <>
    <p>
      A personal-finance visualization platform: interactive data mapping and budget tracking that
      makes money flows visible instead of abstract. Live at{' '}
      <a href="https://getmoneymap.org" target="_blank" rel="noopener noreferrer">getmoneymap.org</a>.
    </p>
    <h2>At a glance</h2>
    <ul>
      <li><strong>Stack:</strong> Next.js, TypeScript, Tailwind CSS</li>
      <li><strong>Idea:</strong> visualization first, numbers second — a picture of cash flow beats a table of transactions</li>
      <li><strong>Status:</strong> live</li>
    </ul>
    <p>
      The data model is typed from input through to the visualization, which keeps the charts honest.
      Full case study: <Link href="/work/getmoneymap">/work/getmoneymap</Link>.
    </p>
  </>
)

const Homelab = (
  <>
    <p>
      A planned self-hosted platform lab — built to run the same tooling I work with professionally, on
      my own hardware. It is honest about being a plan, not a running rack.
    </p>
    <h2>Planned architecture</h2>
    <ul>
      <li><strong>Kubernetes cluster</strong> — orchestration for self-hosted workloads</li>
      <li><strong>CI/CD runners</strong> — self-hosted pipeline runners</li>
      <li><strong>Self-hosted services</strong> — media, dashboards, internal tools</li>
      <li><strong>Monitoring &amp; alerting</strong> — metrics, logs, uptime</li>
      <li><strong>VPN / networking</strong> — segmented VLANs and secure remote access</li>
    </ul>
    <h2>Why</h2>
    <p>
      To get hands-on depth in infrastructure, networking and security — a safe place to run
      Kubernetes, CI/CD and self-hosted services on real hardware, and to break things and learn.
    </p>
  </>
)

export const docContent: Record<string, ReactNode> = {
  '': Overview,
  architecture: Architecture,
  performance: Performance,
  'liquid-glass': LiquidGlass,
  'signal-grid': SignalGrid,
  'signal-pit': SignalPit,
  motion: Motion,
  seo: Seo,
  'projects/formulagod': FormulaGod,
  'projects/getmoneymap': GetMoneyMap,
  'projects/homelab': Homelab,
}
