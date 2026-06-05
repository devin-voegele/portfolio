'use client';

import { motion } from 'framer-motion';

interface GlowingTextProps {
  text: string;
  className?: string;
}

export default function GlowingText({ text, className = '' }: GlowingTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-accent/20 blur-xl rounded-full"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.span>
  );
}
