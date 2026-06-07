'use client'

import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

const PLANNED_TAGS = [
  'k8s cluster',
  'ci/cd runners',
  'self-hosted services',
  'monitoring',
  'vpn / networking',
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

      <style>{`
        @keyframes hl-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .hl-dot {
          animation: hl-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          maxWidth: '56rem',
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

        <FadeIn>
          <div
            className="glass"
            style={{
              borderRadius: '1rem',
              padding: 'clamp(2rem, 5vw, 2.5rem)',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* subtle corner glow */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '16rem',
                height: '16rem',
                background:
                  'radial-gradient(circle at top right, rgba(139,92,246,0.07) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            {/* status badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid rgba(16,185,129,0.3)',
                marginBottom: '1.75rem',
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
                fontWeight: 600,
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: '1rem',
              }}
            >
              A homelab is on the way.
            </h3>

            {/* copy */}
            <p
              style={{
                color: 'var(--text-secondary)',
                maxWidth: '38rem',
                margin: '0 auto 2rem',
                lineHeight: 1.75,
              }}
            >
              I&apos;m building a self-hosted lab to run Kubernetes, CI/CD, and self-hosted services
              on my own hardware — a place to experiment with the same platform tooling I use
              professionally. Hardware&apos;s being assembled; the rack&apos;s getting built.
            </p>

            {/* planned tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  alignSelf: 'center',
                  marginRight: '0.25rem',
                }}
              >
                planned:
              </span>
              {PLANNED_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-surface)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
