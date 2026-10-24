import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '../data/portfolio';
import { SectionHeader, SmartText } from './ui';

export const SkillsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-obsidian-700/80 bg-obsidian-900 py-20 sm:py-26"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          id="skills-heading"
        >
          <SectionHeader eyebrow="Capabilities" title={skills.title} intro={skills.intro} />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {skills.groups.map((group, idx) => (
            <motion.div
              key={group.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-6 shadow-xl shadow-black/30 sm:p-7"
            >
              <h3 className="font-display text-lg font-semibold text-gold-300">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-obsidian-700 bg-obsidian-900 px-3.5 py-1.5 text-sm font-medium text-ink"
                  >
                    <SmartText text={item} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
