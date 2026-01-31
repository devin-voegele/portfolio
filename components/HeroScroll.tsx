'use client';

import React from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { motion } from 'framer-motion';
import { Code2, Shield, Palette, Zap } from 'lucide-react';

export default function HeroScroll() {
  return (
    <section className="bg-black">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base text-gray-500 mb-4"
            >
              What I Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Crafting Digital <br />
              <span className="text-accent">Experiences</span>
            </motion.h2>
          </div>
        }
      >
        {/* Showcase Card Content */}
        <div className="h-full w-full bg-black p-6 md:p-8 flex flex-col">
          {/* Top Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <Code2 className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-white">3+</div>
              <div className="text-xs text-gray-500">Years Coding</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <Shield className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-white">IAM</div>
              <div className="text-xs text-gray-500">Security Focus</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <Palette className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-white">40M+</div>
              <div className="text-xs text-gray-500">Design Views</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <Zap className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-4 md:p-6 font-mono text-sm overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-500 ml-2 text-xs">devin.config.ts</span>
            </div>
            <div className="space-y-1 text-gray-400 text-xs md:text-sm">
              <p><span className="text-accent">const</span> <span className="text-white">developer</span> = {'{'}</p>
              <p className="pl-4"><span className="text-gray-500">name:</span> <span className="text-green-400">&quot;Devin&quot;</span>,</p>
              <p className="pl-4"><span className="text-gray-500">role:</span> <span className="text-green-400">&quot;IAM Developer&quot;</span>,</p>
              <p className="pl-4"><span className="text-gray-500">company:</span> <span className="text-green-400">&quot;PwC Switzerland&quot;</span>,</p>
              <p className="pl-4"><span className="text-gray-500">skills:</span> [<span className="text-yellow-400">&quot;Next.js&quot;</span>, <span className="text-yellow-400">&quot;React&quot;</span>, <span className="text-yellow-400">&quot;Pentesting&quot;</span>],</p>
              <p className="pl-4"><span className="text-gray-500">passion:</span> <span className="text-green-400">&quot;Building secure & beautiful apps&quot;</span>,</p>
              <p className="pl-4"><span className="text-gray-500">available:</span> <span className="text-accent">true</span></p>
              <p>{'}'}</p>
              <p className="mt-4"><span className="text-accent">export default</span> developer;</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
