'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Atom, Boxes, Braces, Box, Cloud, CloudCog, Code2, Container, GitBranch, ShieldCheck, Terminal, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { stack, type StackItem } from '@/components/fg/data'

const ICONS: Record<string, LucideIcon> = {
  'Next.js': Code2,
  React: Atom,
  TypeScript: Braces,
  Tailwind: Wind,
  'Three.js': Box,
  Docker: Container,
  Kubernetes: Boxes,
  AWS: Cloud,
  Azure: CloudCog,
  'Entra ID': ShieldCheck,
  'CI/CD': GitBranch,
  Python: Terminal,
}

/** FormulaGod's "Famous Faces" tile: ringed circle + springy cursor-following tooltip. */
function StackCard({ item, index }: { item: StackItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const spring = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0)
  const rotate = useSpring(useTransform(x, [-100, 100], [-20, 20]), spring)
  const translateX = useSpring(useTransform(x, [-100, 100], [-20, 20]), spring)
  const Icon = ICONS[item.name] ?? Code2

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          x.set(0)
        }}
        onMouseMove={(e) => x.set(e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2)}
      >
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 10 } }}
              exit={{ opacity: 0, y: 16, scale: 0.7 }}
              style={{ translateX, rotate, whiteSpace: 'nowrap' }}
              className="absolute -top-20 left-1/2 z-50 flex flex-col items-center rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl px-4 py-2.5 pointer-events-none"
            >
              <p className="font-bold text-white text-sm">{item.name}</p>
              <p className="text-zinc-400 text-xs mt-0.5">{item.note}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center bg-zinc-900 ring-2 ring-zinc-700 ring-offset-2 ring-offset-black text-zinc-300 transition-all duration-500 group-hover:ring-zinc-400 group-hover:text-white">
          <Icon className="w-9 h-9 transition-transform duration-700 group-hover:scale-110" aria-hidden />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-display text-white uppercase tracking-wider">{item.name}</p>
        <p className="text-xs text-zinc-500 font-sans mt-0.5">{item.group}</p>
      </div>
    </motion.div>
  )
}

export function Stack() {
  return (
    <section id="stack" className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="The Toolbox"
          title="What I Work With"
          blurb="Interfaces, infrastructure and identity — the tools I reach for every day."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 justify-items-center">
          {stack.map((item, i) => (
            <StackCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
