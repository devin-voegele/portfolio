'use client'

import { Aurora } from '@/components/effects/Aurora'
import { LiveTerminal } from '@/components/primitives/LiveTerminal'
import { Magnetic } from '@/components/primitives/Magnetic'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{ minHeight: '100vh', padding: '5rem 1.5rem' }}
    >
      {/* Aurora animated background — z0, behind everything */}
      <Aurora />

      {/* ── Centered single-column content ──────────────────────── */}
      <div
        className="relative mx-auto w-full flex flex-col items-center text-center"
        style={{ zIndex: 10, maxWidth: '48rem', gap: '0' }}
      >
        {/* 1. Badge pill */}
        <div className="reveal-load" style={{ marginBottom: '1.25rem', animationDelay: '0.05s' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 500,
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
              border: '1px solid rgba(37,99,235,0.25)',
            }}
          >
            Platform Developer @ PwC Switzerland
          </span>
        </div>

        {/* 2. Glitch name */}
        <h1
          className="glitch-text reveal-load"
          data-text="Devin Vögele"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-geist-sans)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            textAlign: 'center',
            animationDelay: '0.12s',
          }}
        >
          Devin Vögele
        </h1>

        {/* 3. One-line subtitle */}
        <p
          className="reveal-load"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            lineHeight: 1.4,
            textAlign: 'center',
            animationDelay: '0.2s',
          }}
        >
          Developer &amp;{' '}
          <span className="gradient-text">Creative Technologist</span>
        </p>

        {/* 4. Live Terminal — centerpiece */}
        <div
          className="reveal-load w-full"
          style={{ marginBottom: '2rem', animationDelay: '0.3s' }}
        >
          <LiveTerminal />
        </div>

        {/* 5. CTA pills */}
        <div
          className="flex flex-wrap justify-center reveal-load"
          style={{ gap: '1rem', marginBottom: '2rem', animationDelay: '0.42s' }}
        >
          <Magnetic>
            <a
              href="#work"
              className="hover-lift"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: 500,
                fontSize: '1rem',
                background: 'var(--accent)',
                color: '#fff',
                textDecoration: 'none',
                transition: 'filter 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.filter = 'brightness(1.15)'
                el.style.boxShadow = '0 0 15px var(--accent-glow)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.filter = ''
                el.style.boxShadow = ''
              }}
            >
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="hover-lift"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: 500,
                fontSize: '1rem',
                background: 'transparent',
                color: 'var(--accent)',
                border: '2px solid var(--accent)',
                textDecoration: 'none',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background =
                  'var(--accent-subtle)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              }}
            >
              Get in Touch
            </a>
          </Magnetic>
        </div>

        {/* 6. Social icons */}
        <div
          className="flex justify-center reveal-load"
          style={{ gap: '1rem', animationDelay: '0.52s' }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/devin-voegele/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            style={{
              color: 'var(--text-secondary)',
              transition: 'color 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                'var(--text-secondary)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/devin-voegele-2a5989293"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            style={{
              color: 'var(--text-secondary)',
              transition: 'color 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                'var(--text-secondary)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:devin.voegele@microsun.ch"
            aria-label="Send email"
            style={{
              color: 'var(--text-secondary)',
              transition: 'color 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                'var(--text-secondary)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Hero-bottom fade: aurora dissolves into page bg ──────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '34vh',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.55) 55%, #0a0a0a 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* 7. Bounce chevron scroll indicator */}
      <div
        className="absolute flex flex-col items-center animate-bounce"
        aria-hidden="true"
        style={{
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '1.5rem',
            height: '1.5rem',
            borderRight: '2px solid var(--accent)',
            borderBottom: '2px solid var(--accent)',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    </section>
  )
}
