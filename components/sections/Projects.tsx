'use client'

import React from 'react'
import Link from 'next/link'
import { Lock, Check } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { GlareField } from '@/components/primitives/GlareField'

interface Project {
  title: string
  desc: string
  tags: string[]
  year: string
  url?: string
  caseHref?: string
  redacted?: boolean
}

const projects: Project[] = [
  {
    title: 'FormulaGod',
    desc: 'Motorsport media & marketing platform — content, branding and reach for the racing world.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    year: '2024',
    caseHref: '/work/formulagod',
  },
  {
    title: 'GetMoneyMap',
    desc: 'Personal finance visualization platform with interactive data mapping and budget tracking.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    year: '2025',
    url: 'https://getmoneymap.org',
    caseHref: '/work/getmoneymap',
  },
  {
    title: '[CLASSIFIED]',
    desc: 'Under wraps. Details unreleased.',
    tags: ['TypeScript', 'Cloud', 'Docker'],
    year: '2025',
    redacted: true,
  },
]

const highlights = [
  'Designed & built a motorsport media & marketing platform',
  'Built an interactive personal-finance visualization tool',
  'Work across web, cloud, automation and identity',
]

const MAX_TILT = 4.5

/** 3D tilt wrapper — pointer-driven only, springs back on leave. */
function Tilt({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const raf = React.useRef(0)
  const pos = React.useRef({ x: 0.5, y: 0.5 })

  const fine = () =>
    !window.matchMedia('(pointer: coarse)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const apply = () => {
    raf.current = 0
    const el = ref.current
    if (!el) return
    const rotY = (pos.current.x - 0.5) * 2 * MAX_TILT
    const rotX = -(pos.current.y - 0.5) * 2 * MAX_TILT
    el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-3px)`
  }

  const onMove = (e: React.PointerEvent) => {
    if (!fine()) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    pos.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }
    el.style.transition = 'transform 0.1s linear'
    if (!raf.current) raf.current = requestAnimationFrame(apply)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.7s var(--ease-out-expo)'
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}


export function Projects() {
  return (
    <section id="work" className="py-24 px-4 relative">
      {/* Decorative radial blob */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-40 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.07),transparent_70%)] pointer-events-none" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          index="05"
          eyebrow="My Work"
          title="Selected"
          accent="Projects"
        />

        <p
          className="text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}
        >
          A few things I&apos;ve designed and built — from motorsport media to fintech tooling.
        </p>

        <FadeIn>
          <GlareField className="flex flex-col md:flex-row gap-16 items-start">
            {/* LEFT — project cards */}
            <div className="md:w-1/2 order-2 md:order-1 space-y-8 w-full">
              {projects.map(({ title, desc, tags, year, url, caseHref, redacted }) => (
                <Tilt key={title}>
                <div
                  className="lq lq-glare p-6 relative overflow-hidden"
                >
                  {/* top gradient accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]" />

                  {/* year label */}
                  <div
                    className="text-xs font-mono mb-2"
                    style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}
                  >
                    {year}
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgba(37,99,235,0.1)',
                          color: 'var(--accent)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap items-center gap-4">
                    {caseHref && (
                      <Link
                        href={caseHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-75"
                        style={{ color: 'var(--accent)', textDecoration: 'none' }}
                      >
                        Case study →
                      </Link>
                    )}
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-75"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Visit ↗
                      </a>
                    )}
                    {redacted && (
                      <span
                        className="inline-flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Lock size={14} aria-hidden />
                        Classified
                      </span>
                    )}
                  </div>
                </div>
                </Tilt>
              ))}
            </div>

            {/* RIGHT — sticky panel */}
            <div className="md:w-1/2 order-1 md:order-2 w-full">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    What I Build
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    I build practical, polished products — premium front-ends backed by solid infrastructure. From motorsport media to fintech tooling, I like solving real problems end to end.
                  </p>

                </div>

                {/* Highlights card */}
                <div className="lq lq-glare p-6">
                  <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Highlights
                  </h4>

                  <ul className="space-y-4">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(37,99,235,0.1)' }}
                        >
                          <Check size={14} style={{ color: 'var(--accent)' }} strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </GlareField>
        </FadeIn>
      </div>
    </section>
  )
}
