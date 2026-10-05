'use client'

import { motion } from 'motion/react'
import {
  Atom,
  Box,
  Boxes,
  Braces,
  Cloud,
  CloudCog,
  Code2,
  Container,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wind,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { GlowingEffect } from '@/components/fg/ui/glowing-effect'

interface Tech {
  name: string
  icon: LucideIcon
}
interface Group {
  title: string
  tag: string
  blurb: string
  icon: LucideIcon
  items: Tech[]
}

// Grouped the way I actually work; every item here is something I use.
const groups: Group[] = [
  {
    title: 'Frontend',
    tag: '01',
    blurb: 'Polished, motion-driven interfaces that stay fast.',
    icon: Code2,
    items: [
      { name: 'Next.js', icon: Code2 },
      { name: 'React', icon: Atom },
      { name: 'TypeScript', icon: Braces },
      { name: 'Tailwind', icon: Wind },
    ],
  },
  {
    title: 'Cloud & DevOps',
    tag: '02',
    blurb: 'Reproducible environments and automated build, test and deploy.',
    icon: Cloud,
    items: [
      { name: 'Docker', icon: Container },
      { name: 'Kubernetes', icon: Boxes },
      { name: 'CI/CD', icon: GitBranch },
      { name: 'AWS', icon: Cloud },
      { name: 'Azure', icon: CloudCog },
    ],
  },
  {
    title: 'Platform & Identity',
    tag: '03',
    blurb: 'Identity, platform management and business-process automation.',
    icon: ShieldCheck,
    items: [
      { name: 'Entra ID', icon: ShieldCheck },
      { name: 'Python', icon: Terminal },
      { name: 'BPMN', icon: Workflow },
    ],
  },
  {
    title: 'Creative',
    tag: '04',
    blurb: 'Interaction and visuals, where they earn their place.',
    icon: Sparkles,
    items: [
      { name: 'Three.js', icon: Box },
      { name: 'WebGL', icon: Sparkles },
    ],
  },
]

function GroupCard({ g, i }: { g: Group; i: number }) {
  const Icon = g.icon
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      className="relative list-none"
    >
      <div className="relative h-full rounded-2xl border border-zinc-800 p-2">
        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl bg-[#101010] p-6">
          {/* huge faint index, like the comet cards' watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl text-white/[0.04]"
          >
            {g.tag}
          </span>

          <div className="relative">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="font-display text-2xl text-white">{g.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400 font-sans">{g.blurb}</p>
          </div>

          <ul className="relative flex flex-wrap gap-2">
            {g.items.map(({ name, icon: ItemIcon }) => (
              <li
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3.5 py-1.5 text-xs font-sans text-zinc-300 transition-colors hover:border-violet-500/60 hover:text-white"
              >
                <ItemIcon className="h-3.5 w-3.5 text-violet-400" aria-hidden />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
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
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {groups.map((g, i) => (
            <GroupCard key={g.title} g={g} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
