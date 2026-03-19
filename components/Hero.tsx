'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, ChevronRight } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { Vortex } from './ui/vortex';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      <Vortex
        backgroundColor="black"
        particleCount={500}
        baseHue={220}
        className="flex items-center justify-center w-full h-full min-h-screen px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight"
              style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
            >
              Hi, I&apos;m <span className="text-accent">Devin</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-6"
              style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
            >
              Platform Development at <span className="text-white">PwC Switzerland</span>
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
            >
              <TypewriterText
                texts={[
                  'Building modern web experiences.',
                  'Platform Development & Security.',
                  'Formula 1 enthusiast.',
                  'Clean code advocate.',
                ]}
              />
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg transition-all hover:bg-gray-100 hover:scale-105"
                style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
              >
                View My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all hover:border-white/40"
                style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
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
      </Vortex>
    </section>
  );
}
