import { flatDocs } from '@/lib/docs'
import { docsCanonical } from '@/lib/docs-host'

/**
 * Sitemap for the docs subdomain. Reached at docs.voegele.dev/sitemap.xml
 * (middleware rewrites /sitemap.xml → /docs-sitemap.xml on that host).
 */
export function GET() {
  const now = new Date().toISOString()
  const urls = flatDocs
    .map(
      (p) => `  <url>
    <loc>${docsCanonical(p.slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.slug === '' ? '0.8' : '0.6'}</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
