'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import SplitReveal from '@/components/primitives/SplitReveal'
import ProjectPlate from '@/components/primitives/ProjectPlate'

interface Project {
  name: string
  category: string
  year: string
  description: string
  stack: string[]
  href?: string
  redacted?: boolean
}

const projects: Project[] = [
  {
    name: 'FormulaGod',
    category: 'WEB / MEDIA',
    year: '2024',
    description: 'Motorsport media & marketing platform.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind'],
    href: undefined,
  },
  {
    name: 'GetMoneyMap',
    category: 'WEB / FINTECH',
    year: '2025',
    description: 'Personal finance visualization platform. Interactive data mapping and budget tracking.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    href: 'https://getmoneymap.org',
  },
  {
    name: '[REDACTED]',
    category: 'PLATFORM / SAAS',
    year: '2025',
    description: 'This project is currently under wraps. Details unreleased.',
    stack: ['TypeScript', 'Cloud', 'Docker'],
    redacted: true,
  },
]

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el || prefersReducedMotion()) return

      gsap.registerPlugin(ScrollTrigger)

      // Stagger entrance for rows
      gsap.from('.work-row', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      })

      // Parallax on desktop only
      if (!prefersReducedMotion() && window.matchMedia('(min-width: 768px)').matches) {
        gsap.to('.work-plate', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        paddingBlock: 'var(--space-16)',
        maxWidth: '1280px',
        margin: '0 auto',
        paddingInline: '32px',
        position: 'relative',
      }}
    >
      <style>{`
        .work-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-8);
          align-items: center;
          margin-bottom: var(--space-16);
          transition: transform 0.4s var(--ease-out-expo);
        }
        .work-row:hover {
          transform: translateY(-4px);
        }
        .work-row:hover .work-plate {
          transform: scale(1.04);
          transition: transform 0.5s var(--ease-out-expo) !important;
        }
        .work-row:hover .plate-accent-line {
          height: 100% !important;
        }
        .work-row-redacted:hover {
          cursor: default;
        }
        .work-plate {
          transition: transform 0.5s var(--ease-out-expo);
        }
        .work-link-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-primary);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: var(--space-4);
          text-decoration: none;
          position: relative;
        }
        .work-link-arrow::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s var(--ease-out-expo);
        }
        .work-link-arrow:hover::after {
          width: 100%;
        }
        .work-link-arrow .arrow {
          display: inline-block;
          transition: transform 0.3s var(--ease-out-expo);
        }
        .work-link-arrow:hover .arrow {
          transform: translateX(4px);
        }
        @media (max-width: 767px) {
          .work-row {
            grid-template-columns: 1fr !important;
          }
          .work-cell-plate {
            order: 0 !important;
          }
          .work-cell-text {
            order: 1 !important;
          }
        }
      `}</style>

      <SplitReveal as="h2" trigger="scroll" className="font-display" >
        SELECTED WORK.
      </SplitReveal>

      <div style={{ marginBottom: 'var(--space-12)' }} />

      {projects.map((project, i) => {
        const plateFirst = i % 2 === 0

        const plateCell = (
          <div
            key="plate"
            className="work-cell-plate"
            style={{ order: plateFirst ? 0 : 1 }}
          >
            <ProjectPlate index={i + 1} name={project.name} redacted={project.redacted} />
          </div>
        )

        const textCell = (
          <div
            key="text"
            className="work-cell-text"
            style={{ order: plateFirst ? 1 : 0 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: 0,
              }}
            >
              {project.name}
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  fontVariant: 'small-caps',
                }}
              >
                {project.category}
              </span>
              <span style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>·</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                }}
              >
                {project.year}
              </span>
            </div>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                maxWidth: '420px',
                marginTop: 'var(--space-3)',
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: 'var(--space-3)',
              }}
            >
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '9999px',
                    padding: '4px 12px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.href && !project.redacted && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="work-link-arrow"
              >
                View Project <span className="arrow">→</span>
              </a>
            )}

            {project.redacted && (
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  opacity: 0.5,
                  marginTop: 'var(--space-4)',
                  fontVariant: 'small-caps',
                }}
              >
                DETAILS UNRELEASED
              </span>
            )}
          </div>
        )

        return (
          <div
            key={project.name}
            className={`work-row${project.redacted ? ' work-row-redacted' : ''}`}
          >
            {plateCell}
            {textCell}
          </div>
        )
      })}
    </section>
  )
}
