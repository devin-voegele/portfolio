import Link from 'next/link'
import { getDocsHostInfo } from '@/lib/docs-host'
import { DocsBaseProvider } from '@/components/docs/DocsBase'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const { basePath } = await getDocsHostInfo()
  const isSub = basePath === ''
  const homeHref = isSub ? 'https://voegele.dev' : '/'

  return (
    <DocsBaseProvider basePath={basePath}>
      {/* Docs have their own chrome — hide the global floating site nav
          here (also keeps its section links off the docs subdomain). */}
      <style>{`nav[aria-label="Primary"]{display:none!important}`}</style>
      <main className="min-h-screen relative">
        {/* Ambient wash */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 60% 40% at 15% 10%, rgba(59,130,246,0.05), transparent 60%),' +
              'radial-gradient(ellipse 50% 40% at 90% 90%, rgba(139,92,246,0.05), transparent 60%)',
          }}
        />

        {/* Top bar (desktop) */}
        <div
          className="hidden md:flex items-center justify-between px-8 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <Link
            href={homeHref}
            className="font-mono text-xs transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.08em', textDecoration: 'none' }}
          >
            ← Devin Vögele
          </Link>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.16em' }}>
            {'// documentation'}
          </span>
        </div>

        <div className="max-w-6xl mx-auto md:flex md:gap-12 px-5 md:px-8 md:py-10">
          <DocsSidebar />
          <div className="min-w-0 flex-1 py-8 md:py-0" style={{ maxWidth: '46rem' }}>
            {children}
          </div>
        </div>
      </main>
    </DocsBaseProvider>
  )
}
