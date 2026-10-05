'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle, Send } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const EMAIL = 'devin.voegele@microsun.ch'
const field =
  'w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors font-sans'

/**
 * FormulaGod's contact form, made honest: there is no backend, so submitting
 * composes a message in the visitor's own mail app (and says so) instead of
 * pretending to have sent one.
 */
export function Contact() {
  const [opened, setOpened] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '')
    const from = String(f.get('email') ?? '')
    const msg = String(f.get('message') ?? '')
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${from})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  return (
    <section id="contact" className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Work Together"
          blurb="Whether you're a team, a brand or a fellow developer — reach out and let's build something good."
          className="mb-14"
        />

        {opened ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <CheckCircle className="w-14 h-14 text-zinc-300" aria-hidden />
            <h3 className="text-2xl font-display text-white">Check your mail app</h3>
            <p className="text-zinc-400 text-sm max-w-sm">
              Your message is ready to send. If nothing opened, write to{' '}
              <a className="text-white underline underline-offset-4" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <label className="sr-only" htmlFor="c-name">Your name</label>
            <input id="c-name" name="name" required placeholder="Your name" className={field} autoComplete="name" />
            <label className="sr-only" htmlFor="c-email">Your email</label>
            <input id="c-email" name="email" type="email" required placeholder="Your email" className={field} autoComplete="email" />
            <label className="sr-only" htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" required rows={5} placeholder="What are you building?" className={`${field} resize-none`} />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-3 bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.2)]"
            >
              <Send className="w-4 h-4" aria-hidden /> Send message
            </button>
            <p className="text-center text-xs text-zinc-600 font-sans">Opens your email app, addressed to me.</p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
