'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, ChevronRight, Code2, Shield, Palette } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const skills = [
    { icon: Code2, label: 'Web Development', color: 'text-accent' },
    { icon: Shield, label: 'IAM Security', color: 'text-purple-400' },
    { icon: Palette, label: 'Motion Design', color: 'text-pink-400' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Devin
              <span className="block text-accent">Vögele</span>
            </motion.h1>

            {/* Role */}
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-6">
              IAM Developer at <span className="text-white font-semibold">PwC Switzerland</span>
            </motion.h2>

            {/* Tagline */}
            <motion.div variants={itemVariants} className="text-lg text-gray-500 mb-8 h-8">
              <TypewriterText
                texts={[
                  'Building modern web experiences.',
                  'IAM & Identity Security.',
                  'Formula 1 enthusiast.',
                  'Clean code advocate.',
                ]}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold transition-all hover:bg-accent/90 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                View My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/5 transition-all hover:border-white/40"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/devin-voegele"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all group"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/devinvoegele"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
              </a>
            </motion.div>
          </div>

          {/* Right Side - Skills Cards */}
          <motion.div variants={itemVariants} className="hidden lg:flex flex-col gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: -5 }}
              >
                <div className={`p-3 rounded-xl bg-white/5 ${skill.color}`}>
                  <skill.icon className="w-6 h-6" />
                </div>
                <span className="text-lg text-white font-medium">{skill.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
