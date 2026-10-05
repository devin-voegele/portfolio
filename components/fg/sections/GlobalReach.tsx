'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { usePerfMode } from '@/components/providers/PerfProvider'

// cobe (WebGL globe) loads only when this section nears the viewport.
const Globe = dynamic(() => import('@/components/fg/ui/globe').then((m) => m.Globe), { ssr: false })

// Country-level marker only (Switzerland), on purpose.
const GLOBE_CONFIG = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0.6,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 12000,
  mapBrightness: 6,
  baseColor: [0.18, 0.18, 0.18] as [number, number, number],
  markerColor: [0.66, 0.5, 1] as [number, number, number],
  glowColor: [0.4, 0.4, 0.4] as [number, number, number],
  markers: [{ location: [46.8, 8.2] as [number, number], size: 0.1 }],
}

const points = [
  'Based in Switzerland, working in platform development at PwC Switzerland',
  'Sites and tools served worldwide from the edge, built to load fast anywhere',
  'Open to new projects — web, cloud, automation and identity work',
]

export function GlobalReach() {
  const tier = usePerfMode()
  const hostRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), {
      rootMargin: '300px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">Worldwide</p>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">Built in Switzerland</h2>
          <p className="text-zinc-400 text-sm leading-relaxed font-sans mb-10">
            From a quiet corner of Europe to browsers everywhere — software that is considered in how it looks and
            careful about how it runs.
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-10" />
          <div className="flex flex-col gap-6">
            {points.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="flex items-start gap-3"
              >
                <div className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                <p className="text-zinc-300 text-sm font-sans leading-relaxed">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          <div ref={hostRef} className="relative w-full max-w-[400px] h-[300px] sm:h-[400px]">
            {near && tier !== 'off' ? (
              <Globe config={{ ...GLOBE_CONFIG, mapSamples: tier === 'full' ? 12000 : 7000 }} />
            ) : (
              <div
                aria-hidden
                className="absolute inset-8 rounded-full border border-zinc-800"
                style={{ background: 'radial-gradient(circle at 35% 30%, #27272a, #09090b 70%)' }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
