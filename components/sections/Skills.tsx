'use client'

import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { TiltCard } from '@/components/primitives/TiltCard'

const categories = [
  {
    label: '// frontend',
    accentVar: 'var(--accent)',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
  },
  {
    label: '// backend & cloud',
    accentVar: 'var(--accent-2)',
    skills: ['Docker', 'AWS', 'Python', 'Kubernetes', 'CI/CD'],
  },
  {
    label: '// platform & process',
    accentVar: 'var(--accent-3)',
    skills: ['Azure Entra ID (IAM)', 'BPMN', 'CloudPods'],
  },
] as const

export function Skills() {
  return (
    <section id="skills" className="relative" style={{ padding: '7rem 0' }}>
      {/* Bg glow shifted right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          transform: 'translateY(-50%)',
          width: '40rem',
          height: '40rem',
          borderRadius: '9999px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative mx-auto px-4" style={{ maxWidth: '72rem', zIndex: 1 }}>
        <SectionHeader
          index="02"
          eyebrow="Toolkit"
          title={
            <>
              My <span className="gradient-text">Stack</span>
            </>
          }
        />

        <div className="flex flex-col" style={{ gap: '3rem' }}>
          {categories.map(({ label, accentVar, skills }) => (
            <div key={label}>
              {/* Category label */}
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  color: accentVar,
                  marginBottom: '1.25rem',
                }}
              >
                {label}
              </p>

              {/* Staggered skill tile grid */}
              <FadeIn>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                  }}
                  className="skills-grid"
                >
                  {skills.map((skill, idx) => (
                    <TiltCard key={skill} intensity={6}>
                      <div
                        className="glass hover-lift rounded-xl flex items-center gap-3"
                        style={{
                          padding: '0.875rem 1.125rem',
                          opacity: 0,
                          animation: `skill-fade-in 0.5s var(--ease-out-expo) forwards`,
                          animationDelay: `${idx * 80}ms`,
                          /* Per-category accent border glow on hover */
                          transition:
                            'transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease, border-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget
                          el.style.borderColor = accentVar.replace('var(', '').replace(')', '')
                            ? accentVar
                            : 'var(--border-hover)'
                          el.style.boxShadow = `0 0 20px -4px ${accentVar.replace('var(--accent)', 'rgba(37,99,235,0.25)').replace('var(--accent-2)', 'rgba(16,185,129,0.25)').replace('var(--accent-3)', 'rgba(139,92,246,0.25)')}`
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget
                          el.style.borderColor = ''
                          el.style.boxShadow = ''
                        }}
                      >
                        {/* Accent dot */}
                        <span
                          style={{
                            display: 'inline-block',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            flexShrink: 0,
                            background: accentVar,
                            opacity: 0.85,
                          }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {skill}
                        </span>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive grid columns + stagger keyframe */}
      <style>{`
        @media (min-width: 640px) { #skills .skills-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 768px) { #skills .skills-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @keyframes skill-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
