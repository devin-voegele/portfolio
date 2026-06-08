'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): boolean {
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Name is required'
    if (!email.trim()) {
      next.email = 'Email is required'
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = 'Please enter a valid email'
    }
    if (!message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent('Portfolio inquiry from ' + name.trim())
    const body = encodeURIComponent(
      message.trim() + '\n\n— ' + name.trim() + ' (' + email.trim() + ')'
    )
    window.location.href = `mailto:devin.voegele@microsun.ch?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      style={{ paddingBlock: '7rem' }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingInline: '1rem',
          width: '100%',
        }}
      >
        <SectionHeader
          index="07"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s <span className="gradient-text">Connect</span>
            </>
          }
        />

        {/* 2-col grid */}
        <div className="contact-grid">

          {/* LEFT column */}
          <FadeIn>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
              }}
            >
              {/* Tagline */}
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '1rem',
                }}
              >
                Have a project in mind, or just want to talk shop? My inbox is open.
              </p>

              {/* Big email link */}
              <a
                href="mailto:devin.voegele@microsun.ch"
                className="contact-email-link font-geist-sans"
              >
                devin.voegele@microsun.ch
                <span className="contact-underline" aria-hidden />
              </a>

              {/* Social icon row */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                }}
              >
                <a
                  href="https://github.com/devin-voegele/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="glass hover-lift social-icon-btn"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/devin-voegele-2a5989293"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass hover-lift social-icon-btn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="mailto:devin.voegele@microsun.ch"
                  aria-label="Email"
                  className="glass hover-lift social-icon-btn"
                >
                  <Mail size={20} aria-hidden />
                </a>
              </div>

              {/* Status line */}
              <p
                className="font-mono"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                }}
              >
                // open to work · based in switzerland
              </p>
            </div>
          </FadeIn>

          {/* RIGHT column — contact form */}
          <FadeIn>
            <div
              className="glass"
              style={{
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              {submitted ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    minHeight: '260px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: 'rgba(16,185,129,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-2)',
                    }}
                  >
                    <Mail size={22} aria-hidden />
                  </div>
                  <p
                    className="font-geist-sans"
                    style={{
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Opening your mail app…
                  </p>
                  <p
                    className="font-mono"
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    // message ready to send
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setName('')
                      setEmail('')
                      setMessage('')
                    }}
                    className="font-mono"
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      color: 'var(--accent)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Name field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-name"
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })) }}
                      placeholder="Your name"
                      className="contact-input"
                    />
                    {errors.name && (
                      <span className="font-mono contact-field-error">{errors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-email"
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })) }}
                      placeholder="you@example.com"
                      className="contact-input"
                    />
                    {errors.email && (
                      <span className="font-mono contact-field-error">{errors.email}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label
                      htmlFor="contact-message"
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={e => { setMessage(e.target.value); if (errors.message) setErrors(p => ({ ...p, message: undefined })) }}
                      placeholder="What's on your mind?"
                      className="contact-input contact-textarea"
                    />
                    {errors.message && (
                      <span className="font-mono contact-field-error">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="contact-submit hover-lift font-geist-sans"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Email link */
        .contact-email-link {
          font-size: clamp(1.1rem, 2.5vw, 1.75rem);
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          display: inline-block;
          position: relative;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        .contact-email-link:hover {
          color: var(--accent);
        }
        .contact-underline {
          display: block;
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.35s var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1));
        }
        .contact-email-link:hover .contact-underline {
          width: 100%;
        }

        /* Social icon buttons */
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 9999px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease, transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .social-icon-btn:hover {
          color: var(--accent);
        }

        /* Form inputs */
        .contact-input {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-family: var(--font-body), system-ui, sans-serif;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          width: 100%;
        }
        .contact-input::placeholder {
          color: var(--text-muted);
        }
        .contact-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.18);
        }
        .contact-textarea {
          resize: vertical;
          min-height: 120px;
        }

        /* Field errors */
        .contact-field-error {
          font-size: 0.68rem;
          letter-spacing: 0.05em;
          color: #f87171;
        }

        /* Submit button */
        .contact-submit {
          width: 100%;
          padding: 0.85rem 1.5rem;
          border-radius: 9999px;
          background: var(--accent);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease;
        }
        .contact-submit:hover {
          background: var(--accent-bright);
          box-shadow: 0 0 20px rgba(37,99,235,0.45);
        }
        .contact-submit:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
      `}</style>
    </section>
  )
}
