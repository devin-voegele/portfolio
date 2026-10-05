'use client'

import React from 'react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { GlareField } from '@/components/primitives/GlareField'

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
          title="Get to"
          accent="Know Me"
          className="mb-16"
        />

        <FadeIn>
          <GlareField className="flex flex-col md:flex-row gap-12 items-center">
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
                className="lq lq-glare lq-hover relative w-full aspect-square overflow-hidden"
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

            </div>
          </GlareField>
        </FadeIn>
      </div>
    </section>
  )
}
