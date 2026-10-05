// Single source of truth for the homepage content (counts on the "numbers"
// row are derived from these, and from lib/posts + lib/docs).

export interface Project {
  title: string
  desc: string
  stack: string[]
  year: string
  href?: string
  live?: string
  sealed?: boolean
}

export const projects: Project[] = [
  {
    title: 'FormulaGod',
    desc: 'Motorsport media & marketing platform — content, branding and reach for the racing world.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind'],
    year: '2024',
    href: '/work/formulagod',
  },
  {
    title: 'GetMoneyMap',
    desc: 'Personal finance visualization with interactive data mapping and budget tracking.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    year: '2025',
    href: '/work/getmoneymap',
    live: 'https://getmoneymap.org',
  },
  {
    title: 'Classified',
    desc: 'Under wraps. Details unreleased.',
    stack: ['TypeScript', 'Cloud', 'Docker'],
    year: '2025',
    sealed: true,
  },
]

export interface StackItem {
  name: string
  group: string
  note: string
}

export const stack: StackItem[] = [
  { name: 'Next.js', group: 'Frontend', note: 'App Router, server rendering, edge deploys' },
  { name: 'React', group: 'Frontend', note: 'Component-driven interfaces' },
  { name: 'TypeScript', group: 'Frontend', note: 'Typed from input to UI' },
  { name: 'Tailwind', group: 'Frontend', note: 'Design systems without the bloat' },
  { name: 'Three.js', group: 'Creative', note: 'WebGL scenes, shaders, physics' },
  { name: 'Docker', group: 'Cloud & DevOps', note: 'Reproducible, portable environments' },
  { name: 'Kubernetes', group: 'Cloud & DevOps', note: 'Container orchestration' },
  { name: 'AWS', group: 'Cloud & DevOps', note: 'Cloud infrastructure' },
  { name: 'Azure', group: 'Cloud & DevOps', note: 'Cloud infrastructure and identity' },
  { name: 'Entra ID', group: 'Platform & Identity', note: 'Identity and access management' },
  { name: 'CI/CD', group: 'Cloud & DevOps', note: 'Automated build, test and deploy' },
  { name: 'Python', group: 'Platform & Identity', note: 'Automation tooling' },
]
