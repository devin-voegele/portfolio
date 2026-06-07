export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        paddingBlock: '2rem',
        width: '100%',
      }}
    >
      <div className="footer-inner font-mono">
        <span>© 2026 Devin Vögele</span>
        <span>Built with Next.js · Designed with intention</span>
      </div>

      <style>{`
        .footer-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding-inline: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
