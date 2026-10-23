'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  Languages,
  LineChart,
  ScanSearch,
  Search,
  UserRound,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Cover } from '@/components/fg/ui/cover'
import { GlowingEffect } from '@/components/fg/ui/glowing-effect'
import { LampContainer } from '@/components/fg/ui/lamp'
import { BackgroundBeamsWithCollision } from '@/components/fg/ui/beams-collision'
import { SectionHeading } from '@/components/fg/sections/SectionHeading'
import { de, en, type Lang, type SeoCopy } from './copy'

const EMAIL = 'devin.voegele@microsun.ch'

const pillPrimary =
  'w-full sm:w-auto px-8 py-3 bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.2)] text-center'
const pillGhost =
  'w-full sm:w-auto px-8 py-3 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 text-center'

// Icons by position; the text for each lives in copy.ts.
const trackIcons: LucideIcon[] = [Building2, UserRound]
const stepIcons: LucideIcon[] = [ScanSearch, Wrench, BadgeCheck, LineChart]

/* ── Hero visual: a search result page that fixes itself ─────────────── */

function SerpMock({ c }: { c: SeoCopy['serp'] }) {
  // The panel label flips from the wrong job to the right one, which is the
  // whole pitch in one gesture (and what actually happened to my own panel).
  const [fixed, setFixed] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setFixed(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      className="relative w-full max-w-md"
      aria-hidden
    >
      <div className="absolute -inset-8 rounded-[2rem] bg-violet-600/20 blur-3xl" />
      <div className="relative rounded-2xl border border-zinc-800 bg-[#0c0c0e] p-5 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
          <Search className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-200 font-sans">{c.query}</span>
          <span className="ml-auto h-4 w-px animate-pulse bg-violet-400" />
        </div>

        {/* knowledge panel */}
        <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="font-display text-2xl text-white">{c.name}</p>
          <div className="relative mt-1 h-5 overflow-hidden text-sm font-sans">
            <AnimatePresence mode="wait" initial={false}>
              {fixed ? (
                <motion.span
                  key="right"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute inset-0 flex items-center gap-1.5 text-violet-300"
                >
                  <BadgeCheck className="h-3.5 w-3.5" /> {c.right}
                </motion.span>
              ) : (
                <motion.span
                  key="wrong"
                  exit={{ y: -16, opacity: 0 }}
                  className="absolute inset-0 text-zinc-500 line-through decoration-zinc-600"
                >
                  {c.wrong}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex gap-2">
            {['Website', 'LinkedIn', 'GitHub', 'Instagram'].map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={fixed ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 * i + 0.2 }}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] text-zinc-300 font-sans"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>

        {/* first organic result */}
        <div className="mt-5 space-y-1.5">
          <p className="text-[11px] text-zinc-500 font-sans">{c.url}</p>
          <p className="text-[15px] text-violet-300 font-sans">{c.title}</p>
          <div className="h-2 w-11/12 rounded bg-zinc-800" />
          <div className="h-2 w-8/12 rounded bg-zinc-800" />
        </div>
        <div className="mt-5 space-y-1.5 opacity-40">
          <div className="h-2 w-1/3 rounded bg-zinc-800" />
          <div className="h-2.5 w-2/3 rounded bg-zinc-700" />
          <div className="h-2 w-10/12 rounded bg-zinc-800" />
        </div>
      </div>
    </motion.div>
  )
}

function Hero({ c, serp, mailto, lang }: { c: SeoCopy['hero']; serp: SeoCopy['serp']; mailto: string; lang: Lang }) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center pt-24 pb-16">
      {/* faint grid, faded out toward the edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }}
      />
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[60rem] rounded-full bg-violet-700/15 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* The pill is part of the h1 so the heading carries the search terms, not just "Get Found." */}
          <h1 className="flex flex-col items-center lg:items-start">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-zinc-300 font-sans"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> {c.pill}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className={`block font-hero uppercase tracking-tight text-white leading-[0.95] ${c.titleClass}`}
            >
              {c.titleTop} <br />
              <Cover className="text-white">{c.titleCover}</Cover>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-lg text-zinc-400 text-sm md:text-base leading-relaxed font-sans"
          >
            {c.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex w-full flex-col sm:w-auto sm:flex-row items-center gap-3 sm:gap-4"
          >
            <a href={mailto} className={pillPrimary}>
              {c.primary}
            </a>
            <a href="#services" className={pillGhost}>
              {c.secondary}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <Link
              href={c.switchHref}
              hrefLang={lang === 'en' ? 'de' : 'en'}
              className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors font-sans"
            >
              <Languages className="h-3.5 w-3.5" aria-hidden /> {c.switchLabel}
            </Link>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <SerpMock c={serp} />
        </div>
      </div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label={c.scroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-sans">{c.scroll}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  )
}

/* ── Two tracks ──────────────────────────────────────────────────────── */

type Track = SeoCopy['tracks']['items'][number]

function TrackCard({ t, i }: { t: Track; i: number }) {
  const Icon = trackIcons[i]
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="relative list-none"
    >
      <div className="relative h-full rounded-2xl border border-zinc-800 p-2">
        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-xl bg-[#101010] p-7">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl text-white/[0.04]"
          >
            0{i + 1}
          </span>
          <div className="relative">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-[11px] uppercase tracking-[0.25em] text-violet-400 font-sans">{t.label}</p>
            <h3 className="mt-2 font-display text-3xl text-white">{t.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400 font-sans">{t.intro}</p>
          </div>
          <ul className="relative space-y-3">
            {t.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300 font-sans">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10">
                  <Check className="h-3 w-3 text-violet-300" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  )
}

function Tracks({ c }: { c: SeoCopy['tracks'] }) {
  return (
    <section id="services" className="w-full py-24 px-6 relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} blurb={c.blurb} />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {c.items.map((t, i) => (
            <TrackCard key={t.label} t={t} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── Process ─────────────────────────────────────────────────────────── */

function Process({ c }: { c: SeoCopy['process'] }) {
  return (
    <section className="w-full py-24 px-6 relative">
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* the line the steps hang off (desktop) */}
          <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent md:block" />
          {c.steps.map((s, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-black text-violet-300 shadow-[0_0_24px_rgba(139,92,246,0.25)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-sans">
                  {c.step} 0{i + 1}
                </p>
                <h3 className="mt-1 font-display text-2xl text-white">{s.title}</h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-zinc-400 font-sans">{s.text}</p>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ── Statement ───────────────────────────────────────────────────────── */

function Honesty({ c }: { c: SeoCopy['honesty'] }) {
  return (
    <section aria-label={c.label} className="bg-black">
      <LampContainer>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="mt-8 bg-gradient-to-br from-white to-zinc-500 py-4 bg-clip-text text-center text-4xl font-display tracking-tight text-transparent md:text-7xl"
        >
          {c.line1}
          <br />
          {c.line2}
        </motion.h2>
      </LampContainer>
      {/* outside the lamp: extra height inside it pushes the heading under the lamp's mask.
          The negative margin pulls it up into the lamp's empty lower half, like the homepage Statement. */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-50 mx-auto max-w-xl px-6 text-center text-sm md:text-base leading-relaxed text-zinc-400 font-sans"
        style={{ marginTop: 'calc(-1 * clamp(9rem, 20vw, 15rem))' }}
      >
        {c.text}
      </motion.p>
    </section>
  )
}

/* ── Proof ───────────────────────────────────────────────────────────── */

function Proof({ c }: { c: SeoCopy['proof'] }) {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} />
        <ul className="grid gap-4 md:grid-cols-3">
          {c.items.map((p, i) => {
            const inner = (
              <div className="relative flex h-full flex-col rounded-xl bg-[#101010] p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-violet-400 font-sans">{p.kicker}</p>
                <h3 className="mt-2 font-display text-2xl text-white">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400 font-sans">{p.text}</p>
                {p.href && (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white font-sans">
                    {c.caseStudy} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                )}
              </div>
            )
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative list-none rounded-2xl border border-zinc-800 p-2"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                {p.href ? (
                  <Link href={p.href} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ── Closing CTA ─────────────────────────────────────────────────────── */

function Closing({ c, mailto }: { c: SeoCopy['closing']; mailto: string }) {
  return (
    <section aria-label={c.label} className="bg-black">
      <BackgroundBeamsWithCollision className="h-[30rem] md:h-[36rem]">
        <div className="relative z-20 px-6 text-center flex flex-col items-center gap-6">
          <h2 className="font-hero text-4xl md:text-7xl uppercase tracking-tight text-white leading-[1.02]">
            {c.line1}
            <br />
            <span className="text-violet-400">{c.line2}</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 font-sans">{c.text}</p>
          <a href={mailto} className={pillPrimary}>
            {c.cta}
          </a>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  )
}

export function SeoLanding({ lang = 'en' }: { lang?: Lang }) {
  const c = lang === 'de' ? de : en
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(c.mailSubject)}`
  return (
    <>
      <Hero c={c.hero} serp={c.serp} mailto={mailto} lang={lang} />
      <Tracks c={c.tracks} />
      <Process c={c.process} />
      <Honesty c={c.honesty} />
      <Proof c={c.proof} />
      <Closing c={c.closing} mailto={mailto} />
    </>
  )
}
