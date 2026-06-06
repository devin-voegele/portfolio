'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

export function MountainParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mtnARef = useRef<SVGSVGElement>(null)
  const mtnBRef = useRef<SVGSVGElement>(null)
  const mtnCRef = useRef<SVGSVGElement>(null)
  const mtnDRef = useRef<SVGSVGElement>(null)
  const mtnERef = useRef<SVGSVGElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (!sectionRef.current) return

      const isMobile =
        typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      const scale = isMobile ? 0.5 : 1

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Sky glow drifts down slightly
      tl.to(glowRef.current, { yPercent: 12 * scale, ease: 'none' }, 0)

      // Layers: back to front, increasing yPercent magnitude
      tl.to(mtnARef.current, { yPercent: -6 * scale, ease: 'none' }, 0)
      tl.to(mtnBRef.current, { yPercent: -12 * scale, ease: 'none' }, 0)
      tl.to(mtnCRef.current, { yPercent: -20 * scale, ease: 'none' }, 0)
      tl.to(mtnDRef.current, { yPercent: -30 * scale, ease: 'none' }, 0)
      tl.to(mtnERef.current, { yPercent: -42 * scale, ease: 'none' }, 0)

      // Caption: parallax + fade in mid-scroll, out late
      tl.fromTo(
        captionRef.current,
        { yPercent: 0, opacity: 0 },
        {
          yPercent: -16 * scale,
          opacity: 1,
          ease: 'none',
          duration: 0.4,
        },
        0.25
      )
      tl.to(
        captionRef.current,
        { opacity: 0, ease: 'none', duration: 0.2 },
        0.8
      )
    },
    { scope: sectionRef, dependencies: [] }
  )

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        height: '120vh',
        overflow: 'hidden',
        width: '100%',
        background: 'linear-gradient(to bottom, var(--bg-primary) 0%, #0C1424 100%)',
      }}
    >
      {/* Stars — faint scattered dots in the upper sky */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(1px 1px at 12% 8%, rgba(91,157,255,0.4) 0%, transparent 100%),' +
            'radial-gradient(1px 1px at 28% 15%, rgba(91,157,255,0.3) 0%, transparent 100%),' +
            'radial-gradient(2px 2px at 41% 6%, rgba(91,157,255,0.2) 0%, transparent 100%),' +
            'radial-gradient(1px 1px at 57% 11%, rgba(91,157,255,0.35) 0%, transparent 100%),' +
            'radial-gradient(1px 1px at 69% 4%, rgba(91,157,255,0.25) 0%, transparent 100%),' +
            'radial-gradient(2px 2px at 78% 18%, rgba(91,157,255,0.2) 0%, transparent 100%),' +
            'radial-gradient(1px 1px at 88% 9%, rgba(91,157,255,0.3) 0%, transparent 100%),' +
            'radial-gradient(1px 1px at 22% 22%, rgba(91,157,255,0.15) 0%, transparent 100%),' +
            'radial-gradient(1px 1px at 95% 14%, rgba(91,157,255,0.2) 0%, transparent 100%),' +
            'radial-gradient(2px 2px at 6% 20%, rgba(91,157,255,0.15) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Horizon glow — electric-blue backlight behind peaks */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 40% at 50% 78%, rgba(46,107,255,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          willChange: 'transform',
        }}
      />

      {/* ── Layer A — farthest, shortest, highest fill ── */}
      <svg
        ref={mtnARef}
        className="mtn-layer mtn-a"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 3,
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      >
        <path
          d="M0,280 L40,258 L80,270 L120,240 L160,252 L200,224 L250,238 L290,212 L330,230 L370,200 L420,218 L460,190 L500,208 L550,176 L590,196 L640,160 L680,182 L720,152 L760,174 L810,144 L850,168 L900,136 L940,158 L990,128 L1030,150 L1080,120 L1120,144 L1160,116 L1200,140 L1250,112 L1290,136 L1340,108 L1380,130 L1440,110 L1440,320 L0,320 Z"
          fill="#16203A"
        />
      </svg>

      {/* ── Layer B — mid-far ── */}
      <svg
        ref={mtnBRef}
        className="mtn-layer mtn-b"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 4,
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      >
        <path
          d="M0,300 L30,278 L60,292 L100,256 L140,274 L180,240 L210,260 L250,218 L290,242 L320,204 L360,228 L400,188 L440,214 L480,170 L520,198 L560,152 L600,180 L640,136 L680,164 L720,120 L760,148 L800,104 L840,134 L890,92 L930,124 L970,88 L1010,118 L1060,80 L1100,112 L1150,76 L1190,108 L1240,72 L1280,100 L1330,68 L1370,96 L1440,72 L1440,360 L0,360 Z"
          fill="#111A2E"
        />
      </svg>

      {/* ── Layer C — mid ── */}
      <svg
        ref={mtnCRef}
        className="mtn-layer mtn-c"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 5,
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      >
        <path
          d="M0,330 L35,302 L65,318 L100,280 L130,296 L165,256 L200,278 L240,234 L275,258 L310,216 L350,244 L390,198 L425,226 L460,182 L500,210 L540,160 L580,192 L620,144 L660,176 L700,128 L740,162 L785,110 L820,148 L860,98 L900,136 L940,86 L980,126 L1020,76 L1065,116 L1105,68 L1145,108 L1185,60 L1225,102 L1270,56 L1310,96 L1355,52 L1400,90 L1440,62 L1440,400 L0,400 Z"
          fill="#0C1424"
        />
      </svg>

      {/* ── Layer D — front range + electric-blue rim ── */}
      <svg
        ref={mtnDRef}
        className="mtn-layer mtn-d"
        viewBox="0 0 1440 440"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 6,
          willChange: 'transform',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 8px rgba(46,107,255,0.35))',
        }}
      >
        <defs>
          <filter id="rimGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main fill */}
        <path
          d="M0,360 L25,328 L55,348 L90,308 L120,330 L155,284 L190,310 L230,260 L265,290 L305,242 L340,274 L380,220 L415,256 L455,204 L490,244 L530,188 L565,230 L605,172 L640,218 L680,158 L715,206 L755,144 L795,196 L835,130 L870,184 L915,116 L950,174 L990,102 L1030,162 L1075,90 L1115,152 L1155,80 L1195,144 L1235,70 L1275,136 L1320,62 L1360,128 L1400,56 L1440,118 L1440,440 L0,440 Z"
          fill="#080B14"
        />

        {/* Electric-blue rim stroke — traces ridge with glow */}
        <path
          d="M0,360 L25,328 L55,348 L90,308 L120,330 L155,284 L190,310 L230,260 L265,290 L305,242 L340,274 L380,220 L415,256 L455,204 L490,244 L530,188 L565,230 L605,172 L640,218 L680,158 L715,206 L755,144 L795,196 L835,130 L870,184 L915,116 L950,174 L990,102 L1030,162 L1075,90 L1115,152 L1155,80 L1195,144 L1235,70 L1275,136 L1320,62 L1360,128 L1400,56 L1440,118"
          fill="none"
          stroke="#3E7BFF"
          strokeWidth="2"
          filter="url(#rimGlow)"
        />
      </svg>

      {/* ── Layer E — foreground sliver, near-black, fastest ── */}
      <svg
        ref={mtnERef}
        className="mtn-layer mtn-e"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 7,
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      >
        <path
          d="M0,140 L20,128 L45,138 L70,118 L95,130 L120,108 L150,122 L180,98 L210,114 L240,90 L270,108 L300,84 L335,102 L365,78 L400,96 L430,72 L460,90 L490,66 L525,86 L555,60 L585,78 L615,54 L645,74 L680,50 L710,70 L740,46 L775,68 L810,44 L845,64 L875,40 L910,62 L945,38 L980,58 L1015,34 L1050,56 L1085,32 L1120,54 L1155,30 L1190,52 L1225,28 L1260,50 L1295,26 L1330,48 L1365,24 L1400,46 L1440,22 L1440,200 L0,200 Z"
          fill="#04060C"
        />
      </svg>

      {/* Caption overlay — coordinates + terrain callout */}
      <div
        ref={captionRef}
        style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 8,
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: 'var(--accent)', marginRight: '0.4em' }}>//</span>
          OFF THE TARMAC
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginTop: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          47.4373° N&nbsp;&nbsp;
          <span style={{ color: 'var(--accent)' }}>//</span>
          &nbsp;&nbsp;8.3614° E
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginTop: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          ELEVATION GAIN
        </div>
      </div>
    </section>
  )
}
