'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let rafId: number | null = null

    function update() {
      rafId = null
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      if (bar) {
        bar.style.transform = `scaleX(${progress})`
      }
    }

    function onScroll() {
      if (rafId === null) {
        rafId = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Set initial value
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: '100%',
        zIndex: 10001,
        pointerEvents: 'none',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))',
      }}
    />
  )
}
