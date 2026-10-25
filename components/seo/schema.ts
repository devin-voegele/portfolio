import { de, en, type Lang } from './copy'

const ORIGIN = 'https://www.voegele.dev'

/** Both language versions of /seo, for hreflang. x-default is the English page. */
export const SEO_LANGUAGES = { en: '/seo', de: '/de/seo', 'x-default': '/seo' }

export const seoMeta = {
  en: {
    title: 'SEO Services in Switzerland',
    description:
      'Technical SEO for businesses and individuals in Switzerland: audits, structured data, Search Console and knowledge panels. In German or English.',
    path: '/seo',
    locale: 'en_US',
    home: 'Devin Vögele',
    crumb: 'SEO Services',
  },
  de: {
    title: 'SEO-Dienstleistungen in der Schweiz',
    description:
      'Technisches SEO für Unternehmen und Privatpersonen in der Schweiz: Audits, strukturierte Daten, Search Console und Knowledge Panels.',
    path: '/de/seo',
    locale: 'de_CH',
    home: 'Devin Vögele',
    crumb: 'SEO-Dienstleistungen',
  },
} satisfies Record<Lang, unknown>

/** Service, FAQPage and BreadcrumbList for one language version, tied to the site-wide Person. */
export function seoJsonLd(lang: Lang) {
  const m = seoMeta[lang]
  const url = `${ORIGIN}${m.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: m.title,
        serviceType: lang === 'de' ? 'Suchmaschinenoptimierung' : 'Search engine optimization',
        description: m.description,
        url,
        inLanguage: lang === 'de' ? 'de-CH' : 'en',
        provider: { '@id': `${ORIGIN}/#person` },
        areaServed: { '@type': 'Country', name: 'Switzerland' },
        availableLanguage: ['de', 'en'],
        audience: [
          { '@type': 'BusinessAudience', name: lang === 'de' ? 'Unternehmen' : 'Businesses' },
          { '@type': 'PeopleAudience', name: lang === 'de' ? 'Privatpersonen' : 'Individuals' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang === 'de' ? 'de-CH' : 'en',
        mainEntity: (lang === 'de' ? de : en).faq.items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: m.home, item: ORIGIN },
          { '@type': 'ListItem', position: 2, name: m.crumb, item: url },
        ],
      },
    ],
  }
}
