import type { Metadata } from 'next'
import Link from 'next/link'
import { PenLine } from 'lucide-react'
import { Aurora } from '@/components/effects/Aurora'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { Footer } from '@/components/sections/Footer'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Writing — Devin Vögele',
  description:
    'Notes on development, design, cloud, and the occasional lap. Long-form writing from Devin Vögele.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Soft aurora background — calm, reading-friendly */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <Aurora />
      </div>

      {/* ── Slim top bar ─────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href="/"
          className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
          style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}
        >
          ← Devin Vögele
        </Link>
        <span
          className="font-mono text-xs"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}
        >
          // writing
        </span>
      </div>

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="relative z-10 pt-24 pb-12 px-4">
        <SectionHeader
          index="//"
          eyebrow="Journal"
          title="Writing"
          accent="& Notes"
          className="mb-0"
        />
        <FadeIn>
          <p
            className="text-center mx-auto mt-6"
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '40rem',
              lineHeight: 1.75,
              fontSize: '1rem',
            }}
          >
            Notes on development, design, cloud, and the occasional lap —
            written while building, not after.
          </p>
        </FadeIn>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 px-4 pb-24">
        {posts.length === 0 ? (
          /* ── Empty state ─────────────────────────────────────────── */
          <FadeIn className="flex justify-center mt-4">
            <div className="glass rounded-2xl p-10 md:p-14 max-w-xl w-full text-center">
              {/* Icon circle */}
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
                style={{ background: 'var(--accent-subtle)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <PenLine size={22} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
              </div>

              <h3
                className="font-geist-sans text-xl font-bold mb-3"
                style={{ color: 'var(--text-primary)', fontWeight: 700 }}
              >
                Nothing here yet
              </h3>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                I&apos;m writing the first few pieces — long-form notes on building web
                experiences, cloud &amp; platform work, and creative dev.
                Check back soon.
              </p>

              <p
                className="font-mono text-xs mb-8"
                style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}
              >
                // status: drafting
              </p>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                Get in touch
                <span style={{ color: 'var(--accent)' }}>→</span>
              </Link>
            </div>
          </FadeIn>
        ) : (
          /* ── Post grid (future) ──────────────────────────────────── */
          <div className="grid gap-5 max-w-2xl mx-auto mt-4">
            {posts.map(({ slug, title, date, excerpt, readingTime, tags }) => (
              <FadeIn key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className="lq lq-hover p-7 block"
                  style={{ textDecoration: 'none' }}
                >
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}
                  >
                    {date} · {readingTime} read
                  </p>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          fontSize: '0.62rem',
                          letterSpacing: '0.12em',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    <span className="flex-1" />
                    <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                      Read →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
