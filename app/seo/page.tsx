import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

const description =
  'Technical SEO for businesses and individuals in Switzerland: audits, metadata, structured data, Search Console, Google Business Profile and knowledge panel work. In German or English.'

export const metadata: Metadata = pageMetadata({
  title: 'SEO Services',
  description,
  path: '/seo',
})

const EMAIL = 'devin.voegele@microsun.ch'

const tracks = [
  {
    label: 'For businesses',
    title: 'Get your company found',
    intro:
      'For shops, studios, agencies and startups whose site exists but does not show up when people search for what they offer.',
    items: [
      'Technical audit of the whole site: titles, descriptions, canonicals, indexing, broken links, images',
      'Structured data (JSON-LD) for your company, local business or product, so Google understands who you are',
      'Sitemap, robots.txt and clean link previews for WhatsApp, LinkedIn and X',
      'Google Search Console and Bing Webmaster Tools set up and verified',
      'Google Business Profile for local businesses, with the same name, address and phone everywhere',
      'Fixes delivered as code (pull requests for Next.js sites) or as a clear list for your developer',
    ],
  },
  {
    label: 'For individuals',
    title: 'Own your name on Google',
    intro:
      'For freelancers, founders, creatives and anyone who wants the first result for their name to be something they control.',
    items: [
      'A personal site or page that ranks for your name',
      'Person schema that ties your site, LinkedIn, GitHub and Instagram into one identity',
      'Consistent bios and links across your profiles, so Google sees one person, not five',
      'Knowledge panel groundwork: Wikidata (where you qualify), claiming the panel, correcting wrong labels',
      'Cleaning up old pages and profiles that describe you the wrong way',
    ],
  },
]

const steps = [
  { n: '01', title: 'Audit', text: 'I crawl the site and check it against a fixed rule set. You get a plain report: what is broken, why it matters, what it takes to fix.' },
  { n: '02', title: 'Fix', text: 'Metadata, structured data, sitemap, canonicals, previews. On Next.js I ship the fixes as pull requests you can review and merge.' },
  { n: '03', title: 'Verify', text: 'After deploy I re-check the live site, submit it in Search Console and request indexing for the pages that matter.' },
  { n: '04', title: 'Follow up', text: 'Google takes weeks, not days. I check back after a few weeks and look at what Search Console reports.' },
]

const proof = [
  {
    title: 'My own knowledge panel',
    text: 'Google used to label me "Graphic designer". After fixing my schema, Wikidata and profiles, the panel now reads "Software developer".',
  },
  {
    title: 'Metafix',
    text: 'My SEO tool: it audits a live site with 31 deterministic rules and opens pull requests with the fixes. It found and fixed a real issue on this site.',
    href: '/work/metafix',
  },
  {
    title: 'This site',
    text: 'voegele.dev ships the full setup described here: entity graph, per-page metadata, sitemap, generated preview images.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.voegele.dev/seo#service',
  name: 'SEO Services',
  serviceType: 'Search engine optimization',
  description,
  url: 'https://www.voegele.dev/seo',
  provider: { '@id': 'https://www.voegele.dev/#person' },
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  availableLanguage: ['de', 'en'],
  audience: [
    { '@type': 'BusinessAudience', name: 'Businesses' },
    { '@type': 'PeopleAudience', name: 'Individuals' },
  ],
}

const eyebrow = { fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--accent-2)' } as const

export default function SeoPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* ── Slim top bar ─────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href="/"
          className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.08em', textDecoration: 'none' }}
        >
          ← Devin Vögele
        </Link>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          {'// services'}
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 pt-16 pb-20">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="text-center mb-16">
          <p className="font-mono mb-3" style={eyebrow}>
            {'// SEO SERVICES'}
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            Show up when people <span className="gradient-text">search for you</span>
          </h1>
          <p
            className="max-w-xl mx-auto mt-4 text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Technical SEO for businesses and individuals. I fix what keeps search engines from understanding
            your site, and I make sure your name leads to you. Based in Switzerland, working in German and
            English.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('SEO enquiry')}`}
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            Get in touch →
          </a>
        </header>

        {/* ── Two tracks ─────────────────────────────────────────── */}
        <div className="grid gap-5 md:grid-cols-2">
          {tracks.map((t) => (
            <section key={t.label} className="lq p-7">
              <p className="font-mono mb-3" style={eyebrow}>
                {`// ${t.label.toUpperCase()}`}
              </p>
              <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>
                {t.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.intro}
              </p>
              <ul className="space-y-3 mt-6">
                {t.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden style={{ color: 'var(--accent)', lineHeight: 1.6 }}>✦</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* ── Process ────────────────────────────────────────────── */}
        <section className="mt-20">
          <p className="font-mono mb-6 text-center" style={eyebrow}>
            {'// HOW IT WORKS'}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="lq p-6">
                <p className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>
                  {s.n}
                </p>
                <h3 className="text-lg font-bold mt-2">{s.title}</h3>
                <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Proof ──────────────────────────────────────────────── */}
        <section className="mt-20">
          <p className="font-mono mb-6 text-center" style={eyebrow}>
            {'// PROOF'}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {proof.map((p) => {
              const body = (
                <>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {p.text}
                  </p>
                  {p.href && (
                    <p className="text-sm font-semibold mt-4" style={{ color: 'var(--accent)' }}>
                      Case study →
                    </p>
                  )}
                </>
              )
              return p.href ? (
                <Link key={p.title} href={p.href} className="lq lq-hover p-6 block" style={{ textDecoration: 'none' }}>
                  {body}
                </Link>
              ) : (
                <div key={p.title} className="lq p-6">
                  {body}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Honest note + CTA ─────────────────────────────────── */}
        <section className="lq p-7 mt-20 text-center">
          <p className="font-mono mb-3" style={eyebrow}>
            {'// STRAIGHT ANSWER'}
          </p>
          <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Nobody can promise you first place on Google or a knowledge panel, and anyone who does is guessing.
            What I can do is remove everything on your side that holds you back, so your content gets the
            ranking it earns.
          </p>
          <p className="max-w-2xl mx-auto text-base leading-relaxed mt-6" style={{ color: 'var(--text-primary)' }}>
            Every project is different, so pricing is per project. Tell me about your site or your name and
            I&apos;ll come back with what I&apos;d do and what it costs.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('SEO enquiry')}`}
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            {EMAIL} →
          </a>
        </section>
      </div>
    </main>
  )
}
