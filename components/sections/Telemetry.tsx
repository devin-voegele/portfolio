'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import Counter from '@/components/primitives/Counter'

export function Telemetry() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.telemetry-cell', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="telemetry-section">
      <div className="telemetry-container">
        <div className="telemetry-cell">
          <Counter to={2} suffix="+" className="telemetry-value" />
          <p className="telemetry-label">YRS</p>
        </div>
        <div className="telemetry-cell telemetry-cell--divider">
          <Counter to={0} display="PwC" className="telemetry-value" />
          <p className="telemetry-label">SWITZERLAND</p>
        </div>
        <div className="telemetry-cell telemetry-cell--divider">
          <Counter to={15} suffix="+" className="telemetry-value" />
          <p className="telemetry-label">BUILDS</p>
        </div>
        <div className="telemetry-cell telemetry-cell--divider">
          <Counter to={0} display="∞" className="telemetry-value" />
          <p className="telemetry-label">WORLDWIDE</p>
        </div>
      </div>

      <style>{`
        .telemetry-section {
          width: 100%;
          border-top: 1px solid var(--navy-line);
          border-bottom: 1px solid var(--navy-line);
          padding-block: var(--space-8);
          background: var(--bg-secondary);
        }

        .telemetry-container {
          max-width: 1280px;
          margin-inline: auto;
          padding-inline: var(--space-8);
          display: flex;
          flex-direction: row;
        }

        .telemetry-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-block: 0.5rem;
        }

        .telemetry-cell--divider {
          border-left: 1px solid var(--navy-line);
        }

        .telemetry-value {
          font-family: var(--font-display, inherit);
          font-size: clamp(2rem, 4vw, 3.25rem);
          color: var(--accent);
          line-height: 1;
          letter-spacing: 0.01em;
          font-weight: 700;
        }

        .telemetry-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-top: 10px;
          margin-bottom: 0;
        }

        @media (max-width: 767px) {
          .telemetry-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .telemetry-cell--divider {
            border-left: none;
          }
        }
      `}</style>
    </section>
  )
}
