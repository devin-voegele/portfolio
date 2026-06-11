import type { Metadata } from 'next'
import { CaseStudy, type CaseStudyData } from '@/components/work/CaseStudy'

const data: CaseStudyData = {
  slug: 'getmoneymap',
  title: 'GetMoneyMap',
  year: '2025',
  role: 'Design & development',
  summary:
    'A personal-finance visualization platform — interactive data mapping and budget tracking that makes money flows visible instead of abstract.',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  status: 'Live',
  url: 'https://getmoneymap.org',
  sections: [
    {
      heading: 'What it is',
      paragraphs: [
        'GetMoneyMap turns personal finances into something you can actually see: interactive visualizations of where money comes from and where it goes, paired with budget tracking. The core idea is that a picture of your cash flow beats a table of transactions.',
        'It is live at getmoneymap.org.',
      ],
    },
    {
      heading: 'Design & interaction',
      paragraphs: [
        'Financial tools usually feel like spreadsheets wearing a coat of paint. The goal here was the opposite: visualization first, numbers second. Interactive mapping of income and spending makes the structure of a budget legible at a glance, with the details one interaction away.',
      ],
    },
    {
      heading: 'Engineering',
      paragraphs: [
        'Next.js and TypeScript end to end, with Tailwind for the interface. Strong typing matters more than usual in a finance tool — the data model is typed all the way from input to visualization, which keeps the charts honest.',
      ],
    },
  ],
  highlights: [
    'Interactive money-flow visualization as the primary interface',
    'Budget tracking built around the visualization, not beside it',
    'Fully typed Next.js + TypeScript codebase',
  ],
}

export const metadata: Metadata = {
  title: 'GetMoneyMap — Case Study',
  description: data.summary,
}

export default function Page() {
  return <CaseStudy data={data} />
}
