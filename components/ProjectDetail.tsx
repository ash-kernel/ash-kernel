'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, GitFork, ExternalLink, Calendar, Code } from 'lucide-react';
import { EnhancedRepo } from '@/types';
import { generateGradient } from '@/lib/github';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProjectDetailProps {
  repo: EnhancedRepo;
  onClose: () => void;
}

export default function ProjectDetail({ repo, onClose }: ProjectDetailProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-white/70 hover:text-white" />
          </button>

          {/* Banner with Error Fallback */}
          <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-t-3xl bg-slate-950">
            {repo.bannerUrl && !imgError ? (
              <Image
                src={repo.bannerUrl}
                alt={repo.name}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${generateGradient(repo.name)}`}>
                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          </div>

          <div className="p-8 md:p-12 -mt-10 relative z-10">
            {/* ... Rest of the component remains exactly the same as previously formatted */}
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                {repo.name}
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-2xl">
                {repo.description || 'No description available'}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                    <Star size={14} className="fill-current text-white/80" />
                    <span className="text-sm text-white/80">{repo.stargazers_count} stars</span>
                  </div>
                )}
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                    <GitFork size={14} className="text-white/80" />
                    <span className="text-sm text-white/80">{repo.forks_count} forks</span>
                  </div>
                )}
                {repo.language && (
                  <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                    <Code size={14} className="text-white/80" />
                    <span className="text-sm text-white/80">{repo.language}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
                >
                  <span>View on GitHub</span>
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
              <div>
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6">
                  Overview
                </h3>
                <div className="space-y-4 text-white/70">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-white/40" />
                    <span className="text-sm">Created {formatDate(repo.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-white/40" />
                    <span className="text-sm">Last updated {formatDate(repo.updated_at)}</span>
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="pt-4">
                      <div className="text-sm text-white/40 mb-3">Topics</div>
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-xs bg-white/5 border border-white/5 text-white/70 px-3 py-1.5 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6">
                  Repository Info
                </h3>
                <div className="space-y-4 text-white/70 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Size</span>
                    <span className="text-white">{(repo.size / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Open Issues</span>
                    <span className="text-white">{repo.open_issues_count}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span>Default Branch</span>
                    <span className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded">{repo.default_branch}</span>
                  </div>
                </div>
              </div>
            </div>

            {repo.priority && (
              <div className="mt-12 bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                <div className="text-xl pt-0.5">✨</div>
                <div>
                  <div className="text-white font-medium mb-1">Featured Project</div>
                  <div className="text-sm text-white/50 leading-relaxed">
                    This repository has been marked as a priority project in the portfolio showcase.
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