export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© 2026 Devin Vögele</span>
        <span>Built with Next.js · Designed with intention</span>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border);
          padding-block: var(--space-6);
        }
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
