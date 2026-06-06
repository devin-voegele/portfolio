'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SplitReveal from '@/components/primitives/SplitReveal'
import TelemetryLabel from '@/components/primitives/TelemetryLabel'
import MagneticButton from '@/components/primitives/MagneticButton'

const VelocityField = dynamic(() => import('@/components/3d/VelocityField'), { ssr: false })

export function Hero() {
  const [webgl, setWebgl] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width:768px)').matches
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setWebgl(desktop && !noMotion)
  }, [])

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 32px',
        overflow: 'hidden',
      }}
    >
      {/* Background: WebGL container (Task 16) */}
      <div
        id="hero-webgl"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        {webgl && <VelocityField />}
      </div>

      {/* Static fallback background / mobile / reduced-motion.
          Fully-inset radial layers — contained glow with no clippable element edge,
          so no hard "band" can appear at any viewport edge. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 55% at 28% 38%, rgba(46,107,255,0.13), transparent 70%), radial-gradient(circle 40% at 82% 18%, rgba(91,157,255,0.06), transparent 60%)',
        }}
      />

      {/* Vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <TelemetryLabel>WÜRENLOS, CH // 47.4373° N — 2026</TelemetryLabel>

        {/* Three-line headline */}
        <div style={{ marginTop: 'var(--space-3)' }}>
          <SplitReveal as="h1" trigger="mount" className="font-display hero-headline">
            DEVELOPER.
          </SplitReveal>
          <SplitReveal as="h1" trigger="mount" className="font-display hero-headline">
            CREATIVE
          </SplitReveal>
          <SplitReveal as="h1" trigger="mount" className="font-display hero-headline">
            TECHNOLOGIST.
          </SplitReveal>
        </div>

        {/* Subline */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            maxWidth: '480px',
            marginTop: 'var(--space-3)',
            lineHeight: 1.6,
          }}
        >
          Building premium web experiences at race pace.
        </p>

        {/* Button row */}
        <div
          style={{
            marginTop: 'var(--space-6)',
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton href="#work" variant="solid">
            VIEW WORK →
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            GET IN TOUCH
          </MagneticButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="font-mono"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'var(--space-4)',
          left: '32px',
          zIndex: 2,
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>SCROLL // 00</span>
        <span
          style={{
            display: 'inline-block',
            width: '1px',
            height: '24px',
            background: 'var(--text-muted)',
            animation: 'heroScrollLine 1.4s ease-in-out infinite',
            opacity: 0.6,
          }}
        />
      </div>

      <style>{`
        .hero-headline {
          color: var(--text-primary);
          line-height: 0.9 !important;
          margin: 0 !important;
        }
        @keyframes heroScrollLine {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(0.4); opacity: 0.2; }
        }
      `}</style>
    </section>
  )
}
