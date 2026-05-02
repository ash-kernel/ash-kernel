'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, GitBranch } from 'lucide-react';
import { EnhancedRepo } from '@/types';
import { generateGradient } from '@/lib/github';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  repo: EnhancedRepo;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ repo, index, onClick }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative h-full"
    >
      {repo.priority && (
        <div className="absolute -top-3 -right-3 z-10 bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-xl">
          ✨ Featured
        </div>
      )}

      <div className="bg-[#0a0a0a] border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/[0.02]">
        
        {/* Banner with Error Fallback */}
        <div className="relative w-full aspect-video overflow-hidden bg-slate-950">
        {repo.bannerUrl && !imgError ? (
            <Image
              src={repo.bannerUrl}
              alt={repo.name}
              fill
              // Changed object-cover to object-contain, added p-6 for breathing room
              className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${generateGradient(repo.name)} group-hover:scale-105 transition-transform duration-700 ease-out`}>
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-md">
              <span>View Details</span>
              <ExternalLink size={14} />
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3 gap-4">
            <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors truncate">
              {repo.name}
            </h3>
            
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-white/50 shrink-0">
                <Star size={14} className="fill-current" />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
          </div>

          <p className="text-white/50 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
            {repo.description || 'No description available'}
          </p>

          <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5 mt-auto">
            <div className="flex items-center gap-4">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <GitBranch size={12} />
                <span>{formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}