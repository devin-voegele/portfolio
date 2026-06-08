'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt in degrees (default 10) */
  intensity?: number
}

export function TiltCard({ children, className, intensity = 10 }: TiltCardProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [disabled, setDisabled] = useState(true)

  // Detect reduced-motion + coarse pointer (touch) on mount — SSR safe
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setDisabled(reducedMotion || coarse)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      const el = outerRef.current
      const inner = innerRef.current
      if (!el || !inner) return

      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 … +0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5   // -0.5 … +0.5

      inner.style.transform = `rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(4px)`
    },
    [disabled, intensity]
  )

  const onPointerLeave = useCallback(() => {
    const inner = innerRef.current
    if (!inner) return
    inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }, [])

  return (
    <div
      ref={outerRef}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ perspective: '800px' }}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
