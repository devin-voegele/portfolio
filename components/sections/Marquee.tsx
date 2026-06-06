const tokens = [
  'NEXT.JS',
  'THREE.JS',
  'GSAP',
  'TYPESCRIPT',
  'SWISS MADE',
  'FORMULAGOD',
  'AVAILABLE FOR WORK',
  '2026',
]

function MarqueeGroup() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {tokens.map((word, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-display), "Arial Narrow", sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            {word}
          </span>
          <span
            style={{
              color: 'var(--accent)',
              paddingInline: '0.75em',
              fontFamily: 'var(--font-display), "Arial Narrow", sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              letterSpacing: '0.02em',
            }}
          >
            //
          </span>
        </span>
      ))}
    </span>
  )
}

export function Marquee() {
  return (
    <section
      className="v2marquee-section"
      style={{
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid var(--navy-line)',
        borderBottom: '1px solid var(--navy-line)',
        paddingBlock: 'var(--space-4)',
        whiteSpace: 'nowrap',
      }}
    >
      <div className="v2marquee-track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </section>
  )
}
