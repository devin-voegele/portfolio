'use client'

import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

interface Hobby {
  name: string
  sub: string
}

const hobbies: Hobby[] = [
  { name: 'Motorsport Media', sub: 'Content & Film' },
  { name: 'Video Editing', sub: 'Post-Production' },
  { name: 'Sim Racing', sub: 'Virtual Circuit' },
  { name: 'Formula 1', sub: 'Open Wheel' },
  { name: 'GT3', sub: 'Endurance Class' },
  { name: 'Enduro MTB', sub: 'Trail & Descent' },
]

// Rotate blue → green → purple
const ACCENT_SEQUENCE = [
  'var(--accent)',
  'var(--accent-2)',
  'var(--accent-3)',
  'var(--accent)',
  'var(--accent-2)',
  'var(--accent-3)',
]

export function Hobbies() {
  return (
    <section
      id="hobbies"
      style={{ paddingBlock: '6rem' }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingInline: '1rem',
          width: '100%',
        }}
      >
        <SectionHeader
          index="06"
          eyebrow="Beyond Code"
          title={
            <>
              Off the <span className="gradient-text">Clock</span>
            </>
          }
        />

        <FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
            className="hobbies-grid"
          >
            {hobbies.map((hobby, i) => {
              const accent = ACCENT_SEQUENCE[i]
              const monoIndex = `// 0${i + 1}`

              return (
                <div
                  key={hobby.name}
                  className="glass hover-lift"
                  style={{
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    minHeight: '120px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Corner accent pip */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '3px',
                      height: '3rem',
                      background: accent,
                      borderRadius: '0 0.75rem 0 0',
                      opacity: 0.7,
                    }}
                  />

                  {/* Mono index */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: accent,
                    }}
                  >
                    {monoIndex}
                  </span>

                  {/* Hobby name */}
                  <span
                    className="font-geist-sans"
                    style={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {hobby.name}
                  </span>

                  {/* Sub-tag */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {hobby.sub}
                  </span>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hobbies-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
