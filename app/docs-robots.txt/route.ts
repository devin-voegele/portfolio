/**
 * robots.txt for the docs subdomain. Reached at docs.voegele.dev/robots.txt
 * (middleware rewrites /robots.txt → /docs-robots.txt on that host).
 */
export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://docs.voegele.dev/sitemap.xml
`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
