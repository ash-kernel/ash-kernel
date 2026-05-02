'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import socialData from '@/lib/social.json';
import Image from 'next/image';

interface ContactLink {
  label: string;
  href: string;
  description: string;
  icon: string;
  logoUrl: string;
}

export default function Contact() {
  const contactLinks: ContactLink[] = socialData.contacts;

  return (
    <section id="contact" className="min-h-screen py-32 px-6 relative flex items-center">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
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
            Let's Connect
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Reach out through any of these channels. I'm always open to new opportunities and conversations.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid gap-4 mb-12">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 8 }}
              className="group relative"
            >
              <div className="glass-strong hover:bg-white/15 p-6 rounded-2xl transition-all duration-300 flex items-center gap-4">
                {/* Logo */}
                <div className="flex-shrink-0 p-4 rounded-xl bg-white/10 group-hover:bg-white/15 transition-colors duration-300">
                  <Image 
                    src={link.logoUrl} 
                    alt={link.label}
                    width={28}
                    height={28}
                    className="text-white/80 group-hover:text-white transition-colors"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-white transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {link.description}
                  </p>
                </div>

                {/* Arrow */}
                <ExternalLink 
                  size={20} 
                  className="text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" 
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
          className="text-center pt-8 border-t border-white/10"
        >
          <p className="text-white/70 mb-2">
            Always open to new opportunities and collaborations
          </p>
          <p className="text-sm text-white/50">
            Feel free to reach out anytime
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="h-px w-full bg-white/10 mb-8" />
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Ash. Built with Next.js & Framer Motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
