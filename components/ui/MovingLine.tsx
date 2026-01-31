'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface MovingLineProps {
  children: React.ReactNode;
}

export default function MovingLine({ children }: MovingLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const pathLengthValue = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const PATH = 'M0.5 0L0.5 100%';

  return (
    <div
      className="max-w-6xl mx-auto flex flex-row items-start w-full px-4"
      ref={ref}
    >
      {/* Vertical Line */}
      <div className="hidden md:flex flex-shrink-0 mr-8 sticky top-20 h-screen">
        <svg
          width="3"
          height="100%"
          viewBox="0 0 3 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[80vh]"
          preserveAspectRatio="none"
        >
          {/* Background line */}
          <path
            d="M1.5 0L1.5 800"
            stroke="url(#paint0_linear)"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          {/* Animated line */}
          <motion.path
            style={{
              pathLength: useSpring(pathLengthValue, {
                stiffness: 100,
                damping: 30,
              }),
            }}
            d="M1.5 0L1.5 800"
            stroke="url(#paint1_linear)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0EA5E9" stopOpacity="0" />
              <stop offset="0.5" stopColor="#0EA5E9" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0EA5E9" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0EA5E9" />
              <stop offset="0.5" stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full">
        {children}
      </div>
    </div>
  );
}
