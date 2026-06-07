import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

const categories = [
  {
    label: '// frontend',
    accentVar: '--accent',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
    ],
  },
  {
    label: '// backend & cloud',
    accentVar: '--accent-2',
    skills: ['Docker', 'AWS', 'Python', 'Kubernetes', 'CI/CD'],
  },
  {
    label: '// platform & process',
    accentVar: '--accent-3',
    skills: ['Azure Entra ID (IAM)', 'BPMN', 'CloudPods'],
  },
] as const

// Accent dot colors per category index
const dotColors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

export function Skills() {
  return (
    <section id="skills" className="relative" style={{ padding: '6rem 0' }}>
      {/* Subtle bg glow shifted right */}
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
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="relative mx-auto px-4"
        style={{ maxWidth: '64rem', zIndex: 1 }}
      >
        <SectionHeader
          index="02"
          eyebrow="Toolkit"
          title={
            <>
              My <span className="gradient-text">Stack</span>
            </>
          }
        />

        <FadeIn>
          <div className="flex flex-col gap-10">
            {categories.map(({ label, skills }, catIdx) => (
              <div key={label}>
                {/* Category label */}
                <p
                  className="font-mono uppercase mb-4"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: 'var(--accent-2)',
                  }}
                >
                  {label}
                </p>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="glass hover-lift rounded-xl flex items-center gap-2"
                      style={{ padding: '0.625rem 1rem' }}
                    >
                      {/* Accent dot */}
                      <span
                        style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          flexShrink: 0,
                          background: dotColors[catIdx],
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
