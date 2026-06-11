function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="py-12 px-4 relative overflow-hidden">
      {/* Top gradient hairline */}
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--accent), transparent)',
          opacity: 0.3,
        }}
        aria-hidden
      />

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          {/* Col 1 — Brand */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Devin Vögele
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Developer &amp; creative technologist based in Switzerland — building premium web
              experiences and the platform tooling behind them.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/devin-voegele/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/devin-voegele-2a5989293"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:devin.voegele@microsun.ch"
                aria-label="Email"
                className="transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <MailIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Cloud & DevOps', href: '#cloud' },
                { label: 'Work', href: '#work' },
                { label: 'Hobbies', href: '#hobbies' },
                { label: 'Contact', href: '#contact' },
                { label: 'Lab', href: '/lab' },
                { label: 'Writing', href: '/blog' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Contact
            </h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Feel free to reach out if you&apos;d like to work together or just want to connect.
            </p>
            <a
              href="mailto:devin.voegele@microsun.ch"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <MailIcon />
              devin.voegele@microsun.ch
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 mt-8 border-t text-center"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            &copy; 2026 Devin Vögele — Built with Next.js · Designed with intention
          </p>
        </div>
      </div>
    </footer>
  )
}
