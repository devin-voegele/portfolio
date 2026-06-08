'use client'

import { useEffect, useRef } from 'react'

// Three SVG path layers (back → front). Each is a full-width ridge.
// Viewbox 1440×240 — fills container via preserveAspectRatio slice.

const LAYERS = [
  {
    // Back — tallest peaks, most blurred, darkest
    d: 'M0,240 L0,160 C60,145 100,120 160,100 C220,80 260,90 320,110 C380,130 400,155 460,145 C520,135 560,90 620,70 C680,50 720,60 780,80 C840,100 880,130 940,125 C1000,120 1040,95 1100,75 C1160,55 1200,65 1260,85 C1320,105 1380,130 1440,120 L1440,240 Z',
    fill: '#0d1424',
    opacity: 0.85,
    blur: '3px',
  },
  {
    // Mid — intermediate peaks
    d: 'M0,240 L0,175 C50,165 90,140 140,125 C190,110 230,115 290,135 C350,155 380,170 440,160 C500,150 540,120 600,105 C660,90 700,98 760,115 C820,132 860,155 920,150 C980,145 1020,120 1080,105 C1140,90 1180,98 1240,115 C1300,132 1380,158 1440,150 L1440,240 Z',
    fill: '#0b1020',
    opacity: 0.9,
    blur: '1px',
  },
  {
    // Front — lowest silhouette, sharpest edges, electric-blue rim stroke
    d: 'M0,240 L0,190 C40,182 80,165 130,155 C180,145 220,148 270,162 C320,176 350,188 410,182 C470,176 510,158 565,148 C620,138 660,142 710,155 C760,168 800,185 855,182 C910,179 950,162 1005,152 C1060,142 1100,145 1150,158 C1200,171 1260,188 1310,185 C1360,182 1400,172 1440,165 L1440,240 Z',
    fill: '#070b14',
    opacity: 1,
    blur: '0px',
    rimStroke: true,
  },
]

export function MountainBackdrop() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion — render static, no scroll animation
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const wrapper = wrapperRef.current
    if (!wrapper) return

    const layers = wrapper.querySelectorAll<SVGSVGElement>('[data-mountain-layer]')

    const RATES = [-0.02, -0.05, -0.09] // back, mid, front — negative = drifts up as you scroll

    function update() {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      // Fade the entire backdrop from ~0.9 at scrollY 0 → 0 at scrollY 1.4*vh
      const fadeEnd = vh * 1.4
      const opacity = Math.max(0, 0.9 * (1 - scrollY / fadeEnd))
      wrapper!.style.opacity = String(opacity)

      // Parallax translate each layer
      layers.forEach((layer, i) => {
        const rate = RATES[i] ?? -0.02
        const translateY = scrollY * rate
        layer.style.transform = `translateY(${translateY}px)`
      })

      rafRef.current = null
    }

    function onScroll() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    // Initial render
    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '55vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        // Initial opacity 0.9; JS will drive it. Also fallback for no-JS / static.
        opacity: 0.9,
      }}
    >
      {LAYERS.map((layer, i) => (
        <svg
          key={i}
          data-mountain-layer={i}
          viewBox="0 0 1440 240"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: layer.opacity,
            filter: layer.blur !== '0px' ? `blur(${layer.blur})` : undefined,
            willChange: 'transform',
          }}
        >
          <path d={layer.d} fill={layer.fill} />

          {/* Electric-blue rim on the front layer only */}
          {layer.rimStroke && (
            <path
              d={layer.d}
              fill="none"
              stroke="#2E6BFF"
              strokeWidth="1.5"
              strokeOpacity="0.30"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(46,107,255,0.35))',
              }}
            />
          )}
        </svg>
      ))}
    </div>
  )
}
