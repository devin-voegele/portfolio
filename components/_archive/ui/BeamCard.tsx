'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Beam from './Beam';

interface BeamCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function BeamCard({ children, className }: BeamCardProps) {
  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: 20, rotateX: 10 },
          visible: { opacity: 1, y: 0, rotateX: 0 },
        }}
        className={cn(
          'relative overflow-hidden rounded-xl bg-black border border-white/10',
          className
        )}
      >
        {/* Beams running on top */}
        <Beam className="top-0 left-0" />
        <Beam className="top-0 left-0 delay-500" />
        
        {/* Content */}
        {children}

        {/* Bottom gradient glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="absolute bottom-0 right-4 flex h-8 items-end overflow-hidden">
            <div className="flex -mb-px h-[2px] w-80 -scale-x-100">
              <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(14,165,233,0.3)_67.19%,rgba(14,165,233,0)_100%)]" />
              <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(14,165,233,0.3)_67.19%,rgba(14,165,233,0)_100%)]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
