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

const focusAreas = [
  {
    tag: '// web & product',
    text: 'Premium interfaces, interactive tools, and motion-driven experiences.',
    accent: 'var(--accent)',
  },
  {
    tag: '// platform & cloud',
    text: 'Infrastructure, automation pipelines, and identity (IAM).',
    accent: 'var(--accent-2)',
  },
  {
    tag: '// media',
    text: 'Motorsport content creation and video editing.',
    accent: 'var(--accent-3)',
  },
] as const

export function About() {
  return (
    <section id="about" className="relative" style={{ padding: '7rem 0', overflow: 'hidden' }}>
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
          className="grid items-start gap-12"
          style={{
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          {/* LEFT — bio + focus list */}
          <FadeIn className="lg-col-bio">
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}
            >
              I&apos;m a developer and creative technologist based in Würenlos,
              Switzerland, currently in platform development at PwC Switzerland.
              I build premium web experiences, motorsport media platforms, and
              interactive tools — working across cloud, automation, and identity
              infrastructure.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}
            >
              I care about building things that are as considered as they are
              fast — clean systems, sharp interfaces, and infrastructure that
              just works.
            </p>

            {/* Meta line */}
            <p
              className="font-mono"
              style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: '1.75rem' }}
            >
              Education: BZU Switzerland &nbsp;&middot;&nbsp; Languages: German (native), English (fluent)
            </p>

            {/* Thin divider */}
            <div
              aria-hidden
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--glass-border)',
                marginBottom: '1.5rem',
              }}
            />

            {/* Focus mini-list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {focusAreas.map(({ tag, text, accent }) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.875rem',
                    paddingLeft: '0.75rem',
                    borderLeft: `2px solid ${accent}`,
                  }}
                >
                  <div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.14em',
                        color: accent,
                        display: 'block',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {tag}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
                    marginBottom: '1.25rem',
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

                {/* Footer location line */}
                <div
                  style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '0.875rem',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    // würenlos, ch &nbsp;&middot;&nbsp; available
                  </span>
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
