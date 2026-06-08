'use client'

import React from 'react'
import { Code2, Cloud, ShieldCheck, Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

const categoryCards = [
  {
    title: 'Frontend',
    subtitle: 'Next.js · React · TypeScript',
    accentVar: 'var(--accent)',
    accentRgba: 'rgba(37,99,235,0.1)',
    accentRgbaHover: 'rgba(37,99,235,0.2)',
    icon: Code2,
  },
  {
    title: 'Cloud & DevOps',
    subtitle: 'Docker · K8s · CI/CD',
    accentVar: 'var(--accent-2)',
    accentRgba: 'rgba(16,185,129,0.1)',
    accentRgbaHover: 'rgba(16,185,129,0.2)',
    icon: Cloud,
  },
  {
    title: 'Platform & IAM',
    subtitle: 'Entra ID · CloudPods',
    accentVar: 'var(--accent-3)',
    accentRgba: 'rgba(139,92,246,0.1)',
    accentRgbaHover: 'rgba(139,92,246,0.2)',
    icon: ShieldCheck,
  },
  {
    title: 'Creative',
    subtitle: 'GSAP · Motion · WebGL',
    accentVar: 'var(--accent)',
    accentRgba: 'rgba(37,99,235,0.1)',
    accentRgbaHover: 'rgba(37,99,235,0.2)',
    icon: Sparkles,
  },
] as const

const skillTags = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Framer Motion',
  'Docker',
  'AWS',
  'Azure',
  'Kubernetes',
  'CI/CD',
  'Azure Entra ID',
  'CloudPods',
  'Python',
  'BPMN',
]

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 relative">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -right-20 top-1/4 w-80 h-80 rounded-full"
          style={{ background: 'var(--accent)', opacity: 0.05, filter: 'blur(80px)' }}
        />
        <div
          className="absolute -left-40 bottom-1/4 w-80 h-80 rounded-full"
          style={{ background: 'var(--accent-2)', opacity: 0.05, filter: 'blur(80px)' }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <SectionHeader
          index="02"
          eyebrow="My Expertise"
          title={
            <>
              Skills &amp; <span className="gradient-text">Technologies</span>
            </>
          }
          className="mb-16"
        />

        <FadeIn>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* LEFT — 2x2 category cards */}
            <div className="md:w-1/2 order-2 md:order-1 w-full">
              <div className="grid grid-cols-2 gap-6">
                {categoryCards.map(({ title, subtitle, accentVar, accentRgba, accentRgbaHover, icon: Icon }) => (
                  <div
                    key={title}
                    className="p-6 rounded-xl shadow-lg hover-lift group transition-all duration-300 text-center"
                    style={{ background: 'var(--bg-surface)' }}
                    onMouseEnter={(e) => {
                      const circle = e.currentTarget.querySelector<HTMLElement>('.icon-circle')
                      if (circle) circle.style.background = accentRgbaHover
                    }}
                    onMouseLeave={(e) => {
                      const circle = e.currentTarget.querySelector<HTMLElement>('.icon-circle')
                      if (circle) circle.style.background = accentRgba
                    }}
                  >
                    <div
                      className="icon-circle w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{ background: accentRgba, color: accentVar }}
                    >
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ color: accentVar }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — heading, paragraph, skill tags */}
            <div className="md:w-1/2 order-1 md:order-2">
              <h3
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: 'var(--accent)' }}
              >
                Technical Proficiency
              </h3>

              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                I work across the stack and into the platform &mdash; from polished,
                motion-driven front-ends to the cloud, automation, and identity systems
                that run behind them.
              </p>

              {/* Skill tag pills */}
              <div className="flex flex-wrap gap-2">
                {skillTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm rounded-full transition-colors"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor =
                        'rgba(37,99,235,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
