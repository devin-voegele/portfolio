import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { Marquee } from '@/components/sections/Marquee'
import { Work } from '@/components/sections/Work'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <Stats />
        <Marquee />
        <Work />
      </main>
    </>
  )
}
