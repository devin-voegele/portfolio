export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--navy-line)',
        paddingBlock: 'var(--space-6)',
        width: '100%',
      }}
    >
      <div className="footer-inner font-mono">
        <span>© 2026 DEVIN VÖGELE</span>
        <span>BUILT WITH NEXT.JS // DESIGNED AT RACE PACE</span>
      </div>

      <style>{`
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  )
}
