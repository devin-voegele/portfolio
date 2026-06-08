'use client'

import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { TiltCard } from '@/components/primitives/TiltCard'

interface TerminalRow {
  marker: string
  name: string
  comment: string
  active: boolean
}

const TERMINAL_ROWS: TerminalRow[] = [
  { marker: '[~]', name: 'k8s-cluster       ', comment: '// provisioning', active: true },
  { marker: '[ ]', name: 'ci-cd-runners      ', comment: '// planned', active: false },
  { marker: '[ ]', name: 'self-hosted-svcs   ', comment: '// planned', active: false },
  { marker: '[ ]', name: 'monitoring-stack   ', comment: '// planned', active: false },
  { marker: '[ ]', name: 'vpn / networking   ', comment: '// planned', active: false },
]

export function Homelab() {
  return (
    <section
      id="homelab"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* animations */}
      <style>{`
        @keyframes hl-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .hl-dot { animation: hl-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* faint bg accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          position: 'relative',
        }}
      >
        <SectionHeader
          index="04"
          eyebrow="Homelab"
          title={
            <>
              Self-Hosted{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-3))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Lab
              </span>
            </>
          }
        />

        {/* 2-col layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="homelab-grid"
        >
          {/* LEFT — text content */}
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* status badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16,185,129,0.3)',
                  width: 'fit-content',
                }}
              >
                <span
                  className="hl-dot"
                  style={{
                    display: 'inline-block',
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '9999px',
                    background: 'var(--accent-2)',
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    color: 'var(--accent-2)',
                  }}
                >
                  // STATUS: IN PROGRESS
                </span>
              </div>

              {/* heading */}
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                A homelab is on the way.
              </h3>

              {/* copy */}
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  maxWidth: '36rem',
                }}
              >
                I&apos;m building a self-hosted lab to run Kubernetes, CI/CD, and self-hosted
                services on my own hardware — a place to experiment with the same platform tooling
                I use professionally. Hardware&apos;s being assembled; the rack&apos;s getting
                built.
              </p>

              {/* mono note */}
              <p
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                }}
              >
                // more details once hardware is provisioned
              </p>
            </div>
          </FadeIn>

          {/* RIGHT — terminal blueprint panel */}
          <TiltCard intensity={6} className="w-full">
            <div
              className="glass"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* subtle corner glow */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '12rem',
                  height: '12rem',
                  background:
                    'radial-gradient(circle at top right, rgba(139,92,246,0.1) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />

              {/* terminal titlebar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  borderBottom: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {/* window dots */}
                {['rgba(255,90,90,0.7)', 'rgba(255,185,0,0.7)', 'rgba(40,200,80,0.7)'].map((c, i) => (
                  <span
                    key={i}
                    aria-hidden
                    style={{
                      display: 'inline-block',
                      width: '0.6rem',
                      height: '0.6rem',
                      borderRadius: '9999px',
                      background: c,
                      flexShrink: 0,
                    }}
                  />
                ))}
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginLeft: '0.5rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  ~/homelab/setup.yaml
                </span>
              </div>

              {/* terminal body */}
              <div
                style={{
                  padding: '1.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.1rem',
                }}
              >
                {/* yaml header comment */}
                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  # planned setup manifest
                </p>

                {TERMINAL_ROWS.map((row, i) => (
                  <div
                    key={row.name}
                    className="font-mono"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.8rem',
                      padding: '0.3rem 0',
                    }}
                  >
                    <span
                      style={{
                        color: row.active ? 'var(--accent-2)' : 'var(--accent-3)',
                        flexShrink: 0,
                      }}
                    >
                      {row.marker}
                    </span>
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        flexGrow: 1,
                        whiteSpace: 'pre',
                      }}
                    >
                      {row.name}
                    </span>
                    <span
                      style={{
                        color: 'rgba(16,185,129,0.5)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {row.comment}
                    </span>
                    {/* blinking cursor on last row */}
                    {i === TERMINAL_ROWS.length - 1 && (
                      <span
                        className="animate-blink"
                        aria-hidden
                        style={{
                          display: 'inline-block',
                          width: '0.5rem',
                          height: '1em',
                          background: 'var(--accent-2)',
                          opacity: 0.7,
                          marginLeft: '0.25rem',
                          verticalAlign: 'text-bottom',
                        }}
                      />
                    )}
                  </div>
                ))}

                {/* bottom prompt */}
                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '1rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span style={{ color: 'var(--accent-2)' }}>➜</span>
                  {' '}
                  <span style={{ color: 'var(--accent-3)' }}>~/homelab</span>
                  {' '}
                  <span style={{ color: 'var(--text-muted)' }}>git:(main)</span>
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .homelab-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}
