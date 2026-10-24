import React, { useRef, useState } from 'react';
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { CountUpStat, EmphasizedProjectParagraph, SmartText } from './ui';

export const ProjectCard: React.FC<{
  project: Project;
  onSelect: (project: Project, triggerEl: HTMLElement | null) => void;
}> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const previewSection =
    project.summary.find((s) => s.label === project.cardPreview) ?? project.summary[0];
  const backgroundSection = project.summary.find((s) => s.label === 'Background');

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(project, cardRef.current)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((prev) => ({ ...prev, active: false }))}
      aria-label={`Open case study details: ${project.title}`}
      className="group relative w-full overflow-hidden rounded-2xl border border-obsidian-700 bg-obsidian-850 p-6 text-left shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/55 focus-visible:outline-2 focus-visible:outline-gold-400 sm:p-9"
    >
      {/* Signature cursor-following warm champagne spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(560px circle at ${spotlight.x}px ${spotlight.y}px, rgba(226, 184, 107, 0.14), transparent 45%)`,
        }}
      />

      <div className="relative grid gap-8 lg:grid-cols-12">
        {/* Main content column */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/45 bg-gold-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-300">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Featured Case Study
              </span>
            )}
            <span className="inline-flex items-center rounded-full border border-obsidian-700 bg-obsidian-900 px-3 py-1 text-xs font-semibold text-ink-muted">
              {project.category}
            </span>
            {project.period && (
              <span className="text-xs text-ink-muted">
                <SmartText text={project.period} />
              </span>
            )}
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-gold-300 sm:text-3xl">
            {project.title}
          </h3>

          {/* Owner's Summary Preview (Result + Background preview) */}
          {previewSection && (
            <div className="mt-5 rounded-xl border border-obsidian-700 bg-obsidian-900/90 p-4 sm:p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-400">
                {previewSection.label}
              </div>
              <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-ink sm:text-base">
                {previewSection.paragraphs.map((p, idx) => (
                  <EmphasizedProjectParagraph key={idx} text={p} />
                ))}
              </div>
            </div>
          )}

          {backgroundSection && (
            <div className="mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {backgroundSection.label}
              </div>
              <EmphasizedProjectParagraph
                text={backgroundSection.paragraphs.join(' ')}
                className="mt-1 line-clamp-3 text-sm leading-relaxed text-ink-muted"
              />
            </div>
          )}

          {/* Tags taken strictly from terms in the text */}
          <ul aria-label="Methods and topics" className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-lg border border-obsidian-700 bg-obsidian-900 px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: Highlighted stat box + Spreadsheet Exhibit Preview + View details cue */}
        <div className="flex flex-col justify-between rounded-xl border border-obsidian-700 bg-obsidian-950 p-6 text-ink lg:col-span-5">
          <div>
            {project.highlight && (
              <div className="border-b border-obsidian-700 pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                    {project.highlight.label}
                  </span>
                  {project.highlight.chip && (
                    <span className="rounded bg-gold-400 px-2.5 py-0.5 text-xs font-bold tracking-wider text-obsidian-950">
                      {project.highlight.chip}
                    </span>
                  )}
                </div>
                <div className="mt-2 font-display text-4xl font-semibold tracking-tight text-gold-300 sm:text-5xl">
                  <CountUpStat
                    value={project.highlight.value}
                    count={project.highlight.count}
                  />
                </div>
              </div>
            )}

            {/* Cover Model Thumbnail */}
            {project.coverImage && (
              <div className="mt-4 overflow-hidden rounded-lg border border-obsidian-700 bg-obsidian-900">
                <div className="flex items-center justify-between border-b border-obsidian-700 px-3 py-1.5 text-[11px] text-ink-muted">
                  <span className="inline-flex items-center gap-1.5 font-medium text-gold-300">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    8 Spreadsheet Exhibits Included
                  </span>
                  <span>2022A – 2030E</span>
                </div>
                <img
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  loading="lazy"
                  className="max-h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            )}

            <dl className="mt-4 space-y-2 text-xs">
              {project.stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-2">
                  <dt className="text-ink-muted">{stat.label}</dt>
                  <dd className="font-semibold text-ink tabular">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-obsidian-700 pt-4 text-sm font-semibold text-gold-300">
            <span>View details &amp; 5-step DCF model</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/40 bg-obsidian-850 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
