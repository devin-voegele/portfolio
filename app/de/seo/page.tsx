import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { SeoLanding } from '@/components/seo/SeoLanding'
import { SEO_LANGUAGES, seoJsonLd, seoMeta } from '@/components/seo/schema'
import { Footer } from '@/components/sections/Footer'
import { SocialDock } from '@/components/fg/SocialDock'

export const metadata: Metadata = pageMetadata({ ...seoMeta.de, languages: SEO_LANGUAGES })

// The root layout's <html lang> is "en"; this marks the German content for
// screen readers and translation prompts. Google reads hreflang + the text.
export default function SeoPageDe() {
  return (
    <div lang="de-CH" className="bg-black text-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoJsonLd('de')).replace(/</g, '\\u003c') }}
      />
      <SocialDock />
      <main>
        <SeoLanding lang="de" />
      </main>
      <Footer />
    </div>
  )
}
