import type { Metadata } from 'next'
import Link from 'next/link'
import { Aurora } from '@/components/effects/Aurora'
import { SignalPit } from '@/components/lab/SignalPit'

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Interactive experiments — Signal Pit: a Three.js × Rapier physics toy. The cursor is a force field, a click is a shockwave, and gravity is a suggestion.',
}

export default function LabPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Soft aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <Aurora />
      </div>

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
          {'// lab'}
        </span>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="relative z-10 pt-16 pb-10 px-4 text-center">
        <p
          className="font-mono mb-3"
          style={{ fontSize: '0.7rem', letterSpacing: '0.22em', color: 'var(--accent-2)' }}
        >
          {'// EXPERIMENT 01'}
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          Signal <span className="gradient-text">Pit</span>
        </h1>
        <p
          className="max-w-xl mx-auto mt-4 text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          The hero&apos;s signal grid, given mass. Real rigid-body physics —{' '}
          <span style={{ color: 'var(--text-primary)' }}>your cursor is a force field</span>, a click is a
          shockwave, and gravity is a suggestion. When everything settles, the simulation goes to sleep.
        </p>
      </div>

      {/* ── The pit ──────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-10">
        <SignalPit />
      </div>

      {/* ── Tech note ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        <p className="font-mono text-center" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
          THREE.JS INSTANCED RENDERING · RAPIER WASM PHYSICS · SLEEPS WHEN IDLE
        </p>
      </div>
    </main>
  )
}
