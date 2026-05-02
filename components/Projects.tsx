'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { EnhancedRepo } from '@/types';
import { fetchGitHubRepos } from '@/lib/github';
import ProjectDetail from './ProjectDetail';
import { Loader2, Star, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  const [repo, setRepo] = useState<EnhancedRepo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<EnhancedRepo | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      const data = await fetchGitHubRepos();
      if (data.length > 0) {
        setRepo(data[0]);
      }
      setLoading(false);
    };

    loadRepos();
  }, []);

  return (
    <>
      <section id="projects" className="min-h-screen py-32 px-6 relative flex items-center">
        {/* Subtle background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-white/70">Showcase</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              My Work
            </h2>
          </motion.div>

          {/* Featured Project */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
          ) : repo ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedRepo(repo)}
              className="group cursor-pointer"
            >
              <div className="glass hover:glass-strong rounded-3xl overflow-hidden transition-all duration-500 flex flex-col lg:flex-row h-auto lg:h-[500px]">
                {/* Banner */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-full overflow-hidden">
                  {repo.bannerUrl ? (
                    <Image
                      src={repo.bannerUrl}
                      alt={repo.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-slate-700 group-hover:to-slate-800 transition-all duration-700" />
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-lg font-medium flex items-center gap-2">
                      <span>View Details</span>
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 w-full lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-3xl md:text-4xl font-bold group-hover:text-white transition-colors">
                        {repo.name}
                      </h3>
                      {repo.stargazers_count > 0 && (
                        <div className="flex items-center gap-2 text-sm text-white/60 ml-auto">
                          <Star size={16} className="fill-current" />
                          <span className="font-medium">{repo.stargazers_count}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-white/70 text-lg mb-6 leading-relaxed">
                      {repo.description || 'No description available'}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {repo.language && (
                        <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm text-white/80 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-white/60" />
                          {repo.language}
                        </span>
                      )}
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/60">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass hover:glass-strong px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium group/btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                      View Repository
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/60">No projects found</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedRepo && (
        <ProjectDetail
          repo={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </>
  );
}
