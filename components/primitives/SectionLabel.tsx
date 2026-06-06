'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  fontWeight: 500,
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      // Resolved after mount only — keeps server/client markup identical (no hydration mismatch).
      if (prefersReducedMotion()) {
        gsap.set(el, { letterSpacing: '0.1em' })
        return
      }

      gsap.set(el, { letterSpacing: '0.3em' })

      gsap.to(el, {
        letterSpacing: '0.1em',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    },
    { scope: ref }
  )

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...labelStyle,
        letterSpacing: '0.3em',
      }}
    >
      {children}
    </span>
  )
}
