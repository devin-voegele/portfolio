import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { SeoLanding } from '@/components/seo/SeoLanding'
import { Footer } from '@/components/sections/Footer'
import { SocialDock } from '@/components/fg/SocialDock'

const description =
  'Technical SEO for businesses and individuals in Switzerland: audits, structured data, Search Console and knowledge panels. In German or English.'

export const metadata: Metadata = pageMetadata({
  title: 'SEO Services in Switzerland',
  description,
  path: '/seo',
})

const service = {
  '@type': 'Service',
  '@id': 'https://www.voegele.dev/seo#service',
  name: 'SEO Services in Switzerland',
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

const breadcrumbs = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Devin Vögele', item: 'https://www.voegele.dev' },
    { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.voegele.dev/seo' },
  ],
}

const jsonLd = { '@context': 'https://schema.org', '@graph': [service, breadcrumbs] }

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
