'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SignalPit } from '@/components/lab/SignalPit'
import { usePerfMode } from '@/components/providers/PerfProvider'

/**
 * Homepage interlude that shows the /lab Signal Pit where it's safe to:
 * the heavy three+rapier chunk is only mounted once the section nears the
 * viewport AND the perf tier is 'full'. Everyone else (mobile, weak
 * machines, reduced motion) gets a lightweight glass teaser linking to
 * /lab — initial page load is untouched either way.
 */

const TEASER_DOTS = [
  { x: '12%', y: '58%', s: 22, c: '#3b82f6', r: '50%' },
  { x: '24%', y: '34%', s: 14, c: '#22d3ee', r: '50%' },
  { x: '38%', y: '66%', s: 26, c: '#8b5cf6', r: '22%' },
  { x: '55%', y: '30%', s: 18, c: '#10b981', r: '50%' },
  { x: '67%', y: '60%', s: 30, c: '#3b82f6', r: '22%' },
  { x: '80%', y: '38%', s: 16, c: '#22d3ee', r: '50%' },
  { x: '90%', y: '62%', s: 20, c: '#8b5cf6', r: '50%' },
]

export function LabSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const tier = usePerfMode()
  const [mountPit, setMountPit] = useState(false)

  useEffect(() => {
    if (tier !== 'full') return
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountPit(true)
          io.disconnect()
        }
      },
      // start loading the chunk well before the section is on screen
      { rootMargin: '600px 0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [tier])

  return (
    <section ref={sectionRef} id="playground" className="py-24 px-4 relative">
      {/* faint bg accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(34,211,238,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Interlude header — unnumbered on purpose, it sits between sections */}
        <div className="text-center mb-10">
          <p
            className="font-mono mb-2"
            style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-2)' }}
          >
            {'// PLAYGROUND'}
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            The <span className="gradient-text">Signal Pit</span>
          </h2>
          <p
            className="max-w-xl mx-auto mt-3 text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Real rigid-body physics, right here — your cursor is a force field, a click is a
            shockwave. Built with Three.js &amp; Rapier.
          </p>
        </div>

        {mountPit ? (
          <SignalPit height="min(58vh, 540px)" />
        ) : (
          /* Teaser — pure CSS, zero runtime cost */
          <Link
            href="/lab"
            className="lq lq-glare lq-hover relative block overflow-hidden"
            style={{ textDecoration: 'none' }}
          >
            {/* same height as the mounted pit — no layout shift on swap */}
            <div style={{ height: 'min(58vh, 540px)', minHeight: '420px', position: 'relative' }}>
              {/* grid floor suggestion */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(59,130,246,0.08), transparent 55%),' +
                    'repeating-linear-gradient(90deg, rgba(148,163,184,0.05) 0 1px, transparent 1px 44px),' +
                    'repeating-linear-gradient(0deg, rgba(148,163,184,0.04) 0 1px, transparent 1px 44px)',
                  maskImage: 'linear-gradient(to top, #000 30%, transparent 90%)',
                  WebkitMaskImage: 'linear-gradient(to top, #000 30%, transparent 90%)',
                }}
              />
              {/* static "bodies" */}
              {TEASER_DOTS.map((d, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: d.x,
                    top: d.y,
                    width: d.s,
                    height: d.s,
                    borderRadius: d.r,
                    background: d.c,
                    opacity: 0.75,
                    boxShadow: `0 6px 18px -4px ${d.c}66, inset 0 2px 4px rgba(255,255,255,0.35)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
              {/* CTA */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    color: 'var(--text-secondary)',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(59,130,246,0.35)',
                    background: 'rgba(59,130,246,0.10)',
                  }}
                >
                  ▶ ENTER THE SIGNAL PIT
                </span>
                <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                  THREE.JS × RAPIER PHYSICS
                </span>
              </div>
            </div>
          </Link>
        )}

        <p className="text-center mt-6">
          <Link
            href="/lab"
            className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.14em', textDecoration: 'none' }}
          >
            OPEN THE FULL LAB ↗
          </Link>
        </p>
      </div>
    </section>
  )
}
