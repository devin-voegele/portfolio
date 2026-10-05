import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const geistSans = GeistSans   // .variable === --font-geist-sans
export const geistMono = GeistMono   // .variable === --font-geist-mono

// FormulaGod's display face (Cal Sans, OFL): headings + brand wordmark.
export const calSans = localFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
  display: 'swap',
})

// Heavy grotesk for the hero name (sans, not serif).
export const heroFont = localFont({
  src: '../public/fonts/CabinetGrotesk-Extrabold.woff2',
  weight: '800',
  variable: '--font-hero',
  display: 'swap',
})
