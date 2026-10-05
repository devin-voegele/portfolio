'use client'

import { BackgroundBeamsWithCollision } from '@/components/fg/ui/beams-collision'

/** FormulaGod's falling-beams effect as a closing call-to-action above Contact. */
export function Cta() {
  return (
    <section aria-label="Start a project" className="bg-black">
      <BackgroundBeamsWithCollision className="h-[30rem] md:h-[36rem]">
        <div className="relative z-20 px-6 text-center flex flex-col items-center gap-8">
          <h2 className="font-hero text-4xl md:text-7xl uppercase tracking-tight text-white leading-[1.02]">
            Have something
            <br />
            to <span className="text-violet-400">build?</span>
          </h2>
          <a
            href="#contact"
            className="px-8 py-3 bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.2)]"
          >
            Start a conversation
          </a>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  )
}
