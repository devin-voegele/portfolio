'use client'

import React from 'react'
import { Boxes, GitBranch, Cloud, Network, Check } from 'lucide-react'
import { SectionHeader } from '@/components/primitives/SectionHeader'
import { FadeIn } from '@/components/primitives/FadeIn'
import { GlareField } from '@/components/primitives/GlareField'

const cards = [
  {
    icon: Boxes,
    title: 'Kubernetes & Containers',
    desc: 'Container orchestration and reproducible, portable environments.',
    tags: ['Kubernetes', 'Docker', 'Clusters'],
  },
  {
    icon: GitBranch,
    title: 'CI/CD & Automation',
    desc: 'Automated build, test and deploy pipelines, plus Python tooling to remove manual toil.',
    tags: ['CI/CD', 'Pipelines', 'Python'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Identity',
    desc: 'Infrastructure across AWS and Azure, with identity and access managed in Microsoft Entra ID.',
    tags: ['AWS', 'Azure', 'Entra ID'],
  },
  {
    icon: Network,
    title: 'Platform & Process',
    desc: 'Private and multi-cloud platform management and business-process automation.',
    tags: ['CloudPods', 'BPMN'],
  },
]

const checklist = [
  'Building and operating cloud-native systems on AWS & Azure',
  'Automating build, test and deployment pipelines',
  'Securing access and identity with Microsoft Entra ID',
  'Containerizing and orchestrating with Docker & Kubernetes',
  'Modeling and automating business processes with BPMN',
]

const stackTags = [
  'Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Azure', 'Entra ID', 'CloudPods', 'Python', 'BPMN',
]

export function CloudDevOps() {
  return (
    <section id="cloud" className="py-24 px-4 relative">
      {/* Soft decorative radial blob */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.07),transparent_70%)] pointer-events-none" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          index="03"
          eyebrow="Infrastructure"
          title="Cloud, DevOps &"
          accent="Platform"
        />

        <p className="text-center max-w-3xl mx-auto mb-16 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          The platform side of what I do — building, automating, and securing cloud-native systems across AWS and Azure.
        </p>

        <FadeIn>
          <GlareField className="flex flex-col lg:flex-row gap-16 items-start">
            {/* LEFT — capability cards */}
            <div className="lg:w-1/2 order-2 lg:order-1 space-y-8 w-full">
              {cards.map(({ icon: Icon, title, desc, tags }) => (
                <div
                  key={title}
                  className="lq lq-glare lq-hover p-6 relative overflow-hidden"
                >
                  {/* top gradient accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]" />

                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(37,99,235,0.1)' }}
                    >
                      <Icon size={20} style={{ color: 'var(--accent)' }} strokeWidth={1.8} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: 'rgba(37,99,235,0.1)',
                              color: 'var(--accent)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — sticky panel */}
            <div className="lg:w-1/2 order-1 lg:order-2 w-full">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                    What I Work On
                  </h3>
                  <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    On the platform side I focus on making systems reliable, automated, and secure — so the product side can move fast.
                  </p>

                  <ul className="space-y-4">
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(37,99,235,0.1)' }}
                        >
                          <Check size={14} style={{ color: 'var(--accent)' }} strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core stack card */}
                <div className="lq lq-glare p-6">
                  <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Core platform stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stackTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgba(37,99,235,0.05)',
                          color: 'var(--accent)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlareField>
        </FadeIn>
      </div>
    </section>
  )
}
