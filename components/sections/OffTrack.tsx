'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, Draggable } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { SectionWipe } from '@/components/effects/SectionWipe'
import TelemetryLabel from '@/components/primitives/TelemetryLabel'
import SplitReveal from '@/components/primitives/SplitReveal'

const INTERESTS = [
  { title: 'Motorsport Media', sub: 'Content & Film' },
  { title: 'Video Editing', sub: 'Post-Production' },
  { title: 'Sim Racing', sub: 'Virtual Circuit' },
  { title: 'Formula 1', sub: 'Open Wheel' },
  { title: 'GT3', sub: 'Endurance Class' },
]

const META_ROWS = [
  { label: 'CURRENTLY', value: 'Platform Development @ PwC Switzerland' },
  { label: 'EDUCATION', value: 'BZU Switzerland' },
  { label: 'BASE', value: 'Würenlos, CH (47.4373° N, 8.3614° E)' },
]

export function OffTrack() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  // Default false (desktop/drag) to match SSR. Switch after mount on touch/reduced-motion.
  const [isNativeScroll, setIsNativeScroll] = useState(false)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsNativeScroll(reduced || touch)
  }, [])

  useGSAP(
    () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport) return

      const isReducedMotion = prefersReducedMotion()
      const isTouch =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches

      if (isReducedMotion || isTouch) {
        // Native scroll fallback — applied via className in JSX
        return
      }

      // Measure after mount
      const trackWidth = track.scrollWidth
      const viewportWidth = viewport.offsetWidth
      const minX = Math.min(0, viewportWidth - trackWidth)

      const draggables = Draggable.create(track, {
        type: 'x',
        inertia: true,
        bounds: { minX, maxX: 0 },
        edgeResistance: 0.85,
        dragClickables: true,
      })

      return () => {
        draggables.forEach((d) => d.kill())
      }
    },
    { scope: sectionRef, dependencies: [] },
  )

  return (
    <SectionWipe>
      <section
        id="offtrack"
        ref={sectionRef}
        style={{
          paddingBlock: 'var(--space-16)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Label + statement — constrained container */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingInline: '32px',
            marginBottom: 'var(--space-8)',
          }}
        >
          <TelemetryLabel>03 — OFF TRACK</TelemetryLabel>
        </div>

        {/* Drag-scroll viewport */}
        <div
          ref={viewportRef}
          className={isNativeScroll ? 'offtrack-native-scroll' : 'offtrack-drag-viewport'}
          style={{
            width: '100%',
            overflow: isNativeScroll ? 'auto' : 'hidden',
            ...(isNativeScroll
              ? {
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
                }
              : {}),
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'inline-flex',
              gap: 'var(--space-3)',
              paddingInline: '32px',
              willChange: 'transform',
              cursor: isNativeScroll ? 'auto' : 'grab',
            }}
          >
            {INTERESTS.map((interest, i) => (
              <div
                key={interest.title}
                className="offtrack-card"
                style={{
                  width: 'clamp(240px, 28vw, 340px)',
                  minHeight: '360px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--navy-line)',
                  borderRadius: '16px',
                  position: 'relative',
                  padding: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  scrollSnapAlign: isNativeScroll ? 'start' : undefined,
                  flexShrink: 0,
                }}
              >
                {/* Electric-blue accent line top */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '16px',
                    right: '16px',
                    height: '2px',
                    background: 'var(--accent)',
                    opacity: 0.35,
                    borderRadius: '0 0 2px 2px',
                  }}
                />

                {/* Mono index top-left */}
                <span
                  className="font-mono"
                  style={{
                    position: 'absolute',
                    top: 'var(--space-4)',
                    left: 'var(--space-4)',
                    color: 'var(--accent)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                  }}
                >
                  {`// 0${i + 1}`}
                </span>

                {/* Card content at bottom */}
                <div>
                  <p
                    className="font-mono"
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      marginBottom: '8px',
                    }}
                  >
                    OFF TRACK
                  </p>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 0.95,
                      margin: 0,
                    }}
                  >
                    {interest.title}
                  </h3>
                  <p
                    className="font-mono"
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      marginTop: '10px',
                    }}
                  >
                    {interest.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statement + bio — constrained container */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingInline: '32px',
            marginTop: 'var(--space-12)',
          }}
        >
          <SplitReveal as="h2" trigger="scroll">
            I build things that look as good as they work.
          </SplitReveal>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '480px',
              marginTop: 'var(--space-4)',
            }}
          >
            Developer and creative technologist from Switzerland. I build premium
            web experiences and motorsport media, currently within platform
            development at PwC Switzerland — and I bring the same precision off
            the track as on it.
          </p>

          {/* Meta rows */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            {META_ROWS.map((row) => (
              <div
                key={row.label}
                className="font-mono"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--navy-line)',
                  paddingBlock: '12px',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {`// ${row.value}`}
                </span>
              </div>
            ))}
            {/* Bottom border */}
            <div style={{ borderTop: '1px solid var(--navy-line)' }} />
          </div>
        </div>
      </section>
    </SectionWipe>
  )
}
