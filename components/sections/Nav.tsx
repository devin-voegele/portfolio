'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SECTION_LINKS = [
  { label: 'About',    hash: 'about' },
  { label: 'Skills',   hash: 'skills' },
  { label: 'Cloud',    hash: 'cloud' },
  { label: 'Homelab',  hash: 'homelab' },
  { label: 'Work',     hash: 'work' },
  { label: 'Hobbies',  hash: 'hobbies' },
  { label: 'Contact',  hash: 'contact' },
]

// Stagger container — children pop in after the bar expands
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.04,
    },
  },
  exit: {},
}

const itemVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.8 },
  visible: { opacity: 1, y:  0, scale: 1,  transition: { type: 'spring', stiffness: 500, damping: 22 } },
  exit:    { opacity: 0, y: -6, scale: 0.8, transition: { duration: 0.08 } },
}

export function Nav() {
  const pathname  = usePathname()
  const isHome    = pathname === '/'
  const prefersReduced = useReducedMotion()

  // visible state: non-home pages start visible; home starts hidden
  const [visible, setVisible] = useState(!isHome)

  // IntersectionObserver on #top (hero) — only on home
  useEffect(() => {
    if (!isHome) {
      setVisible(true)
      return
    }
    const hero = document.getElementById('top')
    if (!hero) {
      setVisible(true)
      return
    }
    // rootMargin: trigger when hero is ~45% scrolled past the top of viewport
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { root: null, rootMargin: '-45% 0px 0px 0px', threshold: 0 },
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [isHome])

  // Build href for a section anchor — bare hash on home (Lenis), full path off home
  const sectionHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`)

  // Spring transition — bypass for reduced-motion (use a plain fade)
  const springTransition = prefersReduced
    ? { duration: 0.18 }
    : { type: 'spring' as const, stiffness: 430, damping: 15, mass: 0.9 }

  const navInitial = prefersReduced
    ? { opacity: 0, x: '-50%' }
    : { opacity: 0, scaleX: 0.15, scale: 0.6, y: -18, x: '-50%' }

  const navAnimate = prefersReduced
    ? { opacity: 1, x: '-50%' }
    : { opacity: 1, scaleX: 1, scale: 1, y: 0, x: '-50%' }

  const navExit = prefersReduced
    ? { opacity: 0, x: '-50%' }
    : { opacity: 0, scaleX: 0.15, scale: 0.6, y: -18, x: '-50%' }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Primary"
          key="primary-nav"
          initial={navInitial}
          animate={navAnimate}
          exit={navExit}
          transition={springTransition}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            zIndex: 1000,
            transformOrigin: 'center',
            // Solid translucent pill — no backdrop-filter (that re-blurred the page
            // behind the fixed nav every scroll frame, costly on weak GPUs).
            background: 'rgba(17,18,22,0.92)',
            border: '1px solid var(--glass-border)',
            borderRadius: '9999px',
            padding: '0.45rem 1rem',
            // lift shadow
            boxShadow:
              '0 4px 24px -4px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.35)',
            // prevent overflow-x bleed on the page
            maxWidth: 'calc(100vw - 1.5rem)',
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.1rem',
              // scrollable inner row on narrow viewports
              overflowX: 'auto',
              overflowY: 'visible',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Hide webkit scrollbar on the inner row */}
            <style>{`.nav-inner::-webkit-scrollbar { display: none; }`}</style>

            {/* DV monogram — home/#top or / (non-home) */}
            <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
              <Link
                href={isHome ? '#top' : '/'}
                aria-label="Go to top"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.9rem',
                  height: '1.9rem',
                  borderRadius: '50%',
                  border: '1px solid var(--glass-border)',
                  fontFamily: 'var(--font-display), "Arial Narrow", sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  userSelect: 'none',
                  flexShrink: 0,
                  transition: 'border-color 0.25s ease, color 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--accent)'
                  el.style.color = 'var(--accent)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--glass-border)'
                  el.style.color = 'var(--text-primary)'
                }}
              >
                DV
              </Link>
            </motion.div>

            {/* Thin divider after monogram */}
            <motion.div
              variants={itemVariants}
              aria-hidden
              style={{
                width: '1px',
                height: '1rem',
                background: 'var(--glass-border)',
                flexShrink: 0,
                margin: '0 0.5rem',
              }}
            />

            {/* Section links */}
            {SECTION_LINKS.map(({ label, hash }) => (
              <motion.div key={hash} variants={itemVariants} style={{ flexShrink: 0 }}>
                <a
                  href={sectionHref(hash)}
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.5rem',
                    fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--text-primary)'
                    el.style.background = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--text-secondary)'
                    el.style.background = 'transparent'
                  }}
                >
                  {label}
                </a>
              </motion.div>
            ))}

            {/* Thin divider before Blog */}
            <motion.div
              variants={itemVariants}
              aria-hidden
              style={{
                width: '1px',
                height: '1rem',
                background: 'var(--glass-border)',
                flexShrink: 0,
                margin: '0 0.35rem',
              }}
            />

            {/* Lab — violet-tinted pill */}
            <motion.div variants={itemVariants} style={{ flexShrink: 0, marginRight: '0.3rem' }}>
              <Link
                href="/lab"
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.65rem',
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: '#a78bfa',
                  textDecoration: 'none',
                  borderRadius: '9999px',
                  border: '1px solid rgba(139,92,246,0.35)',
                  background: 'rgba(139,92,246,0.10)',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(139,92,246,0.20)'
                  el.style.borderColor = 'rgba(139,92,246,0.65)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(139,92,246,0.10)'
                  el.style.borderColor = 'rgba(139,92,246,0.35)'
                  el.style.color = '#a78bfa'
                }}
              >
                Lab
              </Link>
            </motion.div>

            {/* Blog — accent-tinted pill */}
            <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
              <Link
                href="/blog"
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.65rem',
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: 'var(--accent-bright)',
                  textDecoration: 'none',
                  borderRadius: '9999px',
                  border: '1px solid rgba(37,99,235,0.35)',
                  background: 'rgba(37,99,235,0.10)',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(37,99,235,0.20)'
                  el.style.borderColor = 'rgba(37,99,235,0.65)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(37,99,235,0.10)'
                  el.style.borderColor = 'rgba(37,99,235,0.35)'
                  el.style.color = 'var(--accent-bright)'
                }}
              >
                Writing
              </Link>
            </motion.div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
