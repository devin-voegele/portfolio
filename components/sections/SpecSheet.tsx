'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { SectionWipe } from '@/components/effects/SectionWipe'
import TelemetryLabel from '@/components/primitives/TelemetryLabel'

const MODULES = [
  {
    title: 'WEB EXPERIENCES',
    capabilities: 'Next.js · Three.js · GSAP · Full-stack',
  },
  {
    title: 'CREATIVE DEVELOPMENT',
    capabilities: 'Motion design · Interactive UI · WebGL',
  },
  {
    title: 'DIGITAL STRATEGY',
    capabilities: 'Brand · Platform architecture · Performance',
  },
]

const SKILLS = [
  'Next.js',
  'TypeScript',
  'React',
  'GSAP',
  'Three.js',
  'Framer Motion',
  'Tailwind CSS',
  'Docker',
  'AWS',
  'Python',
  'BPMN',
]

export function SpecSheet() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.spec-row', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.spec-chip', {
        y: 16,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    },
    { scope: sectionRef, dependencies: [] },
  )

  return (
    <SectionWipe>
      <section
        ref={sectionRef}
        id="spec"
        style={{
          paddingBlock: 'var(--space-16)',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingInline: '32px',
          position: 'relative',
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <TelemetryLabel>02 — SPEC SHEET</TelemetryLabel>
        </div>

        {/* Service modules */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          {MODULES.map((mod) => (
            <div
              key={mod.title}
              className="spec-row spec-module"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderTop: '1px solid var(--navy-line)',
                paddingBlock: 'var(--space-4)',
                gap: '24px',
              }}
            >
              <span
                className="font-mono spec-module-title"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.03em',
                  flexShrink: 0,
                  transition: 'color 0.2s ease',
                }}
              >
                {mod.title}
              </span>
              <span
                className="font-mono spec-module-caps"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.05em',
                  textAlign: 'right',
                  transition: 'color 0.2s ease',
                }}
              >
                {mod.capabilities}
              </span>
            </div>
          ))}
          {/* closing bottom border */}
          <div style={{ borderTop: '1px solid var(--navy-line)' }} />
        </div>

        {/* Skills stack */}
        <div>
          <div
            className="spec-row font-mono"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '16px',
            }}
          >
            SETUP // STACK
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-mono spec-chip"
                style={{
                  border: '1px solid var(--navy-line)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .spec-module:hover .spec-module-title {
          color: var(--accent);
        }
        .spec-module:hover .spec-module-caps {
          color: var(--accent);
        }
        .spec-chip:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        @media (max-width: 640px) {
          .spec-module {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .spec-module-caps {
            text-align: left !important;
          }
        }
      `}</style>
    </SectionWipe>
  )
}
