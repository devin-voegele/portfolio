'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

interface VelocitySkewProps {
  children: React.ReactNode
  className?: string
}

const SKEW_FACTOR  = 0.4   // velocity → degrees multiplier
const MAX_SKEW_DEG = 6     // hard cap (deg)
const MAX_BLUR_PX  = 2     // hard cap (px)
const LERP_FACTOR  = 0.08  // easing per frame (lower = smoother return)

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

/**
 * VelocitySkew
 * Applies a brief skewY + blur on fast scroll, eased back to 0 when idle.
 * Reads window.__lenisVelocity set by SmoothScroll.
 * No-ops on mobile (<768 px) or reduced-motion.
 */
export function VelocitySkew({ children, className }: VelocitySkewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(min-width: 768px)').matches) return

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const el = wrapperRef.current!
    if (!el) return

    const setSkew = gsap.quickSetter(el, 'skewY', 'deg')

    let currentSkew = 0
    let currentBlur = 0
    let rafId: number

    function tick() {
      const velocity = window.__lenisVelocity ?? 0

      const targetSkew = clamp(velocity * SKEW_FACTOR, -MAX_SKEW_DEG, MAX_SKEW_DEG)
      const targetBlur = clamp(Math.abs(velocity) * 0.05, 0, MAX_BLUR_PX)

      currentSkew += (targetSkew - currentSkew) * LERP_FACTOR
      currentBlur += (targetBlur - currentBlur) * LERP_FACTOR

      setSkew(currentSkew)

      // Only apply filter if meaningfully non-zero (avoids compositing overhead at rest)
      if (Math.abs(currentBlur) > 0.01) {
        el.style.filter = `blur(${currentBlur.toFixed(3)}px)`
      } else {
        el.style.filter = ''
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      // Reset transforms on unmount
      const node = wrapperRef.current
      if (node) {
        gsap.set(node, { skewY: 0 })
        node.style.filter = ''
      }
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ transformOrigin: 'center center' }}
    >
      {children}
    </div>
  )
}
