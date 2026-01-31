'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Rocket, Trophy, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'IAM Developer',
    description: '2nd year apprentice at PwC Switzerland, IAM Team',
  },
  {
    icon: Rocket,
    title: 'Tech Enthusiast',
    description: 'Passionate about PHP, JavaScript, Linux, and cybersecurity',
  },
  {
    icon: Trophy,
    title: 'Motorsport Fan',
    description: 'Formula 1 enthusiast and Lewis Hamilton supporter',
  },
  {
    icon: Zap,
    title: 'Sim Racer',
    description: 'Competitive sim racing and graphic design',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Building the Future, One Line at a Time
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Hey! I&apos;m Devin, a 17-year-old <span className="text-white font-medium">IAM Developer</span> apprentice 
                at <span className="text-accent font-medium">PwC Switzerland</span>, currently in my 2nd year working in the IAM Team.
              </p>
              <p>
                I&apos;m passionate about creating innovative digital solutions that combine aesthetics with functionality. 
                My journey in tech has led me through web development, Linux-based projects, and even cybersecurity exploration.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me watching <span className="text-white font-medium">Formula 1</span> races, 
                competing in sim racing, or designing graphics. I believe in building things that are not just functional, 
                but also <span className="text-white font-medium">beautiful and fast</span>.
              </p>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-black rounded-2xl p-8 border border-white/10">
              {/* Code Block Style */}
              <div className="font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-500 ml-2">about.ts</span>
                </div>
                <div className="space-y-1 text-gray-400">
                  <p><span className="text-accent">const</span> <span className="text-white">developer</span> = {'{'}</p>
                  <p className="pl-4"><span className="text-gray-500">name:</span> <span className="text-green-400">&quot;Devin&quot;</span>,</p>
                  <p className="pl-4"><span className="text-gray-500">role:</span> <span className="text-green-400">&quot;IAM Developer&quot;</span>,</p>
                  <p className="pl-4"><span className="text-gray-500">company:</span> <span className="text-green-400">&quot;PwC Switzerland&quot;</span>,</p>
                  <p className="pl-4"><span className="text-gray-500">passion:</span> <span className="text-green-400">&quot;Motorsport&quot;</span>,</p>
                  <p className="pl-4"><span className="text-gray-500">available:</span> <span className="text-accent">true</span></p>
                  <p>{'}'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-black rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-slate flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
