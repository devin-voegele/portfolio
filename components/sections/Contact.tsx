'use client'

import React, { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)
    const subject = encodeURIComponent('Portfolio inquiry from ' + name.trim())
    const body = encodeURIComponent(
      message.trim() + '\n\n— ' + name.trim() + ' (' + email.trim() + ')'
    )
    window.location.href = `mailto:devin.voegele@microsun.ch?subject=${subject}&body=${body}`
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const inputCls =
    'w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-muted)]'

  return (
    <section id="contact" className="py-24 px-4 relative">
      {/* Decorative radial blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse at bottom left, rgba(16,185,129,0.07), transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <SectionHeader
          index="07"
          eyebrow="Contact Me"
          title="Get in"
          accent="Touch"
        />

        <p
          className="text-center max-w-2xl mx-auto mb-14 text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          Interested in working together, or just want to talk shop? Drop me a line — I read
          everything.
        </p>

        <FadeIn>
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* LEFT — Form */}
            <div className="md:w-1/2 order-2 md:order-1 w-full">
              <div
                className="bg-[var(--bg-surface)] p-8 rounded-xl shadow-lg border border-[var(--border)] hover-lift"
              >
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ color: 'var(--accent)' }}
                >
                  Send a Message
                </h3>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(16,185,129,0.15)',
                        color: 'var(--accent-2)',
                      }}
                    >
                      <Mail size={22} aria-hidden />
                    </div>
                    <p
                      className="font-semibold text-base"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Opening your mail app…
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Your message is pre-filled and ready to send.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setName('')
                        setEmail('')
                        setMessage('')
                      }}
                      className="mt-2 text-sm underline"
                      style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => {
                          setName(e.target.value)
                          if (errors.name) setErrors(p => ({ ...p, name: undefined }))
                        }}
                        className={inputCls}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs" style={{ color: '#f87171' }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors(p => ({ ...p, email: undefined }))
                        }}
                        className={inputCls}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs" style={{ color: '#f87171' }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Your message here…"
                        value={message}
                        onChange={e => {
                          setMessage(e.target.value)
                          if (errors.message) setErrors(p => ({ ...p, message: undefined }))
                        }}
                        className={`${inputCls} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs" style={{ color: '#f87171' }}>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 text-white font-semibold rounded-lg hover-lift disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background:
                          'linear-gradient(to right, var(--accent), var(--accent-2))',
                      }}
                    >
                      {isSubmitting ? 'Opening…' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT — Info */}
            <div className="md:w-1/2 order-1 md:order-2 w-full">
              <div className="space-y-8">
                {/* Email card */}
                <div
                  className="flex items-start gap-4 p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] hover-lift"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(37,99,235,0.10)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Mail size={22} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:devin.voegele@microsun.ch"
                      className="text-sm transition-colors hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      devin.voegele@microsun.ch
                    </a>
                  </div>
                </div>

                {/* Location card */}
                <div
                  className="flex items-start gap-4 p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] hover-lift"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(16,185,129,0.10)',
                      color: 'var(--accent-2)',
                    }}
                  >
                    <MapPin size={22} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Location</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Würenlos, Switzerland
                    </p>
                  </div>
                </div>

                {/* Connect card */}
                <div
                  className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border)] hover-lift"
                >
                  <h3
                    className="text-xl font-bold mb-5"
                    style={{ color: 'var(--accent)' }}
                  >
                    Connect With Me
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/devin-voegele/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] rounded-lg transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <GitHubIcon />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/devin-voegele-2a5989293"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] rounded-lg transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <LinkedInIcon />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a
                      href="mailto:devin.voegele@microsun.ch"
                      aria-label="Email"
                      className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-secondary)] rounded-lg transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Mail size={20} aria-hidden />
                      <span className="text-sm font-medium">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Signature sign-off */}
        <div
          className="mt-16 pt-8 text-center"
          style={{
            borderTop: '1px solid var(--border)',
          }}
        >
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Thanks for scrolling all the way down. Whether it&rsquo;s a project, a problem,
            or just talking shop &mdash; I&rsquo;d love to hear from you.
          </p>

          <p
            className="font-signature gradient-text mt-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              lineHeight: 1.1,
              display: 'inline-block',
              transform: 'rotate(-3deg)',
              transformOrigin: 'center',
            }}
          >
            Devin Vögele
          </p>

          <p
            className="font-mono text-xs mt-3"
            style={{ color: 'var(--text-muted)' }}
          >
            // crafted in Würenlos, CH
          </p>
        </div>
      </div>
    </section>
  )
}
