'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BeamProps {
  className?: string;
}

export default function Beam({ className }: BeamProps) {
  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'linear',
      }}
      className={cn(
        'absolute h-[2px] w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent',
        className
      )}
    />
  );
}
