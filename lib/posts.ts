export interface PostMeta {
  slug: string
  title: string
  /** Short <title> (≤ ~44 chars, template adds the brand); defaults to title. */
  seoTitle?: string
  date: string // ISO yyyy-mm-dd
  excerpt: string
  readingTime: string
  tags: string[]
}

/**
 * Post registry — each post is a static route at app/blog/<slug>/page.tsx.
 * Newest first.
 */
export const posts: PostMeta[] = [
  {
    slug: 'knowledge-panel-back',
    title: 'How I got my Google knowledge panel back',
    seoTitle: 'How I got my knowledge panel back',
    date: '2026-10-25',
    excerpt:
      'My knowledge panel looked gone after a redesign and called me a graphic designer. The cause: my own sources disagreed. What I fixed.',
    readingTime: '4 min',
    tags: ['SEO', 'Knowledge Panel', 'Structured Data'],
  },
  {
    slug: 'turbopack-ate-my-backdrop-filter',
    title: 'Turbopack quietly ate my backdrop-filter',
    date: '2026-06-12',
    excerpt:
      'I shipped liquid-glass cards and the blur never arrived. The CSS was right, the browser was capable — the build pipeline was eating the declaration. A debugging story.',
    readingTime: '5 min',
    tags: ['Next.js', 'CSS', 'Debugging'],
  },
  {
    slug: 'signal-pit',
    title: 'Signal Pit: real physics on a portfolio that refuses to waste your battery',
    seoTitle: 'Signal Pit: real physics, zero idle CPU',
    date: '2026-06-12',
    excerpt:
      'A Three.js × Rapier sandbox where the cursor is a force field — and how it costs zero CPU the moment everything falls asleep.',
    readingTime: '6 min',
    tags: ['Three.js', 'Rapier', 'Performance'],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
