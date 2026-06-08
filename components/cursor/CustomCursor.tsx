'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Disable on touch / stylus / any device without a fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return
    // Disable on devices that can't hover (phones, tablets)
    if (window.matchMedia('(hover: none)').matches) return
    // Disable on reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!
    if (!dot || !ring) return

    // Hide native cursor
    document.body.style.cursor = 'none'
    activeRef.current = true

    // quickTo for ring (lagged follow)
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    function onMouseMove(e: MouseEvent) {
      // Dot follows instantly via direct style
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      // Ring follows with gsap lag
      ringXTo(e.clientX - 16) // offset by half ring size (32/2)
      ringYTo(e.clientY - 16)
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as Element | null
      const isInteractive = !!target?.closest('a, button, input, textarea, [data-cursor]')
      if (isInteractive) {
        gsap.to(ring, { scale: 1.6, borderColor: 'var(--accent-bright)', duration: 0.25, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.6, duration: 0.25, ease: 'power2.out' })
      } else {
        gsap.to(ring, { scale: 1, borderColor: 'var(--accent)', duration: 0.25, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      // Restore native cursor
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* DOT — near-instant follow */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          zIndex: 10002,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      {/* RING — lagged follow via gsap.quickTo */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          background: 'transparent',
          zIndex: 10001,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </>
  )
}
