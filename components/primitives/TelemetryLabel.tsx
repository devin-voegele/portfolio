'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

type Props = {
  children: string
  className?: string
}

export default function TelemetryLabel({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      const line = lineRef.current
      const label = labelRef.current
      if (!container || !line || !label) return

      if (prefersReducedMotion()) {
        gsap.set(line, { scaleX: 1 })
        gsap.set(label, { opacity: 1 })
        return
      }

      gsap.set(line, { scaleX: 0 })

      const split = new SplitText(label, { type: 'chars' })
      gsap.set(split.chars, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
      })

      tl.to(line, { scaleX: 1, duration: 0.6, ease: 'power3.out' }).to(
        split.chars,
        { opacity: 1, duration: 0.03, stagger: 0.04, ease: 'none' },
        '-=0.1'
      )

      return () => {
        split.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
      className={className}
    >
      <span
        ref={lineRef}
        style={{
          display: 'inline-block',
          width: '48px',
          height: '1px',
          background: 'var(--accent)',
          transformOrigin: 'left',
          flexShrink: 0,
        }}
      />
      <span
        ref={labelRef}
        className="font-mono"
        style={{
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          color: 'var(--text-secondary)',
        }}
      >
        {children}
      </span>
    </div>
  )
}
