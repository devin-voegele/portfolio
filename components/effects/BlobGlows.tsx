export function BlobGlows() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      <div
        className="blob-glow animate-blob"
        style={{ top: '8%', left: '12%', background: 'var(--accent)' }}
      />
      <div
        className="blob-glow animate-blob"
        style={{ top: '32%', right: '10%', background: 'var(--accent-2)', animationDelay: '3s' }}
      />
      <div
        className="blob-glow animate-blob"
        style={{ bottom: '6%', left: '40%', background: 'var(--accent-3)', animationDelay: '6s' }}
      />
    </div>
  )
}
