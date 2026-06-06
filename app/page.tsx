import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--bg-primary)]">
        <Hero />
      </main>
    </>
  )
}
