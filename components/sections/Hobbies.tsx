'use client'

import { Clapperboard, Scissors, Gamepad2, Gauge, Car, Bike } from 'lucide-react'
import { FadeIn } from '@/components/primitives/FadeIn'
import type { LucideIcon } from 'lucide-react'

interface Hobby {
  name: string
  icon: LucideIcon
}

const hobbies: Hobby[] = [
  {
    name: 'Motorsport Media',
    icon: Clapperboard,
  },
  {
    name: 'Video Editing',
    icon: Scissors,
  },
  {
    name: 'Sim Racing',
    icon: Gamepad2,
  },
  {
    name: 'Formula 1',
    icon: Gauge,
  },
  {
    name: 'GT3',
    icon: Car,
  },
  {
    name: 'Enduro MTB',
    icon: Bike,
  },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <p
          className="font-mono mb-6"
          style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}
        >
          {'// BEYOND CODE'}
        </p>

        <FadeIn>
          <ul className="flex flex-wrap justify-center gap-3">
            {hobbies.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Icon size={16} aria-hidden style={{ color: 'var(--text-muted)' }} />
                {name}
              </li>
            ))}
          </ul>
        </FadeIn>

        <p className="mt-8 text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          When I&apos;m not building software I&apos;m racing, riding or editing — it keeps the
          work sharp and the perspective fresh.
        </p>
      </div>
    </section>
  )
}
