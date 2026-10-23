import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { SeoLanding } from '@/components/seo/SeoLanding'
import { SEO_LANGUAGES, seoJsonLd, seoMeta } from '@/components/seo/schema'
import { Footer } from '@/components/sections/Footer'
import { SocialDock } from '@/components/fg/SocialDock'

export const metadata: Metadata = pageMetadata({ ...seoMeta.en, languages: SEO_LANGUAGES })

export default function SeoPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoJsonLd('en')).replace(/</g, '\\u003c') }}
      />
      <SocialDock />
      <main>
        <SeoLanding lang="en" />
      </main>
      <Footer />
    </div>
  )
}
