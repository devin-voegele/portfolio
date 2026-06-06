'use client'

import SplitReveal from '@/components/primitives/SplitReveal'
import TelemetryLabel from '@/components/primitives/TelemetryLabel'
import MagneticButton from '@/components/primitives/MagneticButton'

export function Hero() {
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
      {/* Background: empty WebGL container (Task 16) */}
      <div
        id="hero-webgl"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Static fallback background / mobile / reduced-motion */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(46,107,255,0.10), transparent 60%)',
        }}
      />
      <div
        className="glow-orb"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '600px',
          height: '600px',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.5,
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
