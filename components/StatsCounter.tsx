'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, label, suffix = '', duration = 2 }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const displayValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      displayValue.set(Math.round(latest));
    });
  }, [springValue, displayValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center relative"
    >
      <motion.div className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">
        <motion.span className="text-white">{displayValue}</motion.span>
        <span className="text-accent">{suffix}</span>
      </motion.div>
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">{label}</div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = [
    { value: 3, label: 'Years Coding', suffix: '+' },
    { value: 15, label: 'Projects Built', suffix: '+' },
    { value: 10, label: 'Technologies', suffix: '+' },
    { value: 100, label: 'Commits', suffix: '+' },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-2xl p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCounter key={stat.label} {...stat} duration={2 + index * 0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
