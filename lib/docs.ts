export interface DocPage {
  slug: string // '' is the overview / index
  title: string
  description: string
}

export interface DocSection {
  title: string
  pages: DocPage[]
}

/**
 * Single source of truth for the docs sidebar, routing, and sitemap.
 * Each page's body lives in components/docs/content.tsx keyed by slug.
 */
export const docsNav: DocSection[] = [
  {
    title: 'Introduction',
    pages: [
      { slug: '', title: 'Overview', description: 'What this documentation is and how it is organized.' },
    ],
  },
  {
    title: 'The Site',
    pages: [
      { slug: 'architecture', title: 'Architecture', description: 'How voegele.dev is structured — Next.js App Router, routes, and stack.' },
      { slug: 'performance', title: 'Performance Model', description: 'Hardware tiering and the sleep-when-idle rule every effect obeys.' },
      { slug: 'liquid-glass', title: 'Liquid Glass', description: 'The translucent card system, its specular rim, and the cursor-tracked shine.' },
      { slug: 'signal-grid', title: 'Signal Grid', description: 'The interactive dot-field behind the hero.' },
      { slug: 'signal-pit', title: 'Signal Pit', description: 'A Three.js × Rapier physics sandbox that costs nothing when idle.' },
      { slug: 'motion', title: 'Motion & Scroll', description: 'GSAP, Lenis, scrubbed effects and the scroll-reveal system.' },
      { slug: 'seo', title: 'SEO & Metadata', description: 'The JSON-LD entity graph, sitemaps, and the knowledge-panel strategy.' },
    ],
  },
  {
    title: 'Projects',
    pages: [
      { slug: 'projects/formulagod', title: 'FormulaGod', description: 'Motorsport media & marketing platform.' },
      { slug: 'projects/getmoneymap', title: 'GetMoneyMap', description: 'Personal-finance visualization platform.' },
      { slug: 'projects/homelab', title: 'Homelab', description: 'A planned self-hosted platform lab.' },
    ],
  },
]

export const flatDocs: DocPage[] = docsNav.flatMap((s) => s.pages)

export const getDoc = (slug: string): DocPage | undefined =>
  flatDocs.find((p) => p.slug === slug)

/** Resolve a catch-all [[...slug]] param into a single slug string. */
export const slugFromParam = (slug?: string[]): string => (slug ? slug.join('/') : '')
