'use client'

import { Clapperboard, Scissors, Gamepad2, Gauge, Car, Bike } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { GlareField } from '@/components/primitives/GlareField'
import type { LucideIcon } from 'lucide-react'

interface Hobby {
  name: string
  desc: string
  icon: LucideIcon
  accent: string
  iconBg: string
}

const hobbies: Hobby[] = [
  {
    name: 'Motorsport Media',
    desc: 'Content & Film',
    icon: Clapperboard,
    accent: 'var(--accent)',
    iconBg: 'rgba(37,99,235,0.10)',
  },
  {
    name: 'Video Editing',
    desc: 'Post-Production',
    icon: Scissors,
    accent: 'var(--accent-2)',
    iconBg: 'rgba(16,185,129,0.10)',
  },
  {
    name: 'Sim Racing',
    desc: 'Virtual Circuit',
    icon: Gamepad2,
    accent: 'var(--accent-3)',
    iconBg: 'rgba(139,92,246,0.10)',
  },
  {
    name: 'Formula 1',
    desc: 'Open Wheel',
    icon: Gauge,
    accent: 'var(--accent)',
    iconBg: 'rgba(37,99,235,0.10)',
  },
  {
    name: 'GT3',
    desc: 'Endurance Class',
    icon: Car,
    accent: 'var(--accent-2)',
    iconBg: 'rgba(16,185,129,0.10)',
  },
  {
    name: 'Enduro MTB',
    desc: 'Trail & Descent',
    icon: Bike,
    accent: 'var(--accent-3)',
    iconBg: 'rgba(139,92,246,0.10)',
  },
]

export function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-4 relative">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute -left-20 top-1/3 w-60 h-60 rounded-full"
          style={{ background: 'var(--accent-3)', opacity: 0.05, filter: 'blur(60px)' }}
        />
        <div
          className="absolute -right-20 bottom-1/3 w-60 h-60 rounded-full"
          style={{ background: 'var(--accent)', opacity: 0.05, filter: 'blur(60px)' }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <SectionHeader
          index="06"
          eyebrow="Beyond Code"
          title="Hobbies &"
          accent="Interests"
        />

        <FadeIn>
          <GlareField className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {hobbies.map((hobby) => {
              const Icon = hobby.icon
              return (
                <div
                  key={hobby.name}
                  className="lq lq-glare lq-hover p-6 group text-center"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:opacity-90 transition-opacity"
                    style={{
                      background: hobby.iconBg,
                      color: hobby.accent,
                    }}
                  >
                    <Icon size={28} aria-hidden />
                  </div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: hobby.accent }}
                  >
                    {hobby.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {hobby.desc}
                  </p>
                </div>
              )
            })}
          </GlareField>
        </FadeIn>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            When I&apos;m not building software, this is where my head&apos;s at — racing, riding,
            and making things. It keeps the work sharp and the perspective fresh.
          </p>
        </div>
      </div>
    </section>
  )
}
