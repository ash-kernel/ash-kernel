'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { EnhancedRepo } from '@/types';
import { fetchGitHubRepos } from '@/lib/github';
import ProjectDetail from './ProjectDetail';
import { Loader2 } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [repos, setRepos] = useState<EnhancedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<EnhancedRepo | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      const data = await fetchGitHubRepos();
      setRepos(data);
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

        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-white/70">Featured</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              My Projects
            </h2>
          </motion.div>

          {/* Featured Projects Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
          ) : repos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60">No projects found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {repos.map((repo, index) => (
                <ProjectCard
                  key={repo.id}
                  repo={repo}
                  index={index}
                  onClick={() => setSelectedRepo(repo)}
                />
              ))}
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
