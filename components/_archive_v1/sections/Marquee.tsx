const TOKENS = [
  'NEXT.JS',
  'THREE.JS',
  'GSAP',
  'TYPESCRIPT',
  'SWISS MADE',
  'AVAILABLE FOR WORK',
  '2026',
  'FRAMER MOTION',
  'REACT',
  'TAILWIND',
]

const SEP = <span style={{ color: 'var(--accent)' }}> · </span>

function ContentGroup() {
  return (
    <span>
      {TOKENS.map((token, i) => (
        <span key={i}>
          {token}
          {SEP}
        </span>
      ))}
    </span>
  )
}

export function Marquee() {
  return (
    <section
      className="marquee-section"
      style={{
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        paddingBlock: 'var(--space-4)',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
        fontWeight: 700,
        color: 'var(--text-muted)',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
      }}
    >
      <div className="marquee-track">
        <ContentGroup />
        <ContentGroup />
      </div>
    </section>
  )
}
