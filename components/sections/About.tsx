'use client'

import { MapPin } from 'lucide-react'
import SplitReveal from '@/components/primitives/SplitReveal'

const SKILLS = [
  'Next.js', 'TypeScript', 'React', 'GSAP', 'Three.js',
  'Framer Motion', 'Tailwind CSS', 'Docker', 'AWS', 'Python', 'BPMN',
]

const INFO_ROWS = [
  { label: 'Currently', value: 'Platform Development @ PwC Switzerland' },
  { label: 'Education', value: 'BZU Switzerland' },
  { label: 'Interests', value: 'Motorsport Media · Video Editing · Creative Technology' },
]

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        {/* LEFT */}
        <div className="about-left">
          <SplitReveal
            as="h2"
            trigger="scroll"
            className="font-display about-heading"
          >
            I build things that look as good as they work.
          </SplitReveal>
        </div>

        {/* RIGHT */}
        <div className="about-right">
          <p className="about-bio">
            I&apos;m a developer and creative technologist based in Switzerland, focused on building
            web experiences that feel as considered as they are fast. My work spans motorsport media
            platforms, fintech tools, and interactive interfaces — currently within platform
            development at PwC Switzerland.
          </p>

          {/* Skills */}
          <div className="about-skills">
            {SKILLS.map((skill) => (
              <span key={skill} className="about-chip">
                {skill}
              </span>
            ))}
          </div>

          {/* Info rows */}
          <div className="about-rows">
            {INFO_ROWS.map((row) => (
              <div key={row.label} className="about-row">
                <span className="about-row-label">{row.label}</span>
                <span className="about-row-value">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Location chip */}
          <div className="about-location">
            <MapPin size={14} style={{ flexShrink: 0 }} />
            <span>Würenlos, CH</span>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding-block: var(--space-16);
          position: relative;
        }
        .about-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-8);
          align-items: start;
        }
        .about-heading {
          font-weight: 700;
          letter-spacing: -0.04em;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.05;
          color: var(--text-primary);
        }
        .about-bio {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          max-width: 440px;
          margin: 0;
        }
        .about-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: var(--space-4);
        }
        .about-chip {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 4px 12px;
        }
        .about-rows {
          margin-top: var(--space-6);
        }
        .about-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
          padding-block: 12px;
          border-top: 1px solid var(--border);
        }
        .about-row:last-child {
          border-bottom: 1px solid var(--border);
        }
        .about-row-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .about-row-value {
          font-size: 0.9rem;
          color: var(--text-primary);
          text-align: right;
        }
        .about-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 6px 12px;
          color: var(--text-secondary);
          font-size: 0.75rem;
          margin-top: var(--space-4);
        }
        @media (max-width: 768px) {
          .about-inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
