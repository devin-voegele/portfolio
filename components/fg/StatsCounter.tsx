'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export interface Stat {
  value: number
  label: string
  suffix?: string
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let t0: number | null = null
    let raf = 0
    const step = (ts: number) => {
      if (t0 === null) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return count
}

function StatCard({ value, label, suffix = '' }: Stat) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 1800, visible)

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="relative">
        <span className="text-5xl md:text-6xl font-display text-white tracking-tight">
          {visible ? count : 0}
          <span className="text-zinc-300">{suffix}</span>
        </span>
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-sans text-center">{label}</span>
    </motion.div>
  )
}

export function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 w-full max-w-5xl mx-auto px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </motion.div>
  )
}
