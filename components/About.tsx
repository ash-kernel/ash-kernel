'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Database, Globe, Terminal } from 'lucide-react';

export default function About() {
  const skills = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, Tailwind',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Node.js, Python, APIs, Databases',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Modern, clean, user-focused interfaces',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimization, speed, efficiency',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Globe,
      title: 'Web Technologies',
      description: 'Modern web standards & best practices',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Terminal,
      title: 'DevOps & Tools',
      description: 'Git, CI/CD, Docker, Cloud platforms',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-32 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-sm text-white/70">About</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What I <span className="gradient-text">Do</span>
          </h2>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="glass-strong p-8 md:p-12 rounded-3xl">
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              I'm a developer passionate about building elegant, performant, and user-focused solutions. 
              My work spans across full-stack development, with a keen eye for design and attention to detail.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              From crafting seamless user experiences to architecting robust backend systems, 
              I believe in writing clean, maintainable code that stands the test of time.
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="glass hover:glass-strong p-8 rounded-2xl h-full transition-all duration-500">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <skill.icon size={24} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-cyan transition-colors">
                  {skill.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {skill.description}
                </p>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-br ${skill.color}`} 
                  style={{ filter: 'blur(40px)' }} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block glass-strong px-8 py-6 rounded-3xl border-l-4 border-accent-purple">
            <p className="text-lg text-white/80 italic max-w-2xl">
              "Great software is not just about code—it's about solving real problems 
              with elegance, empathy, and attention to detail."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
