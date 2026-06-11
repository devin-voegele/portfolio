'use client'

import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'
import { usePerfMode } from '@/components/providers/PerfProvider'

/**
 * SignalGrid — the hero centerpiece.
 *
 * A field of "infrastructure node" dots that behaves like liquid:
 *  - pointer movement pushes dots aside and lights them up
 *  - pointer down / the hero entrance fires an expanding ripple wave
 *  - dots spring back, energy decays, and when the field settles the
 *    rAF loop CANCELS ITSELF — zero idle cost, in line with this
 *    repo's perf history (no perpetual animations)
 *
 * Pointer listeners attach to the parent section so the canvas itself
 * can stay pointer-events:none beneath the hero content.
 */

interface Burst {
  x: number
  y: number
  start: number
  speed: number // px / ms
  power: number
}

const POINTER_RADIUS = 150
const SPRING = 0.045
const DAMPING = 0.86
const ENERGY_DECAY = 0.94
const WAVE_BAND = 90

export function SignalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tier = usePerfMode()

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const noise2D = createNoise2D()
    const spacing = tier === 'full' ? 26 : 36
    const dpr = Math.min(window.devicePixelRatio || 1, tier === 'full' ? 1.75 : 1.25)

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0

    // Typed-array dot state
    let rx = new Float32Array(0) // rest x
    let ry = new Float32Array(0)
    let ox = new Float32Array(0) // offset from rest
    let oy = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let en = new Float32Array(0) // light energy 0..~1.4
    let base = new Float32Array(0) // per-dot resting alpha (organic noise)

    let bursts: Burst[] = []
    let raf = 0
    let running = false
    let lastT = 0
    let pointerX = -9999
    let pointerY = -9999
    let lastPointerT = -9999
    let visible = true

    const build = () => {
      const r = host.getBoundingClientRect()
      width = Math.max(1, Math.round(r.width))
      height = Math.max(1, Math.round(r.height))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(width / spacing) + 1
      rows = Math.ceil(height / spacing) + 1
      const n = cols * rows
      rx = new Float32Array(n)
      ry = new Float32Array(n)
      ox = new Float32Array(n)
      oy = new Float32Array(n)
      vx = new Float32Array(n)
      vy = new Float32Array(n)
      en = new Float32Array(n)
      base = new Float32Array(n)

      let i = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++, i++) {
          rx[i] = col * spacing + (row % 2 ? spacing / 2 : 0)
          ry[i] = row * spacing
          // Organic base brightness: noise + vertical falloff toward the fold
          const nse = (noise2D(rx[i] * 0.0045, ry[i] * 0.0045) + 1) / 2
          const fade = 1 - Math.min(1, ry[i] / height) * 0.45
          base[i] = (0.03 + nse * 0.075) * fade
        }
      }
    }

    // Colour ramp across x: blue → cyan → violet (the liquid signature)
    const C1 = [96, 165, 250]
    const C2 = [34, 211, 238]
    const C3 = [139, 92, 246]
    const rampAt = (x: number): number[] => {
      const t = Math.min(1, Math.max(0, x / Math.max(1, width)))
      const [a, b, tt] = t < 0.5 ? [C1, C2, t * 2] : [C2, C3, (t - 0.5) * 2]
      return [
        a[0] + (b[0] - a[0]) * tt,
        a[1] + (b[1] - a[1]) * tt,
        a[2] + (b[2] - a[2]) * tt,
      ]
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const n = rx.length
      for (let i = 0; i < n; i++) {
        const x = rx[i] + ox[i]
        const y = ry[i] + oy[i]
        const e = en[i]

        if (e > 0.02) {
          const [r, g, b] = rampAt(rx[i])
          const lit = Math.min(1, e)
          // white-hot core blend at high energy
          const wr = r + (255 - r) * Math.max(0, lit - 0.65) * 1.6
          const wg = g + (255 - g) * Math.max(0, lit - 0.65) * 1.6
          const wb = b + (255 - b) * Math.max(0, lit - 0.65) * 1.6
          const alpha = base[i] + lit * 0.85
          const rad = 1.1 + lit * 1.7

          if (lit > 0.3) {
            // soft halo — a second, larger, faint disc (cheap glow)
            ctx.fillStyle = `rgba(${wr | 0},${wg | 0},${wb | 0},${(lit * 0.16).toFixed(3)})`
            ctx.beginPath()
            ctx.arc(x, y, rad * 3.1, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.fillStyle = `rgba(${wr | 0},${wg | 0},${wb | 0},${Math.min(1, alpha).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(x, y, rad, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(148,163,184,${base[i].toFixed(3)})`
          ctx.beginPath()
          ctx.arc(x, y, 1.1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const step = (now: number) => {
      raf = 0
      const dt = Math.min(2.5, (now - lastT) / 16.67) // normalised to 60fps ticks
      lastT = now

      const pointerActive = now - lastPointerT < 160
      let activity = 0

      // Wave fronts
      const liveBursts: Burst[] = []
      for (const burst of bursts) {
        const front = (now - burst.start) * burst.speed
        if (front < Math.max(width, height) * 1.4 + WAVE_BAND) liveBursts.push(burst)
      }
      bursts = liveBursts

      const n = rx.length
      for (let i = 0; i < n; i++) {
        let fx = 0
        let fy = 0

        // Pointer field: radial push + light
        if (pointerActive) {
          const dx = rx[i] + ox[i] - pointerX
          const dy = ry[i] + oy[i] - pointerY
          const d2 = dx * dx + dy * dy
          if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = (1 - d / POINTER_RADIUS) ** 1.6
            fx += (dx / d) * f * 3.4 * dt
            fy += (dy / d) * f * 3.4 * dt
            en[i] = Math.min(1.4, en[i] + f * 0.5 * dt)
          }
        }

        // Burst waves: impulse when the front passes through
        for (const burst of bursts) {
          const front = (now - burst.start) * burst.speed
          const dx = rx[i] - burst.x
          const dy = ry[i] - burst.y
          const d = Math.sqrt(dx * dx + dy * dy) || 0.001
          const off = Math.abs(d - front)
          if (off < WAVE_BAND) {
            const f = (1 - off / WAVE_BAND) ** 2 * burst.power
            fx += (dx / d) * f * 2.6 * dt
            fy += (dy / d) * f * 2.6 * dt
            en[i] = Math.min(1.4, en[i] + f * 0.65 * dt)
          }
        }

        // Spring integration back to rest
        vx[i] = (vx[i] + fx - ox[i] * SPRING * dt) * DAMPING
        vy[i] = (vy[i] + fy - oy[i] * SPRING * dt) * DAMPING
        ox[i] += vx[i] * dt
        oy[i] += vy[i] * dt
        en[i] *= ENERGY_DECAY ** dt

        activity += Math.abs(vx[i]) + Math.abs(vy[i]) + en[i]
      }

      render()

      // SLEEP when settled: no bursts, no recent pointer, field at rest
      if (activity < 0.5 && bursts.length === 0 && !pointerActive) {
        // snap fully to rest so the settled frame is clean
        ox.fill(0); oy.fill(0); vx.fill(0); vy.fill(0); en.fill(0)
        render()
        running = false
        return
      }
      raf = requestAnimationFrame(step)
    }

    const wake = () => {
      if (running || !visible) return
      running = true
      lastT = performance.now()
      raf = requestAnimationFrame(step)
    }

    const burstAt = (x: number, y: number, power = 1) => {
      bursts.push({ x, y, start: performance.now(), speed: 0.55, power })
      wake()
    }

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointerX = e.clientX - r.left
      pointerY = e.clientY - r.top
      lastPointerT = performance.now()
      wake()
    }
    const onPointerDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      burstAt(e.clientX - r.left, e.clientY - r.top, 1.5)
    }
    const onHeroBurst = () => {
      // Entrance ripple — emanates from the headline area
      burstAt(width * 0.5, height * 0.42, 1.9)
    }

    build()
    render() // settled first paint

    if (reduced || tier === 'off') {
      // Static constellation only — no listeners, no loop
      return
    }

    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('dv:hero-burst', onHeroBurst)

    // Entrance ripple once the hero has settled in
    const introT = setTimeout(onHeroBurst, 700)

    const ro = new ResizeObserver(() => {
      build()
      render()
    })
    ro.observe(host)

    // Stop everything while the hero is off-screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && raf) {
        cancelAnimationFrame(raf)
        raf = 0
        running = false
      }
    })
    io.observe(host)

    const onVis = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf)
        raf = 0
        running = false
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      clearTimeout(introT)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('dv:hero-burst', onHeroBurst)
      document.removeEventListener('visibilitychange', onVis)
      ro.disconnect()
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [tier])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
