'use client'

import SplitReveal from '@/components/primitives/SplitReveal'
import TelemetryLabel from '@/components/primitives/TelemetryLabel'
import MagneticButton from '@/components/primitives/MagneticButton'
import TypingRoles from '@/components/primitives/TypingRoles'
import { BlobGlows } from '@/components/effects/BlobGlows'

const ROLES = [
  'Platform Developer @ PwC',
  'Creative Technologist',
  'Next.js / TypeScript / React',
  'Motorsport Media',
  'Docker · AWS · Python',
]

export function Hero() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 32px',
        overflow: 'hidden',
      }}
    >
      {/* Blob glows — fixed, z0, behind everything */}
      <BlobGlows />

      {/* Static radial gradient background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 55% at 28% 38%, rgba(46,107,255,0.13), transparent 70%), radial-gradient(circle 40% at 82% 18%, rgba(91,157,255,0.06), transparent 60%)',
        }}
      />

      {/* Vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
        }}
      >
        {/* Badge pill */}
        <div
          className="glass font-mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-3)',
          }}
        >
          {/* Pulsing dot */}
          <span className="v2nav-pulse-dot" />
          <span style={{ color: 'var(--accent)' }}>DEVIN VÖGELE</span>
          <span style={{ opacity: 0.5 }}>&nbsp;//&nbsp;</span>
          <span>PLATFORM DEVELOPER @ PwC</span>
        </div>

        {/* Eyebrow */}
        <TelemetryLabel>WÜRENLOS, CH // 47.4373° N — 2026</TelemetryLabel>

        {/* Three-line headline */}
        <div style={{ marginTop: 'var(--space-3)' }}>
          <SplitReveal as="h1" trigger="mount" className="font-display hero-headline">
            DEVELOPER.
          </SplitReveal>
          {/* CREATIVE gets the blue→green gradient for the blend */}
          <SplitReveal as="h1" trigger="mount" className="font-display hero-headline hero-headline-gradient">
            CREATIVE
          </SplitReveal>
          <SplitReveal as="h1" trigger="mount" className="font-display hero-headline">
            TECHNOLOGIST.
          </SplitReveal>
        </div>

        {/* Terminal typing line */}
        <div
          className="font-mono"
          style={{
            marginTop: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          }}
        >
          <span style={{ color: 'var(--accent)', userSelect: 'none' }}>{'>'}</span>
          <TypingRoles roles={ROLES} />
        </div>

        {/* Subline */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            maxWidth: '480px',
            marginTop: 'var(--space-3)',
            lineHeight: 1.6,
          }}
        >
          Building premium web experiences at race pace.
        </p>

        {/* Button row */}
        <div
          style={{
            marginTop: 'var(--space-6)',
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton href="#work" variant="solid">
            VIEW WORK →
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            GET IN TOUCH
          </MagneticButton>
        </div>

        {/* Social icons */}
        <div
          style={{
            marginTop: 'var(--space-4)',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/devin-voegele/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="social-icon-link"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/devin-voegele-2a5989293"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="social-icon-link"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="font-mono"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'var(--space-4)',
          left: '32px',
          zIndex: 2,
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>SCROLL // 00</span>
        <span
          style={{
            display: 'inline-block',
            width: '1px',
            height: '24px',
            background: 'var(--text-muted)',
            animation: 'heroScrollLine 1.4s ease-in-out infinite',
            opacity: 0.6,
          }}
        />
      </div>

      <style>{`
        .hero-headline {
          color: var(--text-primary);
          line-height: 0.9 !important;
          margin: 0 !important;
        }
        .hero-headline-gradient {
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
          line-height: 0.9 !important;
          margin: 0 !important;
        }
        /* SplitReveal word spans inherit color:transparent — that's fine,
           gradient-clip propagates through the inline spans correctly */
        .hero-headline-gradient .split-line,
        .hero-headline-gradient [style] {
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
        }
        .social-icon-link {
          color: var(--text-muted);
          transition: color 0.25s ease;
          display: inline-flex;
          align-items: center;
        }
        .social-icon-link:hover {
          color: var(--accent);
        }
        @keyframes heroScrollLine {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(0.4); opacity: 0.2; }
        }
      `}</style>
    </section>
  )
}
