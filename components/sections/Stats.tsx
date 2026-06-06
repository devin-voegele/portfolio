'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '2+', label: 'YEARS EXPERIENCE' },
  { value: 'PwC', label: 'SWITZERLAND' },
  { value: '15+', label: 'PROJECTS BUILT' },
  { value: 'Available', label: 'WORLDWIDE' },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.stat-cell', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={containerStyle} className="stats-container">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-cell"
            style={{ ...cellStyle, ...(i > 0 ? cellBorderStyle : {}) }}
          >
            <span style={valueStyle}>{stat.value}</span>
            <span style={labelStyle}>{stat.label}</span>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .stats-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: var(--space-6, 1.5rem) !important;
          }
          .stat-cell {
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  width: '100%',
  paddingBlock: 'var(--space-8)',
  borderTop: '1px solid var(--border)',
  borderBottom: '1px solid var(--border)',
}

const containerStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  paddingInline: 'var(--space-6, 1.5rem)',
  display: 'flex',
  flexWrap: 'wrap',
}

const cellStyle: React.CSSProperties = {
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column',
  paddingInline: 'var(--space-6, 1.5rem)',
}

const cellBorderStyle: React.CSSProperties = {
  borderLeft: '1px solid var(--border)',
}

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text-muted)',
  marginTop: '8px',
}
