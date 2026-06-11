import type { Metadata } from 'next'
import Link from 'next/link'
import { PostLayout } from '@/components/blog/PostLayout'
import { getPost } from '@/lib/posts'

const meta = getPost('signal-pit')!

export const metadata: Metadata = {
  title: meta.title,
  description: meta.excerpt,
}

export default function Post() {
  return (
    <PostLayout meta={meta}>
      <p>
        The hero of this site has a field of dots that ripples away from your cursor. I wanted the
        3D version of that feeling: real rigid bodies you can shove around, with actual mass and
        bounce. The result is{' '}
        <Link href="/lab">Signal Pit</Link> — about 130 spheres and cubes in a caged arena, where the
        cursor is a force field, a click is a shockwave, and gravity is a button.
      </p>
      <p>
        The catch: this portfolio has a hard performance rule. No perpetual animation, nothing that
        drains a battery while you read. A physics simulation is the most &quot;perpetual&quot; thing
        there is — so most of the interesting decisions were about when the simulation is allowed to{' '}
        <em>exist</em>.
      </p>

      <h2>The stack</h2>
      <p>
        <strong>Three.js</strong> renders; <strong>Rapier</strong> simulates. Rapier is a Rust physics
        engine compiled to WASM, and the <code>@dimforge/rapier3d-compat</code> build inlines the WASM
        so it works in any bundler without ceremony. Both are imported dynamically <em>inside</em> the
        component&apos;s effect:
      </p>
      <pre>
        <code>{`const THREE = await import('three')
const RAPIER = await import('@dimforge/rapier3d-compat')
await RAPIER.init()`}</code>
      </pre>
      <p>
        That single decision keeps the ~1.5&nbsp;MB physics/3D chunk off every page that doesn&apos;t
        mount the pit. The homepage embed goes further: an IntersectionObserver with a 600px margin only
        mounts the component when you scroll toward it, and only on machines my perf provider rates as
        capable. Everyone else gets a CSS teaser that links to the lab.
      </p>

      <h2>Two draw calls for 130 bodies</h2>
      <p>
        Naively, every body is a mesh — 130 draw calls before lighting. Instead the pit uses two{' '}
        <code>InstancedMesh</code>es (one sphere, one box) and writes each body&apos;s transform into the
        instance matrix every frame:
      </p>
      <pre>
        <code>{`const t = body.translation()
const r = body.rotation()
matrix.compose(p.set(t.x, t.y, t.z), q.set(r.x, r.y, r.z, r.w), scale)
mesh.setMatrixAt(i, matrix)`}</code>
      </pre>
      <p>
        Per-instance colors come from <code>setColorAt</code>, so the whole pit — every sphere, every
        cube, all five accent colors — is two draw calls.
      </p>

      <h2>The part I care about: it sleeps</h2>
      <p>
        Rapier already puts individual rigid bodies to sleep when they stop moving. The pit extends that
        to the whole system: every frame, if the pointer has been idle and{' '}
        <strong>every body reports <code>isSleeping()</code></strong>, the render loop cancels its own{' '}
        <code>requestAnimationFrame</code> and simply stops:
      </p>
      <pre>
        <code>{`if (!pointerActive && bodies.every((b) => b.isSleeping())) {
  running = false
  return            // no rAF scheduled — the page goes back to costing nothing
}
raf = requestAnimationFrame(loop)`}</code>
      </pre>
      <p>
        A HUD chip flips from <code>● LIVE</code> to <code>○ IDLE</code> when that happens, mostly
        because I like seeing it work. Any pointer movement, tap, or button press calls{' '}
        <code>wake()</code> and the loop resumes. The same logic hard-pauses when the canvas scrolls
        off-screen or the tab hides. Settle time after a shockwave is a few seconds — after that, the
        simulation literally does not exist as far as your CPU is concerned.
      </p>

      <h2>Forces, not positions</h2>
      <p>
        The cursor never moves bodies directly — it applies impulses, so everything stays physical. The
        pointer is raycast onto a plane just above the floor, and bodies inside a radius get pushed away
        with a falloff curve, scaled by their own mass so a big cube and a small sphere react
        believably:
      </p>
      <pre>
        <code>{`const f = (1 - d / radius) ** 1.6 * force * body.mass()
body.applyImpulse({ x: (dx / d) * f, y: f * upBias, z: (dz / d) * f }, true)`}</code>
      </pre>
      <p>
        A click is the same function with a bigger radius and an upward bias — a shockwave that pops the
        pile into the air. Flipping gravity is one line (<code>world.gravity.y *= -1</code>) plus waking
        everyone up; the arena has a lid specifically so the bodies have something to rain onto.
      </p>

      <h2>Two mobile lessons, learned the honest way</h2>
      <p>
        The first phone test found two real bugs. One: the camera was tuned for widescreen, so portrait
        phones cropped the arena&apos;s sides. The fix computes the horizontal field of view from the
        actual aspect ratio and pulls the camera back until the arena fits, scaling the fog distances
        with it. Two: <code>touch-action: none</code> made the canvas swallow every swipe — you
        couldn&apos;t scroll past the section. <code>touch-action: pan-y</code> is the correct answer:
        vertical swipes scroll the page, horizontal drags push bodies, taps still detonate.
      </p>

      <h2>Numbers</h2>
      <ul>
        <li>~130 dynamic bodies (80 on lower-tier machines), two instanced draw calls</li>
        <li>60–120 FPS during interaction, depending on the machine</li>
        <li><strong>0% CPU when settled</strong> — no rAF, no stepping, nothing</li>
        <li>Physics/3D chunk loads only on <code>/lab</code> or near the homepage embed, never up front</li>
      </ul>
      <p>
        Try it in the <Link href="/lab">lab</Link> — flip gravity, then watch the status chip go idle.
      </p>
    </PostLayout>
  )
}
