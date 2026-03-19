'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, ChevronRight } from 'lucide-react';
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';
import { Cover } from './ui/cover';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      <StarsBackground className="z-0" />
      <ShootingStars className="z-0" />

      <div className="relative z-10 flex items-center justify-center w-full h-full min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="font-arial-bold max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl text-white mb-4 tracking-tight"
            >
              Devin <Cover>Vögele</Cover>
            </motion.h1>

            {/* One-liner */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-lg md:text-2xl text-gray-500 mb-12"
            >
              Developer · Designer · PwC Switzerland
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg transition-all hover:bg-gray-100 hover:scale-105"
              >
                View My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all hover:border-white/40"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-4 justify-center"
            >
              <a
                href="https://github.com/devin-voegele"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/devinvoegele"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
