'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function TrailCursor() {
  const lead = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const leadEl = lead.current!
    const xTo = gsap.quickTo(leadEl, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(leadEl, 'y', { duration: 0.35, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
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

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
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
        mixBlendMode: 'normal',
      }}
    />
  )
}
