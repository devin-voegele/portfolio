'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = dot.current
    if (!el) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY) }
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null
      const on = !!t?.closest('a, button, [data-cursor]')
      gsap.to(el, {
        scale: on ? 3.6 : 1,
        backgroundColor: on ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.8)',
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: on ? 1 : 0,
        duration: 0.3,
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
      ref={dot}
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, width: 10, height: 10,
        marginTop: -5, marginLeft: -5, borderRadius: '50%',
        background: 'rgba(255,255,255,0.8)',
        borderStyle: 'solid', borderWidth: 0, borderColor: 'rgba(255,255,255,0.8)',
        boxSizing: 'border-box',
        mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 9999,
      }}
    />
  )
}
