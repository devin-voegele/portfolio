import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { SeoLanding } from '@/components/seo/SeoLanding'
import { Footer } from '@/components/sections/Footer'
import { SocialDock } from '@/components/fg/SocialDock'

const description =
  'Technical SEO for businesses and individuals in Switzerland: audits, metadata, structured data, Search Console, Google Business Profile and knowledge panel work. In German or English.'

export const metadata: Metadata = pageMetadata({
  title: 'SEO Services',
  description,
  path: '/seo',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.voegele.dev/seo#service',
  name: 'SEO Services',
  serviceType: 'Search engine optimization',
  description,
  url: 'https://www.voegele.dev/seo',
  provider: { '@id': 'https://www.voegele.dev/#person' },
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  availableLanguage: ['de', 'en'],
  audience: [
    { '@type': 'BusinessAudience', name: 'Businesses' },
    { '@type': 'PeopleAudience', name: 'Individuals' },
  ],
}

export default function SeoPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SocialDock />
      <main>
        <SeoLanding />
      </main>
      <Footer />
    </div>
  )
}
