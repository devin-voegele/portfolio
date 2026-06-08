'use client'

import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { TiltCard } from '@/components/primitives/TiltCard'
import Counter from '@/components/primitives/Counter'

const stats = [
  { to: 2, suffix: '+', label: 'Years Experience', accent: 'var(--accent)' },
  { to: 15, suffix: '+', label: 'Projects Built', accent: 'var(--accent-2)' },
  { display: 'PwC', label: 'Switzerland', accent: 'var(--accent-3)' },
  { to: 5, suffix: '+', label: 'Stacks', accent: 'var(--accent)' },
] as const

export function About() {
  return (
    <section id="about" className="relative" style={{ padding: '7rem 0' }}>
      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '60rem',
          height: '40rem',
          borderRadius: '9999px',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative mx-auto px-4" style={{ maxWidth: '72rem', zIndex: 1 }}>
        <SectionHeader
          index="01"
          eyebrow="About"
          title={
            <>
              Who <span className="gradient-text">I Am</span>
            </>
          }
        />

        {/* 2-col grid: bio left, profile card right */}
        <div
          className="grid items-center gap-12"
          style={{
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          {/* LEFT — bio + meta */}
          <FadeIn className="lg-col-bio">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}
            >
              I&apos;m a developer and creative technologist based in Würenlos,
              Switzerland, currently in platform development at PwC Switzerland.
              I build premium web experiences, motorsport media platforms, and
              interactive tools — and I work across cloud, automation, and
              identity infrastructure.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}
            >
              I care about building things that are as considered as they are
              fast — clean systems, sharp interfaces, and infrastructure that
              just works.
            </p>
            <p
              className="font-mono text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              Education: BZU Switzerland &nbsp;&middot;&nbsp; Languages: German
              (native), English (fluent)
            </p>
          </FadeIn>

          {/* RIGHT — glass profile card with tilt */}
          <FadeIn>
            <TiltCard intensity={8}>
              <div
                className="glass rounded-2xl"
                style={{
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  /* Subtle inner accent glow */
                  boxShadow: 'inset 0 0 60px rgba(37,99,235,0.05), 0 20px 60px rgba(0,0,0,0.4)',
                }}
              >
                {/* Corner accent glow */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '10rem',
                    height: '10rem',
                    background: 'radial-gradient(circle at top right, rgba(16,185,129,0.12), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Header row */}
                <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
                  {/* Pulsing green dot */}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--accent-2)',
                      animation: 'nav-pulse 2s ease-in-out infinite',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      color: 'var(--accent-2)',
                    }}
                  >
                    // profile
                  </span>
                </div>

                {/* Stats 2×2 grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                  }}
                >
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                      }}
                    >
                      <div
                        className="font-bold"
                        style={{
                          fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                          lineHeight: 1,
                          background: `linear-gradient(90deg, ${stat.accent}, var(--text-primary))`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        {'display' in stat ? (
                          <Counter display={stat.display as string} to={0} />
                        ) : (
                          <Counter to={stat.to as number} suffix={stat.suffix as string} />
                        )}
                      </div>
                      <p
                        className="font-mono"
                        style={{
                          fontSize: '0.65rem',
                          letterSpacing: '0.12em',
                          color: 'var(--text-muted)',
                          marginTop: '0.4rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </div>
      </div>

      {/* Responsive 2-col layout via inline style injection */}
      <style>{`
        @media (min-width: 1024px) {
          #about .grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  )
}
