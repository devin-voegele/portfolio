'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

type Props = {
  children: string
  as?: Tag
  trigger?: 'mount' | 'scroll'
  className?: string
}

export default function SplitReveal({
  children,
  as: Tag = 'p',
  trigger = 'mount',
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return

      const split = new SplitText(el, { type: 'lines,words', linesClass: 'split-line' })
      gsap.set(split.lines, { overflow: 'hidden' })

      const animProps = {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.07,
      }

      if (trigger === 'scroll') {
        gsap.fromTo(
          split.words,
          { yPercent: 120, opacity: 0, filter: 'blur(8px)' },
          {
            ...animProps,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      } else {
        gsap.fromTo(split.words, { yPercent: 120, opacity: 0, filter: 'blur(8px)' }, animProps)
      }

      return () => {
        split.revert()
      }
    },
    { scope: ref, dependencies: [children, trigger] }
  )

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className}>
      {children}
    </Tag>
  )
}
