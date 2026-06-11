import Link from 'next/link'

export interface CaseStudyData {
  slug: string
  title: string
  year: string
  role: string
  summary: string
  stack: string[]
  status: string
  url?: string
  sections: { heading: string; paragraphs: string[] }[]
  highlights: string[]
}

/**
 * Shared case-study shell: slim top bar, header, glass content cards,
 * CreativeWork JSON-LD wired to the site-wide Person entity.
 */
export function CaseStudy({ data }: { data: CaseStudyData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    description: data.summary,
    dateCreated: data.year,
    url: `https://voegele.dev/work/${data.slug}`,
    author: { '@id': 'https://voegele.dev/#person' },
    keywords: data.stack.join(', '),
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
          href="/#work"
          className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.08em', textDecoration: 'none' }}
        >
          ← Work
        </Link>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {'// case study'}
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 pt-14 pb-20">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-10">
          <p
            className="font-mono mb-3"
            style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--accent-2)' }}
          >
            {data.year} · {data.role.toUpperCase()}
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
            }}
          >
            {data.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '38rem' }}>
            {data.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-6">
            {data.stack.map((t) => (
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
            {data.url && (
              <>
                <span className="flex-1" />
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  Visit live ↗
                </a>
              </>
            )}
          </div>
        </header>

        {/* ── Sections ───────────────────────────────────────────── */}
        <div className="space-y-5">
          {data.sections.map(({ heading, paragraphs }) => (
            <section key={heading} className="lq p-7">
              <h2
                className="font-mono mb-4"
                style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--accent-2)' }}
              >
                {`// ${heading.toUpperCase()}`}
              </h2>
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Highlights */}
          <section className="lq p-7">
            <h2
              className="font-mono mb-4"
              style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--accent-2)' }}
            >
              {'// HIGHLIGHTS'}
            </h2>
            <ul className="space-y-3">
              {data.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span aria-hidden style={{ color: 'var(--accent)', lineHeight: 1.6 }}>✦</span>
                  <span className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="font-mono mt-6"
              style={{ fontSize: '0.65rem', letterSpacing: '0.16em', color: 'var(--text-muted)' }}
            >
              STATUS: {data.status.toUpperCase()}
            </p>
          </section>
        </div>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Want a walkthrough, or curious how something was built?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </main>
  )
}
