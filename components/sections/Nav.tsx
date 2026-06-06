'use client'

import { useEffect, useRef, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        rafRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 32px',
        background: scrolled ? 'rgba(10,10,11,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s, backdrop-filter 0.4s, border 0.4s',
      }}
    >
      {/* LEFT: Monogram */}
      <div
        style={{
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '6px 10px',
          fontFamily: 'var(--font-display), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: '0.9rem',
          letterSpacing: '0.02em',
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        D.V.
      </div>

      {/* CENTER: Nav links */}
      <div className="nav-center" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="#work" className="nav-link">WORK</a>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
        <a href="#about" className="nav-link">ABOUT</a>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
        <a href="#contact" className="nav-link">CONTACT</a>
      </div>

      {/* RIGHT: Availability */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="nav-pulse-dot" />
        <span
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
          }}
        >
          Available for Work
        </span>
      </div>
    </nav>
  )
}
