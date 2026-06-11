'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export type PerfTier = 'full' | 'reduced' | 'off'
const PerfContext = createContext<PerfTier>('full')
export const usePerfMode = () => useContext(PerfContext)

export function PerfProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<PerfTier>('full')

  // Mirror the tier onto <html data-perf> so CSS can gate expensive
  // effects without prop-drilling. The liquid-glass backdrop blur is
  // applied inline here: the CSS build pipeline (Lightning CSS) strips
  // backdrop-filter declarations from stylesheets, and inline styles
  // also let weak machines skip the cost entirely.
  useEffect(() => {
    document.documentElement.dataset.perf = tier
    const blur = tier === 'full' ? 'blur(16px) saturate(1.5)' : ''
    document.querySelectorAll<HTMLElement>('.lq').forEach((el) => {
      el.style.backdropFilter = blur
      el.style.setProperty('-webkit-backdrop-filter', blur)
    })
  }, [tier])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTier('off')
      return
    }
    if (!window.matchMedia('(min-width:768px)').matches) {
      setTier('reduced')
      return
    }

    const lowCores =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 4

    // FPS sample over ~60 frames
    let frames = 0
    const start = performance.now()
    let raf = 0

    const sample = (now: number) => {
      frames++
      if (frames < 60) {
        raf = requestAnimationFrame(sample)
        return
      }
      const fps = (frames / (now - start)) * 1000
      const next: PerfTier = fps < 50 || lowCores ? 'reduced' : 'full'
      setTier(next)
    }

    raf = requestAnimationFrame(sample)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <PerfContext.Provider value={tier}>{children}</PerfContext.Provider>
}
