import { headers } from 'next/headers'

const DOCS_HOST = 'docs.voegele.dev'
export const DOCS_ORIGIN = 'https://docs.voegele.dev'

/**
 * Reads the request host so the docs layout/metadata can render clean
 * subdomain URLs and point canonicals at docs.voegele.dev regardless of
 * which host actually served the page. Using headers() makes the docs
 * routes dynamic — fine for text pages, and required for correct
 * per-host canonical + robots handling.
 */
export async function getDocsHostInfo() {
  const h = await headers()
  const host = (h.get('host') || '').toLowerCase().split(':')[0]
  const isSubdomain = host === DOCS_HOST
  return { host, isSubdomain, basePath: isSubdomain ? '' : '/docs' }
}

export const docsCanonical = (slug: string) => (slug ? `${DOCS_ORIGIN}/${slug}` : DOCS_ORIGIN)
