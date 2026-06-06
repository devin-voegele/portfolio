'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function PageIntro() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    const t = setTimeout(() => setDone(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.span
            className="font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
            }}
          >
            D.V.
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
