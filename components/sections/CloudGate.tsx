'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/lib/gsap'
import { usePerfMode } from '@/components/providers/PerfProvider'

const CloudScene = dynamic(() => import('@/components/3d/CloudScene'), { ssr: false })

export function CloudGate() {
  const perfTier = usePerfMode()
  const spacerRef = useRef<HTMLElement>(null)
  const fixedWrapperRef = useRef<HTMLDivElement | null>(null)
  const captionRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef(0)
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  // Determine desktop on client only
  useEffect(() => {
    setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    setMounted(true)
  }, [])

  // Only show WebGL on desktop with full/reduced perf
  const showWebGL = mounted && isDesktop && (perfTier === 'full' || perfTier === 'reduced')

  // Segments based on perf tier
  const segments = perfTier === 'reduced' ? 20 : 35

  // Create and manage the fixed portal wrapper (portals to body to escape VelocitySkew transform)
  useEffect(() => {
    if (!showWebGL) return

    const wrapper = document.createElement('div')
    wrapper.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0;
      will-change: opacity;
    `

    const caption = document.createElement('div')
    caption.style.cssText = `
      position: absolute;
      bottom: 15%;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Geist Mono', 'Courier New', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(91, 157, 255, 0.6);
      opacity: 0;
      white-space: nowrap;
      pointer-events: none;
    `
    caption.textContent = '// ENTERING SECTOR 02'

    wrapper.appendChild(caption)
    document.body.appendChild(wrapper)

    fixedWrapperRef.current = wrapper
    captionRef.current = caption
    // Trigger re-render so createPortal sees the node
    setPortalReady(true)

    return () => {
      setPortalReady(false)
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper)
      }
      fixedWrapperRef.current = null
      captionRef.current = null
    }
  }, [showWebGL])

  // ScrollTrigger drives progress ref + opacity animation
  useGSAP(
    () => {
      if (!showWebGL || !spacerRef.current) return

      const trigger = ScrollTrigger.create({
        trigger: spacerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress

          const wrapper = fixedWrapperRef.current
          const caption = captionRef.current
          if (!wrapper) return

          // Opacity: fade in first 20%, hold, fade out last 20%
          let opacity = 0
          if (self.progress < 0.2) {
            opacity = self.progress / 0.2
          } else if (self.progress > 0.8) {
            opacity = (1 - self.progress) / 0.2
          } else {
            opacity = 1
          }
          wrapper.style.opacity = String(Math.max(0, Math.min(1, opacity)))

          // Caption: fade in at 40-55%, hold at 55-65%, fade out at 65-75%
          if (caption) {
            let cOpacity = 0
            if (self.progress >= 0.4 && self.progress < 0.55) {
              cOpacity = (self.progress - 0.4) / 0.15
            } else if (self.progress >= 0.55 && self.progress < 0.65) {
              cOpacity = 1
            } else if (self.progress >= 0.65 && self.progress < 0.75) {
              cOpacity = (0.75 - self.progress) / 0.1
            }
            caption.style.opacity = String(Math.max(0, Math.min(1, cOpacity)))
          }
        },
        onLeave: () => {
          const wrapper = fixedWrapperRef.current
          if (wrapper) wrapper.style.opacity = '0'
        },
        onLeaveBack: () => {
          const wrapper = fixedWrapperRef.current
          if (wrapper) wrapper.style.opacity = '0'
        },
      })

      return () => {
        trigger.kill()
      }
    },
    { dependencies: [showWebGL], scope: spacerRef }
  )

  // CSS fallback for mobile / perf-off
  const showFallback = mounted && !showWebGL

  return (
    <>
      {/* In-flow spacer — provides scroll distance for the fly-through */}
      <section
        ref={spacerRef}
        id="cloudgate"
        aria-hidden="true"
        style={{
          position: 'relative',
          height: showWebGL ? '160vh' : showFallback ? '60vh' : '0',
          background: 'transparent',
          overflow: 'hidden',
        }}
      >
        {/* CSS mist fallback for mobile / perf-off */}
        {showFallback && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(46,107,255,0.08), transparent 70%), ' +
                'radial-gradient(ellipse 60% 80% at 30% 40%, rgba(14,24,50,0.9), transparent 80%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Geist Mono', 'Courier New', monospace",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(91, 157, 255, 0.4)',
              }}
            >
              // ENTERING SECTOR 02
            </span>
          </div>
        )}
      </section>

      {/* WebGL portal — portals to document.body to escape VelocitySkew CSS transform */}
      {showWebGL &&
        portalReady &&
        fixedWrapperRef.current &&
        createPortal(
          <CloudScene progressRef={progressRef} segments={segments} />,
          fixedWrapperRef.current
        )}
    </>
  )
}
