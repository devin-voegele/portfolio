import { StatsCounter, type Stat } from '@/components/fg/StatsCounter'
import { SectionHeading } from './SectionHeading'
import { posts } from '@/lib/posts'
import { flatDocs } from '@/lib/docs'
import { projects } from '@/components/fg/data'
import { stack } from '@/components/fg/data'

// Every figure is counted from the repo's own registries, so it can't drift
// from the truth (no invented follower counts).
const stats: Stat[] = [
  { value: projects.length, label: 'Projects' },
  { value: stack.length, label: 'Technologies' },
  { value: posts.length, label: 'Articles' },
  { value: flatDocs.length, label: 'Doc pages' },
]

export function Numbers() {
  return (
    <section id="numbers" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="By the numbers"
          title="Built, written, documented"
          blurb="What's on this site right now — counted from the code, not rounded up."
        />
        <StatsCounter stats={stats} />
      </div>
    </section>
  )
}
