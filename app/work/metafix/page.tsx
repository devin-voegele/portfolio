import type { Metadata } from 'next'
import { CaseStudy, type CaseStudyData } from '@/components/work/CaseStudy'
import { pageMetadata } from '@/lib/seo'

const data: CaseStudyData = {
  slug: 'metafix',
  title: 'Metafix',
  year: '2026',
  role: 'Design & development',
  summary:
    'Technical SEO fixes delivered as pull requests. Metafix crawls a live Next.js site, finds what is broken, maps each issue to the file that causes it and opens a PR with the fix.',
  stack: ['Next.js', 'TypeScript', 'ts-morph', 'Postgres', 'Drizzle', 'Cheerio'],
  status: 'Live',
  url: 'https://www.metafix.dev',
  sections: [
    {
      heading: 'What it is',
      paragraphs: [
        'Most SEO tools hand you a dashboard full of warnings and leave the fixing to you. Metafix does the fixing. You connect a GitHub repo, enter the production URL, and get an audit in about a minute. One click later a pull request with the fixes appears on the repo, ready to review and merge.',
        'The pull request is the product. Metafix never pushes to the default branch, and anything it cannot fix safely is listed in the PR description instead of guessed.',
      ],
    },
    {
      heading: 'The audit engine',
      paragraphs: [
        'The audit is deterministic: 31 rules in 8 groups (titles and descriptions, social previews, structured data, canonical and indexing, page structure, images, links, sitemap and robots). Each rule is a pure function with its own tests. No language model decides what is broken.',
        'The crawler respects robots.txt, reads only HTML pages and sitemaps, and never follows private addresses: every redirect hop and the connected IP are re-checked, so the public audit cannot be pointed at internal networks. It runs from the web app with live streaming progress, or from the command line.',
      ],
    },
    {
      heading: 'Fixes as code',
      paragraphs: [
        'Fixes are applied by editing the syntax tree with ts-morph, never with regex or string replacement, so the result is code a developer would have written. A language model only writes text (meta descriptions, alt text, JSON-LD values), and that output is schema-validated before it can reach a PR.',
        'Its first real pull request went to this site: it found an og:url pointing at the wrong page and fixed it.',
      ],
    },
  ],
  highlights: [
    '31 deterministic, individually tested audit rules',
    'Pull requests as the output, edited through the syntax tree',
    'SSRF-safe crawler that respects robots.txt',
    'Web app with GitHub connection, plus a CLI for local audits',
  ],
}

export const metadata: Metadata = pageMetadata({
  title: 'Metafix — Case Study',
  description: data.summary,
  path: `/work/${data.slug}`,
})

export default function Page() {
  return <CaseStudy data={data} />
}
