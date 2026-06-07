import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { CloudDevOps } from '@/components/sections/CloudDevOps'
import { Homelab } from '@/components/sections/Homelab'
import { Projects } from '@/components/sections/Projects'
import { Hobbies } from '@/components/sections/Hobbies'
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
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
