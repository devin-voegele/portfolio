'use client'

import { useEffect, useRef, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef(false)

  useEffect(() => {
    function onScroll() {
      if (pendingRef.current) return
      pendingRef.current = true
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        pendingRef.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(8,11,20,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--navy-line)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, border-bottom 0.4s ease',
      }}
    >
      {/* LEFT: monogram */}
      <div
        style={{
          border: '1px solid var(--navy-line)',
          borderRadius: '6px',
          padding: '6px 10px',
          fontFamily: 'var(--font-display), "Arial Narrow", sans-serif',
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          color: 'var(--text-primary)',
          userSelect: 'none',
        }}
      >
        D.V.
      </div>

      {/* CENTER: nav links */}
      <div className="v2nav-center" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <a href="#work" className="v2nav-link">01 WORK</a>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>//</span>
        <a href="#spec" className="v2nav-link">02 SPEC</a>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>//</span>
        <a href="#offtrack" className="v2nav-link">03 OFF TRACK</a>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>//</span>
        <a href="#contact" className="v2nav-link">CONTACT</a>
      </div>

      {/* RIGHT: status indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="v2nav-pulse-dot" />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
          }}
        >
          // SYSTEMS ONLINE
        </span>
      </div>
    </nav>
  )
}
