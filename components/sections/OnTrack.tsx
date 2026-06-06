'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { SectionWipe } from '@/components/effects/SectionWipe'
import TelemetryLabel from '@/components/primitives/TelemetryLabel'
import ProjectPlate from '@/components/primitives/ProjectPlate'

interface Project {
  index: number
  name: string
  category: string
  year: string
  description: string
  stack: string[]
  href?: string
  redacted?: boolean
}

const PROJECTS: Project[] = [
  {
    index: 1,
    name: 'FormulaGod',
    category: 'WEB / MEDIA',
    year: '2024',
    description: 'Motorsport media & marketing platform.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind'],
    href: undefined,
  },
  {
    index: 2,
    name: 'GetMoneyMap',
    category: 'WEB / FINTECH',
    year: '2025',
    description: 'Personal finance visualization platform. Interactive data mapping and budget tracking.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    href: 'https://getmoneymap.org',
  },
  {
    index: 3,
    name: '[CLASSIFIED]',
    category: 'PLATFORM / SAAS',
    year: '2025',
    description: 'Under wraps. Details unreleased.',
    stack: ['TypeScript', 'Cloud', 'Docker'],
    redacted: true,
  },
]

export function OnTrack() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Row entrance
      gsap.from('.ontrack-row', {
        y: 60,
        opacity: 0,
        rotateX: 6,
        transformOrigin: 'center top',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      // Plate parallax — desktop only
      const isDesktop =
        typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches

      if (isDesktop) {
        gsap.to('.ontrack-plate', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    { scope: sectionRef, dependencies: [] }
  )

  return (
    <SectionWipe>
      <section
        id="work"
        ref={sectionRef}
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingBlock: 'var(--space-16)',
          paddingInline: '32px',
          position: 'relative',
        }}
      >
        <style>{`
          .ontrack-row:hover .ontrack-plate {
            transform: scale(1.05);
          }
          .ontrack-plate {
            transition: transform 0.5s var(--ease-out-expo);
          }
          .ontrack-row:hover .plate-accent-line {
            height: 100% !important;
          }
          .view-project-link {
            transition: color 0.2s, gap 0.2s;
          }
          .view-project-link:hover {
            color: var(--accent-bright) !important;
          }
          .view-project-link:hover .link-arrow {
            transform: translateX(4px);
          }
          .link-arrow {
            display: inline-block;
            transition: transform 0.2s var(--ease-out-expo);
          }
          @media (max-width: 767px) {
            .ontrack-grid {
              grid-template-columns: 1fr !important;
            }
            .ontrack-plate-cell {
              order: -1 !important;
            }
          }
        `}</style>

        <div style={{ marginBottom: 'var(--space-12)' }}>
          <TelemetryLabel>01 — ON TRACK</TelemetryLabel>
        </div>

        <div>
          {PROJECTS.map((project, rowIndex) => {
            const isEven = rowIndex % 2 === 0
            const idx = String(project.index).padStart(2, '0')

            const plateCell = (
              <div
                className="ontrack-plate-cell"
                style={{ order: isEven ? 0 : 1 }}
              >
                <ProjectPlate
                  index={project.index}
                  name={project.name}
                  redacted={project.redacted}
                />
              </div>
            )

            const textCell = (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  order: isEven ? 1 : 0,
                }}
              >
                {/* Mono index */}
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                  }}
                >
                  // {idx}
                </span>

                {/* Project name */}
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    marginTop: '8px',
                  }}
                >
                  {project.name}
                </h2>

                {/* Category + year */}
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-2)',
                  }}
                >
                  {project.category} // {project.year}
                </span>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    maxWidth: '440px',
                    marginTop: 'var(--space-3)',
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>

                {/* Stack chips */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: 'var(--space-3)',
                  }}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--navy-line)',
                        borderRadius: '9999px',
                        padding: '4px 12px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {project.href && !project.redacted && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-link font-mono"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--accent)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginTop: 'var(--space-4)',
                      textDecoration: 'none',
                    }}
                  >
                    VIEW PROJECT{' '}
                    <span className="link-arrow">→</span>
                  </a>
                )}

                {project.redacted && (
                  <span
                    className="font-mono"
                    style={{
                      display: 'inline-block',
                      color: 'var(--text-muted)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      marginTop: 'var(--space-4)',
                    }}
                  >
                    // ACCESS DENIED
                  </span>
                )}
              </div>
            )

            return (
              <div
                key={project.index}
                className="ontrack-row ontrack-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-8)',
                  alignItems: 'center',
                  marginBottom: rowIndex < PROJECTS.length - 1 ? 'var(--space-16)' : 0,
                }}
              >
                {isEven ? (
                  <>
                    {plateCell}
                    {textCell}
                  </>
                ) : (
                  <>
                    {textCell}
                    {plateCell}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </SectionWipe>
  )
}
