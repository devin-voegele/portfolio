'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, PenLine } from 'lucide-react'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { SectionHeading } from './SectionHeading'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

interface Platform {
  title: string
  description: string
  icon: ReactNode
  ctaText: string
  ctaLink: string
  content: string
}

const platforms: Platform[] = [
  {
    title: 'GitHub',
    description: 'Code and experiments',
    icon: <GitHubIcon />,
    ctaText: 'Visit',
    ctaLink: 'https://github.com/devin-voegele/',
    content:
      'The home of my code: web apps, tooling and experiments.\n\nThe Signal Pit physics sandbox, the engineering handbook and the site you are looking at are all built in the open as I go.',
  },
  {
    title: 'LinkedIn',
    description: 'Professional profile',
    icon: <LinkedInIcon />,
    ctaText: 'Visit',
    ctaLink: 'https://www.linkedin.com/in/devin-voegele-2a5989293',
    content:
      'My professional profile: platform development at PwC Switzerland, the stack I work with, and the best place to reach out about work.',
  },
  {
    title: 'Writing',
    description: 'Notes from the build',
    icon: <PenLine className="w-7 h-7" aria-hidden />,
    ctaText: 'Read',
    ctaLink: '/blog',
    content:
      'Long-form notes written while building, not after: debugging stories, performance decisions and how the experiments on this site actually work.',
  },
  {
    title: 'Docs',
    description: 'Engineering handbook',
    icon: <BookOpen className="w-7 h-7" aria-hidden />,
    ctaText: 'Open',
    ctaLink: '/docs',
    content:
      'A handbook for this site and its projects: architecture, performance rules, the motion language, SEO and the case studies in one place.',
  },
]

/** FormulaGod's "Present Platforms": a list that opens into a centred modal. */
export function Find() {
  const [active, setActive] = useState<Platform | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    document.body.style.overflow = active ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <SectionHeading eyebrow="Where You'll Find Me" title="Present Platforms" />

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setActive(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 grid place-items-center z-50 px-4">
              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full max-w-[460px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800 text-white">
                      {active.icon}
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-display">{active.title}</h3>
                      <p className="text-zinc-400 text-sm font-sans">{active.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    aria-label="Close"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="px-6 pb-6">
                  <div className="h-px bg-zinc-800 mb-4" />
                  <p className="text-zinc-400 text-sm leading-relaxed font-sans whitespace-pre-line">{active.content}</p>
                  <a
                    href={active.ctaLink}
                    {...(active.ctaLink.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-5 inline-block px-5 py-2.5 text-xs rounded-full font-bold bg-white text-black hover:bg-zinc-200 transition-colors font-sans uppercase tracking-widest"
                  >
                    {active.ctaText}
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <ul className="flex flex-col gap-3">
          {platforms.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <button
                onClick={() => setActive(p)}
                className="group w-full text-left p-3 sm:p-4 flex flex-row justify-between items-center hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 rounded-2xl cursor-pointer transition-all duration-200"
              >
                <span className="flex gap-4 items-center">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 text-white group-hover:bg-zinc-700 transition-colors">
                    {p.icon}
                  </span>
                  <span>
                    <span className="block font-medium text-white font-sans">{p.title}</span>
                    <span className="block text-zinc-400 text-sm font-sans">{p.description}</span>
                  </span>
                </span>
                <span className="px-4 py-2 text-xs rounded-full font-bold bg-zinc-800 group-hover:bg-white group-hover:text-black text-zinc-300 transition-all duration-200 font-sans uppercase tracking-widest">
                  Open
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
