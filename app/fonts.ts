import localFont from 'next/font/local'
import { Archivo } from 'next/font/google'
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

// Hero name: heavy, wide, true italic — a forward-leaning "speed" voice (sans).
export const heroFont = Archivo({
  subsets: ['latin'],
  style: 'italic',
  axes: ['wdth'],
  variable: '--font-hero',
  display: 'swap',
})
