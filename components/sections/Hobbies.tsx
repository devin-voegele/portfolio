'use client'

import { Clapperboard, Scissors, Gamepad2, Gauge, Car, Bike } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { TiltCard } from '@/components/primitives/TiltCard'
import type { LucideIcon } from 'lucide-react'

interface Hobby {
  name: string
  sub: string
  context: string
  icon: LucideIcon
}

const hobbies: Hobby[] = [
  { name: 'Motorsport Media',  sub: 'Content & Film',    context: 'Filming, editing & storytelling around racing.',       icon: Clapperboard },
  { name: 'Video Editing',     sub: 'Post-Production',   context: 'Cutting, color & motion for short-form and film.',      icon: Scissors      },
  { name: 'Sim Racing',        sub: 'Virtual Circuit',   context: 'Wheel-to-wheel racing on the sim rig.',                 icon: Gamepad2      },
  { name: 'Formula 1',         sub: 'Open Wheel',        context: 'Following the championship — tech, strategy, drama.',   icon: Gauge         },
  { name: 'GT3',               sub: 'Endurance Class',   context: 'GT3 machinery and endurance racing.',                   icon: Car           },
  { name: 'Enduro MTB',        sub: 'Trail & Descent',   context: 'Trails, descents and backcountry riding.',              icon: Bike          },
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

const ICON_BG_SEQUENCE = [
  'rgba(37,99,235,0.15)',
  'rgba(16,185,129,0.15)',
  'rgba(139,92,246,0.15)',
  'rgba(37,99,235,0.15)',
  'rgba(16,185,129,0.15)',
  'rgba(139,92,246,0.15)',
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
          <div className="hobbies-grid">
            {hobbies.map((hobby, i) => {
              const accent = ACCENT_SEQUENCE[i]
              const iconBg = ICON_BG_SEQUENCE[i]
              const monoIndex = `// 0${i + 1}`
              const Icon = hobby.icon

              return (
                <div
                  key={hobby.name}
                  className="hobby-card-tilt"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                <TiltCard
                  intensity={9}
                  className="hobby-card-tilt-inner"
                >
                  <div
                    className="glass hover-lift hobby-card-inner"
                    style={{
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '172px',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      gap: '0.75rem',
                      transition:
                        'transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease, border-color 0.3s ease',
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

                    {/* Top row: icon square + mono index */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Icon in tinted rounded square */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '2.25rem',
                          height: '2.25rem',
                          borderRadius: '0.5rem',
                          background: iconBg,
                          color: accent,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} aria-hidden />
                      </div>

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
                    </div>

                    {/* Bottom section: name + sub + context */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span
                        className="font-geist-sans"
                        style={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.2,
                        }}
                      >
                        {hobby.name}
                      </span>

                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.67rem',
                          letterSpacing: '0.1em',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {hobby.sub}
                      </span>

                      {/* context line */}
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                          marginTop: '0.3rem',
                          opacity: 0.8,
                        }}
                      >
                        {hobby.context}
                      </p>
                    </div>
                  </div>
                </TiltCard>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>

      <style>{`
        .hobbies-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 1024px) {
          .hobbies-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .hobby-card-tilt {
          animation-fill-mode: both;
        }
        .hobby-card-tilt-inner {
          height: 100%;
        }
        .hobby-card-inner:hover {
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 0 0 1px rgba(37,99,235,0.3), 0 16px 40px -12px rgba(0,0,0,0.6);
        }
      `}</style>
    </section>
  )
}
