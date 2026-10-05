'use client'

import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Cover } from '@/components/fg/ui/cover'
import { Logo } from '@/components/fg/Logo'
import { HeroBackdrop } from '@/components/home/HeroBackdrop'

/**
 * FormulaGod's hero (monogram, Cover-wrapped title, tagline, pill CTAs,
 * bouncing scroll cue) — with the living network scene as the backdrop in
 * place of the particle vortex.
 */
export function Hero() {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
      <HeroBackdrop />
      {/* keeps the title readable over the scene */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,0,0,0.72), rgba(0,0,0,0.2) 70%, transparent)' }}
      />

      <div className="relative z-20 flex flex-col items-center gap-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-white"
        >
          <Logo size={72} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        >
          <h1 className="font-hero text-[clamp(2.1rem,9.4vw,8.25rem)] leading-[0.98] tracking-tight text-center text-white uppercase">
            Devin <Cover className="text-white">Vögele</Cover>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed font-sans -mt-2"
        >
          Platform developer at PwC Switzerland. I build fast, considered interfaces — and the cloud, identity and
          automation underneath them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.2)]"
          >
            Work With Me
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-3 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#numbers"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll down"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
