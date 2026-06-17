import { NextResponse, type NextRequest } from 'next/server'

/**
 * Host routing for the docs subdomain (Next 16 proxy convention).
 *
 * The docs live physically at /docs/** in this same app. When a request
 * arrives on docs.voegele.dev we rewrite the host's root onto /docs so the
 * subdomain serves clean URLs (docs.voegele.dev/performance, not /docs/...).
 * On the apex the /docs paths are still reachable (canonical'd + noindexed
 * by the docs layout), which keeps things working before DNS is set up.
 */

const DOCS_HOST = 'docs.voegele.dev'

export function proxy(req: NextRequest) {
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0]
  if (host !== DOCS_HOST) return NextResponse.next()

  const { pathname } = req.nextUrl

  // Subdomain gets its own sitemap + robots
  if (pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/docs-sitemap.xml', req.url))
  }
  if (pathname === '/robots.txt') {
    return NextResponse.rewrite(new URL('/docs-robots.txt', req.url))
  }

  // Someone hit docs.voegele.dev/docs/... → strip the redundant prefix
  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    const clean = pathname.replace(/^\/docs/, '') || '/'
    return NextResponse.redirect(new URL(clean, req.url), 308)
  }

  // Serve the docs tree from the root of the subdomain
  const dest = pathname === '/' ? '/docs' : `/docs${pathname}`
  return NextResponse.rewrite(new URL(dest, req.url))
}

export const config = {
  // Run on pages, sitemap and robots — but skip Next internals and static assets
  matcher: ['/((?!_next/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|css|js|map)$).*)'],
}
