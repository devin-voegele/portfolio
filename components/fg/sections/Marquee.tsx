'use client'

import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/fg/ui/scroll-based-velocity'

const words = ['PLATFORM', 'INTERFACES', 'IDENTITY', 'AUTOMATION', 'CLOUD', 'MOTION']

/** Scroll-velocity ticker (from FormulaGod's UI kit): speeds up as you scroll. */
export function Marquee() {
  return (
    <div aria-hidden className="relative py-10 overflow-hidden border-y border-zinc-900 bg-black">
      <ScrollVelocityContainer className="text-5xl md:text-7xl font-display tracking-tight">
        <ScrollVelocityRow baseVelocity={3} direction={1} className="py-1">
          {words.map((w) => (
            <span key={w} className="mx-6 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]">
              {w}
              <span className="mx-6 text-zinc-700">/</span>
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  )
}
