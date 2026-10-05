import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDoc, slugFromParam, flatDocs } from '@/lib/docs'
import { getDocsHostInfo, docsCanonical } from '@/lib/docs-host'
import { DEFAULT_OG } from '@/lib/seo'
import { docContent } from '@/components/docs/content'
import { DocPager } from '@/components/docs/DocPager'

type Params = { slug?: string[] }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const s = slugFromParam(slug)
  const doc = getDoc(s)
  if (!doc) return {}
  const { isSubdomain } = await getDocsHostInfo()
  const title = doc.slug === '' ? 'Docs' : `${doc.title} — Docs`
  return {
    title,
    description: doc.description,
    alternates: { canonical: docsCanonical(s) },
    openGraph: {
      type: 'article',
      url: docsCanonical(s),
      siteName: 'Devin Vögele - Docs',
      locale: 'en_US',
      title,
      description: doc.description,
      images: [DEFAULT_OG],
    },
    twitter: { card: 'summary_large_image', title, description: doc.description, images: [DEFAULT_OG.url] },
    // Only the subdomain is indexed; the apex /docs mirror is canonical'd here.
    robots: isSubdomain ? undefined : { index: false, follow: true },
  }
}

export default async function DocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const s = slugFromParam(slug)
  const doc = getDoc(s)
  const body = docContent[s]
  if (!doc || !body) notFound()

  const idx = flatDocs.findIndex((p) => p.slug === s)
  const prev = idx > 0 ? flatDocs[idx - 1] : undefined
  const next = idx >= 0 && idx < flatDocs.length - 1 ? flatDocs[idx + 1] : undefined

  return (
    <article>
      <p
        className="font-mono mb-3"
        style={{ fontSize: '0.66rem', letterSpacing: '0.18em', color: 'var(--accent-2)' }}
      >
        {doc.slug === '' ? '// DOCS' : `// ${doc.title.toUpperCase()}`}
      </p>
      <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
        {doc.title}
      </h1>
      <p className="mt-3 mb-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {doc.description}
      </p>

      <div className="prose-dv">{body}</div>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
