import type { Metadata } from 'next'

type PageSeo = {
  /** Page part only — the root title template appends " | Devin Vögele". */
  title: string
  description: string
  /** Path ("/blog/x") or absolute URL; resolved against metadataBase. */
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
}

/** Root app/opengraph-image.tsx — must be re-attached, or pages with their own openGraph ship no image. */
export const DEFAULT_OG = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Devin Vögele - Developer & Creative Technologist',
}

/**
 * Next merges `openGraph` shallowly: a page with none inherits the homepage's
 * (url, title, type), a page with one replaces it entirely. So every page sets
 * its own through this helper, which keeps siteName/locale in one place.
 */
export function pageMetadata(p: PageSeo): Metadata {
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: p.type ?? 'website',
      url: p.path,
      siteName: 'Devin Vögele',
      locale: 'en_US',
      title: p.title,
      description: p.description,
      images: [DEFAULT_OG],
      ...(p.type === 'article' && { publishedTime: p.publishedTime, tags: p.tags }),
    },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [DEFAULT_OG.url] },
  }
}
