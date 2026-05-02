'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, GitBranch } from 'lucide-react';
import { EnhancedRepo } from '@/types';
import { generateGradient } from '@/lib/github';
import Image from 'next/image';

interface ProjectCardProps {
  repo: EnhancedRepo;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ repo, index, onClick }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer relative"
    >
      {/* Priority Badge */}
      {repo.priority && (
        <div className="absolute -top-3 -right-3 z-10 glass-strong px-3 py-1 rounded-full text-xs font-medium">
          ⭐ Featured
        </div>
      )}

      <div className="glass hover:glass-strong rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col spotlight">
        {/* Banner / Gradient */}
        <div className="relative h-48 overflow-hidden">
          {repo.bannerUrl ? (
            <Image
              src={repo.bannerUrl}
              alt={repo.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${generateGradient(repo.name)} group-hover:scale-110 transition-transform duration-700`}>
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-sm font-medium flex items-center gap-2">
              <span>View Details</span>
              <ExternalLink size={16} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-white transition-colors">
              {repo.name}
            </h3>
            
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1 text-sm text-white/60">
                <Star size={14} className="fill-current" />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
          </div>

          <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
            {repo.description || 'No description available'}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-3">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <GitBranch size={12} />
                <span>{formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 glow-effect" />
      </div>
    </motion.div>
  );
}
