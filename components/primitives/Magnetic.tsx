'use client'

import { useEffect, useRef } from 'react'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    // Disable on reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onPointerMove(e: PointerEvent) {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el.style.transition = 'transform 0.15s ease-out'
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }

    function onPointerLeave() {
      if (!el) return
      el.style.transition = 'transform 0.4s ease-out'
      el.style.transform = 'translate(0px, 0px)'
    }

    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerleave', onPointerLeave)

    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [strength])

  return (
    <span
      ref={wrapperRef}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  )
}
