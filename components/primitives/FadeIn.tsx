'use client'

import React, { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  /** HTML tag to render, defaults to 'div' */
  as?: string
}

export function FadeIn({ children, className, as = 'div' }: FadeInProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If user prefers reduced motion, mark visible immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return React.createElement(
    as,
    {
      ref,
      className: `fade-in-section${className ? ` ${className}` : ''}`,
    },
    children
  )
}
