'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import BeamCard from './ui/BeamCard';

const projects = [
  {
    title: 'MoneyMap',
    description: 'A comprehensive budget planning application that helps users take control of their finances. Features intuitive expense tracking, visual spending analytics, budget goal setting, and smart insights to help you save more and spend wisely.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    github: '#',
    demo: 'https://getmoneymap.org',
  },
  {
    title: 'AI Assistant Framework',
    description: 'A custom-built AI interface powered by Anthropic\'s Claude API. Features a sleek, modern UI with real-time streaming responses, conversation history, and a beautiful dark theme. Built from scratch with a focus on user experience and performance.',
    tech: ['Next.js', 'Anthropic API', 'Tailwind CSS', 'TypeScript'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Sim Racing Telemetry',
    description: 'Real-time telemetry dashboard for sim racing enthusiasts. Captures and visualizes live data from racing simulators including lap times, tire temperatures, fuel consumption, and performance metrics to help improve your racing skills.',
    tech: ['React', 'Node.js', 'WebSocket', 'Chart.js'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'The site you\'re looking at right now! A modern, minimalist portfolio featuring smooth animations, an AI chatbot assistant, and a clean black & white design aesthetic.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    github: '#',
    demo: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, design, and innovation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <BeamCard className="h-full">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group p-6 hover:shadow-lg hover:shadow-accent/10 transition-all h-full"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      className="p-2 rounded-lg border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4 text-gray-400 hover:text-accent transition-colors" />
                    </a>
                    <a
                      href={project.demo}
                      className="p-2 rounded-lg border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all"
                      aria-label="View Demo"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-accent transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-slate/50 rounded-full text-gray-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
              </BeamCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
