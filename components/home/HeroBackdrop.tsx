'use client'

import dynamic from 'next/dynamic'

// three + R3F are heavy: load them after the page is interactive, client only.
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

export function HeroBackdrop() {
  return <HeroScene />
}
