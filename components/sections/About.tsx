'use client'

import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

const focusTags = [
  'Web Experiences',
  'Motion Design',
  'Cloud',
  'Automation',
  'IAM',
  'CI/CD',
  'Motorsport Media',
  'Video Editing',
]

export function About() {
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-20 top-1/4 w-72 h-72 rounded-full"
          style={{ background: 'var(--accent)', opacity: 0.05, filter: 'blur(80px)' }}
        />
        <div
          className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full"
          style={{ background: 'var(--accent-2)', opacity: 0.05, filter: 'blur(80px)' }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <SectionHeader
          index="01"
          eyebrow="About Me"
          title={
            <>
              Get to <span className="gradient-text">Know Me</span>
            </>
          }
          className="mb-16"
        />

        <FadeIn>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* LEFT — identity panel (no photo) */}
            <div className="md:w-2/5 relative">
              {/* Offset border frames matching reference structure */}
              <div
                className="absolute -top-4 -left-4 w-full h-full border-2 rounded-2xl"
                style={{ borderColor: 'var(--accent)' }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-full h-full border-2 rounded-2xl"
                style={{ borderColor: 'var(--accent-2)' }}
              />

              {/* Front panel — premium identity visual */}
              {/* swap in a real photo here later */}
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl hover-lift"
                style={{
                  background:
                    'radial-gradient(ellipse at 60% 30%, rgba(37,99,235,0.18) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(139,92,246,0.14) 0%, transparent 60%), linear-gradient(160deg, var(--bg-surface) 0%, var(--bg-secondary) 100%)',
                }}
              >
                {/* Subtle top-left shimmer overlay, matching reference gradient overlay */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      'linear-gradient(to top right, rgba(37,99,235,0.12), transparent 60%)',
                  }}
                />

                {/* Monogram — centered, large gradient DV */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <span
                    className="gradient-text font-bold select-none"
                    style={{ fontSize: 'clamp(5rem, 14vw, 7rem)', lineHeight: 1 }}
                  >
                    DV
                  </span>
                </div>

                {/* Bottom label bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-center"
                  style={{
                    padding: '0.875rem 1rem',
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)',
                  }}
                >
                  <span
                    className="font-mono text-center"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Devin V&ouml;gele &middot; W&uuml;renlos, CH
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — bio + tags + links */}
            <div className="md:w-3/5">
              <h3
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: 'var(--accent-2)' }}
              >
                Developer &amp; Creative Technologist
              </h3>

              <div className="space-y-4 mb-8" style={{ color: 'var(--text-secondary)' }}>
                <p className="text-base leading-relaxed">
                  I&apos;m a developer and creative technologist based in W&uuml;renlos,
                  Switzerland, currently in platform development at PwC Switzerland. I build
                  premium web experiences, motorsport media platforms, and interactive tools.
                </p>
                <p className="text-base leading-relaxed">
                  My work spans the full stack and into the platform &mdash; clean interfaces
                  and motion on the front, and cloud, automation, and identity infrastructure
                  underneath.
                </p>
                <p className="text-base leading-relaxed">
                  I care about building things that are as considered as they are fast: sharp
                  systems, clear interfaces, and infrastructure that just works.
                </p>
              </div>

              {/* Focus area pills */}
              <div className="mb-8">
                <h4
                  className="text-base font-semibold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  My Focus Areas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {focusTags.map((tag) => (
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

              {/* Connect links */}
              <div className="flex flex-wrap gap-4">
                {/* GitHub */}
                <a
                  href="https://github.com/devin-voegele/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover-lift transition-all"
                  style={{
                    background: 'var(--bg-surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(37,99,235,0.1)'
                    el.style.color = 'var(--accent)'
                    el.style.borderColor = 'rgba(37,99,235,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--bg-surface)'
                    el.style.color = 'var(--text-secondary)'
                    el.style.borderColor = 'var(--border)'
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/devin-voegele-2a5989293"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover-lift transition-all"
                  style={{
                    background: 'var(--bg-surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(37,99,235,0.1)'
                    el.style.color = 'var(--accent)'
                    el.style.borderColor = 'rgba(37,99,235,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--bg-surface)'
                    el.style.color = 'var(--text-secondary)'
                    el.style.borderColor = 'var(--border)'
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>

                {/* Email */}
                <a
                  href="mailto:devin.voegele@microsun.ch"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover-lift transition-all"
                  style={{
                    background: 'var(--bg-surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(37,99,235,0.1)'
                    el.style.color = 'var(--accent)'
                    el.style.borderColor = 'rgba(37,99,235,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--bg-surface)'
                    el.style.color = 'var(--text-secondary)'
                    el.style.borderColor = 'var(--border)'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
