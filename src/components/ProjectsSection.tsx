import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, workIntro, type Project } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { SectionHeader } from './ui';

export const ProjectsSection: React.FC<{
  onSelectProject: (project: Project, triggerEl: HTMLElement | null) => void;
}> = ({ onSelectProject }) => {
  const prefersReducedMotion = useReducedMotion();
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t border-obsidian-700/80 bg-obsidian-900 py-20 sm:py-26"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
          >
            <div id="work-heading">
              <SectionHeader
                eyebrow="Selected Work"
                title={workIntro.title}
                intro={workIntro.intro}
              />
            </div>
          </motion.div>

          {/* Category Filter Chips */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const selected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-10 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                    selected
                      ? 'bg-gold-400 text-obsidian-950 shadow-sm'
                      : 'border border-obsidian-700 bg-obsidian-850 text-ink-muted hover:border-gold-400/50 hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-10 space-y-6">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
            >
              <ProjectCard project={project} onSelect={onSelectProject} />
            </motion.div>
          ))}
        </div>

        {/* Post-Projects Conversion Bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-obsidian-700 bg-obsidian-850 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <p className="font-display text-lg font-medium text-ink">{workIntro.ctaLine}</p>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gold-400 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian-950 transition-colors hover:bg-gold-300"
          >
            <span>{workIntro.ctaLabel}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
