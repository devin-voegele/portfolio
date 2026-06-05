'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

interface SplitRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  trigger?: 'mount' | 'scroll'
  className?: string
}

export default function SplitReveal({
  children,
  as: Tag = 'p',
  trigger = 'mount',
  className,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return

      const split = new SplitText(el, { type: 'lines,words', linesClass: 'split-line' })
      gsap.set(split.lines, { overflow: 'hidden' })

      const tweenVars: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.08,
      }

      if (trigger === 'scroll') {
        tweenVars.scrollTrigger = {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }

      gsap.from(split.words, {
        yPercent: 100,
        opacity: 0,
        ...tweenVars,
      })

      return () => {
        split.revert()
      }
    },
    { scope: ref, dependencies: [trigger] }
  )

  return (
    <Tag ref={ref as React.Ref<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>} className={className}>
      {children}
    </Tag>
  )
}
