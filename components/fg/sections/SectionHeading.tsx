'use client'

import { motion } from 'motion/react'

/** FormulaGod's section header: eyebrow, display title, blurb, gradient rule. */
export function SectionHeading({
  eyebrow,
  title,
  blurb,
  className = 'mb-16',
}: {
  eyebrow: string
  title: string
  blurb?: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`text-center ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-display text-white mb-4">{title}</h2>
      {blurb && <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed font-sans">{blurb}</p>}
      <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
    </motion.div>
  )
}
