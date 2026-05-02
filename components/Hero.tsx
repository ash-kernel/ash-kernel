'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Mesh - subtle */}
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        {/* Floating Orbs - subtle */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <span className="text-sm text-white/70">Developer & Builder</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-white"
        >
          Hi, I'm Logesh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Crafting elegant solutions to complex problems. Building tools that make a difference in the digital world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={scrollToProjects}
            className="group glass-strong px-8 py-4 rounded-full hover:bg-white/15 transition-all magnetic-button flex items-center gap-2 text-white font-medium"
          >
            <span>View My Work</span>
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
          <a
            href="https://github.com/ash-kernel"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass px-6 py-4 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 text-white font-medium"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} className="text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
