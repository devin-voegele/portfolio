'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      // Reduced-motion: wire anchor clicks to native scrollIntoView
      const handleAnchor = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
        if (!anchor) return
        const hash = anchor.getAttribute('href')
        if (!hash || hash === '#') return
        const el = document.querySelector(hash)
        if (!el) return
        e.preventDefault()
        el.scrollIntoView({ behavior: 'auto' })
      }
      document.addEventListener('click', handleAnchor)
      return () => document.removeEventListener('click', handleAnchor)
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Delegated anchor-click handler — smooth-scroll any in-page hash link via Lenis
    const handleAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -24, duration: 1.2 })
    }
    document.addEventListener('click', handleAnchor)

    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      document.removeEventListener('click', handleAnchor)
      gsap.ticker.remove(raf)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [])
  return <>{children}</>
}
