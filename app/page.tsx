import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Telemetry } from '@/components/sections/Telemetry'
import { Marquee } from '@/components/sections/Marquee'
import { OnTrack } from '@/components/sections/OnTrack'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <Telemetry />
        <Marquee />
        <OnTrack />
      </main>
    </>
  )
}
