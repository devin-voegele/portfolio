import type { Metadata } from 'next'
import { CaseStudy, type CaseStudyData } from '@/components/work/CaseStudy'

const data: CaseStudyData = {
  slug: 'formulagod',
  title: 'FormulaGod',
  year: '2024',
  role: 'Design & development',
  summary:
    'A motorsport media & marketing platform — content, branding and reach for the racing world, designed and built end to end.',
  stack: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
  status: 'Private / in development',
  sections: [
    {
      heading: 'What it is',
      paragraphs: [
        'FormulaGod is a media and marketing platform for motorsport — a home for racing content, branding and audience reach. It sits at the intersection of the two things this portfolio is about: serious front-end engineering and a genuine obsession with racing.',
        'I designed and built it end to end: identity, layout system, motion language, and the application itself.',
      ],
    },
    {
      heading: 'Design & motion',
      paragraphs: [
        'Motorsport media lives or dies on feel — pace, contrast, drama. The interface leans into that with a dark, high-contrast look and deliberate motion: Framer Motion drives staggered reveals and transitions that make editorial content feel fast without getting in the way of reading it.',
        'The same discipline applied here applies there: motion is choreography, not decoration, and it never runs when nothing is happening.',
      ],
    },
    {
      heading: 'Engineering',
      paragraphs: [
        'Built on Next.js with Tailwind for the design system. Component-driven layout, server-rendered content pages for shareability and SEO, and a structure designed so editorial content scales without redesigning the site every season.',
      ],
    },
  ],
  highlights: [
    'Designed and built the entire platform solo — brand, UI and code',
    'Motion-driven editorial layout built with Framer Motion',
    'Next.js + Tailwind architecture designed for content at scale',
  ],
}

export const metadata: Metadata = {
  title: 'FormulaGod — Case Study',
  description: data.summary,
}

export default function Page() {
  return <CaseStudy data={data} />
}
