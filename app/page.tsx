'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import CommandPalette from '@/components/CommandPalette';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <CommandPalette />
    </main>
  );
}
