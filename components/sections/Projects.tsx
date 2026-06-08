'use client'

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { TiltCard } from '@/components/primitives/TiltCard'

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

const ACCENT_COLORS = [
  { color: 'var(--accent)', rgb: '37,99,235' },
  { color: 'var(--accent-2)', rgb: '16,185,129' },
  { color: 'var(--accent-3)', rgb: '139,92,246' },
]

function ProjectVisualPlate({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const initial = project.redacted ? '?' : project.title.charAt(0)

  return (
    <TiltCard intensity={7} className="w-full">
      <div
        className="glass"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '1rem',
          minHeight: '320px',
          aspectRatio: '16/10',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          boxShadow: hovered
            ? `0 8px 40px -8px rgba(${accent.rgb},0.3)`
            : '0 4px 20px -4px rgba(0,0,0,0.4)',
          borderColor: hovered
            ? `rgba(${accent.rgb},0.4)`
            : 'var(--glass-border)',
        }}
      >
        {/* radial gradient wash */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(${accent.rgb},0.14), transparent 70%)`,
            transition: 'opacity 0.3s ease',
            opacity: hovered ? 1 : 0.7,
          }}
        />

        {/* top-left grid accent dot pattern */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '5px',
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: accent.color,
              }}
            />
          ))}
        </div>

        {/* ghost initial */}
        <span
          aria-hidden
          className="font-geist-sans"
          style={{
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            color: accent.color,
            opacity: project.redacted ? 0.06 : 0.12,
            userSelect: 'none',
            filter: project.redacted ? 'blur(6px)' : 'none',
            position: 'relative',
            zIndex: 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {initial}
        </span>

        {/* accent line — bottom, sweeps on hover */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: hovered ? '0' : '20%',
            right: hovered ? '0' : '20%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
            opacity: hovered ? 0.9 : 0.4,
            transition: 'left 0.4s var(--ease-out-expo), right 0.4s var(--ease-out-expo), opacity 0.3s ease',
          }}
        />

        {/* redacted overlay */}
        {project.redacted && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              zIndex: 2,
              background: 'rgba(10,10,10,0.2)',
            }}
          >
            <Lock
              size={20}
              style={{ color: 'var(--text-muted)', flexShrink: 0 }}
              aria-hidden
            />
            <span
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                color: 'var(--text-muted)',
              }}
            >
              CLASSIFIED
            </span>
          </div>
        )}
      </div>
    </TiltCard>
  )
}

function ProjectTextBlock({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        padding: '0.5rem 0',
      }}
    >
      {/* category + year */}
      <div
        className="font-mono"
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          color: 'var(--text-muted)',
          display: 'flex',
          gap: '1.25rem',
        }}
      >
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>

      {/* project name */}
      <h3
        className="font-geist-sans"
        style={{
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h3>

      {/* accent rule */}
      <div
        style={{
          width: '2.5rem',
          height: '3px',
          borderRadius: '9999px',
          background: accent.color,
          opacity: 0.8,
        }}
      />

      {/* description */}
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '32rem',
        }}
      >
        {project.desc}
      </p>

      {/* stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              padding: '0.25rem 0.65rem',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
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
              fontSize: '0.9rem',
              color: accent.color,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500,
              transition: 'opacity 0.2s ease, gap 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.75'
              e.currentTarget.style.gap = '0.55rem'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.gap = '0.35rem'
            }}
          >
            View Project →
          </a>
        ) : project.redacted ? (
          <span
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Lock size={14} aria-hidden />
            Classified
          </span>
        ) : null}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="work"
      style={{ paddingBlock: '6rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* faint radial */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(16,185,129,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingInline: '1rem',
          width: '100%',
          position: 'relative',
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

        {/* alternating rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {projects.map((project, i) => {
            const isEven = i % 2 === 0
            return (
              <FadeIn key={project.title}>
                <div
                  className="project-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '2rem',
                    alignItems: 'center',
                  }}
                  data-reverse={isEven ? 'false' : 'true'}
                >
                  {/* visual — always first on mobile */}
                  <div className={`project-visual${isEven ? '' : ' project-visual-right'}`}>
                    <ProjectVisualPlate project={project} index={i} />
                  </div>

                  {/* text */}
                  <div className={`project-text${isEven ? '' : ' project-text-left'}`}>
                    <ProjectTextBlock project={project} index={i} />
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .project-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
          /* even index: visual left, text right — default order */
          .project-visual { grid-column: 1; grid-row: 1; }
          .project-text { grid-column: 2; grid-row: 1; }
          /* odd index: text left, visual right — swap */
          .project-visual-right { grid-column: 2 !important; grid-row: 1; }
          .project-text-left { grid-column: 1 !important; grid-row: 1; }
        }
      `}</style>
    </section>
  )
}
