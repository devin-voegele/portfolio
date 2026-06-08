'use client'

import React, { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { TiltCard } from '@/components/primitives/TiltCard'
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

const BLUE_GLOW = 'rgba(37,99,235,0.25)'
const GREEN_GLOW = 'rgba(16,185,129,0.25)'
const PURPLE_GLOW = 'rgba(139,92,246,0.25)'

const BLUE_BORDER = 'rgba(37,99,235,0.55)'
const GREEN_BORDER = 'rgba(16,185,129,0.55)'
const PURPLE_BORDER = 'rgba(139,92,246,0.55)'

interface Capability {
  icon: LucideIcon
  title: string
  description: string
  tintBg: string
  tintIcon: string
  glowColor: string
  borderColor: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: Boxes,
    title: 'Kubernetes',
    description: 'Container orchestration & cluster management.',
    tintBg: BLUE,
    tintIcon: BLUE_ICON,
    glowColor: BLUE_GLOW,
    borderColor: BLUE_BORDER,
  },
  {
    icon: GitBranch,
    title: 'CI / CD',
    description: 'Automated build, test & deploy pipelines.',
    tintBg: GREEN,
    tintIcon: GREEN_ICON,
    glowColor: GREEN_GLOW,
    borderColor: GREEN_BORDER,
  },
  {
    icon: Cloud,
    title: 'Cloud — AWS & Azure',
    description: 'Infrastructure and services across AWS and Azure.',
    tintBg: BLUE,
    tintIcon: BLUE_ICON,
    glowColor: BLUE_GLOW,
    borderColor: BLUE_BORDER,
  },
  {
    icon: ShieldCheck,
    title: 'IAM — Azure Entra ID',
    description: 'Identity & access management with Microsoft Entra ID.',
    tintBg: PURPLE,
    tintIcon: PURPLE_ICON,
    glowColor: PURPLE_GLOW,
    borderColor: PURPLE_BORDER,
  },
  {
    icon: Network,
    title: 'CloudPods',
    description: 'Private & multi-cloud platform management.',
    tintBg: GREEN,
    tintIcon: GREEN_ICON,
    glowColor: GREEN_GLOW,
    borderColor: GREEN_BORDER,
  },
  {
    icon: Container,
    title: 'Docker',
    description: 'Containerized apps & reproducible environments.',
    tintBg: BLUE,
    tintIcon: BLUE_ICON,
    glowColor: BLUE_GLOW,
    borderColor: BLUE_BORDER,
  },
  {
    icon: Terminal,
    title: 'Python Automation',
    description: 'Scripting & infrastructure automation.',
    tintBg: PURPLE,
    tintIcon: PURPLE_ICON,
    glowColor: PURPLE_GLOW,
    borderColor: PURPLE_BORDER,
  },
  {
    icon: Workflow,
    title: 'BPMN',
    description: 'Business process modeling & automation.',
    tintBg: GREEN,
    tintIcon: GREEN_ICON,
    glowColor: GREEN_GLOW,
    borderColor: GREEN_BORDER,
  },
]

function CapabilityCard({ cap, index }: { cap: Capability; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = cap.icon

  return (
    <div
      className="card-stagger-reveal"
      style={{
        animationDelay: `${index * 70}ms`,
        animationFillMode: 'both',
        height: '100%',
      }}
    >
    <TiltCard
      intensity={8}
      className="h-full"
    >
      <div
        className="glass"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '0.75rem',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          height: '100%',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          borderColor: hovered ? cap.borderColor : 'var(--glass-border)',
          boxShadow: hovered
            ? `0 0 0 1px ${cap.borderColor}, 0 8px 32px -8px ${cap.glowColor}`
            : 'none',
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

        {/* slash comment */}
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

        {/* title */}
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
    </TiltCard>
    </div>
  )
}

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
      {/* stagger reveal keyframe */}
      <style>{`
        @keyframes card-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-section.is-visible .card-stagger-reveal {
          animation: card-slide-up 0.5s var(--ease-out-expo) both;
        }
      `}</style>

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
            {CAPABILITIES.map((cap, idx) => (
              <CapabilityCard key={cap.title} cap={cap} index={idx} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
