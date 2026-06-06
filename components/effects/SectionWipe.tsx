'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

interface SectionWipeProps {
  children: React.ReactNode
  className?: string
}

/**
 * SectionWipe
 * Renders children in a positioned wrapper. When the wrapper enters the
 * viewport a 3 px electric-blue bar sweeps left→right across the top edge
 * then disappears — a single, crisp "gear-shift" reveal.
 *
 * The bar ends at scaleX(0) + opacity(0) so it leaves NO persistent line.
 */
export function SectionWipe({ children, className }: SectionWipeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const barRef     = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const bar = barRef.current
      if (!bar) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      /* 1. Sweep in from left */
      tl.fromTo(
        bar,
        { scaleX: 0, transformOrigin: 'left center', opacity: 1 },
        { scaleX: 1, transformOrigin: 'left center', duration: 0.5, ease: 'power3.out' },
      )
      /* 2. Sweep out to the right */
      .to(bar, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.4,
        ease: 'power2.in',
      })
      /* 3. Ensure fully invisible (belt-and-suspenders) */
      .set(bar, { opacity: 0 })
    },
    { scope: wrapperRef, dependencies: [] },
  )

  return (
    <div ref={wrapperRef} className={className} style={{ position: 'relative' }}>
      {/* Bar is constrained to the 3 px top strip — no overflow clipping needed */}
      <span
        ref={barRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--accent)',
          boxShadow: '0 0 12px var(--accent-glow)',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0,
        }}
      />
      {children}
    </div>
  )
}
