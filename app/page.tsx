import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <Stats />
      </main>
    </>
  )
}
