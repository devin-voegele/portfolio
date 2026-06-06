'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import SectionLabel from '@/components/primitives/SectionLabel'
import SplitReveal from '@/components/primitives/SplitReveal'
import MagneticButton from '@/components/primitives/MagneticButton'

const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false })

export function Hero() {
  const [particlesEnabled, setParticlesEnabled] = useState(false)

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setParticlesEnabled(isDesktop && !prefersReduced)
  }, [])

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '32px',
        paddingRight: '32px',
      }}
    >
      {/* Background depth layer */}
      <div id="hero-particles" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {particlesEnabled && <ParticleField />}
      </div>

      {/* Glow orbs */}
      <div
        className="glow-orb"
        style={{
          top: '-200px',
          right: '-200px',
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        className="glow-orb"
        style={{
          bottom: '-200px',
          left: '-200px',
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
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
        <SectionLabel>WÜRENLOS, SWITZERLAND — 2026</SectionLabel>

        {/* Headline — three stacked lines */}
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
            marginBottom: 0,
          }}
        >
          Building premium web experiences from Switzerland.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            marginTop: 'var(--space-6)',
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton href="#work" variant="solid">VIEW WORK</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">GET IN TOUCH</MagneticButton>
        </div>
      </div>
    </section>
  )
}
