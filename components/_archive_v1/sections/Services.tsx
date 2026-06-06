'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import SectionLabel from '@/components/primitives/SectionLabel'

const CARDS = [
  {
    index: '01',
    title: 'WEB EXPERIENCES',
    items: ['Next.js', 'Three.js', 'GSAP', 'Full-stack'],
  },
  {
    index: '02',
    title: 'CREATIVE DEVELOPMENT',
    items: ['Motion design', 'Interactive UI', 'WebGL'],
  },
  {
    index: '03',
    title: 'DIGITAL STRATEGY',
    items: ['Brand identity', 'Platform architecture', 'Performance'],
  },
]

const sectionStyle: React.CSSProperties = {
  paddingBlock: 'var(--space-16)',
  position: 'relative',
}

const innerStyle: React.CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  paddingInline: '32px',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'var(--space-4)',
}

const cardStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: 'var(--space-6)',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '280px',
  justifyContent: 'space-between',
  transition: 'border-color 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo)',
}

const indexStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  fontVariant: 'small-caps',
  letterSpacing: '0.05em',
  fontFamily: 'monospace',
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display), system-ui, sans-serif',
  fontWeight: 700,
  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  transition: 'transform 0.4s var(--ease-out-expo)',
}

const itemsStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

const itemStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  marginTop: '8px',
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = prefersReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={innerStyle}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <SectionLabel>WHAT I DO</SectionLabel>
        </div>
        <div className="services-grid" style={gridStyle}>
          {CARDS.map((card) => (
            <div key={card.index} className="service-card" style={cardStyle}>
              <div>
                <span style={indexStyle}>{card.index}</span>
                <h3 className="service-card-title" style={titleStyle}>
                  {card.title}
                </h3>
              </div>
              <ul style={itemsStyle}>
                {card.items.map((item) => (
                  <li key={item} style={itemStyle}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card:hover {
          border-color: var(--border-hover);
        }
        .service-card:hover .service-card-title {
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
