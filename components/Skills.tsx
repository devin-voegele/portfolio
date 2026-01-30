'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'Next.js', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'PHP', level: 75 },
      { name: 'Node.js', level: 70 },
      { name: 'MySQL', level: 70 },
    ],
  },
  {
    category: 'Tools & Others',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Linux', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'Figma', level: 70 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Skills & <span className="text-accent">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
              className="bg-black rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-6 text-accent">
                {skillGroup.category}
              </h3>
              
              <div className="space-y-5">
                {skillGroup.items.map((skill, index) => (
                  <div key={skill.name}>
                    {/* Skill Name */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-500 font-mono text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-slate rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: groupIndex * 0.2 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-black rounded-xl p-8 max-w-3xl mx-auto border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-white">
              Always Learning, Always Growing
            </h3>
            <p className="text-gray-500 leading-relaxed">
              As an IAM Developer apprentice at <span className="text-accent font-medium">PwC Switzerland</span>, 
              I'm constantly expanding my skillset. Currently exploring advanced React patterns 
              and diving deeper into cybersecurity concepts.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <span className="px-4 py-2 bg-slate/50 rounded-full text-sm text-gray-400 border border-white/5">
                Currently Learning: Three.js
              </span>
              <span className="px-4 py-2 bg-slate/50 rounded-full text-sm text-gray-400 border border-white/5">
                Next Goal: AWS Certification
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
