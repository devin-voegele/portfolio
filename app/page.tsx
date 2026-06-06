import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { Marquee } from '@/components/sections/Marquee'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <Stats />
        <Marquee />
      </main>
    </>
  )
}
