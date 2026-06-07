import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: 'PwC', label: 'Switzerland' },
  { value: '15+', label: 'Projects Built' },
] as const

export function About() {
  return (
    <section id="about" className="relative" style={{ padding: '6rem 0' }}>
      {/* Faint radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60rem',
          height: '40rem',
          borderRadius: '9999px',
          background:
            'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="relative mx-auto px-4"
        style={{ maxWidth: '64rem', zIndex: 1 }}
      >
        <SectionHeader
          index="01"
          eyebrow="About"
          title={
            <>
              Who <span className="gradient-text">I Am</span>
            </>
          }
        />

        <FadeIn>
          {/* Bio copy */}
          <div className="mx-auto" style={{ maxWidth: '44rem' }}>
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
              style={{ color: 'var(--text-secondary)' }}
            >
              I care about building things that are as considered as they are
              fast — clean systems, sharp interfaces, and infrastructure that
              just works.
            </p>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-4 mx-auto"
            style={{ maxWidth: '36rem', marginTop: '2.5rem' }}
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="glass hover-lift rounded-xl text-center"
                style={{ padding: '1.25rem 1rem' }}
              >
                <p
                  className="font-bold gradient-text"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)', lineHeight: 1 }}
                >
                  {value}
                </p>
                <p
                  className="font-mono uppercase"
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    marginTop: '0.5rem',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Meta row */}
          <p
            className="font-mono text-sm text-center"
            style={{ color: 'var(--text-muted)', marginTop: '1.75rem' }}
          >
            Education: BZU Switzerland &nbsp;&middot;&nbsp; Languages: German
            (native), English (fluent)
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
