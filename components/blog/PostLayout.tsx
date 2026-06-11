import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

/**
 * Shared article shell for blog posts: slim top bar, header, prose body,
 * BlogPosting JSON-LD wired to the site-wide Person entity.
 */
export function PostLayout({ meta, children }: { meta: PostMeta; children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    dateModified: meta.date,
    url: `https://voegele.dev/blog/${meta.slug}`,
    mainEntityOfPage: `https://voegele.dev/blog/${meta.slug}`,
    inLanguage: 'en',
    author: { '@id': 'https://voegele.dev/#person' },
    publisher: { '@id': 'https://voegele.dev/#person' },
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Slim top bar ─────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href="/blog"
          className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.08em', textDecoration: 'none' }}
        >
          ← Writing
        </Link>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {'// post'}
        </span>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="relative z-10 max-w-2xl mx-auto px-5 pt-14 pb-8">
        <p
          className="font-mono mb-4"
          style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--text-muted)' }}
        >
          {new Date(meta.date + 'T00:00:00Z')
            .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
            .toUpperCase()}{' '}
          · {meta.readingTime.toUpperCase()} READ
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {meta.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {meta.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {meta.tags.map((t) => (
            <span
              key={t}
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                padding: '0.25rem 0.7rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <article className="prose-dv relative z-10 max-w-2xl mx-auto px-5 pb-16">{children}</article>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-10 max-w-2xl mx-auto px-5 pb-20">
        <div className="pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Written by <strong style={{ color: 'var(--text-primary)' }}>Devin Vögele</strong> — developer &amp;
            creative technologist, Würenlos CH.
          </p>
          <p className="mt-3">
            <Link
              href="/"
              className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--text-muted)', letterSpacing: '0.14em', textDecoration: 'none' }}
            >
              VOEGELE.DEV →
            </Link>
          </p>
        </div>
      </footer>
    </main>
  )
}
