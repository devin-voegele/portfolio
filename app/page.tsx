import { Hero } from '@/components/fg/sections/Hero'
import { Numbers } from '@/components/fg/sections/Numbers'
import { GlobalReach } from '@/components/fg/sections/GlobalReach'
import { About } from '@/components/fg/sections/About'
import { Marquee } from '@/components/fg/sections/Marquee'
import { Find } from '@/components/fg/sections/Find'
import { Stack } from '@/components/fg/sections/Stack'
import { Work } from '@/components/fg/sections/Work'
import { LabSection } from '@/components/sections/LabSection'
import { Writing } from '@/components/fg/sections/Writing'
import { Contact } from '@/components/fg/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { SocialDock } from '@/components/fg/SocialDock'
import { LoadingScreen } from '@/components/fg/LoadingScreen'

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <SocialDock />
      <main>
        <Hero />
        <Numbers />
        <GlobalReach />
        <About />
        <Marquee />
        <Find />
        <Stack />
        <Work />
        <LabSection />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
