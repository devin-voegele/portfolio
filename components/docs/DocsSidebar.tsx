'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav } from '@/lib/docs'
import { useDocsBase, docHref } from '@/components/docs/DocsBase'

export function DocsSidebar() {
  const base = useDocsBase()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const rel = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  const currentSlug = rel.replace(/^\//, '')

  const nav = (
    <nav className="flex flex-col gap-7">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p
            className="font-mono mb-2.5"
            style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}
          >
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.pages.map((p) => {
              const active = p.slug === currentSlug
              return (
                <li key={p.slug || 'index'}>
                  <Link
                    href={docHref(base, p.slug)}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className="block transition-colors"
                    style={{
                      fontSize: '0.85rem',
                      padding: '0.35rem 0.7rem',
                      borderRadius: '7px',
                      textDecoration: 'none',
                      lineHeight: 1.35,
                      color: active ? 'var(--accent-bright)' : 'var(--text-secondary)',
                      background: active ? 'rgba(59,130,246,0.10)' : 'transparent',
                      borderLeft: active ? '2px solid var(--accent-bright)' : '2px solid transparent',
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {p.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      <Link
        href="/blog"
        className="font-mono transition-colors hover:text-[var(--accent-bright)]"
        style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textDecoration: 'none', marginTop: '0.5rem' }}
      >
        WRITING ↗
      </Link>
    </nav>
  )

  return (
    <>
      {/* Mobile toggle bar */}
      <div
        className="md:hidden sticky top-0 z-30 flex items-center justify-between px-5 py-3"
        style={{ background: 'rgba(5,6,12,0.85)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href={base === '' ? 'https://voegele.dev' : '/'}
          className="font-mono transition-colors hover:text-[var(--accent)]"
          style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          ← Devin Vögele
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-mono"
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            color: 'var(--text-primary)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '7px',
            padding: '0.35rem 0.7rem',
          }}
        >
          {open ? 'CLOSE ✕' : 'MENU ☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          {nav}
        </div>
      )}

      {/* Desktop rail */}
      <aside
        className="hidden md:block flex-shrink-0"
        style={{ width: '15rem' }}
      >
        <div className="sticky top-6 px-2 py-2">{nav}</div>
      </aside>
    </>
  )
}
