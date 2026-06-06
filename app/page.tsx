import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Telemetry } from '@/components/sections/Telemetry'
import { Marquee } from '@/components/sections/Marquee'
import { OnTrack } from '@/components/sections/OnTrack'
import { SpecSheet } from '@/components/sections/SpecSheet'
import { OffTrack } from '@/components/sections/OffTrack'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <Telemetry />
        <Marquee />
        <OnTrack />
        <SpecSheet />
        <OffTrack />
      </main>
    </>
  )
}
