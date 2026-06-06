'use client'

import { Github, Linkedin } from 'lucide-react'
import SplitReveal from '@/components/primitives/SplitReveal'

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="glow-orb contact-orb" aria-hidden="true" />
      <div className="contact-inner">
        <SplitReveal
          as="h2"
          trigger="scroll"
          className="font-display contact-heading"
        >
          {"LET'S BUILD SOMETHING."}
        </SplitReveal>

        <a
          href="mailto:devin.voegele@microsun.ch"
          className="contact-email font-display"
        >
          devin.voegele@microsun.ch
          <span className="contact-email-line" aria-hidden="true" />
        </a>

        <div className="contact-socials">
          <a
            href="https://github.com/devin-voegele/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="contact-social-link"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/devin-voegele-2a5989293"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="contact-social-link"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding-block: var(--space-16);
          position: relative;
          overflow: hidden;
        }
        .contact-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          z-index: 0;
          pointer-events: none;
        }
        .contact-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: 32px;
          position: relative;
          z-index: 2;
        }
        .contact-heading {
          font-weight: 800;
          color: var(--text-primary);
        }
        .contact-email {
          display: inline-block;
          font-size: clamp(1.5rem, 4vw, 3rem);
          color: var(--text-primary);
          text-decoration: none;
          margin-top: var(--space-6);
          position: relative;
        }
        .contact-email-line {
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          width: 0;
          background: var(--accent);
          transition: width 0.3s var(--ease-out-expo);
          display: block;
        }
        .contact-email:hover .contact-email-line {
          width: 100%;
        }
        .contact-socials {
          display: flex;
          gap: var(--space-3);
          margin-top: var(--space-6);
        }
        .contact-social-link {
          color: var(--text-secondary);
          transition: color 0.3s;
          display: flex;
          align-items: center;
        }
        .contact-social-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </section>
  )
}
