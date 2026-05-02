'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, GitFork, ExternalLink, Calendar, Code } from 'lucide-react';
import { EnhancedRepo } from '@/types';
import { generateGradient } from '@/lib/github';
import Image from 'next/image';
import { useEffect } from 'react';

interface ProjectDetailProps {
  repo: EnhancedRepo;
  onClose: () => void;
}

export default function ProjectDetail({ repo, onClose }: ProjectDetailProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 glass p-3 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Hero Banner */}
          <div className="relative h-64 overflow-hidden rounded-t-3xl">
            {repo.bannerUrl ? (
              <Image
                src={repo.bannerUrl}
                alt={repo.name}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${generateGradient(repo.name)}`}>
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-400 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {repo.name}
              </h2>
              <p className="text-xl text-white/70 mb-6">
                {repo.description || 'No description available'}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                    <Star size={16} className="fill-current text-yellow-400" />
                    <span className="text-sm">{repo.stargazers_count} stars</span>
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                    <GitFork size={16} />
                    <span className="text-sm">{repo.forks_count} forks</span>
                  </div>
                )}
                {repo.language && (
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                    <Code size={16} />
                    <span className="text-sm">{repo.language}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-strong px-6 py-3 rounded-full hover:bg-white/15 transition-all magnetic-button flex items-center gap-2"
                >
                  <span>View on GitHub</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-6 py-3 rounded-full hover:bg-white/10 transition-all magnetic-button"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-accent-cyan rounded-full" />
                  Overview
                </h3>
                <div className="space-y-3 text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm">Created {formatDate(repo.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm">Last updated {formatDate(repo.updated_at)}</span>
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <div>
                      <div className="text-sm mb-2">Topics:</div>
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-xs glass px-3 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-accent-purple rounded-full" />
                  Repository Info
                </h3>
                <div className="space-y-3 text-white/70 text-sm">
                  <div className="flex justify-between">
                    <span>Size</span>
                    <span className="text-white">{(repo.size / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open Issues</span>
                    <span className="text-white">{repo.open_issues_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Default Branch</span>
                    <span className="text-white font-mono text-xs">{repo.default_branch}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Badge */}
            {repo.priority && (
              <div className="mt-8 glass-strong p-6 rounded-2xl border-l-4 border-accent-cyan">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="font-bold mb-1">Featured Project</div>
                    <div className="text-sm text-white/60">
                      This project is highlighted as one of the priority repositories.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
