'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import { PinContainer } from '@/components/fg/ui/pin-3d'
import { SectionHeading } from './SectionHeading'
import { projects, type Project } from '@/components/fg/data'

function PinBody({ p }: { p: Project }) {
  return (
    <div className="flex flex-col justify-between w-[220px] h-[200px] p-1 bg-zinc-950/80 text-left">
      <div>
        <p className="font-display text-2xl text-white tracking-tight flex items-center gap-2">
          {p.sealed && <Lock className="w-4 h-4 text-zinc-500" aria-hidden />}
          {p.title}
        </p>
        <p className="text-zinc-400 text-xs font-sans leading-relaxed mt-2">{p.desc}</p>
      </div>
      <div>
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-sans mb-1">{p.year}</p>
        <p className="text-zinc-300 text-xs font-sans">{p.stack.join(' · ')}</p>
      </div>
    </div>
  )
}

/** FormulaGod's "Trusted by the best" grid, repurposed: 3D-pin cards for the work. */
export function Work() {
  return (
    <section id="work" className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Selected Work"
          title="Things I've Built"
          blurb="Designed and built end to end — identity, interface and the engineering behind it."
          className="mb-6"
        />

        <div className="hidden md:flex flex-wrap justify-center">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="w-[300px] h-[300px]"
            >
              {p.href ? (
                <PinContainer title={p.live ? p.live.replace('https://', '') : `/work/${p.title.toLowerCase()}`} href={p.href}>
                  <PinBody p={p} />
                </PinContainer>
              ) : (
                <PinContainer title="Under wraps">
                  <PinBody p={p} />
                </PinContainer>
              )}
            </motion.div>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-1 gap-4 mt-8">
          {projects.map((p, i) => {
            const body = (
              <>
                <p className="font-display text-xl text-white">{p.title}</p>
                <p className="text-zinc-400 text-sm font-sans mt-1">{p.desc}</p>
                <p className="text-zinc-500 text-xs font-sans mt-3">
                  {p.year} · {p.stack.join(' · ')}
                </p>
              </>
            )
            const cls =
              'block p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition-colors'
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                {p.href ? (
                  <Link href={p.href} className={cls}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
