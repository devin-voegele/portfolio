'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

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

  const isActive = (i: NavItem) =>
    i.section ? home && activeSection === i.section : pathname === i.href || pathname.startsWith(i.href + '/')

  const solid = scrolled || !home || menuOpen

  return (
    <header
      data-site-header
      className={`${home ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-black/90 border-b border-zinc-900' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-white tracking-wider hover:text-zinc-300 transition-colors duration-300"
        >
          DEVIN<span className="text-zinc-300">VÖGELE</span>
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
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-6 flex flex-col gap-5">
          {items.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-zinc-400 hover:text-white transition-colors font-sans"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
