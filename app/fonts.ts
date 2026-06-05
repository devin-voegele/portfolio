import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'

export const cabinet = localFont({
  src: [
    { path: '../public/fonts/CabinetGrotesk-Medium.woff2', weight: '500' },
    { path: '../public/fonts/CabinetGrotesk-Bold.woff2', weight: '700' },
    { path: '../public/fonts/CabinetGrotesk-Extrabold.woff2', weight: '800' },
  ],
  variable: '--font-display',
  display: 'swap',
})
export const geist = GeistSans
