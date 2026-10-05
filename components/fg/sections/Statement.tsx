'use client'

import { motion } from 'motion/react'
import { LampContainer } from '@/components/fg/ui/lamp'

/** FormulaGod's lamp effect as a full-width statement between About and Find. */
export function Statement() {
  return (
    <section aria-label="Approach" className="bg-black" style={{ marginBottom: "calc(-1 * clamp(9rem, 20vw, 15rem))" }}>
      <LampContainer>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="mt-8 bg-gradient-to-br from-white to-zinc-500 py-4 bg-clip-text text-center text-4xl font-display tracking-tight text-transparent md:text-7xl"
        >
          Built to feel fast.
          <br />
          Built to last.
        </motion.h2>
      </LampContainer>
    </section>
  )
}
