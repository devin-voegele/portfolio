'use client'

import Link from 'next/link'
import type { DocPage } from '@/lib/docs'
import { useDocsBase, docHref } from '@/components/docs/DocsBase'

export function DocPager({ prev, next }: { prev?: DocPage; next?: DocPage }) {
  const base = useDocsBase()
  if (!prev && !next) return null

  return (
    <nav
      className="mt-12 pt-6 grid grid-cols-2 gap-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div>
        {prev && (
          <Link href={docHref(base, prev.slug)} className="lq lq-hover block p-4" style={{ textDecoration: 'none' }}>
            <span className="font-mono block mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>
              ← PREVIOUS
            </span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link href={docHref(base, next.slug)} className="lq lq-hover block p-4" style={{ textDecoration: 'none' }}>
            <span className="font-mono block mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>
              NEXT →
            </span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
