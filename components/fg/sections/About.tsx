'use client'

import { motion } from 'motion/react'
import { CometCard } from '@/components/fg/ui/comet-card'

const cards = [
  { title: 'Frontend', bg: 'FRONT', description: 'Next.js, React, TypeScript, motion.' },
  { title: 'Cloud & DevOps', bg: 'CLOUD', description: 'Docker, Kubernetes, CI/CD, AWS, Azure.' },
  { title: 'Platform & Identity', bg: 'IAM', description: 'Entra ID, CloudPods, process automation.' },
  { title: 'Creative', bg: 'MOTION', description: 'Three.js, WebGL and motion design.' },
]

export function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">
            Considered,
            <br />
            <span className="text-zinc-300">and fast</span>
          </h2>
          <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-sans">
            <p>
              I&apos;m a developer and creative technologist based in Switzerland, currently in platform development
              at PwC Switzerland. I build premium web experiences, motorsport media platforms and interactive tools.
            </p>
            <p>
              My work spans the full stack and into the platform — clean interfaces and motion on the front; cloud,
              automation and identity infrastructure underneath. I care about building things that are as considered
              as they are fast: sharp systems, clear interfaces, and infrastructure that just works.
            </p>
            <p>Off the clock: motorsport media, video editing, sim racing and enduro MTB.</p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-8 bg-zinc-500" />
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
              Devin Vögele - Developer &amp; Creative Technologist
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {cards.map((item) => (
            <CometCard key={item.title} rotateDepth={10} translateDepth={10}>
              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#141414] p-5 h-40">
                <p className="font-sans text-sm font-bold text-white relative z-10">{item.title}</p>
                <p
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-start pl-5 font-display text-5xl font-bold text-white/10 select-none pointer-events-none tracking-tight"
                >
                  {item.bg}
                </p>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed relative z-10">{item.description}</p>
              </div>
            </CometCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
