'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SignalPit } from '@/components/lab/SignalPit'
import { usePerfMode } from '@/components/providers/PerfProvider'
import { SectionHeading } from '@/components/fg/sections/SectionHeading'

/**
 * Homepage interlude that shows the /lab Signal Pit where it's safe to:
 * the heavy three+rapier chunk is only mounted once the section nears the
 * viewport AND the perf tier is 'full'. Everyone else (mobile, weak
 * machines, reduced motion) gets a lightweight CSS teaser linking to
 * /lab — initial page load is untouched either way.
 */

const TEASER_DOTS = [
  { x: '12%', y: '58%', s: 22, c: '#ffffff', r: '50%' },
  { x: '24%', y: '34%', s: 14, c: '#a78bfa', r: '50%' },
  { x: '38%', y: '66%', s: 26, c: '#71717a', r: '22%' },
  { x: '55%', y: '30%', s: 18, c: '#ffffff', r: '50%' },
  { x: '67%', y: '60%', s: 30, c: '#7043ec', r: '22%' },
  { x: '80%', y: '38%', s: 16, c: '#a1a1aa', r: '50%' },
  { x: '90%', y: '62%', s: 20, c: '#ffffff', r: '50%' },
]

export function LabSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const tier = usePerfMode()
  const [mountPit, setMountPit] = useState(false)

  useEffect(() => {
    if (tier !== 'full') return
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountPit(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [tier])

  return (
    <section ref={sectionRef} id="playground" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Lab · Experiment 01"
          title="The Signal Pit"
          blurb="Real rigid-body physics, right here — your cursor is a force field, a click is a shockwave. Built with Three.js & Rapier."
          className="mb-12"
        />

        {mountPit ? (
          <div className="rounded-2xl overflow-hidden border border-zinc-800">
            <SignalPit height="min(58vh, 540px)" />
          </div>
        ) : (
          <Link
            href="/lab"
            className="relative block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {/* same height as the mounted pit — no layout shift on swap */}
            <div style={{ height: 'min(58vh, 540px)', minHeight: '420px', position: 'relative' }}>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 44px),' +
                    'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 44px)',
                  maskImage: 'linear-gradient(to top, #000 30%, transparent 95%)',
                  WebkitMaskImage: 'linear-gradient(to top, #000 30%, transparent 95%)',
                }}
              />
              {TEASER_DOTS.map((d, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: d.x,
                    top: d.y,
                    width: d.s,
                    height: d.s,
                    borderRadius: d.r,
                    background: d.c,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="px-6 py-2.5 border border-zinc-600 text-white text-xs uppercase tracking-widest font-sans rounded-full">
                  Enter the Signal Pit
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-sans">
                  Three.js × Rapier physics
                </span>
              </div>
            </div>
          </Link>
        )}

        <p className="text-center mt-6">
          <Link
            href="/lab"
            className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors font-sans"
          >
            Open the full lab ↗
          </Link>
        </p>
      </div>
    </section>
  )
}
