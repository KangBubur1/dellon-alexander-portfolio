import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experience } from '../data/portfolio';
import { SectionHeader, SmartText } from './ui';

export const ExperienceSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="grain border-t border-obsidian-700/80 bg-obsidian-950 py-20 sm:py-26"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          id="experience-heading"
        >
          <SectionHeader
            eyebrow="Leadership"
            title={experience.title}
            intro={experience.intro}
          />
        </motion.div>

        <div className="relative mt-12 pl-6 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-px before:bg-gold-400/40 sm:pl-10">
          <div className="space-y-8">
            {experience.items.map((item, idx) => (
              <motion.article
                key={item.role}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="relative rounded-2xl border border-obsidian-700 bg-obsidian-850 p-6 shadow-xl shadow-black/30 sm:p-8"
              >
                <span
                  className="absolute top-7 -left-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-400 bg-obsidian-950 sm:-left-10"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                </span>

                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{item.org}</span>
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">
                      {item.role}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-ink-muted">
                    <SmartText text={item.period} />
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink sm:text-base">
                  {item.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                        aria-hidden="true"
                      />
                      <SmartText text={pt} />
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-obsidian-700 bg-obsidian-900 px-2.5 py-1 text-xs font-medium text-ink-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
