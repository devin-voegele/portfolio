'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Globe, Terminal, Cpu, Shield } from 'lucide-react';

const icons = [
  { Icon: Code2, delay: 0 },
  { Icon: Database, delay: 0.5 },
  { Icon: Globe, delay: 1 },
  { Icon: Terminal, delay: 1.5 },
  { Icon: Cpu, delay: 2 },
  { Icon: Shield, delay: 2.5 },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-white/5"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
            scale: 0,
          }}
          animate={{ 
            opacity: [0, 0.1, 0],
            scale: [0.5, 1, 0.5],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            delay: delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>
      ))}
    </div>
  );
}
