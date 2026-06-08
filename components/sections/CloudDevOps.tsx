'use client'

import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import {
  Boxes,
  GitBranch,
  Cloud,
  ShieldCheck,
  Network,
  Container,
  Terminal,
  Workflow,
} from 'lucide-react'

const BLUE = 'rgba(37,99,235,0.15)'
const GREEN = 'rgba(16,185,129,0.15)'
const PURPLE = 'rgba(139,92,246,0.15)'

const BLUE_ICON = 'var(--accent)'
const GREEN_ICON = 'var(--accent-2)'
const PURPLE_ICON = 'var(--accent-3)'

interface Capability {
  icon: LucideIcon
  title: string
  description: string
  tintBg: string
  tintIcon: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: Boxes,
    title: 'Kubernetes',
    description: 'Container orchestration & cluster management.',
    tintBg: BLUE,
    tintIcon: BLUE_ICON,
  },
  {
    icon: GitBranch,
    title: 'CI / CD',
    description: 'Automated build, test & deploy pipelines.',
    tintBg: GREEN,
    tintIcon: GREEN_ICON,
  },
  {
    icon: Cloud,
    title: 'Cloud — AWS & Azure',
    description: 'Infrastructure and services across AWS and Azure.',
    tintBg: BLUE,
    tintIcon: BLUE_ICON,
  },
  {
    icon: ShieldCheck,
    title: 'IAM — Azure Entra ID',
    description: 'Identity & access management with Microsoft Entra ID.',
    tintBg: PURPLE,
    tintIcon: PURPLE_ICON,
  },
  {
    icon: Network,
    title: 'CloudPods',
    description: 'Private & multi-cloud platform management.',
    tintBg: GREEN,
    tintIcon: GREEN_ICON,
  },
  {
    icon: Container,
    title: 'Docker',
    description: 'Containerized apps & reproducible environments.',
    tintBg: BLUE,
    tintIcon: BLUE_ICON,
  },
  {
    icon: Terminal,
    title: 'Python Automation',
    description: 'Scripting & infrastructure automation.',
    tintBg: PURPLE,
    tintIcon: PURPLE_ICON,
  },
  {
    icon: Workflow,
    title: 'BPMN',
    description: 'Business process modeling & automation.',
    tintBg: GREEN,
    tintIcon: GREEN_ICON,
  },
]

export function CloudDevOps() {
  return (
    <section
      id="cloud"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* faint radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)',
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
          index="03"
          eyebrow="Infrastructure"
          title={
            <>
              Cloud, DevOps &amp; <span className="gradient-text">Platform</span>
            </>
          }
        />

        <p
          style={{
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: '40rem',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}
        >
          The platform side of what I do — building, automating, and securing cloud-native systems.
        </p>

        <FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 18rem), 1fr))',
              gap: '1.25rem',
            }}
          >
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.title}
                  className="glass hover-lift"
                  style={{
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {/* icon square */}
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      background: cap.tintBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={cap.tintIcon} strokeWidth={1.8} />
                  </div>

                  {/* title */}
                  <p
                    className="font-mono"
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    //
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      marginTop: '-0.5rem',
                    }}
                  >
                    {cap.title}
                  </p>

                  {/* description */}
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {cap.description}
                  </p>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
