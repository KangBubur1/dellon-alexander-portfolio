import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { bio, bioHighlights, pillars, profile } from '../data/portfolio';
import { HighlightedParagraph, SectionHeader } from './ui';

export const AboutSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="grain bg-obsidian-950 py-20 sm:py-26"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            eyebrow="About"
            title="Grounded in corporate finance, focused on credit."
          />
        </motion.div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          {/* Portrait / Monogram Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-4"
          >
            <div className="overflow-hidden rounded-2xl border border-obsidian-700 bg-obsidian-850 p-6 shadow-xl shadow-black/30">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-xl object-cover"
                />
              ) : (
                <div
                  className="relative flex aspect-[4/4.2] w-full flex-col justify-between overflow-hidden rounded-xl border border-gold-400/25 bg-obsidian-950 p-6 text-ink"
                  role="img"
                  aria-label={`${profile.name} monogram portrait placeholder`}
                >
                  <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="relative flex items-center justify-between text-xs text-ink-muted">
                    <span className="uppercase tracking-[0.18em] text-gold-400">Profile</span>
                    <span className="placeholder-chip">[ADD: portrait photo]</span>
                  </div>
                  <div className="relative my-auto py-4 text-center">
                    <span className="font-display text-6xl font-semibold tracking-wider text-gold-300 sm:text-7xl">
                      {profile.initials}
                    </span>
                  </div>
                  <div className="relative border-t border-obsidian-700 pt-3">
                    <p className="font-display text-lg font-medium text-ink">{profile.name}</p>
                    <p className="text-xs text-ink-muted">{profile.role}</p>
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-2.5 text-sm text-ink-muted">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>{profile.university}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Locked Biography + Core Skill Pillars */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-7 shadow-xl shadow-black/30 sm:p-9">
              <span
                id="about-heading"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400"
              >
                Biography
              </span>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink sm:text-[1.08rem] sm:leading-[1.8]">
                {bio.map((paragraph, index) => (
                  <HighlightedParagraph
                    key={index}
                    text={paragraph}
                    highlights={bioHighlights}
                  />
                ))}
              </div>
            </div>

            {/* 5 Core Skill Pillars */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                Core Skill Pillars (Ranked for Credit Analysis)
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {pillars.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    className={`rounded-xl border bg-obsidian-850 p-5 transition-colors hover:border-gold-400/45 ${
                      idx === 0
                        ? 'sm:col-span-2 border-gold-400/35 bg-obsidian-850'
                        : 'border-obsidian-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-xs font-semibold text-gold-300 tabular">
                        0{idx + 1}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-ink">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pillar.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
