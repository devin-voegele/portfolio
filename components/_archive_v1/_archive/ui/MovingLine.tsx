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
    offset: ['start end', 'end start'],
  });

  const pathLengthValue = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="relative w-full"
      ref={ref}
    >
      {/* Vertical Line - Fixed on left side */}
      <div className="hidden md:block fixed left-8 lg:left-16 top-0 bottom-0 z-10">
        <svg
          width="3"
          height="100%"
          viewBox="0 0 3 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full"
          preserveAspectRatio="none"
        >
          {/* Background line */}
          <path
            d="M1.5 0L1.5 100"
            stroke="#0EA5E9"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
          {/* Animated line */}
          <motion.path
            style={{
              pathLength: useSpring(pathLengthValue, {
                stiffness: 100,
                damping: 30,
              }),
            }}
            d="M1.5 0L1.5 100"
            stroke="url(#movingLineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="movingLineGradient"
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
