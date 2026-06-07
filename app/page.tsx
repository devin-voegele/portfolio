import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { OnTrack } from '@/components/sections/OnTrack'
import { SpecSheet } from '@/components/sections/SpecSheet'
import { OffTrack } from '@/components/sections/OffTrack'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <main className="bg-[var(--bg-primary)]">
        <Hero />
        <About />
        <Skills />
        <OnTrack />
        <SpecSheet />
        <OffTrack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
