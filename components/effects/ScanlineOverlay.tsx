'use client'

/**
 * ScanlineOverlay
 * Fixed full-screen decorative grid/scanline overlay.
 * Barely-perceptible — premium, not loud.
 * Animation disabled via CSS media query for reduced-motion users.
 */
export function ScanlineOverlay() {
  return (
    <>
      <style>{`
        @keyframes scanlineDrift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 0 40px, 0 40px; }
        }

        .scanline-overlay {
          animation: scanlineDrift 20s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .scanline-overlay {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="scanline-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9990,
          background: [
            /* Fine horizontal scanlines — navy-blue tint */
            'repeating-linear-gradient(0deg, transparent 0px 3px, rgba(46,107,255,0.018) 3px 4px)',
            /* Subtle 40px grid overlay */
            `repeating-linear-gradient(90deg, rgba(234,238,245,0.012) 0px 1px, transparent 1px 40px),
             repeating-linear-gradient(0deg,  rgba(234,238,245,0.012) 0px 1px, transparent 1px 40px)`,
          ].join(', '),
        }}
      />
    </>
  )
}
