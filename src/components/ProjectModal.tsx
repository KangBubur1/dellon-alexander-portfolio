import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  FileSpreadsheet,
  ZoomIn,
  X,
} from 'lucide-react';
import type { Project, ProjectImage } from '../data/portfolio';
import { EmphasizedProjectParagraph, SmartText } from './ui';

export const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasMultiple: boolean;
  onContactClick: () => void;
}> = ({ project, onClose, onPrev, onNext, hasMultiple, onContactClick }) => {
  const prefersReducedMotion = useReducedMotion();
  const [zoomedImage, setZoomedImage] = useState<ProjectImage | null>(null);

  useEffect(() => {
    setZoomedImage(null);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (zoomedImage && e.key === 'Escape') {
        e.stopPropagation();
        setZoomedImage(null);
        return;
      }
      if (e.key === 'ArrowLeft' && hasMultiple && !zoomedImage) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasMultiple && !zoomedImage) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, hasMultiple, onPrev, onNext, zoomedImage]);

  return (
    <Dialog.Root open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/82 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }
                }
                transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                className="modal-scroll fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-obsidian-700 bg-obsidian-900 text-ink shadow-2xl focus:outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[90vh] sm:max-w-[940px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl"
              >
                {/* 1. Sticky Modal Header */}
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-obsidian-700 bg-obsidian-950/95 px-6 py-5 text-ink backdrop-blur-md sm:px-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="rounded-full border border-gold-400/40 bg-gold-400/15 px-3 py-0.5 font-semibold text-gold-300">
                        {project.category}
                      </span>
                      {project.period && (
                        <span className="text-ink-muted">
                          <SmartText text={project.period} />
                        </span>
                      )}
                    </div>
                    <Dialog.Title className="mt-2 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                      {project.title}
                    </Dialog.Title>
                    <Dialog.Description className="sr-only">
                      Full project summary, key financial figures, 5-step DCF valuation walkthrough,
                      and spreadsheet exhibits for {project.title}.
                    </Dialog.Description>
                  </div>

                  <Dialog.Close
                    aria-label="Close modal"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-obsidian-700 bg-obsidian-850 text-ink transition-colors hover:border-gold-400/50 hover:text-gold-300"
                  >
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>

                {/* Scrollable Modal Body */}
                <div className="modal-scroll flex-1 space-y-8 overflow-y-auto px-6 py-7 sm:px-8">
                  {/* Tags */}
                  <ul aria-label="Project tags" className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-obsidian-700 bg-obsidian-850 px-2.5 py-1 text-xs font-medium text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* 2. Key-Stats Strip */}
                  <div
                    aria-label="Key financial figures"
                    className="grid grid-cols-2 gap-3 rounded-xl border border-obsidian-700 bg-obsidian-950 p-4 sm:grid-cols-4"
                  >
                    {project.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg border border-obsidian-700/80 bg-obsidian-850 p-3"
                      >
                        <div className="text-[11px] font-medium text-ink-muted">{stat.label}</div>
                        <div className="mt-1 font-display text-base font-semibold text-gold-300 tabular sm:text-lg">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 3. Owner's Summary Sections (Background + Result + Overview Table Image) */}
                  <div className="space-y-6">
                    {project.summary.map((section) => {
                      const isResult = section.label.toLowerCase().includes('result');
                      return (
                        <section
                          key={section.label}
                          aria-labelledby={`modal-sec-${section.label}`}
                          className={
                            isResult
                              ? 'rounded-xl border border-gold-400/40 bg-obsidian-850 p-5 sm:p-6'
                              : 'space-y-3'
                          }
                        >
                          <h3
                            id={`modal-sec-${section.label}`}
                            className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400"
                          >
                            {section.label}
                          </h3>
                          <div className="mt-2 space-y-3 text-base leading-relaxed text-ink">
                            {section.paragraphs.map((paragraph, idx) => (
                              <EmphasizedProjectParagraph key={idx} text={paragraph} />
                            ))}
                          </div>

                          {section.images && section.images.length > 0 && (
                            <div className="mt-5 space-y-4">
                              {section.images.map((img) => (
                                <figure
                                  key={img.src}
                                  className="overflow-hidden rounded-xl border border-obsidian-700 bg-obsidian-950"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setZoomedImage(img)}
                                    className="group relative block w-full text-left"
                                    aria-label={`Enlarge figure: ${img.caption}`}
                                  >
                                    <img
                                      src={img.src}
                                      alt={img.alt}
                                      loading="lazy"
                                      className="w-full bg-white object-contain"
                                    />
                                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg border border-gold-400/40 bg-obsidian-950/90 px-3 py-1.5 text-xs font-medium text-gold-300 shadow-lg transition-transform group-hover:scale-105">
                                      <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                                      Click to enlarge
                                    </span>
                                  </button>
                                  <figcaption className="border-t border-obsidian-700 px-4 py-2.5 text-xs text-ink-muted">
                                    {img.caption}
                                  </figcaption>
                                </figure>
                              ))}
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>

                  {/* 4. Owner's Detail Section: Overview 7 Steps + Detailed STEP 1 – STEP 5 with Spreadsheet Exhibits */}
                  <section
                    aria-labelledby="modal-detail-heading"
                    className="space-y-8 rounded-xl border border-obsidian-700 bg-obsidian-850/60 p-5 sm:p-7"
                  >
                    <div>
                      <h3
                        id="modal-detail-heading"
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400"
                      >
                        {project.detail.label}
                      </h3>

                      <div className="mt-2 space-y-2 text-base leading-relaxed text-ink">
                        {project.detail.intro.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>

                      {project.detail.steps.length > 0 && (
                        <div className="mt-6">
                          {project.detail.stepsLabel && (
                            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                              {project.detail.stepsLabel}
                            </h4>
                          )}
                          <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
                            {project.detail.steps.map((step, index) => (
                              <li
                                key={index}
                                className={`flex items-start gap-3 rounded-xl border border-obsidian-700 bg-obsidian-900 p-3.5 ${
                                  index === project.detail.steps.length - 1 ? 'sm:col-span-2' : ''
                                }`}
                              >
                                <span
                                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-xs font-semibold text-gold-300 tabular"
                                  aria-hidden="true"
                                >
                                  {index + 1}
                                </span>
                                <span className="text-sm leading-relaxed text-ink">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>

                    {/* Detailed STEP 1 – STEP 5 Breakdown with Model Exhibits */}
                    {project.detail.stepBlocks.length > 0 && (
                      <div className="space-y-8 border-t border-obsidian-700 pt-8">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-display text-xl font-semibold text-ink">
                            Step-by-Step Valuation Walkthrough &amp; Model Exhibits
                          </h4>
                          <span className="text-xs text-ink-muted">
                            Click any table to inspect at full resolution
                          </span>
                        </div>

                        <div className="space-y-8">
                          {project.detail.stepBlocks.map((block) => (
                            <article
                              key={block.stepNumber}
                              className="rounded-2xl border border-obsidian-700 bg-obsidian-900 p-5 sm:p-6"
                            >
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-md bg-gold-400 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-obsidian-950 tabular">
                                  {block.stepNumber}
                                </span>
                                <h5 className="font-display text-lg font-semibold text-ink sm:text-xl">
                                  {block.title}
                                </h5>
                              </div>

                              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink sm:text-base">
                                {block.paragraphs.map((p, i) => (
                                  <EmphasizedProjectParagraph key={i} text={p} />
                                ))}
                              </div>

                              {block.images.length > 0 && (
                                <div className="mt-5 space-y-4">
                                  {block.images.map((img) => (
                                    <figure
                                      key={img.src}
                                      className="overflow-hidden rounded-xl border border-obsidian-700 bg-obsidian-950"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setZoomedImage(img)}
                                        className="group relative block w-full text-left"
                                        aria-label={`Enlarge figure: ${img.caption}`}
                                      >
                                        <img
                                          src={img.src}
                                          alt={img.alt}
                                          loading="lazy"
                                          className="w-full bg-white object-contain"
                                        />
                                        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg border border-gold-400/40 bg-obsidian-950/90 px-3 py-1.5 text-xs font-medium text-gold-300 shadow-lg transition-transform group-hover:scale-105">
                                          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                                          Zoom table
                                        </span>
                                      </button>
                                      <figcaption className="border-t border-obsidian-700 px-4 py-2.5 text-xs text-ink-muted">
                                        {img.caption}
                                      </figcaption>
                                    </figure>
                                  ))}
                                </div>
                              )}
                            </article>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>

                  {/* 5. Artifacts */}
                  {project.artifacts.length > 0 && (
                    <section aria-labelledby="modal-artifacts-heading">
                      <h3
                        id="modal-artifacts-heading"
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400"
                      >
                        Model &amp; Report Files
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {project.artifacts.map((artifact, idx) =>
                          artifact.href ? (
                            <a
                              key={idx}
                              href={artifact.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-obsidian-700 bg-obsidian-850 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold-400"
                            >
                              <FileSpreadsheet
                                className="h-4 w-4 text-gold-400"
                                aria-hidden="true"
                              />
                              <span>{artifact.label}</span>
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          ) : (
                            <div
                              key={idx}
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-obsidian-700 bg-obsidian-850 px-3.5 py-2 text-sm"
                            >
                              <FileSpreadsheet
                                className="h-4 w-4 text-gold-400"
                                aria-hidden="true"
                              />
                              <SmartText text={artifact.label} />
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  )}
                </div>

                {/* 6. Sticky Footer: Contextual CTA + Prev/Next */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-obsidian-700 bg-obsidian-950 px-6 py-4 sm:px-8">
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian-950 transition-colors hover:bg-gold-300"
                  >
                    <span>Interested in my analysis approach? Let&apos;s talk</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={!hasMultiple}
                      aria-label="Previous project"
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-obsidian-700 bg-obsidian-850 px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      disabled={!hasMultiple}
                      aria-label="Next project"
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-obsidian-700 bg-obsidian-850 px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Fullscreen Zoom Lightbox for Spreadsheet Tables */}
                {zoomedImage && (
                  <div
                    role="dialog"
                    aria-label={zoomedImage.caption}
                    onClick={() => setZoomedImage(null)}
                    className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/92 p-4 sm:p-8"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="max-h-[90vh] max-w-6xl overflow-auto rounded-2xl border border-obsidian-700 bg-obsidian-950 p-3 shadow-2xl sm:p-5"
                    >
                      <div className="mb-3 flex items-center justify-between gap-4 px-1">
                        <p className="text-xs font-medium text-ink-muted sm:text-sm">
                          {zoomedImage.caption}
                        </p>
                        <button
                          type="button"
                          onClick={() => setZoomedImage(null)}
                          aria-label="Close enlarged table"
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-obsidian-700 bg-obsidian-850 text-ink hover:border-gold-400"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <img
                        src={zoomedImage.src}
                        alt={zoomedImage.alt}
                        className="w-full rounded-lg bg-white object-contain"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
