'use client';

import { motion } from 'framer-motion';
import { Github, Mail, ExternalLink } from 'lucide-react';

export default function Contact() {
  const contactLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/ash-kernel',
      description: 'Check out my repositories',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-32 px-6 relative flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="text-sm text-white/70">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Interested in collaborating or just want to say hi? 
            Feel free to reach out through GitHub.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid gap-6 mb-12">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="glass-strong hover:bg-white/15 p-8 rounded-3xl transition-all duration-500 flex items-center gap-6">
                {/* Icon */}
                <div className={`flex-shrink-0 p-6 rounded-2xl bg-gradient-to-br ${link.color} group-hover:scale-110 transition-transform duration-500`}>
                  <link.icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-cyan transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-white/60">
                    {link.description}
                  </p>
                </div>

                {/* Arrow */}
                <ExternalLink 
                  size={24} 
                  className="text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                />

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-br ${link.color}`} 
                  style={{ filter: 'blur(40px)' }} 
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="glass p-8 rounded-3xl">
            <Mail size={32} className="mx-auto mb-4 text-accent-cyan" />
            <p className="text-white/70 mb-2">
              Open to opportunities and collaborations
            </p>
            <p className="text-sm text-white/50">
              Currently available for freelance projects and full-time positions
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Ash. Built with Next.js & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
