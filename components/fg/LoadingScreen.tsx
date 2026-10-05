'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * FormulaGod's intro: black screen, mark, hairline progress bar. Shown once
 * per session (not on every navigation) and skipped for reduced motion, so
 * it never taxes repeat visits or delays content for people who opt out.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('dv-intro') === '1'
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setVisible(true)
    try {
      sessionStorage.setItem('dv-intro', '1')
    } catch {}

    const start = performance.now()
    const duration = 900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100))
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 200)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          aria-hidden
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-display text-5xl text-white tracking-wider mb-8"
          >
            DV
          </motion.p>
          <div className="w-32 h-px bg-zinc-800 overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
