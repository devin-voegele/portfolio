import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Caveat } from 'next/font/google'

export const anton = localFont({
  src: [{ path: '../public/fonts/Anton-Regular.woff2', weight: '400', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
})
export const geistSans = GeistSans   // .variable === --font-geist-sans
export const geistMono = GeistMono   // .variable === --font-geist-mono

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-signature',
  display: 'swap',
})
