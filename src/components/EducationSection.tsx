import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { education } from '../data/portfolio';
import { SectionHeader, SmartText } from './ui';

export const EducationSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="grain border-t border-obsidian-700/80 bg-obsidian-950 py-20 sm:py-26"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          id="education-heading"
        >
          <SectionHeader eyebrow="Academic Background" title={education.title} />
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* University Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            {education.items.map((item) => (
              <div
                key={item.school}
                className="h-full rounded-2xl border border-obsidian-700 bg-obsidian-850 p-6 shadow-xl shadow-black/30 sm:p-8"
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  <span>University</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{item.school}</h3>
                <p className="mt-1 text-base font-medium text-gold-300">{item.degree}</p>
                <p className="mt-2 text-sm text-ink-muted">
                  <SmartText text={item.period} />
                </p>

                {item.notes.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2.5 border-t border-obsidian-700 pt-4">
                    {item.notes.map((note, idx) => (
                      <SmartText key={idx} text={note} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="lg:col-span-5"
          >
            <div className="h-full rounded-2xl border border-obsidian-700 bg-obsidian-850 p-6 shadow-xl shadow-black/30 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-gold-400">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>Certifications &amp; Training</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                Credentials &amp; Licences
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
                {education.certifications.map((cert, i) => (
                  <li key={i}>
                    <SmartText text={cert} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
