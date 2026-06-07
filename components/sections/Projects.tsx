'use client'

import { Lock } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

interface Project {
  title: string
  category: string
  year: string
  desc: string
  stack: string[]
  url?: string
  redacted?: boolean
}

const projects: Project[] = [
  {
    title: 'FormulaGod',
    category: 'WEB / MEDIA',
    year: '2024',
    desc: 'Motorsport media & marketing platform.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind'],
  },
  {
    title: 'GetMoneyMap',
    category: 'WEB / FINTECH',
    year: '2025',
    desc: 'Personal finance visualization platform. Interactive data mapping and budget tracking.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    url: 'https://getmoneymap.org',
  },
  {
    title: '[CLASSIFIED]',
    category: 'PLATFORM / SAAS',
    year: '2025',
    desc: 'Under wraps. Details unreleased.',
    stack: ['TypeScript', 'Cloud', 'Docker'],
    redacted: true,
  },
]

const ACCENT_COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const initial = project.redacted ? '?' : project.title.charAt(0)

  return (
    <div
      style={{
        height: '180px',
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Subtle gradient wash */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in srgb, ${accent} 12%, transparent), transparent)`,
        }}
      />

      {/* Ghost initial */}
      <span
        aria-hidden
        className="font-geist-sans"
        style={{
          fontSize: '7rem',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          color: accent,
          opacity: project.redacted ? 0.07 : 0.1,
          userSelect: 'none',
          filter: project.redacted ? 'blur(4px)' : 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {initial}
      </span>

      {/* Thin accent line at bottom */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Redacted overlay */}
      {project.redacted && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            zIndex: 2,
          }}
        >
          <Lock
            size={16}
            style={{ color: 'var(--text-muted)', flexShrink: 0 }}
            aria-hidden
          />
          <span
            className="font-mono"
            style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}
          >
            REDACTED
          </span>
        </div>
      )}
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="work"
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
          index="05"
          eyebrow="Work"
          title={
            <>
              Selected <span className="gradient-text">Projects</span>
            </>
          }
        />

        <FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
            }}
            className="projects-grid"
          >
            {projects.map((project, i) => {
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length]

              return (
                <article
                  key={project.title}
                  className="glass hover-lift"
                  style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ProjectVisual project={project} index={i} />

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                    {/* Category + year */}
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.18em',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Project name */}
                    <h3
                      className="font-geist-sans"
                      style={{
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        flexGrow: 1,
                      }}
                    >
                      {project.desc}
                    </p>

                    {/* Stack chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono"
                          style={{
                            fontSize: '0.65rem',
                            letterSpacing: '0.08em',
                            padding: '0.2rem 0.6rem',
                            border: '1px solid var(--border)',
                            borderRadius: '0.25rem',
                            color: 'var(--text-muted)',
                            background: 'rgba(255,255,255,0.03)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: '0.25rem' }}>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.875rem',
                            color: accent,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            transition: 'opacity 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                          View Project →
                        </a>
                      ) : project.redacted ? (
                        <span
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-muted)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          <Lock size={13} aria-hidden />
                          Classified
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
