'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { usePerfMode } from '@/components/providers/PerfProvider'
import type { World, RigidBody } from '@dimforge/rapier3d-compat'

/**
 * SIGNAL PIT — the hero's signal-grid interaction language, given mass.
 *
 * Three.js renders an instanced pit of spheres/cubes in the site palette;
 * Rapier (WASM) runs the physics. The cursor is a force field, a click is
 * a shockwave, gravity can be flipped. Same perf discipline as the hero:
 * when every body falls asleep and the pointer is idle, the rAF loop
 * CANCELS ITSELF and the scene costs nothing until you touch it again.
 *
 * Everything (three + rapier) is imported inside the effect, so the
 * ~1.5 MB physics/3D chunk only ever loads on /lab.
 */

const PALETTE = ['#3b82f6', '#22d3ee', '#8b5cf6', '#10b981', '#60a5fa']
const ARENA = { hx: 6.5, hz: 4.5, wallH: 11 }
const POINTER_RADIUS = 3.4
const POINTER_FORCE = 5.5
const SHOCK_RADIUS = 5.5
const SHOCK_FORCE = 13

interface PitApi {
  reset: () => void
  flipGravity: () => boolean
  wake: () => void
}

export function SignalPit({ height = 'min(70vh, 660px)' }: { height?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<PitApi | null>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)
  const tier = usePerfMode()
  const [flipped, setFlipped] = useState(false)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let disposed = false
    let cleanup: (() => void) | null = null

    ;(async () => {
      const THREE = await import('three')
      const RAPIER = await import('@dimforge/rapier3d-compat')
      await RAPIER.init()
      if (disposed) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const full = tier === 'full'
      const COUNT = full ? 130 : 80
      const dpr = Math.min(window.devicePixelRatio || 1, full ? 1.75 : 1.25)

      // ── Renderer ────────────────────────────────────────────────
      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        })
      } catch {
        setFailed(true)
        return
      }
      renderer.setPixelRatio(dpr)
      renderer.setSize(host.clientWidth, host.clientHeight)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      if (full) {
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
      }
      renderer.domElement.style.display = 'block'
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const fog = new THREE.Fog(0x05070d, 18, 34)
      scene.fog = fog

      const camera = new THREE.PerspectiveCamera(
        50,
        host.clientWidth / host.clientHeight,
        0.1,
        90,
      )
      // Fit the whole arena into view at any aspect (portrait phones would
      // otherwise crop the sides) — pull the camera back until the arena
      // width fits the horizontal fov, and scale the fog with the distance.
      let camBaseY = 7.5
      let camBaseZ = 12.5
      const fitCamera = () => {
        const aspect = host.clientWidth / Math.max(1, host.clientHeight)
        camera.aspect = aspect
        const vHalf = THREE.MathUtils.degToRad(camera.fov / 2)
        const hHalf = Math.atan(Math.tan(vHalf) * aspect)
        camBaseZ = Math.max(12.5, (ARENA.hx + 1.6) / Math.tan(hHalf))
        camBaseY = 5 + camBaseZ * 0.2
        fog.near = camBaseZ * 1.4
        fog.far = camBaseZ * 2.7
        camera.position.set(0, camBaseY, camBaseZ)
        camera.lookAt(0, 1.2, 0)
        camera.updateProjectionMatrix()
      }
      fitCamera()

      // ── Lights ──────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x8899bb, 0.55))
      const key = new THREE.DirectionalLight(0xdde6ff, 1.6)
      key.position.set(6, 12, 5)
      if (full) {
        key.castShadow = true
        key.shadow.mapSize.set(1024, 1024)
        key.shadow.camera.left = -9
        key.shadow.camera.right = 9
        key.shadow.camera.top = 9
        key.shadow.camera.bottom = -9
        key.shadow.camera.far = 30
      }
      scene.add(key)
      const rim = new THREE.DirectionalLight(0x3b82f6, 0.7)
      rim.position.set(-7, 6, -6)
      scene.add(rim)

      // ── Arena visuals ───────────────────────────────────────────
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a0e18, roughness: 0.92, metalness: 0.18 })
      const floor = new THREE.Mesh(new THREE.BoxGeometry(ARENA.hx * 2, 0.5, ARENA.hz * 2), floorMat)
      floor.position.y = -0.25
      floor.receiveShadow = full
      scene.add(floor)

      const grid = new THREE.GridHelper(ARENA.hx * 2, 13, 0x2a3550, 0x141b2c)
      grid.position.y = 0.012
      ;(grid.material as InstanceType<typeof THREE.Material>).transparent = true
      ;(grid.material as InstanceType<typeof THREE.Material>).opacity = 0.5
      scene.add(grid)

      const cage = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(ARENA.hx * 2, ARENA.wallH, ARENA.hz * 2)),
        new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.16 }),
      )
      cage.position.y = ARENA.wallH / 2
      scene.add(cage)

      // ── Physics world ───────────────────────────────────────────
      const world: World = new RAPIER.World({ x: 0, y: -9.81, z: 0 })
      const mkWall = (hx: number, hy: number, hz: number, x: number, y: number, z: number) =>
        world.createCollider(
          RAPIER.ColliderDesc.cuboid(hx, hy, hz).setTranslation(x, y, z).setRestitution(0.3).setFriction(0.7),
        )
      mkWall(ARENA.hx, 0.25, ARENA.hz, 0, -0.25, 0) // floor
      mkWall(ARENA.hx, ARENA.wallH / 2, 0.3, 0, ARENA.wallH / 2, -ARENA.hz) // back
      mkWall(ARENA.hx, ARENA.wallH / 2, 0.3, 0, ARENA.wallH / 2, ARENA.hz) // front
      mkWall(0.3, ARENA.wallH / 2, ARENA.hz, -ARENA.hx, ARENA.wallH / 2, 0) // left
      mkWall(0.3, ARENA.wallH / 2, ARENA.hz, ARENA.hx, ARENA.wallH / 2, 0) // right
      mkWall(ARENA.hx, 0.25, ARENA.hz, 0, ARENA.wallH, 0) // lid (for gravity flips)

      // ── Bodies (instanced spheres + boxes) ──────────────────────
      const sphereCount = Math.round(COUNT * 0.6)
      const boxCount = COUNT - sphereCount

      const sphereGeo = new THREE.SphereGeometry(1, 20, 20)
      const boxGeo = new THREE.BoxGeometry(1, 1, 1)
      const bodyMat = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.25 })
      const spheres = new THREE.InstancedMesh(sphereGeo, bodyMat, sphereCount)
      const boxes = new THREE.InstancedMesh(boxGeo, bodyMat, boxCount)
      spheres.castShadow = boxes.castShadow = full
      spheres.receiveShadow = boxes.receiveShadow = full
      scene.add(spheres, boxes)

      const bodies: RigidBody[] = []
      const scales: number[] = []
      const color = new THREE.Color()
      const rand = (a: number, b: number) => a + Math.random() * (b - a)
      const spawnPos = (): [number, number, number] => [
        rand(-ARENA.hx + 1, ARENA.hx - 1),
        reduced ? rand(0.5, 2.5) : rand(2.5, ARENA.wallH - 2),
        rand(-ARENA.hz + 1, ARENA.hz - 1),
      ]

      for (let i = 0; i < COUNT; i++) {
        const isSphere = i < sphereCount
        const s = isSphere ? rand(0.3, 0.52) : rand(0.5, 0.85)
        const [x, y, z] = spawnPos()
        const body = world.createRigidBody(
          RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(x, y, z)
            .setLinearDamping(0.08)
            .setAngularDamping(0.18),
        )
        const colDesc = isSphere
          ? RAPIER.ColliderDesc.ball(s)
          : RAPIER.ColliderDesc.cuboid(s / 2, s / 2, s / 2)
        world.createCollider(colDesc.setRestitution(0.48).setFriction(0.45), body)
        bodies.push(body)
        scales.push(s)

        color.set(PALETTE[i % PALETTE.length])
        if (isSphere) spheres.setColorAt(i, color)
        else boxes.setColorAt(i - sphereCount, color)
      }
      spheres.instanceColor!.needsUpdate = true
      boxes.instanceColor!.needsUpdate = true

      // ── Pointer force field ─────────────────────────────────────
      const raycaster = new THREE.Raycaster()
      const forcePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.8)
      const ndc = new THREE.Vector2()
      const hit = new THREE.Vector3()
      let pointerWorld: InstanceType<typeof THREE.Vector3> | null = null
      let lastPointerT = -1e9

      const toNdc = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect()
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      }
      const projectPointer = () => {
        raycaster.setFromCamera(ndc, camera)
        return raycaster.ray.intersectPlane(forcePlane, hit) ? hit : null
      }

      const impulseFrom = (cx: number, cz: number, radius: number, force: number, upBias: number) => {
        for (const b of bodies) {
          const t = b.translation()
          const dx = t.x - cx
          const dz = t.z - cz
          const d = Math.hypot(dx, dz)
          if (d > radius || d < 1e-4) continue
          const f = (1 - d / radius) ** 1.6 * force * b.mass()
          b.applyImpulse({ x: (dx / d) * f, y: f * upBias, z: (dz / d) * f }, true)
        }
      }

      // ── Sleep/wake loop control ─────────────────────────────────
      let raf = 0
      let running = false
      let frames = 0
      let fpsT = performance.now()

      const setStatus = (live: boolean) => {
        if (statusRef.current) statusRef.current.textContent = live ? '● LIVE' : '○ IDLE'
        if (statusRef.current) statusRef.current.style.color = live ? '#10b981' : '#6b7184'
        if (!live && fpsRef.current) fpsRef.current.textContent = '—'
      }

      const loop = () => {
        raf = 0
        const now = performance.now()

        // pointer force while recently active
        if (pointerWorld && now - lastPointerT < 140) {
          impulseFrom(pointerWorld.x, pointerWorld.z, POINTER_RADIUS, POINTER_FORCE * 0.016, 0.35)
        }

        world.step()

        // sync instances
        const m = new THREE.Matrix4()
        const q = new THREE.Quaternion()
        const p = new THREE.Vector3()
        const sc = new THREE.Vector3()
        for (let i = 0; i < bodies.length; i++) {
          const t = bodies[i].translation()
          const r = bodies[i].rotation()
          p.set(t.x, t.y, t.z)
          q.set(r.x, r.y, r.z, r.w)
          const s = scales[i]
          sc.setScalar(s)
          m.compose(p, q, sc)
          if (i < sphereCount) spheres.setMatrixAt(i, m)
          else boxes.setMatrixAt(i - sphereCount, m)
        }
        spheres.instanceMatrix.needsUpdate = true
        boxes.instanceMatrix.needsUpdate = true

        // subtle camera parallax toward the pointer
        camera.position.x += (ndc.x * 1.6 - camera.position.x) * 0.04
        camera.position.y += (camBaseY + ndc.y * 0.8 - camera.position.y) * 0.04
        camera.lookAt(0, 1.2, 0)

        renderer.render(scene, camera)

        // fps chip
        frames++
        if (now - fpsT > 600) {
          if (fpsRef.current) fpsRef.current.textContent = `${Math.round((frames * 1000) / (now - fpsT))} FPS`
          frames = 0
          fpsT = now
        }

        // sleep: pointer idle + every body asleep → stop the loop
        const pointerActive = now - lastPointerT < 200
        if (!pointerActive && bodies.every((b) => b.isSleeping())) {
          running = false
          setStatus(false)
          return
        }
        raf = requestAnimationFrame(loop)
      }

      const wake = () => {
        if (running || disposed || !inView) return
        running = true
        setStatus(true)
        frames = 0
        fpsT = performance.now()
        raf = requestAnimationFrame(loop)
      }

      // ── Interactions ────────────────────────────────────────────
      const onMove = (e: PointerEvent) => {
        toNdc(e)
        pointerWorld = projectPointer()
        lastPointerT = performance.now()
        wake()
      }
      const onDown = (e: PointerEvent) => {
        toNdc(e)
        const w = projectPointer()
        if (w) {
          for (const b of bodies) b.wakeUp()
          impulseFrom(w.x, w.z, SHOCK_RADIUS, SHOCK_FORCE * 0.016, 0.9)
        }
        lastPointerT = performance.now()
        wake()
      }
      renderer.domElement.addEventListener('pointermove', onMove, { passive: true })
      renderer.domElement.addEventListener('pointerdown', onDown, { passive: true })

      const onVis = () => {
        if (document.hidden) {
          if (raf) cancelAnimationFrame(raf)
          raf = 0
          running = false
        } else {
          wake()
        }
      }
      document.addEventListener('visibilitychange', onVis)

      // Hard-pause whenever the pit is scrolled out of view (matters when
      // embedded on the homepage) — resume only if bodies are still moving.
      let inView = true
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting
        if (!inView) {
          if (raf) cancelAnimationFrame(raf)
          raf = 0
          running = false
        } else if (!bodies.every((b) => b.isSleeping())) {
          wake()
        }
      })
      io.observe(host)

      const ro = new ResizeObserver(() => {
        renderer.setSize(host.clientWidth, host.clientHeight)
        fitCamera()
        if (!running) renderer.render(scene, camera)
      })
      ro.observe(host)

      // ── Public API for the HUD buttons ──────────────────────────
      apiRef.current = {
        reset: () => {
          for (const b of bodies) {
            const [x, y, z] = spawnPos()
            b.setTranslation({ x, y, z }, true)
            b.setLinvel({ x: 0, y: 0, z: 0 }, true)
            b.setAngvel({ x: 0, y: 0, z: 0 }, true)
            b.wakeUp()
          }
          wake()
        },
        flipGravity: () => {
          world.gravity.y = -world.gravity.y
          for (const b of bodies) b.wakeUp()
          wake()
          return world.gravity.y > 0
        },
        wake,
      }

      setReady(true)
      setStatus(true)
      wake()
      // touch devices get a welcome shockwave so the first paint isn't static
      if (coarse && !reduced) {
        setTimeout(() => impulseFrom(0, 0, SHOCK_RADIUS, SHOCK_FORCE * 0.012, 0.8), 600)
      }

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf)
        renderer.domElement.removeEventListener('pointermove', onMove)
        renderer.domElement.removeEventListener('pointerdown', onDown)
        document.removeEventListener('visibilitychange', onVis)
        ro.disconnect()
        io.disconnect()
        world.free()
        sphereGeo.dispose()
        boxGeo.dispose()
        bodyMat.dispose()
        floorMat.dispose()
        cage.geometry.dispose()
        ;(cage.material as InstanceType<typeof THREE.Material>).dispose()
        grid.geometry.dispose()
        ;(grid.material as InstanceType<typeof THREE.Material>).dispose()
        renderer.dispose()
        if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement)
        apiRef.current = null
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [tier])

  const chipStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.4rem 0.8rem',
    fontSize: '0.66rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    borderRadius: '0.65rem',
  }
  const btnStyle: CSSProperties = {
    ...chipStyle,
    cursor: 'pointer',
    color: 'var(--text-primary)',
    background: 'transparent',
    border: 'none',
    transition: 'transform 0.25s var(--ease-out-expo)',
  }

  return (
    <div className="lq relative overflow-hidden" style={{ width: '100%' }}>
      {/* Canvas host */}
      <div
        ref={hostRef}
        style={{
          width: '100%',
          height,
          minHeight: '420px',
          cursor: 'crosshair',
          // pan-y: vertical swipes keep scrolling the page on touch —
          // horizontal drags and taps go to the physics.
          touchAction: 'pan-y',
        }}
      />

      {failed && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
          WebGL unavailable — the pit needs a GPU.
        </div>
      )}

      {/* HUD */}
      <div className="absolute top-3 left-3 lq font-mono hidden sm:inline-flex" style={chipStyle}>
        {'// SIGNAL PIT — THREE.JS × RAPIER'}
      </div>
      <div className="absolute top-3 right-3 flex gap-2">
        <span className="lq font-mono" style={chipStyle}>
          <span ref={statusRef} style={{ color: '#10b981' }}>● LIVE</span>
        </span>
        <span className="lq font-mono" style={{ ...chipStyle, minWidth: '4.6rem', justifyContent: 'center' }}>
          <span ref={fpsRef}>—</span>
        </span>
      </div>
      <div className="absolute bottom-3 left-3 lq font-mono hidden sm:flex" style={chipStyle}>
        MOVE — FORCE FIELD · CLICK — SHOCKWAVE
      </div>
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          className="lq font-mono"
          style={btnStyle}
          disabled={!ready}
          onClick={() => apiRef.current?.reset()}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = '')}
        >
          ↺ RESET
        </button>
        <button
          type="button"
          className="lq font-mono"
          style={{ ...btnStyle, color: flipped ? '#22d3ee' : 'var(--text-primary)' }}
          disabled={!ready}
          onClick={() => setFlipped(apiRef.current?.flipGravity() ?? false)}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = '')}
        >
          {flipped ? '⇣ GRAVITY: UP' : '⇡ FLIP GRAVITY'}
        </button>
      </div>
    </div>
  )
}
