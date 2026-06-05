'use client';

import { motion } from 'framer-motion';

export default function DriftingCar() {
  return (
    <motion.div
      initial={{ x: '-100%', y: '50vh', rotate: -15 }}
      animate={{ x: '100vw', y: '50vh', rotate: 15 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      className="fixed top-0 left-0 z-[100] pointer-events-none"
    >
      <div className="text-8xl">🏎️</div>
    </motion.div>
  );
}
