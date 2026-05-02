'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Search, Home, Briefcase, User, Mail, Github, X } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setSearch('');
    }
  };

  const commands: Command[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: Home,
      action: () => scrollToSection('#home'),
      shortcut: 'H',
    },
    {
      id: 'projects',
      label: 'View Projects',
      icon: Briefcase,
      action: () => scrollToSection('#projects'),
      shortcut: 'P',
    },
    {
      id: 'about',
      label: 'About Me',
      icon: User,
      action: () => scrollToSection('#about'),
      shortcut: 'A',
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      action: () => scrollToSection('#contact'),
      shortcut: 'C',
    },
    {
      id: 'github',
      label: 'Open GitHub',
      icon: Github,
      action: () => {
        window.open('https://github.com/ash-kernel', '_blank');
        setIsOpen(false);
        setSearch('');
      },
      shortcut: 'G',
    },
  ];

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open/close with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
        return;
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
        setSelectedIndex(0);
        return;
      }

      if (!isOpen) return;

      // Navigate with arrow keys
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 glass-strong p-4 rounded-full hover:bg-white/15 transition-all group hidden md:flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search size={20} />
        <div className="flex items-center gap-1 text-xs text-white/60">
          <kbd className="px-2 py-1 bg-white/10 rounded">⌘</kbd>
          <kbd className="px-2 py-1 bg-white/10 rounded">K</kbd>
        </div>
      </motion.button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/80 backdrop-blur-xl px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl glass-strong rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <Search size={20} className="text-white/40" />
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center text-white/40">
                    No commands found
                  </div>
                ) : (
                  filteredCommands.map((command, index) => (
                    <button
                      key={command.id}
                      onClick={() => command.action()}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        index === selectedIndex
                          ? 'bg-white/10'
                          : 'hover:bg-white/5'
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <command.icon size={18} className="text-accent-cyan" />
                      <span className="flex-1 text-left text-white">
                        {command.label}
                      </span>
                      {command.shortcut && (
                        <kbd className="px-2 py-1 text-xs bg-white/10 rounded text-white/60">
                          {command.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-3 border-t border-white/10 text-xs text-white/40">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd>
                    <span>Select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
