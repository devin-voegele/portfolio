import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Telemetry } from '@/components/sections/Telemetry'
import { Marquee } from '@/components/sections/Marquee'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <Telemetry />
        <Marquee />
      </main>
    </>
  )
}
