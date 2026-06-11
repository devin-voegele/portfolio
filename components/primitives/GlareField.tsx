'use client'

import { useEffect, useRef } from 'react'

interface GlareFieldProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Group specular-glare tracker for liquid-glass cards.
 * One pointermove listener on the wrapper; every `.lq-glare` descendant
 * gets --gx/--gy (pointer position in its own local space) and --glow.
 * The glare gradient can sit *outside* a card, so light slides across
 * card boundaries like a sheet of glass. Costs nothing while idle.
 */
export function GlareField({ children, className, style }: GlareFieldProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const field = ref.current
    if (!field) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cards: { el: HTMLElement; left: number; top: number }[] = []
    let raf = 0
    let px = 0
    let py = 0

    const collect = () => {
      cards = Array.from(field.querySelectorAll<HTMLElement>('.lq-glare')).map((el) => {
        const r = el.getBoundingClientRect()
        return { el, left: r.left, top: r.top }
      })
    }

    const apply = () => {
      raf = 0
      for (const c of cards) {
        c.el.style.setProperty('--gx', `${px - c.left}px`)
        c.el.style.setProperty('--gy', `${py - c.top}px`)
      }
    }

    let inside = false

    const onEnter = () => {
      inside = true
      collect()
      for (const c of cards) c.el.style.setProperty('--glow', '1')
    }
    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      inside = false
      for (const c of cards) c.el.style.setProperty('--glow', '0')
    }
    // Rects shift when the page scrolls under a stationary pointer
    const onScroll = () => {
      if (!inside) return
      collect()
      if (!raf) raf = requestAnimationFrame(apply)
    }

    field.addEventListener('pointerenter', onEnter)
    field.addEventListener('pointermove', onMove)
    field.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      field.removeEventListener('pointerenter', onEnter)
      field.removeEventListener('pointermove', onMove)
      field.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
