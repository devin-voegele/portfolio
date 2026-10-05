'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { posts } from '@/lib/posts'

export function Writing() {
  return (
    <section id="writing" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <SectionHeading eyebrow="Journal" title="Notes From the Build" blurb="Written while building, not after." />

        <ul className="flex flex-col gap-3">
          {posts.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${p.slug}`}
                className="group block p-4 sm:p-5 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 rounded-2xl transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-zinc-500 text-xs font-sans mb-1">
                      {p.date} · {p.readingTime} read
                    </p>
                    <p className="font-display text-xl text-white">{p.seoTitle ?? p.title}</p>
                    <p className="text-zinc-400 text-sm font-sans mt-2 leading-relaxed">{p.excerpt}</p>
                    <p className="text-zinc-500 text-xs font-sans mt-3">{p.tags.join(' · ')}</p>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 shrink-0 text-zinc-600 group-hover:text-white transition-colors"
                    aria-hidden
                  />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <Link
            href="/blog"
            className="px-6 py-2.5 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 inline-block"
          >
            All writing
          </Link>
        </p>
      </div>
    </section>
  )
}
