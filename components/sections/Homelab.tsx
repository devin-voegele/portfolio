'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

interface PlannedRow {
  borderColor: string
  name: string
  desc: string
}

const plannedRows: PlannedRow[] = [
  {
    borderColor: 'var(--accent-2)',
    name: 'Kubernetes Cluster',
    desc: 'Container orchestration for self-hosted workloads · planned',
  },
  {
    borderColor: 'var(--accent)',
    name: 'CI/CD Runners',
    desc: 'Self-hosted pipeline runners · planned',
  },
  {
    borderColor: 'var(--accent-3)',
    name: 'Self-Hosted Services',
    desc: 'Media, dashboards, internal tools · planned',
  },
  {
    borderColor: 'var(--accent-2)',
    name: 'Monitoring & Alerting',
    desc: 'Metrics, logs, uptime · planned',
  },
  {
    borderColor: 'var(--accent)',
    name: 'VPN / Networking',
    desc: 'Segmented VLANs and secure remote access · planned',
  },
]

const goals = [
  'Experiment with the same platform tooling I use at work',
  'Run Kubernetes, CI/CD and self-hosted services on real hardware',
  'Build hands-on depth in infra, networking and security',
  'A safe place to break things and learn',
]

const statusStats = [
  { value: 'Soon', label: 'Status' },
  { value: 'k8s', label: 'Core' },
  { value: 'CI/CD', label: 'Pipelines' },
  { value: 'Self-host', label: 'Services' },
]

export function Homelab() {
  return (
    <section id="homelab" className="py-24 px-4 relative">
      {/* faint bg accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* pulsing dot animation */}
      <style>{`
        @keyframes hl-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .hl-dot { animation: hl-pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          index="04"
          eyebrow="Homelab"
          title="Self-Hosted"
          accent="Lab"
        />

        {/* Status badge */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono"
            style={{
              border: '1px solid rgba(16,185,129,0.3)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
            }}
          >
            <span
              className="hl-dot inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: 'var(--accent-2)' }}
            />
            <span style={{ color: 'var(--accent-2)' }}>// STATUS: IN PROGRESS</span>
          </div>
        </div>

        <p
          className="text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}
        >
          A self-hosted lab is on the way — built to run the same platform tooling I use professionally, on my own hardware.
        </p>

        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT — Planned Architecture card */}
            <div
              className="rounded-xl p-6 border"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Planned Architecture
              </h3>

              <div className="space-y-4">
                {plannedRows.map(({ borderColor, name, desc }) => (
                  <div
                    key={name}
                    className="p-4 rounded-lg"
                    style={{
                      borderLeft: `4px solid ${borderColor}`,
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {name}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Goals card + stat row */}
            <div className="space-y-6">
              <div
                className="rounded-xl p-6 border"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                  What It&apos;s For
                </h3>

                <ul className="space-y-4">
                  {goals.map((goal) => (
                    <li key={goal} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(37,99,235,0.1)' }}
                      >
                        <Check size={14} style={{ color: 'var(--accent)' }} strokeWidth={2.5} />
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {goal}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Honest placeholder stats */}
              <div className="grid grid-cols-2 gap-4">
                {statusStats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="text-center p-3 rounded-lg"
                    style={{ background: 'rgba(37,99,235,0.08)' }}
                  >
                    <div className="text-lg font-bold mb-0.5" style={{ color: 'var(--accent)' }}>
                      {value}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
