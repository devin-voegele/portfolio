'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

type Props = {
  to: number
  prefix?: string
  suffix?: string
  display?: string
  className?: string
}

export default function Counter({ to, prefix = '', suffix = '', display, className }: Props) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = spanRef.current
      if (!el || display) return

      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${to}${suffix}`
        return
      }

      const proxy = { value: 0 }
      el.textContent = `${prefix}0${suffix}`

      gsap.to(proxy, {
        value: to,
        duration: 2,
        ease: 'power2.out',
        snap: { value: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate() {
          el.textContent = `${prefix}${Math.round(proxy.value)}${suffix}`
        },
        onComplete() {
          el.textContent = `${prefix}${to}${suffix}`
        },
      })
    },
    { scope: spanRef, dependencies: [to, prefix, suffix, display] }
  )

  if (display) {
    return (
      <span ref={spanRef} className={className}>
        {prefix}
        {display}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
