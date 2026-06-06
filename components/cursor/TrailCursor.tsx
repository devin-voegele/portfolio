'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const TRAIL = 5

export function TrailCursor() {
  const lead = useRef<HTMLDivElement>(null)
  const trail = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const leadEl = lead.current!
    const xTo = gsap.quickTo(leadEl, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(leadEl, 'y', { duration: 0.35, ease: 'power3.out' })

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pts = trail.current.map(() => ({ x: pos.x, y: pos.y }))

    const move = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const target = e.target as Element | null
      const on = !!target?.closest('a, button, [data-cursor]')
      gsap.to(leadEl, {
        scale: on ? 3.6 : 1,
        backgroundColor: on ? 'rgba(46,107,255,0)' : 'var(--accent)',
        borderWidth: on ? 1.5 : 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    let raf = 0
    const tick = () => {
      let px = pos.x
      let py = pos.y
      pts.forEach((p, i) => {
        p.x += (px - p.x) * 0.3
        p.y += (py - p.y) * 0.3
        const el = trail.current[i]
        if (el) gsap.set(el, { x: p.x, y: p.y })
        px = p.x
        py = p.y
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      {/* Lead dot */}
      <div
        ref={lead}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          marginTop: -5,
          marginLeft: -5,
          borderRadius: '50%',
          background: 'var(--accent)',
          borderStyle: 'solid',
          borderWidth: 0,
          borderColor: 'var(--accent)',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: 10000,
          // Using 'normal' blend — 'difference' on #080B14 navy would
          // invert #2E6BFF to a murky amber, killing the electric-blue look.
          mixBlendMode: 'normal',
        }}
      />
      {/* Trail dots — comet tail with decreasing size and opacity */}
      {Array.from({ length: TRAIL }).map((_, i) => {
        const size = Math.max(8 - i * 1.2, 1) // keep positive
        return (
          <div
            key={i}
            aria-hidden
            ref={(el) => {
              trail.current[i] = el
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: size,
              height: size,
              marginTop: -size / 2,
              marginLeft: -size / 2,
              borderRadius: '50%',
              background: 'var(--accent-bright)',
              opacity: Math.max(0.5 - i * 0.08, 0),
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />
        )
      })}
    </>
  )
}
