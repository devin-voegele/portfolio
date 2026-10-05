'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Logo } from '@/components/fg/Logo'

type NavItem = { name: string; href: string; section?: string }

const items: NavItem[] = [
  { name: 'About', href: '/#about', section: 'about' },
  { name: 'Stack', href: '/#stack', section: 'stack' },
  { name: 'Work', href: '/#work', section: 'work' },
  { name: 'Lab', href: '/lab' },
  { name: 'Writing', href: '/blog' },
  { name: 'Docs', href: '/docs' },
  { name: 'Contact', href: '/#contact', section: 'contact' },
]

/**
 * FormulaGod's header: transparent over the hero, solid once scrolled, a
 * violet squiggle that slides between links, and a simple mobile sheet.
 * Fixed on the homepage (hero runs underneath it), sticky on inner pages.
 * (No backdrop-blur: the build strips it, so a solid tint is used instead.)
 */
export function Nav() {
  const pathname = usePathname()
  const home = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hovered, setHovered] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!home) return
    const obs: IntersectionObserver[] = []
    items.forEach(({ section }) => {
      const el = section && document.getElementById(section)
      if (!el) return
      const o = new IntersectionObserver(([e]) => e.isIntersecting && setActiveSection(section), { threshold: 0.3 })
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach((o) => o.disconnect())
  }, [home])

  // close on route change, Esc, or when the viewport grows past the mobile layout
  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [menuOpen])

  const isActive = (i: NavItem) =>
    i.section ? home && activeSection === i.section : pathname === i.href || pathname.startsWith(i.href + '/')

  const solid = scrolled || !home

  return (
    <header
      data-site-header
      className={`${home ? 'fixed' : 'sticky'} inset-x-0 top-0 z-[65] transition-colors duration-300 ${
        menuOpen ? 'bg-black border-b border-zinc-900' : solid ? 'bg-black/90 border-b border-zinc-900' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Devin Vögele — home"
          className="relative z-[70] text-white hover:text-zinc-300 transition-colors duration-300"
        >
          <Logo size={38} />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {items.map((l) => {
            const show = isActive(l) || hovered === l.name
            return (
              <Link
                key={l.name}
                href={l.href}
                onMouseEnter={() => setHovered(l.name)}
                onMouseLeave={() => setHovered('')}
                aria-current={isActive(l) ? 'page' : undefined}
                className={`relative text-xs uppercase tracking-widest font-sans transition-colors duration-300 pb-2 ${
                  show ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {l.name}
                {show && (
                  <motion.div layoutId="squiggle" className="absolute -bottom-[2px] left-0 right-0 flex justify-center">
                    <svg width="37" height="8" viewBox="0 0 37 8" fill="none" aria-hidden>
                      <motion.path
                        d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                        stroke="#7043EC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: 84.2, strokeDashoffset: 84.2 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </svg>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </nav>

        <button
          className="md:hidden relative z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-3.5 w-5" aria-hidden>
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[60] flex flex-col bg-black px-6 pb-8 pt-24"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {items.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(l) ? 'page' : undefined}
                    className="group flex items-baseline gap-4 border-b border-zinc-900 py-4"
                  >
                    <span className="w-6 text-xs font-sans text-zinc-600 group-hover:text-violet-400 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-4xl transition-colors ${
                        isActive(l) ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {l.name}
                    </span>
                    {isActive(l) && <span className="ml-auto h-2 w-2 rounded-full bg-violet-500" aria-hidden />}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 text-xs uppercase tracking-widest text-zinc-500 font-sans">
              <a href="https://github.com/devin-voegele/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/devin-voegele-2a5989293" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn ↗
              </a>
              <a href="mailto:devin.voegele@microsun.ch" className="hover:text-white transition-colors">
                Email ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
