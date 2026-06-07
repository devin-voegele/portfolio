import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { CloudDevOps } from '@/components/sections/CloudDevOps'
import { Homelab } from '@/components/sections/Homelab'
import { OnTrack } from '@/components/sections/OnTrack'
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
        <CloudDevOps />
        <Homelab />
        <OnTrack />
        <OffTrack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
